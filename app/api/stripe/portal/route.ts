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
    const { email } = await req.json().catch(() => ({}));
    if (!email) return Response.json({ error: "Missing email" }, { status: 400 });

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) return Response.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });

    const site = process.env.NEXT_PUBLIC_SITE_URL;
    if (!site) return Response.json({ error: "Missing NEXT_PUBLIC_SITE_URL" }, { status: 500 });

    // Look up Stripe customer ID from Supabase
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from("billing_accounts")
      .select("stripe_customer_id")
      .eq("email", String(email).toLowerCase())
      .maybeSingle();

    if (error) return Response.json({ error: error.message }, { status: 500 });

    const customerId = data?.stripe_customer_id;
    if (!customerId) {
      return Response.json(
        { error: "No Stripe customer found for this email. Please complete checkout first." },
        { status: 400 }
      );
    }

    // Create portal session on-demand (URL is short-lived)
    const stripe = new Stripe(stripeKey);
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${site}/app`,
    });

    return Response.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    return Response.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
