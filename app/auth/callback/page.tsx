"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { supabaseBrowserClient } from "@/lib/supabaseClient";

function getHashParam(name: string) {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash?.startsWith("#") ? window.location.hash.slice(1) : "";
  const params = new URLSearchParams(hash);
  return params.get(name);
}

export default function AuthCallback() {
  useEffect(() => {
    (async () => {
      try {
        const access_token = getHashParam("access_token");
        const refresh_token = getHashParam("refresh_token");

        if (!access_token || !refresh_token) {
          // Some flows may use ?code=... instead; fall back to login for now.
          window.location.replace("/login");
          return;
        }

        const supabase = supabaseBrowserClient();
        const { data, error } = await supabase.auth.setSession({ access_token, refresh_token });

        if (error || !data?.session) {
          window.location.replace("/login");
          return;
        }

        window.location.replace("/app");
      } catch {
        window.location.replace("/login");
      }
    })();
  }, []);

  return <div style={{ padding: 24 }}>Signing you in…</div>;
}
