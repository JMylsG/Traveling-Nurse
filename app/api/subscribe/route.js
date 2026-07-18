import { getCloudflareContext } from "@opennextjs/cloudflare";
import { verifyTurnstile } from "@/lib/turnstile";

// Email capture -> Resend Audience (the email list). Dormant until both
// RESEND_API_KEY and RESEND_AUDIENCE_ID are set:
//   local: .dev.vars (see .dev.vars.example)
//   prod:  npx wrangler secret put RESEND_API_KEY  (+ RESEND_AUDIENCE_ID)
// While dormant, responds 503 { code: "soon" } and the form shows a soft notice.
// Resend audiences store email only, so the chosen specialty is forwarded to
// CONTACT_TO as a best-effort notification (never blocks the signup).

function env() {
  try {
    return getCloudflareContext().env ?? process.env;
  } catch {
    return process.env;
  }
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, code: "bad-request" }, { status: 400 });
  }

  // honeypot: real users never see this field; pretend success for bots
  if (body.website) return Response.json({ ok: true });

  const email = String(body.email || "").trim();
  const specialty = String(body.specialty || "").trim().slice(0, 40);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ ok: false, code: "invalid-email" }, { status: 400 });
  }

  // bot check (Cloudflare Turnstile); skipped automatically when TURNSTILE_SECRET_KEY is unset
  if (!(await verifyTurnstile(body.turnstileToken, env(), req.headers.get("cf-connecting-ip")))) {
    return Response.json({ ok: false, code: "turnstile" }, { status: 403 });
  }

  const key = env().RESEND_API_KEY;
  const audienceId = env().RESEND_AUDIENCE_ID;
  if (!key || !audienceId) return Response.json({ ok: false, code: "soon" }, { status: 503 });

  const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ email, unsubscribed: false }),
  });

  const data = await res.json().catch(() => ({}));
  // an already-subscribed email is a success from the nurse's side
  const already =
    res.status === 409 ||
    res.status === 422 ||
    /already|exist/i.test(`${data?.message || ""} ${data?.name || ""}`);
  if (!res.ok && !already) {
    return Response.json({ ok: false, code: "upstream" }, { status: 502 });
  }

  // best-effort: forward the specialty to Drew (audiences can't store custom fields)
  const to = env().CONTACT_TO;
  if (to && !already) {
    const from = env().CONTACT_FROM || "The Travel Nurse Guide <onboarding@resend.dev>";
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          from,
          to,
          subject: "New guide signup",
          text: `New subscriber: ${email}${specialty ? `\nSpecialty: ${specialty}` : ""}`,
        }),
      });
    } catch {
      // notification is optional; the signup already succeeded
    }
  }

  return Response.json({ ok: true });
}
