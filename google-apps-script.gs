/**
 * Credo Legal Debt Defense Options Check -> Google Sheets endpoint
 *
 * Setup:
 * 1) Create a new Google Sheet.
 * 2) Open Extensions -> Apps Script.
 * 3) Paste this file into Code.gs.
 * 4) Save.
 * 5) Deploy -> New deployment -> Web app.
 * 6) Execute as: Me.
 * 7) Who has access: Anyone.
 * 8) Copy the Web App URL and paste it into CONFIG.googleScriptUrl in the widget.
 */

const SPREADSHEET_ID = '';
const SHEET_NAME = 'Credo Debt Leads';

const FIELDS = [
  'created_at',
  'lead_id',
  'snapshot_id',
  'widget_version',
  'page_url',
  'referrer',
  'entry_path',
  'urgent_direct_request',
  'snapshot_requested',
  'urgent_callback_requested',
  'callback_consent',
  'urgent_branch',
  'urgent_events',
  'situation_type',
  'quick_summary_text',
  'quick_summary_json',
  'full_report_text',
  'full_report_json',
  'risk_flags_json',
  'document_checklist_json',
  'suggested_next_steps_json',
  'common_mistakes_json',
  'readiness_helped_json',
  'readiness_missing_json',
  'collector_call_log_template_included',
  'full_snapshot_requested',
  'full_snapshot_delivery_channel',
  'actual_delivery_enabled',
  'report_loader_shown',
  'report_screen_viewed',
  'call_cta_clicked',
  'callback_cta_clicked',
  'send_snapshot_cta_clicked',
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
  'disqualification_reason',
  'excluded_state_flag',
  'individual_or_business',
  'urgency_score',
  'urgency_level',
  'readiness_score',
  'readiness_level',
  'recommended_next_action',

  'debt_count',
  'number_of_debts',
  'total_estimated_debt',
  'largest_debt_amount',
  'supported_debt_types',
  'unsupported_debt_types',
  'debt_types',
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
  let hasLock = false;

  try {
    lock.waitLock(10000);
    hasLock = true;

    const payload = parsePayload_(e);
    const sheet = getOrCreateSheet_();
    const headers = ensureHeaders_(sheet);

    const row = headers.map((field) => normalizeCellValue_(payload[field]));
    sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length).setValues([row]);

    return json_({ ok: true, lead_id: payload.lead_id || '' });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  } finally {
    if (hasLock) lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, service: 'Credo Debt Leads endpoint' });
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Missing POST body.');
  }

  try {
    const payload = JSON.parse(e.postData.contents);
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      throw new Error('POST body must be a JSON object.');
    }
    return payload;
  } catch (jsonErr) {
    // Fallback for form-encoded tests.
    const obj = {};
    if (e.parameter) {
      if (e.parameter.payload) {
        const nestedPayload = JSON.parse(e.parameter.payload);
        if (!nestedPayload || typeof nestedPayload !== 'object' || Array.isArray(nestedPayload)) {
          throw new Error('payload parameter must be a JSON object.');
        }
        return nestedPayload;
      }
      Object.keys(e.parameter).forEach((key) => {
        obj[key] = e.parameter[key];
      });
    }
    if (!Object.keys(obj).length) throw jsonErr;
    return obj;
  }
}

function getOrCreateSheet_() {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  return sheet;
}

function getSpreadsheet_() {
  if (SPREADSHEET_ID) return SpreadsheetApp.openById(SPREADSHEET_ID);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('No active spreadsheet found. Bind this script to a Google Sheet or set SPREADSHEET_ID.');
  }
  return ss;
}

function ensureHeaders_(sheet) {
  const headerWidth = Math.max(sheet.getLastColumn(), 1);
  const currentHeaders = sheet.getRange(1, 1, 1, headerWidth).getValues()[0]
    .map((value) => String(value || '').trim());
  const hasHeaders = currentHeaders.some((value) => String(value || '').trim());

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, FIELDS.length).setValues([FIELDS]);
    sheet.setFrozenRows(1);
    return FIELDS.slice();
  }

  // If headers exist but differ, leave existing data intact and append any missing fields to the end.
  const existing = currentHeaders.filter(Boolean);
  const missing = FIELDS.filter((field) => existing.indexOf(field) === -1);
  if (missing.length) {
    sheet.getRange(1, currentHeaders.length + 1, 1, missing.length).setValues([missing]);
  }
  return currentHeaders.concat(missing);
}

function normalizeCellValue_(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
