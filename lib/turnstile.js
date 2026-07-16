// Server-side Cloudflare Turnstile verification. Returns true when the token is
// valid, OR when no secret is configured, so forms keep working in local dev and
// never hard-break if the secret is missing. Set TURNSTILE_SECRET_KEY as a
// Cloudflare secret to enforce it in production.
export async function verifyTurnstile(token, env, ip) {
  const secret = env?.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured -> skip the check
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}
