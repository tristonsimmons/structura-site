export const runtime = "nodejs";

function payload() {
  return {
    vercel_env: process.env.VERCEL_ENV || null,
    vercel_url: process.env.VERCEL_URL || null,
    deployment_id: process.env.VERCEL_DEPLOYMENT_ID || null,
    git_sha: process.env.VERCEL_GIT_COMMIT_SHA || null,
    git_ref: process.env.VERCEL_GIT_COMMIT_REF || null,
    git_msg: process.env.VERCEL_GIT_COMMIT_MESSAGE || null,
  };
}

export async function GET() {
  return Response.json(payload());
}

// Some platforms will issue HEAD requests during caching/warmup.
// Returning a 200 avoids "405 Method Not Allowed" build failures.
export async function HEAD() {
  return new Response(null, { status: 200 });
}
