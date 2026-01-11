"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Billing = { status: "active" | "inactive"; entitlement: string };

export default function AppHome() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [billing, setBilling] = useState<Billing | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setErr(null);
      const { data } = await supabase.auth.getUser();
      const userEmail = data.user?.email ?? null;
      setEmail(userEmail);

      if (!userEmail) {
        window.location.href = "/login";
        return;
      }

      const res = await fetch("/api/billing/status", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErr(json?.error || "Failed to check billing status");
        setLoading(false);
        return;
      }

      setBilling(json);
      setLoading(false);

      if (json.status !== "active") {
        // Not paid → send to pricing
        window.location.href = "/pricing";
      }
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1>Structura App</h1>

      {loading && <p className="muted">Loading…</p>}

      {err && (
        <div className="card" style={{ marginTop: 16 }}>
          <p>Error: {err}</p>
          <a className="btn btnGhost" href="/pricing">Go to pricing</a>
        </div>
      )}

      {!loading && !err && billing && (
        <div className="card" style={{ marginTop: 16 }}>
          <p className="muted">Signed in as</p>
          <p style={{ fontWeight: 800 }}>{email}</p>
          <p className="muted" style={{ marginTop: 10 }}>
            Plan: <b>{billing.entitlement}</b> — Status: <b>{billing.status}</b>
          </p>

          <div style={{ marginTop: 14 }}>
            <button className="btn btnGhost" onClick={signOut}>Sign out</button>
          </div>
        </div>
      )}
    </div>
  );
}
