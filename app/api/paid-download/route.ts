import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function toAbsolute(urlOrPath: string) {
  if (!urlOrPath) return urlOrPath;
  if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) return urlOrPath;

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

    console.log("paid-download session_id:", sessionId, "slug:", slug);

    if (!sessionId || !slug) {
      return NextResponse.json({ error: "Missing session_id or slug" }, { status: 400 });
    }

    // 1) Verify purchase exists
    const { data: purchase, error: pErr } = await supabaseAdmin
      .from("purchases")
      .select("id,status,downloads_remaining")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();

    console.log("purchase:", purchase, "pErr:", pErr);

    if (pErr) throw pErr;

    if (!purchase || purchase.status !== "paid") {
      return NextResponse.json({ error: "Purchase not found or not paid" }, { status: 403 });
    }

    // 2) Get brief info
    const { data: brief, error: bErr } = await supabaseAdmin
      .from("briefs")
      .select("id,title,paid_url,is_active")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();

    console.log("brief:", brief, "bErr:", bErr);

    if (bErr) throw bErr;
    if (!brief) {
      return NextResponse.json({ error: "Brief not found" }, { status: 404 });
    }

    // 3) If already downloaded, allow without decrement
    const { data: existing, error: eErr } = await supabaseAdmin
      .from("purchase_downloads")
      .select("id")
      .eq("purchase_id", purchase.id)
      .eq("brief_id", brief.id)
      .maybeSingle();

    console.log("existing download:", existing, "eErr:", eErr);

    if (eErr) throw eErr;

    if (!existing) {
      if (purchase.downloads_remaining <= 0) {
        return NextResponse.json({ error: "Download limit reached" }, { status: 403 });
      }

      const { error: insErr } = await supabaseAdmin.from("purchase_downloads").insert({
        purchase_id: purchase.id,
        brief_id: brief.id,
      });

      console.log("insert download err:", insErr);
      if (insErr) throw insErr;

      const { error: updErr } = await supabaseAdmin
        .from("purchases")
        .update({ downloads_remaining: purchase.downloads_remaining - 1 })
        .eq("id", purchase.id);

      console.log("update remaining err:", updErr);
      if (updErr) throw updErr;
    }

    // 4) Fetch the PDF and force download
    const paidUrl = toAbsolute(brief.paid_url);
    console.log("fetching paid URL:", paidUrl);

    const fileResp = await fetch(paidUrl);

    if (!fileResp.ok) {
      const body = await fileResp.text().catch(() => "");
      console.error("paid file fetch failed:", fileResp.status, body);
      return NextResponse.json(
        { error: "File not reachable", status: fileResp.status },
        { status: 502 }
      );
    }

    const arrayBuffer = await fileResp.arrayBuffer();
    const safeName = `${brief.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.pdf`;

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (err: any) {
    console.error("paid-download error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: err?.message || String(err) },
      { status: 500 }
    );
  }
}
