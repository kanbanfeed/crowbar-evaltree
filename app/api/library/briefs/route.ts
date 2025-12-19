import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { email } = (await req.json()) as { email: string };

  const emailKey = (email || "").trim().toLowerCase();
  if (!emailKey) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  // All briefs owned by this email (only paid purchases)
  const { data, error } = await supabaseAdmin
    .from("purchase_downloads")
    .select(`
      downloaded_at,
      briefs:brief_id (
        id, title, slug, preview_url
      ),
      purchases:purchase_id (
        customer_email, status, created_at
      )
    `)
    .eq("purchases.customer_email", emailKey)
    .eq("purchases.status", "paid");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const briefs = (data || [])
    .map((row: any) => row.briefs)
    .filter(Boolean);

  // Deduplicate (in case)
  const seen = new Set<string>();
  const unique = briefs.filter((b: any) => {
    if (!b?.slug) return false;
    if (seen.has(b.slug)) return false;
    seen.add(b.slug);
    return true;
  });

  return NextResponse.json({ briefs: unique });
}
