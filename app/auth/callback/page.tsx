"use client";

import { useEffect } from "react";
import { getSupabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  useEffect(() => {
    (async () => {
      try {
        const supabase = getSupabase();

        // For magic links / OAuth, Supabase may include a `code` param we must exchange.
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");

        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
        }

        // After session is established, send user into the app
        window.location.replace("/app");
      } catch {
        // If something goes wrong, send them to login
        window.location.replace("/login");
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      Signing you in…
    </div>
  );
}
