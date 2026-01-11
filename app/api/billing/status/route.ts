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
  const { email } = await req.json().catch(() => ({}));
  if (!email) return Response.json({ error: "Missing email" }, { status: 400 });

  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("billing_accounts")
    .select("status, entitlement")
    .eq("email", String(email).toLowerCase())
    .maybeSingle();

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({
    status: data?.status ?? "inactive",
    entitlement: data?.entitlement ?? "free",
  });
}
