import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };

    const normalizedEmail = (email || "").trim().toLowerCase();
    if (!normalizedEmail) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    /* -------------------------------------------------------
       1️⃣ Get purchased briefs (PAID only)
    ------------------------------------------------------- */
    const { data, error } = await supabaseAdmin
      .from("purchase_downloads")
      .select(
        `
        downloaded_at,
        briefs!inner(id,title,slug,preview_url),
        purchases!inner(customer_email,status)
      `
      )
      .eq("purchases.customer_email", normalizedEmail)
      .eq("purchases.status", "paid")
      .order("downloaded_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Deduplicate by brief.slug
    const map = new Map<string, any>();
    for (const row of data || []) {
      const b = (row as any)?.briefs;
      if (!b?.slug) continue;
      if (!map.has(b.slug)) map.set(b.slug, b);
    }

    const briefs = Array.from(map.values());

    /* -------------------------------------------------------
       2️⃣ Get LATEST PAID Stripe session for this email
          (THIS IS THE ONLY NEW ADDITION)
    ------------------------------------------------------- */
    const { data: lastPurchase, error: pErr } = await supabaseAdmin
      .from("purchases")
      .select("stripe_session_id")
      .eq("customer_email", normalizedEmail)
      .eq("status", "paid")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (pErr) {
      return NextResponse.json({ error: pErr.message }, { status: 500 });
    }

    /* -------------------------------------------------------
       3️⃣ Final response (unchanged + sessionId added)
    ------------------------------------------------------- */
    return NextResponse.json({
      briefs,
      sessionId: lastPurchase?.stripe_session_id || "",
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        error: "Internal server error",
        detail: e?.message || String(e),
      },
      { status: 500 }
    );
  }
}
