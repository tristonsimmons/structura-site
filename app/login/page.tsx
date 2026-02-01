"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function sendLink() {
    setMsg(null);
    try {
     const { error } = await supabase().auth.signInWithOtp({
  email,
  options: { emailRedirectTo: "https://www.structuratas.com/auth/callback" },

  return (
    <div className="container" style={{ padding: "40px 0", maxWidth: 520 }}>
      <h1>Log in</h1>
      <p className="muted">We’ll email you a secure sign-in link.</p>

      <div className="card" style={{ marginTop: 16 }}>
        <label className="muted" style={{ display: "block", marginBottom: 8 }}>
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(0,0,0,0.3)",
            color: "white",
          }}
        />
        <div style={{ marginTop: 12 }}>
          <button className="btn btnPrimary" onClick={sendLink} disabled={!email || sent}>
            {sent ? "Link sent ✅" : "Send sign-in link"}
          </button>
        </div>

        {msg && <p style={{ marginTop: 12 }}>Error: {msg}</p>}
        {sent && <p style={{ marginTop: 12 }} className="muted">Check your inbox (and spam).</p>}
      </div>

      <div style={{ marginTop: 16 }}>
        <a className="btn btnGhost" href="/pricing">View pricing</a>
      </div>
    </div>
  );
}
