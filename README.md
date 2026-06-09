# Credo Legal Debt Defense Action Snapshot Widget

Plain HTML/CSS/JS embeddable intake widget for Credo Legal, plus a Google Apps Script endpoint that writes lead submissions to Google Sheets.

The widget is designed to be pasted into a normal website. It does not require React, Next.js, a bundler, or third-party tracking.

## Files

- `credo-debt-defense-widget.html` - self-contained widget embed.
- `google-apps-script.gs` - Google Apps Script web app endpoint for Google Sheets.
- `MANUAL_QA_CHECKLIST.md` - manual test paths for launch review.
- `CODEX_TASK_PROMPT.md` and `AGENTS.md` - implementation context and guardrails.

## Business Logic Included

- Individuals only. Business debt is marked as not a fit.
- Supported debt types:
  - Credit Card
  - Medical
  - Payday Loans
  - Utilities
  - Auto Repossession, only when it appears to be a post-repossession deficiency or unsecured balance
- Unsupported debt types:
  - Student Loans
  - Tax
  - State or City Government
  - Tribal Debts
  - Child Support
  - Court Related
- Unsecured debt qualification is preserved.
- Excluded-state configuration is centralized in `CONFIG.excludedStates` and defaults to:
  - `DC`
  - `DE`
  - `ID`
  - `OK`
  - `WV`
  - `WY`

The widget does not hard-block users from submitting. It routes unsupported, excluded-state, secured, or business-debt answers to `Not a Fit`, `Needs Review`, or `Partially Qualified` as appropriate.

## Debt Defense Snapshot Reporting

The widget now produces a two-level `Debt Defense Snapshot` experience:

- `Your Quick Debt Defense Summary` appears on the website before name, phone, email, consent, or follow-up capture.
- `Your Full Debt Defense Snapshot` is generated client-side after the assessment and submitted to Google Sheets with the lead payload.

The Quick Summary includes:

- Snapshot ID in `CL-DF-12345` format.
- Generated date/time.
- Entry path.
- Debt Defense Priority Level.
- Situation Type.
- Case Readiness Score.
- Top 3 Findings.
- Recommended next step.
- Preview of the full Snapshot sections.

The report screen now uses a conversion-focused layout based on the branded report-screen mockup. It is still fully dynamic and uses the generated Snapshot data, scores, situation type, risk flags, and document checklist. The screen includes:

- Sticky report CTA bar with Snapshot ID, `Call Now - Free Explanation`, and `Send My Full Snapshot`.
- Hero summary with dynamic urgency/situation copy.
- Snapshot overview cards for Situation Type, Readiness Score, and Status.
- Top Findings and highest-priority Risk Flag cards.
- Full Snapshot preview card.
- What to Prepare document checklist card.
- Desktop sticky side CTA card.
- Bottom CTA section.

Report CTAs:

- `Call Now for a Free Explanation` uses `CONFIG.phoneHref`.
- `Request a Callback` routes to contact capture with phone/call delivery selected.
- `Send Me My Full Snapshot` routes to the Full Snapshot delivery capture screen.

The call copy is intentionally framed as a free explanation or free intake service, not free legal advice or a guaranteed legal outcome.

Before the report screen appears, the widget can show a branded simulated preparation loader for about 4.6 seconds. This is controlled by `CONFIG.reportLoaderEnabled`, `CONFIG.reportLoaderDurationMs`, and `CONFIG.reportLoaderMaxDurationMs`. The loader prepares the already-generated Snapshot view, shows sequential intake-safe steps, and does not submit data or imply attorney review, AI legal analysis, violations, guaranteed outcomes, or legal advice.

Loader copy adapts by branch where possible:

- Urgent paths mention urgent debt-help answers and possible lawsuit, judgment, garnishment, deadline, or document-review indicators.
- Lawsuit/summons paths mention court paper and deadline indicators.
- Garnishment paths mention wage, bank, or garnishment indicators.
- Collector-contact paths mention collector contact patterns and call log preparation.
- Not-a-fit paths use neutral intake-fit language.

The Full Debt Defense Snapshot includes:

- Snapshot Header.
- Situation Summary.
- Debt Defense Priority Level.
- Credo Legal Fit Check.
- Potential Risk Flags.
- Collector Behavior Review with call log template.
- Document Checklist.
- Case Readiness Scorecard.
- Suggested Next 3 Steps.
- Common Mistakes to Avoid.
- Important Disclaimer.

The full report is generated in the browser and captured in Google Sheets as both text and JSON. The widget does not send real SMS, email, or WhatsApp messages by default. `CONFIG.actualDeliveryEnabled` defaults to `false`, so confirmation copy says the request was submitted and the Snapshot is saved for follow-up. To add real delivery later, connect an approved SMS/email/WhatsApp provider on the server side or through a secure backend workflow, then update `actualDeliveryEnabled` and related delivery copy only after compliance review.

## User Flows

The entry buttons intentionally route into different flows. The urgent path is a direct call/callback request and does not show the Snapshot loader, report screen, full assessment, or delivery capture. The normal options path keeps the full Debt Defense Snapshot assessment.

