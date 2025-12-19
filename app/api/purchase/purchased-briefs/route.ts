import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { sessionId } = (await req.json()) as { sessionId: string };

  if (!sessionId) {
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
  }

  // 1) Find email for this session
  const { data: purchase, error: pErr } = await supabaseAdmin
    .from("purchases")
    .select("customer_email,status")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();

  if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 });
  if (!purchase?.customer_email) {
    return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
  }

  const email = purchase.customer_email.trim().toLowerCase();

 
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
          return rowEmail === email;
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
