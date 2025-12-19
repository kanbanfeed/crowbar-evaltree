import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { sendEvaltreeThankYouEmail } from "@/lib/sendEmail";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export async function POST(req: Request) {
  // ✅ FIX: headers() is async in your Next.js version
  const sig = (await headers()).get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // ✅ MUST read raw body as text
    const rawBody = await req.text();

    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(
      "❌ Webhook signature verification failed:",
      err?.message || err
    );
    return NextResponse.json(
      { error: `Webhook Error: ${err?.message || "Invalid signature"}` },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const sessionId = session.id;

      const rawEmail =
        session.customer_details?.email || session.customer_email || null;

      // ✅ Normalize email to match login email comparisons
      const email = rawEmail ? rawEmail.trim().toLowerCase() : null;

      const plan = (session.metadata?.plan || null) as
        | "single"
        | "pack"
        | null;

      // ✅ NEW: read chosen brief slug for single purchases
      const briefSlug =
        typeof session.metadata?.briefSlug === "string"
          ? session.metadata.briefSlug
          : "";

      // If metadata missing, don’t crash webhook
      if (!email || !plan) {
        console.warn("⚠️ Missing email or plan in session:", {
          sessionId,
          email,
          plan,
          metadata: session.metadata,
        });
        return NextResponse.json({ received: true });
      }

      const downloadsRemaining = plan === "single" ? 1 : 5;

      // ✅ Upsert purchase row
      const { data: upserted, error: upErr } = await supabaseAdmin
        .from("purchases")
        .upsert(
          {
            stripe_session_id: sessionId,
            stripe_customer_id: (session.customer as string) ?? null,
            customer_email: email,
            plan,
            downloads_remaining: downloadsRemaining,
            status: "paid",
          },
          { onConflict: "stripe_session_id" }
        )
        .select("id,email_sent")
        .maybeSingle();

      if (upErr) {
        console.error("❌ Supabase upsert error:", upErr.message);
        // Still return 200 to Stripe so it doesn't retry forever
        return NextResponse.json({ received: true });
      }

      // ✅ Avoid duplicate emails
      if (!upserted) {
        console.warn("⚠️ Purchase upsert returned no row:", sessionId);
        return NextResponse.json({ received: true });
      }

      // ✅ NEW: for single plan, immediately record this brief in purchase_downloads
      // This powers: landing "Already purchased" + future Library listing
      if (plan === "single" && briefSlug) {
        try {
          const { data: brief, error: bErr } = await supabaseAdmin
            .from("briefs")
            .select("id")
            .eq("slug", briefSlug)
            .eq("is_active", true)
            .maybeSingle();

          if (bErr) {
            console.error("❌ briefs lookup error:", bErr.message);
          } else if (brief?.id) {
            const { error: pdErr } = await supabaseAdmin
              .from("purchase_downloads")
              .upsert(
                {
                  purchase_id: upserted.id,
                  brief_id: brief.id,
                },
                { onConflict: "purchase_id,brief_id" }
              );

            if (pdErr) {
              console.error("❌ purchase_downloads upsert error:", pdErr.message);
            }
          } else {
            console.warn("⚠️ Brief not found for slug:", briefSlug);
          }
        } catch (e: any) {
          console.error(
            "❌ purchase_downloads insert crash:",
            e?.message || e
          );
          // Do not block webhook
        }
      }

      if (upserted.email_sent) {
        console.log("ℹ️ Email already sent for session:", sessionId);
        return NextResponse.json({ received: true });
      }

      // ✅ Send Brevo email (DO NOT crash webhook if it fails)
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

        console.log("✅ Thank-you email sent:", email, plan, sessionId);
      } catch (e: any) {
        const msg = e?.message || String(e);
        console.error("❌ Brevo email failed:", msg);

        await supabaseAdmin
          .from("purchases")
          .update({
            email_sent: false,
            email_error: msg,
          })
          .eq("id", upserted.id);

        // IMPORTANT: Still return success to Stripe
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Webhook handler crash:", err?.message || err);
    // Still return 200 so Stripe doesn't keep retrying forever
    return NextResponse.json({ received: true });
  }
}
