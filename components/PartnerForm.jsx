"use client";
import { useRef, useState } from "react";
import Turnstile from "./Turnstile";

const Arr = () => <span className="arr">→</span>;

// Partner contact form. POSTs to /api/contact (kind: partner);
// dormant backend returns "soon" and the form says so honestly.
export default function PartnerForm() {
  const [state, setState] = useState("idle"); // idle | busy | done | soon | turnstile | error
  const [token, setToken] = useState("");
  const tsRef = useRef(null);

  async function submit(e) {
    e.preventDefault();
    if (state === "busy") return;
    setState("busy");
    const f = e.target;
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "partner",
          name: f.pname.value,
          company: f.company.value,
          email: f.pemail.value,
          offer: f.offer.value,
          message: f.message.value,
          website: f.website.value,
          turnstileToken: token,
        }),
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
      <p className="lead" style={{ color: "#C2C9CC", marginTop: 28 }}>
        Got it. We read every inquiry and reply to the serious ones fast. Talk soon.
      </p>
    );
  }

  return (
    <>
      <form className="pform" onSubmit={submit}>
        <input type="text" name="pname" required placeholder="Your name" aria-label="Your name" />
        <input type="text" name="company" placeholder="Company" aria-label="Company" />
        <input type="email" name="pemail" required placeholder="Work email" aria-label="Work email" />
        <input type="text" name="offer" placeholder="What do you offer nurses?" aria-label="What do you offer nurses" />
        <textarea name="message" placeholder="Anything else we should know?" aria-label="Message" />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
        <Turnstile ref={tsRef} theme="dark" onToken={setToken} />
        <button type="submit" disabled={state === "busy"}>
          {state === "busy" ? "Sending…" : <>Send it over <Arr /></>}
        </button>
      </form>
      {state === "soon" && (
        <p className="micro" style={{ color: "#7DE9E8" }}>
          The form goes live this week. Hold that thought, or come back tomorrow.
        </p>
      )}
      {state === "turnstile" && (
        <p className="micro" style={{ color: "#FF87B0" }}>We couldn&apos;t verify you&apos;re human. Give it another try.</p>
      )}
      {state === "error" && (
        <p className="micro" style={{ color: "#FF87B0" }}>Something broke on our end. Try again in a minute.</p>
      )}
    </>
  );
}
