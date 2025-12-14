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

  const { data: purchase, error: pErr } = await supabaseAdmin
    .from("purchases")
    .select("id,plan,downloads_remaining,status")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();

  if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 });
  if (!purchase || purchase.status !== "paid") {
    return NextResponse.json({ error: "Purchase not found" }, { status: 403 });
  }

  const { data: brief, error: bErr } = await supabaseAdmin
    .from("briefs")
    .select("id,slug,paid_url,is_active")
    .eq("slug", briefSlug)
    .eq("is_active", true)
    .maybeSingle();

  if (bErr) return NextResponse.json({ error: bErr.message }, { status: 500 });
  if (!brief) return NextResponse.json({ error: "Brief not found" }, { status: 404 });

  // If already downloaded, allow re-download without decrement
  const { data: existing } = await supabaseAdmin
    .from("purchase_downloads")
    .select("id")
    .eq("purchase_id", purchase.id)
    .eq("brief_id", brief.id)
    .maybeSingle();

  if (!existing) {
    // New download attempt
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

  return NextResponse.json({
  url: `/api/paid-download?session_id=${encodeURIComponent(sessionId)}&slug=${encodeURIComponent(briefSlug)}`,
});
}
