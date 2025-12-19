import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { email } = (await req.json()) as { email: string };

  const userEmail = String(email || "").trim().toLowerCase();
  if (!userEmail) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("purchase_downloads")
    .select("briefs!inner(slug), purchases!inner(customer_email,status)")
    .eq("purchases.status", "paid");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const slugs = Array.from(
    new Set(
      (data || [])
        .filter((row: any) => {
          const rowEmail = String(row?.purchases?.customer_email || "")
            .trim()
            .toLowerCase();
          return rowEmail === userEmail;
        })
        .flatMap((row: any) => {
          const briefs = row?.briefs;
          if (!briefs) return [];
          if (Array.isArray(briefs)) return briefs.map((b) => b?.slug).filter(Boolean);
          return [briefs?.slug].filter(Boolean);
        })
    )
  );

  return NextResponse.json({ slugs });
}
