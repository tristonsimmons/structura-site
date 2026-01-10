import Stripe from "stripe";
export const runtime = "nodejs";

export async function POST() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-01-27.acacia" as any });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: process.env.STRIPE_PRICE_LIFETIME!, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL!}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL!}/pricing`,
  });

  return Response.json({ url: session.url });
}
