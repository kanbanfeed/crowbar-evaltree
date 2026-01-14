import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { stripe } from "@/lib/stripe";
import { sendEvaltreeThankYouEmail } from "@/lib/sendEmail";

export const runtime = "nodejs";

type Plan = "single" | "pack";

function parseBriefSlugs(meta: any): string[] {
  if (!meta) return [];
  if (typeof meta.briefSlugs === "string") {
    try {
      const parsed = JSON.parse(meta.briefSlugs);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  // backward compatibility
  if (typeof meta.briefSlug === "string") {
    return [meta.briefSlug];
  }
  return [];
}

export async function POST(req: Request) {
  const { sessionId } = (await req.json()) as { sessionId: string };
  if (!sessionId) {
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
  }

  // 1) Try DB first
  const { data: purchase, error: pErr } = await supabaseAdmin
    .from("purchases")
    .select(
      "id,plan,downloads_remaining,customer_email,status,email_sent,email_error,email_sent_at"
    )
    .eq("stripe_session_id", sessionId)
    .maybeSingle();

  if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 });

  if (purchase && purchase.status === "paid") {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const briefSlugs = parseBriefSlugs(session.metadata);

      // 🔹 Insert purchased briefs (single or pack)
      if (briefSlugs.length > 0) {
        const { data: briefs } = await supabaseAdmin
          .from("briefs")
          .select("id,slug")
          .in("slug", briefSlugs)
          .eq("is_active", true);

        if (briefs?.length) {
          const rows = briefs.map((b) => ({
            purchase_id: purchase.id,
            brief_id: b.id,
          }));

          await supabaseAdmin
            .from("purchase_downloads")
            .upsert(rows, { onConflict: "purchase_id,brief_id" });
        }
      }
    } catch (e: any) {
      console.error(
        "purchase_downloads upsert failed (db-paid path):",
        e?.message || e
      );
    }

    // 🔹 Email (unchanged logic)
    if (!purchase.email_sent && purchase.customer_email && purchase.plan) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const briefSlugs = parseBriefSlugs(session.metadata);

        await sendEvaltreeThankYouEmail({
          to: purchase.customer_email,
          plan: purchase.plan as Plan,
          sessionId,
          ...(purchase.plan === "single" && briefSlugs[0]
            ? { slug: briefSlugs[0] }
            : {}),
        });

        await supabaseAdmin
          .from("purchases")
          .update({
            email_sent: true,
            email_error: null,
            email_sent_at: new Date().toISOString(),
          })
          .eq("id", purchase.id);
      } catch (e: any) {
        const msg = e?.message || String(e);
        await supabaseAdmin
          .from("purchases")
          .update({ email_error: msg })
          .eq("id", purchase.id);

        console.error("Brevo email failed (db-paid path):", msg);
      }
    }

    return NextResponse.json({ ok: true, purchase });
  }

  // 2) Fallback: fetch from Stripe directly
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return NextResponse.json(
      { ok: false, reason: "not_paid" },
      { status: 403 }
    );
  }

  const rawEmail =
    session.customer_details?.email || session.customer_email || undefined;

  const email = rawEmail ? rawEmail.trim().toLowerCase() : undefined;
  const plan = (session.metadata?.plan as Plan | undefined) ?? undefined;
  const briefSlugs = parseBriefSlugs(session.metadata);

  if (!email || !plan) {
    return NextResponse.json(
      { ok: false, reason: "missing_email_or_plan" },
      { status: 403 }
    );
  }

  const downloadsRemaining = plan === "single" ? 1 : 5;

  // 3) Upsert purchase (idempotent)
  const { data: upserted, error: uErr } = await supabaseAdmin
    .from("purchases")
    .upsert(
      {
        stripe_session_id: session.id,
        stripe_customer_id: (session.customer as string) ?? null,
        customer_email: email,
        plan,
        downloads_remaining: downloadsRemaining,
        status: "paid",
      },
      { onConflict: "stripe_session_id" }
    )
    .select(
      "id,plan,downloads_remaining,customer_email,status,email_sent,email_error,email_sent_at"
    )
    .single();

  if (uErr) return NextResponse.json({ error: uErr.message }, { status: 500 });

  // 🔹 Insert all purchased briefs
  if (briefSlugs.length > 0) {
    try {
      const { data: briefs } = await supabaseAdmin
        .from("briefs")
        .select("id,slug")
        .in("slug", briefSlugs)
        .eq("is_active", true);

      if (briefs?.length) {
        const rows = briefs.map((b) => ({
          purchase_id: upserted.id,
          brief_id: b.id,
        }));

        await supabaseAdmin
          .from("purchase_downloads")
          .upsert(rows, { onConflict: "purchase_id,brief_id" });
      }
    } catch (e: any) {
      console.error(
        "purchase_downloads upsert failed (stripe-paid path):",
        e?.message || e
      );
    }
  }

  // 4) Send email once
  if (!upserted.email_sent) {
    try {
      await sendEvaltreeThankYouEmail({
        to: email,
        plan,
        sessionId,
        ...(plan === "single" && briefSlugs[0]
          ? { slug: briefSlugs[0] }
          : {}),
      });

      await supabaseAdmin
        .from("purchases")
        .update({
          email_sent: true,
          email_error: null,
          email_sent_at: new Date().toISOString(),
        })
        .eq("id", upserted.id);
    } catch (e: any) {
      const msg = e?.message || String(e);
      await supabaseAdmin
        .from("purchases")
        .update({ email_error: msg })
        .eq("id", upserted.id);

      console.error("Brevo email failed (stripe-paid path):", msg);
    }
  }

  return NextResponse.json({ ok: true, purchase: upserted });
}
