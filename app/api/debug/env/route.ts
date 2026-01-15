export const runtime = "nodejs";

export async function GET() {
  const sk = process.env.STRIPE_SECRET_KEY || "";
  return Response.json({
    vercel_env: process.env.VERCEL_ENV || null,
    stripe_key_mode: sk.startsWith("sk_live_")
      ? "live"
      : sk.startsWith("sk_test_")
      ? "test"
      : "missing",
    stripe_key_prefix: sk ? sk.slice(0, 7) : null, // shows "sk_live" or "sk_test"
    has_STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
    has_STRIPE_PRICE_MONTHLY: !!process.env.STRIPE_PRICE_MONTHLY,
    has_STRIPE_PRICE_PRO: !!process.env.STRIPE_PRICE_PRO,
    has_STRIPE_PRICE_LIFETIME: !!process.env.STRIPE_PRICE_LIFETIME,
    has_NEXT_PUBLIC_SITE_URL: !!process.env.NEXT_PUBLIC_SITE_URL,
  });
}
