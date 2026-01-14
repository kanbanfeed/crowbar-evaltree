import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const { data: brief, error } = await supabaseAdmin
      .from("briefs")
      .select("title, preview_url")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();

    if (error) throw error;
    if (!brief) {
      return NextResponse.json({ error: "Brief not found" }, { status: 404 });
    }

    const previewUrl = brief.preview_url.startsWith("http")
      ? brief.preview_url
      : `${process.env.NEXT_PUBLIC_SITE_URL}${brief.preview_url}`;

    const fileResp = await fetch(previewUrl);
    if (!fileResp.ok) {
      throw new Error(`Failed to fetch PDF: ${fileResp.status}`);
    }

    const arrayBuffer = await fileResp.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": arrayBuffer.byteLength.toString(),
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    console.error("preview-download error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: err.message },
      { status: 500 }
    );
  }
}
