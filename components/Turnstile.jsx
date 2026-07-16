"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// Public site key (safe to ship); locked to the production hostname, so on
// localhost we fall back to Cloudflare's always-passes test key to exercise the
// flow in dev. Enforcement is server-side with the secret key. Update SITE_KEY
// if the widget is recreated, and add the real domain to the widget's hostnames
// at launch (right now it only allows the workers.dev host).
const SITE_KEY = "0x4AAAAAAD3NwMAPdnk4p4bQ";
const TEST_KEY = "1x00000000000000000000AA";
function siteKey() {
  const h = typeof window !== "undefined" ? window.location.hostname : "";
  return h === "localhost" || h === "127.0.0.1" ? TEST_KEY : SITE_KEY;
}
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let loader;
function loadScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return loader;
}

// Cloudflare Turnstile (bot check) widget. Fires onToken(token) when solved and
// onToken("") when it expires or errors. Tokens are single-use, so a parent can
// call ref.reset() for a fresh one after a failed submit.
const Turnstile = forwardRef(function Turnstile({ onToken, theme = "auto" }, ref) {
  const boxRef = useRef(null);
  const idRef = useRef(null);
  const cbRef = useRef(onToken);
  cbRef.current = onToken;

  useImperativeHandle(ref, () => ({
    reset() {
      try { window.turnstile?.reset(idRef.current); } catch {}
    },
  }));

  useEffect(() => {
    let cancelled = false;
    loadScript()
      .then(() => {
        // The script's onload can fire a beat before window.turnstile is ready,
        // so poll briefly instead of bailing on the first miss.
        const tryRender = () => {
          if (cancelled || idRef.current) return;
          if (!window.turnstile || !boxRef.current) {
            setTimeout(tryRender, 50);
            return;
          }
          idRef.current = window.turnstile.render(boxRef.current, {
            sitekey: siteKey(),
            theme,
            callback: (t) => cbRef.current?.(t),
            "expired-callback": () => cbRef.current?.(""),
            "error-callback": () => cbRef.current?.(""),
          });
        };
        tryRender();
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      try { window.turnstile?.remove(idRef.current); } catch {}
      idRef.current = null;
    };
  }, [theme]);

  return <div className="cf-turnstile-box" ref={boxRef} />;
});

export default Turnstile;
