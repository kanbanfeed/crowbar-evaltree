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

    // Get purchased briefs for this email (paid purchases only)
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

    // Deduplicate by brief.slug (same brief can appear multiple times)
    const map = new Map<string, any>();
    for (const row of data || []) {
      const b = (row as any)?.briefs;
      if (!b?.slug) continue;
      if (!map.has(b.slug)) map.set(b.slug, b);
    }

    return NextResponse.json({ briefs: Array.from(map.values()) });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Internal server error", detail: e?.message || String(e) },
      { status: 500 }
    );
  }
}
