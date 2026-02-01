export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    vercel_env: process.env.VERCEL_ENV || null,
    vercel_url: process.env.VERCEL_URL || null,
    deployment_id: process.env.VERCEL_DEPLOYMENT_ID || null,
    git_sha: process.env.VERCEL_GIT_COMMIT_SHA || null,
    git_ref: process.env.VERCEL_GIT_COMMIT_REF || null,
    git_msg: process.env.VERCEL_GIT_COMMIT_MESSAGE || null
  });
}
