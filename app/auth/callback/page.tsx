"use client";

import { useEffect } from "react";
import { supabaseBrowserClient } from "@/lib/supabaseClient";

export default function AuthCallback() {
  useEffect(() => {
    (async () => {
      try {
        // Handles magic links that return tokens in the URL hash:
        // https://.../#access_token=...&refresh_token=...&type=magiclink
        const supabase = supabaseBrowserClient();
        const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
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
