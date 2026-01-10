import Stripe from "stripe";
export const runtime = "nodejs";

export async function GET() {
  const secret = process.env.STRIPE_SECRET_KEY!;
  const price = process.env.STRIPE_PRICE_LIFETIME!;
  const site = process.env.NEXT_PUBLIC_SITE_URL!;

  const stripe = new Stripe(secret);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price, quantity: 1 }],
    success_url: `${site}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${site}/pricing`,
  });

  return Response.redirect(session.url!, 302);
}
