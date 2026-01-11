import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url) throw new Error("Missing SUPABASE_URL");
  if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key, { auth: { persistSession: false } });
}

function entitlementFromSession(session: Stripe.Checkout.Session): "monthly" | "pro" | "lifetime" | "free" {
  const mode = session.mode; // "subscription" | "payment"
  if (mode === "payment") return "lifetime";
  // If you later want to differentiate monthly vs pro, store metadata on the Checkout Session or look up line items.
  return "monthly";
}

async function upsertBillingAccount(params: {
  email: string;
  stripeCustomerId?: string | null;
  entitlement: string;
  status: "active" | "inactive";
  lastEventType: string;
  lastEventId: string;
}) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("billing_accounts")
    .upsert(
      {
        email: params.email.toLowerCase(),
        stripe_customer_id: params.stripeCustomerId ?? null,
        entitlement: params.entitlement,
        status: params.status,
        last_event_type: params.lastEventType,
        last_event_id: params.lastEventId,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    );

  if (error) throw new Error(`Supabase upsert failed: ${error.message}`);
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("Missing stripe-signature", { status: 400 });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) return new Response("Missing STRIPE_WEBHOOK_SECRET", { status: 500 });

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    return new Response(`Invalid signature: ${err?.message || "unknown"}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const email =
          session.customer_details?.email ||
          session.customer_email ||
          null;

        if (!email) break;

        const entitlement = entitlementFromSession(session);
        await upsertBillingAccount({
          email,
          stripeCustomerId: typeof session.customer === "string" ? session.customer : null,
          entitlement,
          status: "active",
          lastEventType: event.type,
          lastEventId: event.id,
        });
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;

        // You may not always have the email here without a lookup.
        // We'll update by stripe_customer_id when possible later.
        const customerId = typeof sub.customer === "string" ? sub.customer : null;
        if (!customerId) break;

        const isActive = sub.status === "active" || sub.status === "trialing";

        const supabase = getSupabaseAdmin();
        const { error } = await supabase
          .from("billing_accounts")
          .update({
            status: isActive ? "active" : "inactive",
            last_event_type: event.type,
            last_event_id: event.id,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId);

        if (error) throw new Error(`Supabase update failed: ${error.message}`);
        break;
      }

      default:
        break;
    }

    return new Response("ok", { status: 200 });
  } catch (err: any) {
    return new Response(`Webhook handler error: ${err?.message || "unknown"}`, { status: 500 });
  }
}
