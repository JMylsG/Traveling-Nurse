import { getCloudflareContext } from "@opennextjs/cloudflare";
import { appendSheetRow, centralTimestamp } from "@/lib/google-sheets";
import { POLL_TOPICS, POLL_VERSION } from "@/lib/poll";

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

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ ok: false, code: "bad-request" }, { status: 400 });
  }

  if (body.website) return Response.json({ ok: true });

  const allowed = new Set(POLL_TOPICS.map((topic) => topic.id));
  const selected = [...new Set(Array.isArray(body.selected) ? body.selected : [])];
  const other = String(body.other || "").trim().slice(0, 150);
  if (selected.length < 1 || selected.length > 3 || selected.some((id) => !allowed.has(id))) {
    return Response.json({ ok: false, code: "invalid-selection" }, { status: 400 });
  }

  const row = [
    crypto.randomUUID(),
    centralTimestamp(),
    "Homepage",
    POLL_VERSION,
    ...POLL_TOPICS.map((topic) => selected.includes(topic.id)),
    selected.includes("other") ? other : "",
  ];

  try {
    await appendSheetRow(env(), {
      range: "'Homepage Poll'!A:O",
      headerRange: "'Homepage Poll'!A1:O1",
      headers: [
        "Submission ID", "Central Timestamp", "Source", "Poll Version",
        ...POLL_TOPICS.map((topic) => topic.label),
        "Other response",
      ],
      row,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error(JSON.stringify({ event: "homepage_poll_append_failed", message: error.message }));
    return Response.json({ ok: false, code: "storage" }, { status: 503 });
  }
}
