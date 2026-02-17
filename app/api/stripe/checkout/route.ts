import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const secret = process.env.STRIPE_SECRET_KEY!;

if (!secret) {
  throw new Error("STRIPE_SECRET_KEY missing");
}

const stripe = new Stripe(secret)

type Plan = "7" | "49" | "99";

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

      if (!plan) {
       return NextResponse.json(
       { error: "Missing plan" },
       { status: 400 } 
     );
    }

    // ⬇️ CHANGE: support multiple brief slugs
    const briefSlugs: string[] = Array.isArray(body?.briefSlugs)
      ? body.briefSlugs.filter((s: any) => typeof s === "string")
      : [];

    const emailRaw = typeof body?.email === "string" ? body.email : "";
    const email = emailRaw.trim().toLowerCase();

   console.log("PLAN RECEIVED:", plan)

    // 2) Basic validations
    if (!plan || (plan !== "7" && plan !== "49" && plan !== "99")) {
      return NextResponse.json(
        { error: "Invalid plan. Must be 7 / 49 / 99" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Missing 'email'. Please log in again." },
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
    const price7 = process.env.STRIPE_PRICE_7!;
    const price49 = process.env.STRIPE_PRICE_49!;
    const price99 = process.env.STRIPE_PRICE_99!;

    if (!price7 || !price49 || !price99) {
      return NextResponse.json(
        {
          error:
            "Missing STRIPE price IDs in env.",
        },
        { status: 500 }
      );
    }

    let price = price7;

    if (plan === "49") price = price49;
    if (plan === "99") price = price99;

    // 5) Success URLs (keep your logic)

      let successUrl = `${origin}/thank-you`;

       if (plan === "7") {
         successUrl = `${origin}/upsell-49`;
      }

       if (plan === "49") {
         successUrl = `${origin}/upsell-99`;
      }

       if (plan === "99") {
         successUrl = `${origin}/thank-you`;
      }



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
