export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    vercel_env: process.env.VERCEL_ENV || null,
    STRIPE_PRICE_MONTHLY: process.env.STRIPE_PRICE_MONTHLY || null,
    STRIPE_PRICE_PRO: process.env.STRIPE_PRICE_PRO || null,
    STRIPE_PRICE_LIFETIME: process.env.STRIPE_PRICE_LIFETIME || null,
  });
}
