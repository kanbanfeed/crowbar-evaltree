import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { stripe } from "@/lib/stripe";
import { sendEvaltreeThankYouEmail } from "@/lib/sendEmail";

export const runtime = "nodejs";

type Plan = "single" | "pack";

export async function POST(req: Request) {
  const { sessionId } = (await req.json()) as { sessionId: string };
  if (!sessionId) {
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
  }

  // 1) Try DB first
  const { data: purchase, error: pErr } = await supabaseAdmin
    .from("purchases")
    .select("id,plan,downloads_remaining,customer_email,status,email_sent,email_error,email_sent_at")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();

  if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 });

  // ✅ If already paid in DB, attempt email-send if not sent (but don't block user)
  if (purchase && purchase.status === "paid") {
    // ✅ NEW: ensure single-brief purchase is recorded in purchase_downloads (idempotent)
    if (purchase.plan === "single" && purchase.customer_email) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const briefSlug =
          typeof session.metadata?.briefSlug === "string"
            ? session.metadata.briefSlug
            : null;

        if (briefSlug) {
          const { data: brief, error: bErr } = await supabaseAdmin
            .from("briefs")
            .select("id")
            .eq("slug", briefSlug)
            .eq("is_active", true)
            .maybeSingle();

          if (!bErr && brief?.id) {
            await supabaseAdmin
              .from("purchase_downloads")
              .upsert(
                {
                  purchase_id: purchase.id,
                  brief_id: brief.id,
                },
                { onConflict: "purchase_id,brief_id" }
              );
          }
        }
      } catch (e: any) {
        // Do not block user
        console.error("purchase_downloads upsert failed (db-paid path):", e?.message || e);
      }
    }

    if (!purchase.email_sent && purchase.customer_email && purchase.plan) {
      try {
        await sendEvaltreeThankYouEmail({
          to: purchase.customer_email,
          plan: purchase.plan as Plan,
          sessionId,
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

        // IMPORTANT: Don't block verify/download just because email failed
        console.error("Brevo email failed (db-paid path):", msg);
      }
    }

    return NextResponse.json({ ok: true, purchase });
  }

  // 2) Fallback: fetch from Stripe directly (handles webhook delays)
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return NextResponse.json({ ok: false, reason: "not_paid" }, { status: 403 });
  }

  const rawEmail =
    session.customer_details?.email || session.customer_email || undefined;

  const email = rawEmail ? rawEmail.trim().toLowerCase() : undefined;

  const plan = (session.metadata?.plan as Plan | undefined) ?? undefined;

  // ✅ NEW: read briefSlug for single purchases
  const briefSlug =
    typeof session.metadata?.briefSlug === "string"
      ? session.metadata.briefSlug
      : "";

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
    .select("id,plan,downloads_remaining,customer_email,status,email_sent,email_error,email_sent_at")
    .single();

  if (uErr) return NextResponse.json({ error: uErr.message }, { status: 500 });

  // ✅ NEW: For single plan, immediately mark this brief as owned (idempotent)
  if (plan === "single" && briefSlug) {
    try {
      const { data: brief, error: bErr } = await supabaseAdmin
        .from("briefs")
        .select("id")
        .eq("slug", briefSlug)
        .eq("is_active", true)
        .maybeSingle();

      if (!bErr && brief?.id) {
        await supabaseAdmin
          .from("purchase_downloads")
          .upsert(
            {
              purchase_id: upserted.id,
              brief_id: brief.id,
            },
            { onConflict: "purchase_id,brief_id" }
          );
      }
    } catch (e: any) {
      // Do not block user
      console.error("purchase_downloads upsert failed (stripe-paid path):", e?.message || e);
    }
  }

  // 4) Send email once (idempotent)
  if (!upserted.email_sent) {
    try {
      await sendEvaltreeThankYouEmail({ to: email, plan, sessionId });

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
      // Do not block user
    }
  }

  return NextResponse.json({ ok: true, purchase: upserted });
}
