import { createSign } from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

async function accessToken(env) {
  const email = env?.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = env?.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !privateKey) throw new Error("Google Sheets credentials are not configured");

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(JSON.stringify({
    iss: email,
    scope: SHEETS_SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${claims}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = signer.sign(privateKey).toString("base64url");

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) throw new Error("Google authentication failed");
  return data.access_token;
}

export async function appendSheetRow(env, { range, headerRange, headers, row }) {
  const spreadsheetId = env?.GOOGLE_SHEETS_ID;
  if (!spreadsheetId) throw new Error("Google Sheets ID is not configured");

  const token = await accessToken(env);
  const base = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/`;
  const authHeaders = { Authorization: `Bearer ${token}` };

  const headerResponse = await fetch(`${base}${encodeURIComponent(headerRange)}`, { headers: authHeaders });
  const headerData = await headerResponse.json().catch(() => ({}));
  if (!headerResponse.ok) throw new Error("Google Sheets header check failed");
  if (!headerData.values?.length) {
    const createHeaderResponse = await fetch(
      `${base}${encodeURIComponent(headerRange)}?valueInputOption=RAW`,
      {
        method: "PUT",
        headers: { ...authHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ majorDimension: "ROWS", values: [headers] }),
      }
    );
    if (!createHeaderResponse.ok) throw new Error("Google Sheets header creation failed");
  }

  const url = new URL(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}:append`
  );
  url.searchParams.set("valueInputOption", "RAW");
  url.searchParams.set("insertDataOption", "INSERT_ROWS");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...authHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ majorDimension: "ROWS", values: [row] }),
  });
  if (!response.ok) throw new Error("Google Sheets append failed");
}
