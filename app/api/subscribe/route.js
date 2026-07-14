import { getCloudflareContext } from "@opennextjs/cloudflare";

// Email capture -> Kit (ConvertKit). Dormant until KIT_API_KEY is set:
//   local: .dev.vars (see .dev.vars.example)
//   prod:  npx wrangler secret put KIT_API_KEY
// While dormant, responds 503 { code: "soon" } and the form shows a soft notice.

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

  const key = env().KIT_API_KEY;
  if (!key) return Response.json({ ok: false, code: "soon" }, { status: 503 });

  const res = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Kit-Api-Key": key },
    body: JSON.stringify({
      email_address: email,
      // requires a "Specialty" custom field in Kit; harmless if unset
      ...(specialty ? { fields: { specialty } } : {}),
    }),
  });

  // 409 = already subscribed, which is a success from the nurse's side
  if (!res.ok && res.status !== 409) {
    return Response.json({ ok: false, code: "upstream" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
