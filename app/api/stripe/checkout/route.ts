import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type Plan = "single" | "pack";

export async function POST(req: Request) {
  try {
    // 1) Parse request safely
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const plan = body?.plan as Plan | undefined;

    // ⬇️ CHANGE: support multiple brief slugs
    const briefSlugs: string[] = Array.isArray(body?.briefSlugs)
      ? body.briefSlugs.filter((s: any) => typeof s === "string")
      : [];

    const emailRaw = typeof body?.email === "string" ? body.email : "";
    const email = emailRaw.trim().toLowerCase();

    // 2) Basic validations
    if (!plan || (plan !== "single" && plan !== "pack")) {
      return NextResponse.json(
        { error: "Missing/invalid 'plan'. Must be 'single' or 'pack'." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Missing 'email'. Please log in again." },
        { status: 400 }
      );
    }

    // ⬇️ IMPORTANT: enforce selection rules
    if (plan === "single" && briefSlugs.length !== 1) {
      return NextResponse.json(
        { error: "Single plan requires exactly 1 brief." },
        { status: 400 }
      );
    }

    if (plan === "pack" && briefSlugs.length !== 5) {
      return NextResponse.json(
        { error: "Pack plan requires exactly 5 briefs." },
        { status: 400 }
      );
    }

    // 3) Validate env
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY is missing on server" },
        { status: 500 }
      );
    }

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    // 4) Price config
    const singlePriceId = process.env.STRIPE_PRICE_SINGLE;
    const packPriceId = process.env.STRIPE_PRICE_PACK;

    if (!singlePriceId || !packPriceId) {
      return NextResponse.json(
        {
          error:
            "Missing STRIPE_PRICE_SINGLE or STRIPE_PRICE_PACK in env.",
        },
        { status: 500 }
      );
    }

    const price = plan === "single" ? singlePriceId : packPriceId;

    // 5) Success URLs (keep your logic)
    const successUrl =
      plan === "single"
        ? `${origin}/evaltree/thank-you?session_id={CHECKOUT_SESSION_ID}`
        : `${origin}/evaltree/thank-you?session_id={CHECKOUT_SESSION_ID}`;

    // 6) Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      customer_email: email,
      customer_creation: "always",

      line_items: [{ price, quantity: 1 }],
      allow_promotion_codes: false,

      success_url: successUrl,
      cancel_url: `${origin}/evaltree?canceled=1`,

      // ⬇️ KEY CHANGE: store selected briefs
      metadata: {
        plan,
        source: "evaltree",
        briefSlugs: JSON.stringify(briefSlugs),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error("Checkout error:", e?.message || e);
    return NextResponse.json(
      { error: e?.message || "Checkout failed" },
      { status: 500 }
    );
  }
}
