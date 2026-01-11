import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("Missing stripe-signature", { status: 400 });

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response("Missing STRIPE_WEBHOOK_SECRET", { status: 500 });

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err: any) {
    return new Response(`Invalid signature: ${err?.message || "unknown"}`, { status: 400 });
  }

  // For now just acknowledge receipt (we’ll add DB logic next)
  return new Response("ok", { status: 200 });
}
