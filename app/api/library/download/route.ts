import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function toAbsolute(urlOrPath: string) {
  if (!urlOrPath) return urlOrPath;
  if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://"))
    return urlOrPath;

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `http://localhost:${process.env.PORT || 3000}`;

  return `${base}${urlOrPath.startsWith("/") ? "" : "/"}${urlOrPath}`;
}

async function handleDownload(slug: string, email: string) {
  const cleanSlug = (slug || "").trim();
  const cleanEmail = (email || "").trim().toLowerCase();

  if (!cleanSlug || !cleanEmail) {
    return NextResponse.json(
      { error: "Missing slug or email" },
      { status: 400 }
    );
  }

  const { data: brief, error: bErr } = await supabaseAdmin
    .from("briefs")
    .select("id,title,paid_url,is_active")
    .eq("slug", cleanSlug)
    .eq("is_active", true)
    .maybeSingle();

  if (bErr) return NextResponse.json({ error: bErr.message }, { status: 500 });
  if (!brief)
    return NextResponse.json({ error: "Brief not found" }, { status: 404 });

  const { data: owned, error: oErr } = await supabaseAdmin
    .from("purchase_downloads")
    .select("id, purchases!inner(customer_email,status)")
    .eq("brief_id", brief.id)
    .eq("purchases.customer_email", cleanEmail)
    .eq("purchases.status", "paid")
    .maybeSingle();

  if (oErr) return NextResponse.json({ error: oErr.message }, { status: 500 });
  if (!owned)
    return NextResponse.json({ error: "Not purchased" }, { status: 403 });

  const paidUrl = toAbsolute(brief.paid_url);
  const fileResp = await fetch(paidUrl);

  if (!fileResp.ok) {
    const body = await fileResp.text().catch(() => "");
    return NextResponse.json(
      { error: "File not reachable", status: fileResp.status, body },
      { status: 502 }
    );
  }

  const arrayBuffer = await fileResp.arrayBuffer();
  const safeName = `${String(brief.title)
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase()}.pdf`;

  return new NextResponse(arrayBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${safeName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";
  const email = (searchParams.get("email") || "").trim().toLowerCase();

  return handleDownload(slug, email);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const slug = typeof body?.slug === "string" ? body.slug : "";
  const email = typeof body?.email === "string" ? body.email : "";

  return handleDownload(slug, email);
}
