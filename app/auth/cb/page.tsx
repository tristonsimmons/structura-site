"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export default function AuthCallback() {
  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase().auth.getSessionFromUrl({ storeSession: true });
        if (error) throw error;

        if (!data?.session) {
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
