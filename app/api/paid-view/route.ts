import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function toAbsolute(urlOrPath: string) {
  if (urlOrPath.startsWith("http")) return urlOrPath;

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `http://localhost:${process.env.PORT || 3000}`;

  return `${base}${urlOrPath.startsWith("/") ? "" : "/"}${urlOrPath}`;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const sessionId = searchParams.get("session_id");
    const slug = searchParams.get("slug");

    if (!sessionId || !slug) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    // 1️⃣ Verify paid session
    const { data: purchase } = await supabaseAdmin
      .from("purchases")
      .select("id,status")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();

    if (!purchase || purchase.status !== "paid") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // 2️⃣ Fetch brief
    const { data: brief } = await supabaseAdmin
      .from("briefs")
      .select("paid_url")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();

    if (!brief?.paid_url) {
      return NextResponse.json({ error: "Brief not found" }, { status: 404 });
    }

    // 3️⃣ Fetch PDF
    const pdfResponse = await fetch(toAbsolute(brief.paid_url));

    if (!pdfResponse.ok) {
      return NextResponse.json(
        { error: "Failed to load PDF" },
        { status: 500 }
      );
    }

    const buffer = await pdfResponse.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
        "Cache-Control": "private, no-store, no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error", detail: error?.message },
      { status: 500 }
    );
  }
}
