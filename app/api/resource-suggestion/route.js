import { getCloudflareContext } from "@opennextjs/cloudflare";
import { appendSheetRow, centralTimestamp } from "@/lib/google-sheets";

const CATEGORIES = new Set(["Certifications", "Insurance", "Job search and recruiters", "Tax services", "Housing", "Other"]);
const AFFILIATIONS = new Set(["Yes", "No"]);

function env() {
  try {
    return getCloudflareContext().env ?? process.env;
  } catch {
    return process.env;
  }
}

function validEmail(value) {
  return !value || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, code: "bad-request" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ ok: false, code: "bad-request" }, { status: 400 });
  }

  if (body.websiteHoneypot) return Response.json({ ok: true });

  const name = String(body.name || "").trim().slice(0, 200);
  const website = String(body.website || "").trim().slice(0, 500);
  const category = String(body.category || "").trim();
  const reason = String(body.reason || "").trim().slice(0, 2000);
  const affiliation = String(body.affiliation || "").trim();
  const email = String(body.email || "").trim().slice(0, 200);

  let parsedUrl;
  try {
    parsedUrl = new URL(website);
  } catch {
    parsedUrl = null;
  }
  const validUrl = parsedUrl && ["http:", "https:"].includes(parsedUrl.protocol);

  if (!name || !validUrl || !CATEGORIES.has(category) || !reason || !AFFILIATIONS.has(affiliation) || !validEmail(email)) {
    return Response.json({ ok: false, code: "invalid-fields" }, { status: 400 });
  }

  const row = [
    crypto.randomUUID(),
    centralTimestamp(),
    "Resources Page",
    name,
    parsedUrl.toString(),
    category,
    reason,
    affiliation,
    email,
  ];

  try {
    await appendSheetRow(env(), {
      range: "'Resource Suggestions'!A:I",
      headerRange: "'Resource Suggestions'!A1:I1",
      headers: [
        "Submission ID", "Central Timestamp", "Source", "Resource or company name", "Website",
        "Category", "Why recommended", "Represents company", "Email address",
      ],
      row,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error(JSON.stringify({ event: "resource_suggestion_append_failed", message: error.message }));
    return Response.json({ ok: false, code: "storage" }, { status: 503 });
  }
}
