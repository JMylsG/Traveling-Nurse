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

// Branded delivery email sent to each new subscriber with the Playbook link.
// Inline styles only, so it renders across email clients.
function guideEmail(url) {
  return `<!doctype html><html><body style="margin:0;background:#f2f5f6;">
  <div style="background:#f2f5f6;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;">
      <tr><td style="background:#1B2A4A;padding:22px 30px;">
        <div style="color:#7DE9E8;font-size:12px;letter-spacing:.18em;text-transform:uppercase;font-weight:bold;">The Travel Nurse Guide</div>
      </td></tr>
      <tr><td style="padding:34px 30px 6px;">
        <h1 style="margin:0 0 14px;color:#1B2A4A;font-size:24px;line-height:1.25;">Your Playbook is here.</h1>
        <p style="margin:0 0 10px;color:#3c4a5c;font-size:15px;line-height:1.6;">Thanks for joining 37,000 travel nurses. Here is your free copy of the Travel Nurse Playbook, what the industry does not explain, in the order you actually need it.</p>
      </td></tr>
      <tr><td style="padding:18px 30px 30px;">
        <a href="${url}" style="display:inline-block;background:#65BFBE;color:#12233f;text-decoration:none;font-weight:bold;font-size:15px;padding:14px 30px;border-radius:8px;">Download the Playbook &rarr;</a>
        <p style="margin:18px 0 0;color:#7b8285;font-size:13px;line-height:1.6;">Or paste this into your browser:<br><a href="${url}" style="color:#D6336C;">${url}</a></p>
      </td></tr>
      <tr><td style="background:#f2f5f6;padding:18px 30px;border-top:1px solid #e2e7e9;">
        <p style="margin:0;color:#7b8285;font-size:12px;line-height:1.5;">The Travel Nurse Guide &middot; Guide Media LLC<br>Honest information, nurses first.</p>
      </td></tr>
    </table>
  </div></body></html>`;
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

  const from = env().CONTACT_FROM || "The Travel Nurse Guide <onboarding@resend.dev>";

  // Deliver the Playbook to the new subscriber (best-effort; skips re-submits).
  // The link resolves against the request origin, so it points at workers.dev
  // now and the real domain automatically once it is attached. Note: the
  // onboarding@resend.dev fallback can only email the Resend account owner, so
  // real delivery to subscribers begins once CONTACT_FROM is a verified domain.
  if (!already) {
    const guideUrl = new URL("/the-travel-nurse-playbook.pdf", req.url).toString();
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          from,
          to: email,
          subject: "Your Travel Nurse Playbook is here",
          html: guideEmail(guideUrl),
          text: `Thanks for joining The Travel Nurse Guide.\n\nDownload your free Travel Nurse Playbook: ${guideUrl}\n\nWhat the industry does not explain, in the order you actually need it.\n\ntravelnurseguide.com`,
        }),
      });
    } catch {
      // delivery is best-effort; the signup already succeeded
    }
  }

  // best-effort: forward the specialty to Drew (audiences can't store custom fields)
  const to = env().CONTACT_TO;
  if (to && !already) {
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
