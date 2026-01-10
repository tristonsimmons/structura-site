import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST() {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    const price = process.env.STRIPE_PRICE_MONTHLY;
    const site = process.env.NEXT_PUBLIC_SITE_URL;

    if (!secret) return Response.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    if (!price) return Response.json({ error: "Missing STRIPE_PRICE_MONTHLY" }, { status: 500 });
    if (!site) return Response.json({ error: "Missing NEXT_PUBLIC_SITE_URL" }, { status: 500 });

    const stripe = new Stripe(secret);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      success_url: `${site}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/pricing`,
    });

    return Response.json({ url: session.url, sessionId: session.id });
  } catch (err: any) {
    return Response.json(
      {
        error: err?.message || "Unknown error",
        type: err?.type,
        code: err?.code,
        param: err?.param,
      },
      { status: 500 }
    );
  }
}
