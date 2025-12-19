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
      .eq("purchases.status", "paid");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const map = new Map<string, any>();
    for (const row of data || []) {
      const b = (row as any)?.briefs;
      if (!b?.slug) continue;

      if (!map.has(b.slug)) {
        map.set(b.slug, {
          id: b.id,
          title: b.title,
          slug: b.slug,
          preview_url: b.preview_url,
          last_downloaded_at: (row as any)?.downloaded_at || null,
        });
      }
    }

    return NextResponse.json({ briefs: Array.from(map.values()) });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Internal server error", detail: e?.message || String(e) },
      { status: 500 }
    );
  }
}