### Urgent Debt Help

Entry path value submitted to Google Sheets:

```text
urgent_debt_help
```

1. Entry gate:
   - `Collectors Are Escalating — I Need Urgent Debt Help`
2. Urgent Debt Help Request page:
   - `Call Now for Urgent Debt Help`
   - `Request an Immediate Callback`
3. Short urgent callback form:
   - First name
   - Phone number
   - State
   - Total debt amount
   - Debt type multi-select
   - Secured/unsecured status
   - Optional urgent situation checkboxes
4. Submit urgent callback request to Google Sheets.
5. Dedicated urgent thank-you page:
   - Repeats `Call Now for Urgent Debt Help`
   - Reminds the user to keep collection letters, court papers, garnishment notices, or creditor information available.

Urgent submissions set `urgent_direct_request = Yes`, `urgent_callback_requested = Yes`, `snapshot_requested = No`, `full_snapshot_requested = No`, and `report_loader_shown = No`.

### Normal Debt Defense Options Assessment

Entry path value submitted to Google Sheets:

```text
debt_defense_options_check
```

1. Entry gate:
   - `Show Me My Debt Defense Options`
2. Eligibility:
   - State
   - ZIP, optional
   - Individual/family/business routing
3. Debt count:
   - 1 debt
   - 2 debts
   - 3-5 debts
   - 6+ debts
   - Not sure
4. Debt inventory:
   - One or multiple debts
   - Debt type
   - Amount range
   - Secured/unsecured status
   - Stage
   - Document status
   - Creditor/collector name
5. Urgency and collector behavior:
   - Deadline/court/judgment/garnishment indicators
   - Debt validation notice status
   - Collector behavior selections
   - Simulated upload placeholder
6. Snapshot preparation loader, if enabled.
7. Quick Summary before contact capture:
   - Snapshot ID
   - Situation Type
   - Debt Defense Priority Level
   - Case Readiness Scorecard
   - Top 3 Findings
   - Full Snapshot preview
8. Full Snapshot delivery:
   - Text/SMS
   - Email
   - WhatsApp
   - Call
9. Contact and consent:
   - Phone is shown only when the selected delivery or follow-up choice needs it.
   - Email is shown only when the selected delivery or follow-up choice needs it.
   - SMS consent appears only for SMS delivery.
   - WhatsApp consent appears only for WhatsApp delivery.
10. Follow-up preference:
   - Call me now
   - Call me today
   - Schedule a call
   - Message me first
   - Email me first
11. Submit to Google Sheets through Google Apps Script.

If a normal options assessment user later selects lawsuit, judgment, garnishment, or bank/wage impact, the urgency score can still become High or Critical. The user remains in the normal assessment path unless a future product decision adds an explicit jump-to-urgent transition.

## Configure the Widget

Open `credo-debt-defense-widget.html` and edit the `CONFIG` block:

```js
var CONFIG = {
  widgetVersion: "1.7.0",
  googleScriptUrl: "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE",
  phoneDisplay: "(718) 865-8350",
  phoneHref: "tel:+17188658350",
  privacyUrl: "https://credolegal.com/privacy-policy",
  termsUrl: "https://credolegal.com/term-of-service",
  excludedStates: ["DC", "DE", "ID", "OK", "WV", "WY"],
  logoUrl: "https://cdn.prod.website-files.com/6903ad8d7b4674d0123baecd/6903af5ee5e121af84994b38_Credo%20Logo%20Red.png",
  maxDebtCards: 12,
  maxDescriptionChars: 2000,
  actualDeliveryEnabled: false,
  reportLoaderEnabled: true,
  reportLoaderDurationMs: 4600,
  reportLoaderMaxDurationMs: 7000,
  tracking: {
    enabled: false,
    dataLayerName: "dataLayer",
    eventPrefix: "credo_debt_widget_"
  }
};
```

Required production edit:

- Replace `googleScriptUrl` with the deployed Google Apps Script web app URL.

Optional edits:

- Update phone number, privacy URL, terms URL, or logo URL.
- Update `excludedStates` only if business rules change.
- Keep `actualDeliveryEnabled` as `false` until real SMS/email/WhatsApp delivery is connected and approved.
- Set `reportLoaderEnabled` to `false` if the report should appear immediately after the assessment.
- Adjust `reportLoaderDurationMs` only if product wants a shorter or longer simulated preparation moment; keep `reportLoaderMaxDurationMs` as a safe cap.
- Leave `tracking.enabled` as `false` unless the website already has an approved `dataLayer` plan.

## Google Sheets Setup

1. Create a Google Sheet.
2. Open `Extensions > Apps Script`.
3. Paste the contents of `google-apps-script.gs` into `Code.gs`.
4. Leave `SPREADSHEET_ID` blank if the script is bound to that sheet.
5. If using a standalone Apps Script project, set:

```js
const SPREADSHEET_ID = "YOUR_GOOGLE_SHEET_ID";
```

