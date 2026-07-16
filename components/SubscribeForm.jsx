"use client";
import { useRef, useState } from "react";
import Turnstile from "./Turnstile";

const Arr = () => <span className="arr">→</span>;

// The email capture form (landing #getguide). POSTs to /api/subscribe;
// while the backend is dormant it shows a soft "opening soon" notice.
export default function SubscribeForm() {
  const [state, setState] = useState("idle"); // idle | busy | done | soon | turnstile | error
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [token, setToken] = useState("");
  const tsRef = useRef(null);

  async function submit(e) {
    e.preventDefault();
    if (state === "busy") return;
    setState("busy");
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, specialty, website: e.target.website.value, turnstileToken: token }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok) return setState("done");
      setState(d.code === "soon" ? "soon" : d.code === "turnstile" ? "turnstile" : "error");
      tsRef.current?.reset();
      setToken("");
    } catch {
      setState("error");
      tsRef.current?.reset();
      setToken("");
    }
  }

  if (state === "done") {
    return (
      <p style={{ fontSize: 15.5, color: "#fff", lineHeight: 1.55 }}>
        You&apos;re in. The guide is headed to <b style={{ color: "#7DE9E8" }}>{email}</b>.
        If it hides, check spam once and drag it out.
      </p>
    );
  }

  return (
    <>
      <form className="form" onSubmit={submit}>
        <input
          type="email"
          required
          placeholder="Your email"
          aria-label="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select aria-label="Your specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
          <option value="">Specialty…</option>
          <option>ICU</option><option>ER</option><option>Med-Surg</option>
          <option>OR</option><option>L&D</option><option>Tele</option><option>Other</option>
        </select>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
        <Turnstile ref={tsRef} theme="dark" onToken={setToken} />
        <button type="submit" disabled={state === "busy"}>
          {state === "busy" ? "Sending…" : <>Send me the guide <Arr /></>}
        </button>
      </form>
      {state === "soon" && (
        <div className="micro" style={{ color: "#7DE9E8" }}>Signups open very soon. Check back in a day or two.</div>
      )}
      {state === "turnstile" && (
        <div className="micro" style={{ color: "#FF87B0" }}>We couldn&apos;t verify you&apos;re human. Give it another try.</div>
      )}
      {state === "error" && (
        <div className="micro" style={{ color: "#FF87B0" }}>Something broke on our end. Try again in a minute.</div>
      )}
    </>
  );
}
