import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const { sessionId, briefSlug } = (await req.json()) as {
    sessionId: string;
    briefSlug: string;
  };

  if (!sessionId || !briefSlug) {
    return NextResponse.json({ error: "Missing sessionId/briefSlug" }, { status: 400 });
  }

  // Access window (team-confirmed duration)
  const accessDays = Number(process.env.EVALTREE_ACCESS_DAYS || 30);
  const expiresAt = new Date(Date.now() + accessDays * 24 * 60 * 60 * 1000).toISOString();

  // 1) Get purchase
  const { data: purchase, error: pErr } = await supabaseAdmin
    .from("purchases")
    .select("id,plan,downloads_remaining,customer_email,status")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();

  if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 });
  if (!purchase || purchase.status !== "paid") {
    return NextResponse.json({ error: "Purchase not found" }, { status: 403 });
  }

  // 2) Get brief
  const { data: brief, error: bErr } = await supabaseAdmin
    .from("briefs")
    .select("id,slug,paid_url,is_active")
    .eq("slug", briefSlug)
    .eq("is_active", true)
    .maybeSingle();

  if (bErr) return NextResponse.json({ error: bErr.message }, { status: 500 });
  if (!brief) return NextResponse.json({ error: "Brief not found" }, { status: 404 });

  // 3) ✅ Persistent purchase recognition: prevent repurchase if already active (not expired)
  if (purchase.customer_email) {
    const { data: accessRow, error: aErr } = await supabaseAdmin
      .from("user_brief_access")
      .select("access_expires_at,is_active")
      .eq("user_email", purchase.customer_email)
      .eq("brief_id", brief.id)
      .maybeSingle();

    if (aErr) return NextResponse.json({ error: aErr.message }, { status: 500 });

    const isActive = accessRow?.is_active === true;
    const notExpired =
      accessRow?.access_expires_at &&
      new Date(accessRow.access_expires_at).getTime() > Date.now();

    // If already purchased and access still valid → block
        if (isActive && notExpired) {
      // ✅ Already purchased → allow re-download (no repurchase)
      return NextResponse.json({
        url: `/api/paid-download?session_id=${encodeURIComponent(sessionId)}&slug=${encodeURIComponent(briefSlug)}`,
        alreadyPurchased: true,
      });
    }
  }

  // 4) One brief per transaction (existing logic)
  const { data: existing } = await supabaseAdmin
    .from("purchase_downloads")
    .select("id")
    .eq("purchase_id", purchase.id)
    .eq("brief_id", brief.id)
    .maybeSingle();

  if (!existing) {
    if (purchase.downloads_remaining <= 0) {
      return NextResponse.json({ error: "Download limit reached" }, { status: 403 });
    }

    const { error: insErr } = await supabaseAdmin.from("purchase_downloads").insert({
      purchase_id: purchase.id,
      brief_id: brief.id,
    });

    if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });

    const { error: updErr } = await supabaseAdmin
      .from("purchases")
      .update({ downloads_remaining: purchase.downloads_remaining - 1 })
      .eq("id", purchase.id);

    if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });
  }

  // 5) ✅ Save persistent access record (so refresh/logout/revisit remembers)
  if (purchase.customer_email) {
    const { data: existingAccess } = await supabaseAdmin
      .from("user_brief_access")
      .select("first_purchased_at")
      .eq("user_email", purchase.customer_email)
      .eq("brief_id", brief.id)
      .maybeSingle();

    const { error: upErr } = await supabaseAdmin.from("user_brief_access").upsert(
      {
        user_email: purchase.customer_email,
        brief_id: brief.id,
        first_purchased_at: existingAccess?.first_purchased_at || new Date().toISOString(),
        last_purchased_at: new Date().toISOString(),
        access_expires_at: expiresAt,
        is_active: true,
      },
      { onConflict: "user_email,brief_id" }
    );

    if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });
  }

  // 6) Return download URL (unchanged)
  return NextResponse.json({
    url: `/api/paid-download?session_id=${encodeURIComponent(sessionId)}&slug=${encodeURIComponent(briefSlug)}`,
  });
}
