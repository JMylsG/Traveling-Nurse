import { getCloudflareContext } from "@opennextjs/cloudflare";
import { verifyTurnstile } from "@/lib/turnstile";

// Partner inquiries + feedback widget -> email via Resend.
// Dormant until RESEND_API_KEY and CONTACT_TO are set (see .dev.vars.example).

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

  // honeypot: pretend success for bots
  if (body.website) return Response.json({ ok: true });

  const kind = body.kind === "feedback" ? "feedback" : "partner";
  const message = String(body.message || "").trim().slice(0, 4000);
  const email = String(body.email || "").trim().slice(0, 200);
  const name = String(body.name || "").trim().slice(0, 200);

  if (kind === "partner") {
    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return Response.json({ ok: false, code: "missing-fields" }, { status: 400 });
    }
  } else if (!message) {
    return Response.json({ ok: false, code: "missing-fields" }, { status: 400 });
  }

  // bot check (Cloudflare Turnstile); skipped automatically when TURNSTILE_SECRET_KEY is unset
  if (!(await verifyTurnstile(body.turnstileToken, env(), req.headers.get("cf-connecting-ip")))) {
    return Response.json({ ok: false, code: "turnstile" }, { status: 403 });
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = env();
  if (!RESEND_API_KEY || !CONTACT_TO) {
    return Response.json({ ok: false, code: "soon" }, { status: 503 });
  }

  const lines =
    kind === "partner"
      ? [
          `Name: ${name}`,
          `Company: ${String(body.company || "").trim().slice(0, 200)}`,
          `Email: ${email}`,
          `Offer: ${String(body.offer || "").trim().slice(0, 500)}`,
          "",
          message || "(no message)",
        ]
      : [`Category: ${String(body.category || "").trim().slice(0, 100)}`, "", message];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({
      from: CONTACT_FROM || "TNG Website <onboarding@resend.dev>",
      to: [CONTACT_TO],
      ...(email ? { reply_to: email } : {}),
      subject: kind === "partner" ? `Partner inquiry: ${name}` : "Site feedback",
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) return Response.json({ ok: false, code: "upstream" }, { status: 502 });
  return Response.json({ ok: true });
}
