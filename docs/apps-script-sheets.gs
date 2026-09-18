/**
 * TNG Sheets Web App — keyless writer for the homepage poll and the resource
 * suggestion form. No service-account key needed (works with Google's
 * "Secure by Default" org policy left ON).
 *
 * SETUP (Drew, ~5 min):
 * 1. Open the private Google Sheet that has the two tabs named EXACTLY:
 *      "Homepage Poll"   and   "Resource Suggestions"
 * 2. Extensions > Apps Script. Delete any sample code, paste this whole file, Save.
 * 3. Project Settings (gear) > Script Properties > Add property:
 *      Name:  SHEETS_WEBAPP_TOKEN
 *      Value: a long random string (e.g. from a password manager). Keep a copy.
 * 4. Deploy > New deployment > type "Web app":
 *      Description: TNG Sheets writer
 *      Execute as:  Me (your travelnurseguide.com account)
 *      Who has access: Anyone
 *    Deploy, authorize, and COPY the Web app URL that ends in /exec.
 * 5. Send Myls the /exec URL and the token value (securely). He sets them as
 *    Cloudflare secrets SHEETS_WEBAPP_URL and SHEETS_WEBAPP_TOKEN.
 *
 * To edit later WITHOUT changing the URL: Deploy > Manage deployments > pencil >
 * Version: New version > Deploy. (A brand-new deployment makes a new URL.)
 *
 * Security: the endpoint is public, so the shared token is the gate. Only
 * requests carrying the matching token can append rows.
 */

function doPost(e) {
  try {
    var expected = PropertiesService.getScriptProperties().getProperty('SHEETS_WEBAPP_TOKEN');
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    if (!expected || body.token !== expected) {
      return json({ ok: false, error: 'unauthorized' });
    }

    var tabName = String(body.tab || '');
    var headers = Array.isArray(body.headers) ? body.headers : [];
    var row = Array.isArray(body.row) ? body.row : [];
    if (!tabName || !row.length) {
      return json({ ok: false, error: 'bad-request' });
    }

    var sheet = SpreadsheetApp.getActive().getSheetByName(tabName);
    if (!sheet) {
      return json({ ok: false, error: 'no-tab' });
    }

    // Write the header row only when the tab is still empty.
    if (sheet.getLastRow() === 0 && headers.length) {
      sheet.appendRow(headers);
    }
    sheet.appendRow(row);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
