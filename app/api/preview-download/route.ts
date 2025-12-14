import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    console.log("▶ preview-download slug:", slug);

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const { data: brief, error } = await supabaseAdmin
      .from("briefs")
      .select("title,preview_url")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();

    console.log("▶ brief:", brief, "error:", error);

    if (error) throw error;
    if (!brief) {
      return NextResponse.json({ error: "Brief not found" }, { status: 404 });
    }

    // 🚨 IMPORTANT FIX (see below)
    const previewUrl =
      brief.preview_url.startsWith("http")
        ? brief.preview_url
        : `${process.env.NEXT_PUBLIC_SITE_URL}${brief.preview_url}`;

    console.log("▶ fetching preview URL:", previewUrl);

    const fileResp = await fetch(previewUrl);
    if (!fileResp.ok) {
      throw new Error(`Failed to fetch PDF: ${fileResp.status}`);
    }

    const arrayBuffer = await fileResp.arrayBuffer();
    const safeName = `${brief.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-preview.pdf`;

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (err: any) {
    console.error("❌ preview-download error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: err.message },
      { status: 500 }
    );
  }
}
