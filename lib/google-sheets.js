// Poll + resource-suggestion rows are written to a private Google Sheet through a
// Google Apps Script Web App (keyless). The script is bound to the Sheet, so it
// already has write access; no service-account JSON key is required, which keeps
// Drew's "Secure by Default" org policy intact. A shared secret token gates the
// endpoint so only this site can append rows.
//
// Setup (Drew): open the Sheet > Extensions > Apps Script, paste the script in
// docs/apps-script-sheets.gs, add a Script Property SHEETS_WEBAPP_TOKEN with a
// long random value, Deploy > New deployment > Web app (Execute as: me,
// Who has access: Anyone). Then set two Cloudflare secrets:
//   SHEETS_WEBAPP_URL   = the /exec deployment URL
//   SHEETS_WEBAPP_TOKEN = the same token value

// Stored timestamps are UTC so rows are unambiguous regardless of where a
// visitor or reviewer is located. Format: "2026-09-18 04:12:33 UTC".
export function utcTimestamp(date = new Date()) {
  return date.toISOString().replace("T", " ").replace(/\.\d+Z$/, " UTC");
}

// Append one row to a named tab. `headers` are written first only when the tab
// is still empty. Apps Script Web Apps always respond 200, so success is read
// from the JSON body, not the HTTP status.
export async function appendSheetRow(env, { tab, headers, row }) {
  const url = env?.SHEETS_WEBAPP_URL;
  const token = env?.SHEETS_WEBAPP_TOKEN;
  if (!url || !token) throw new Error("Sheets Web App is not configured");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, tab, headers, row }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) {
    throw new Error(`Sheets Web App append failed: ${data.error || response.status}`);
  }
}
