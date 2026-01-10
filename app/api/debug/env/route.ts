export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    has_STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
    has_STRIPE_PRICE_MONTHLY: !!process.env.STRIPE_PRICE_MONTHLY,
    has_STRIPE_PRICE_PRO: !!process.env.STRIPE_PRICE_PRO,
    has_STRIPE_PRICE_LIFETIME: !!process.env.STRIPE_PRICE_LIFETIME,
    has_NEXT_PUBLIC_SITE_URL: !!process.env.NEXT_PUBLIC_SITE_URL,
    vercel_env: process.env.VERCEL_ENV || null, // "production" or "preview"
  });
}