6. Save the project.
7. Click `Deploy > New deployment`.
8. Select `Web app`.
9. Set `Execute as` to `Me`.
10. Set `Who has access` to `Anyone`.
11. Deploy and copy the web app URL.
12. Paste that URL into `CONFIG.googleScriptUrl`.

The script creates or reuses a tab named `Credo Debt Leads`, writes headers, appends missing headers if the payload changes, and aligns each row to the current sheet headers.

## Embed Instructions

1. Open `credo-debt-defense-widget.html`.
2. Confirm `CONFIG.googleScriptUrl` is set.
3. Paste the full file contents into the target page where the widget should appear.
4. If the website has a CMS custom-code block, paste the whole block into that block.
5. Publish to a staging page first.
6. Run the manual QA checklist before launch.

## Local Testing

Because the widget is plain HTML/CSS/JS, it can be opened directly in a browser:

```bash
open credo-debt-defense-widget.html
```

For a local web-server test:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/credo-debt-defense-widget.html
```

If `googleScriptUrl` is still the placeholder, submissions run in demo mode and log the payload to the browser console instead of posting to Google Sheets.

## Google Apps Script Testing

1. Deploy the Apps Script web app.
2. Open the web app URL in a browser.
3. Confirm it returns JSON similar to:

```json
{ "ok": true, "service": "Credo Debt Leads endpoint" }
```

4. Submit a test lead from the widget.
5. Confirm a row appears in the `Credo Debt Leads` sheet.
6. Confirm these fields are populated:
   - `lead_id`
   - `snapshot_id`
   - `entry_path`
   - `urgent_branch`
   - `situation_type`
   - `qualification_status`
   - `urgency_level`
   - `readiness_score`
   - `quick_summary_text`
   - `full_report_text`
   - `risk_flags_json`
   - `document_checklist_json`
   - `suggested_next_steps_json`
   - `urgent_direct_request`
   - `snapshot_requested`
   - `urgent_callback_requested`
   - `callback_consent`
   - `report_loader_shown`
   - `report_screen_viewed`
   - `call_cta_clicked`
   - `callback_cta_clicked`
   - `send_snapshot_cta_clicked`
   - `delivery_channel`
   - `follow_up_preference`
   - `debts_json`
   - `raw_answers_json`

Important: the widget uses `fetch(..., { mode: "no-cors" })` for Google Apps Script compatibility. The browser cannot read the Apps Script response, so the widget treats the request as submitted if the network request does not throw.

## Manual QA

Use `MANUAL_QA_CHECKLIST.md` for the full checklist. Minimum launch smoke tests:

- Mobile and desktop layout.
- Tablet report layout around 768-900px.
- Mobile header, forms, delivery capture, report screen, loader, and footer with no horizontal scrolling.
- Urgent CTA opens `Urgent Debt Help Request`, not the Snapshot assessment.
- Urgent callback submit goes directly to urgent thank-you and submits `urgent_direct_request = Yes`.
- Excluded state routes to `Not a Fit`.
- Business debt routes to `Not a Fit`.
- Supported unsecured debt routes to `Qualified`.
- Unsupported-only debt routes to `Not a Fit`.
- Supported debt with unsure security routes to `Needs Review`.
- Lawsuit, judgment, and garnishment branches appear in the Quick Summary and Full Snapshot.
- Snapshot preparation loader appears before the report when enabled.
- Loader copy is branch-aware, intake-safe, and does not imply legal advice or attorney review.
- Loader transitions automatically to the report and does not submit the lead.
- Report screen shows the sticky CTA bar, hero, overview cards, top findings, primary risk flag, Full Snapshot preview, What to Prepare card, side CTA, and bottom CTA.
- Call CTA uses the configured `tel:` link and does not submit the form.
- Send Snapshot CTA routes to `Where should we send your Full Debt Defense Snapshot?`.
- Request Callback CTA routes to contact capture with phone/call delivery selected.
- Upload placeholder appears for letters/notices, court papers, garnishment documents, or unsure documents.
- Quick Summary appears before name/contact capture.
- Full Snapshot preview appears before contact capture.
- Full report text and JSON are submitted to Google Sheets.
- SMS consent appears only for SMS.
- WhatsApp consent appears only for WhatsApp.
- Google Sheet receives a complete payload.

## Compliance Notes

Current legal/disclaimer, SMS consent, WhatsApp consent, attorney-advertising, and privacy/terms copy are placeholders and should be reviewed by counsel before production launch.

The widget uses cautious language and does not promise outcomes, provide legal advice, claim a collector can definitely be stopped, or say the user definitely has or does not have a claim.

## Production Risks To Review

- Final legal and advertising disclaimer copy.
- Final SMS and WhatsApp consent language.
- Final Quick Summary and Full Debt Defense Snapshot legal/disclaimer language.
- Final Snapshot preparation loader copy.
- Whether the excluded-state list is current.
- Whether auto-repossession wording accurately reflects Credo Legal intake criteria.
- Whether a real secure upload provider should replace the simulated upload placeholder.
- Whether Google Sheets remains sufficient for lead handling, access control, retention, and privacy requirements.
- Whether the `Call Now for a Free Explanation` and `free intake service` phrasing is approved for production use.
