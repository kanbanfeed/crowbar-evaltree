import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { sessionId } = (await req.json()) as { sessionId: string };

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing sessionId" },
        { status: 400 }
      );
    }

    // 1️⃣ Get purchase record for THIS Stripe session
    const { data: purchase, error: pErr } = await supabaseAdmin
      .from("purchases")
      .select("id,status")
      .eq("stripe_session_id", sessionId)
      .eq("status", "paid")
      .single();

    if (pErr || !purchase) {
      return NextResponse.json(
        { error: "Purchase not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Fetch briefs linked ONLY to this purchase
    const { data, error } = await supabaseAdmin
      .from("purchase_downloads")
      .select(`
        briefs (
          id,
          title,
          slug
        )
      `)
      .eq("purchase_id", purchase.id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const briefs =
      data?.map((row: any) => row.briefs).filter(Boolean) ?? [];

    return NextResponse.json({ briefs });
  } catch (err: any) {
    console.error("session-briefs error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
