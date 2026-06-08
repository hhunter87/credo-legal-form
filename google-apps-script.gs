/**
 * Credo Legal Debt Defense Options Check → Google Sheets endpoint
 *
 * Setup:
 * 1) Create a new Google Sheet.
 * 2) Open Extensions → Apps Script.
 * 3) Paste this file into Code.gs.
 * 4) Save.
 * 5) Deploy → New deployment → Web app.
 * 6) Execute as: Me.
 * 7) Who has access: Anyone.
 * 8) Copy the Web App URL and paste it into CONFIG.googleScriptUrl in the widget.
 */

const SHEET_NAME = 'Credo Debt Leads';

const FIELDS = [
  'created_at',
  'lead_id',
  'entry_path',
  'first_name',
  'last_name',
  'phone',
  'email',
  'state',
  'state_name',
  'zip',
  'delivery_channel',
  'follow_up_preference',
  'sms_consent',
  'whatsapp_consent',
  'person_type',
  'authorized_for_other',

  'qualification_status',
  'qualification_reasons',
  'urgency_score',
  'urgency_level',
  'readiness_score',
  'readiness_level',
  'recommended_next_action',

  'number_of_debts',
  'total_estimated_debt',
  'largest_debt_amount',
  'supported_debt_types',
  'unsupported_debt_types',
  'all_debt_types',
  'debt_security',
  'debt_stage',
  'lawsuit_or_summons',
  'deadline_or_court_date',
  'default_judgment',
  'garnishment',
  'wages_or_bank_affected',

  'collector_calls',
  'workplace_calls',
  'family_or_friend_contact',
  'threats_or_abusive_language',
  'collector_behaviors',
  'validation_notice_status',
  'has_documents',
  'upload_intent',
  'collector_names',
  'user_description',

  'debts_json',
  'raw_answers_json'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const payload = parsePayload_(e);
    const sheet = getOrCreateSheet_();
    ensureHeaders_(sheet);

    const row = FIELDS.map((field) => normalizeCellValue_(payload[field]));
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, lead_id: payload.lead_id || '' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err && err.message ? err.message : err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'Credo Debt Leads endpoint' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Missing POST body.');
  }

  try {
    return JSON.parse(e.postData.contents);
  } catch (jsonErr) {
    // Fallback for form-encoded tests.
    const obj = {};
    if (e.parameter) {
      Object.keys(e.parameter).forEach((key) => {
        obj[key] = e.parameter[key];
      });
    }
    if (!Object.keys(obj).length) throw jsonErr;
    return obj;
  }
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  return sheet;
}

function ensureHeaders_(sheet) {
  const lastColumn = Math.max(sheet.getLastColumn(), FIELDS.length);
  const currentHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const hasHeaders = currentHeaders.some((value) => String(value || '').trim());

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, FIELDS.length).setValues([FIELDS]);
    sheet.setFrozenRows(1);
    return;
  }

  // If headers exist but differ, leave existing data intact and append any missing fields to the end.
  const existing = currentHeaders.map((value) => String(value || '').trim()).filter(Boolean);
  const missing = FIELDS.filter((field) => existing.indexOf(field) === -1);
  if (missing.length) {
    sheet.getRange(1, existing.length + 1, 1, missing.length).setValues([missing]);
  }
}

function normalizeCellValue_(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}
