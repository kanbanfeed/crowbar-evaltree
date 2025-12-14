import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { sendEvaltreeThankYouEmail } from "@/lib/sendEmail";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
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
    console.error("❌ Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const sessionId = session.id;

      const email =
        session.customer_details?.email ||
        session.customer_email ||
        null;

      const plan = (session.metadata?.plan || null) as "single" | "pack" | null;

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
            stripe_customer_id: session.customer as string,
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

      if (upserted.email_sent) {
        console.log("ℹ️ Email already sent for session:", sessionId);
        return NextResponse.json({ received: true });
      }

      // ✅ Send Brevo email (DO NOT crash webhook if it fails)
      try {
        await sendEvaltreeThankYouEmail({ to: email, plan, sessionId: session.id });

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
