import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url) throw new Error("Missing SUPABASE_URL");
  if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key, { auth: { persistSession: false } });
}

async function upsertByEmail(email: string, stripeCustomerId: string | null, eventType: string, eventId: string) {
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("billing_accounts").upsert(
    {
      email: email.toLowerCase(),
      stripe_customer_id: stripeCustomerId,
      entitlement: "monthly",
      status: "active",
      last_event_type: eventType,
      last_event_id: eventId,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" }
  );
  if (error) throw new Error(`Supabase upsert failed: ${error.message}`);
}

export async function POST(req: Request) {
  try {
    const sig = req.headers.get("stripe-signature");
    if (!sig) return new Response("Missing stripe-signature", { status: 400 });

    const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!whSecret) throw new Error("Missing STRIPE_WEBHOOK_SECRET");

    const rawBody = await req.text();

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, whSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err?.message || err);
      return new Response(`Invalid signature: ${err?.message || "unknown"}`, { status: 400 });
    }

    console.log("Stripe webhook event:", event.type, event.id);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email || session.customer_email || null;
      const customerId = typeof session.customer === "string" ? session.customer : null;

      console.log("checkout.session.completed email:", email, "customer:", customerId);

      if (email) {
        await upsertByEmail(email, customerId, event.type, event.id);
        console.log("Supabase upsert ok for:", email);
      } else {
        console.log("No email found on session; skipping upsert.");
      }
    }

    return new Response("ok", { status: 200 });
  } catch (err: any) {
    console.error("Webhook handler error:", err?.message || err);
    return new Response(`Webhook handler error: ${err?.message || "unknown"}`, { status: 500 });
  }
}
