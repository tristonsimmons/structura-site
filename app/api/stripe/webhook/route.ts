import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url) throw new Error("Missing SUPABASE_URL");
  if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  try {
    const sig = req.headers.get("stripe-signature");
    if (!sig) return new Response("Missing stripe-signature", { status: 400 });

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) return new Response("Missing STRIPE_WEBHOOK_SECRET", { status: 500 });

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) return new Response("Missing STRIPE_SECRET_KEY", { status: 500 });

    // Create Stripe client INSIDE handler (prevents build-time crash)
    const stripe = new Stripe(stripeKey);

    const rawBody = await req.text();

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch (err: any) {
      return new Response(`Invalid signature: ${err?.message || "unknown"}`, { status: 400 });
    }

    // Minimal working write (you can expand later)
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email || session.customer_email || null;
      const customerId = typeof session.customer === "string" ? session.customer : null;

      if (email) {
        const supabase = supabaseAdmin();
        const { error } = await supabase.from("billing_accounts").upsert(
          {
            email: email.toLowerCase(),
            stripe_customer_id: customerId,
            entitlement: session.mode === "payment" ? "lifetime" : "monthly",
            status: "active",
            last_event_type: event.type,
            last_event_id: event.id,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "email" }
        );
        if (error) throw new Error(`Supabase upsert failed: ${error.message}`);
      }
    }

    return new Response("ok", { status: 200 });
  } catch (err: any) {
    return new Response(`Webhook handler error: ${err?.message || "unknown"}`, { status: 500 });
  }
}
