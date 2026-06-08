# Credo Legal Debt Defense Options Check Widget

This package contains a plain embed widget and a Google Apps Script endpoint for a Google Sheet MVP.

## Files

- `credo-debt-defense-widget.html` — self-contained HTML/CSS/JS widget. Paste this into the website where the form should appear.
- `google-apps-script.gs` — Google Apps Script endpoint that writes submissions into Google Sheets.

## Current business logic included

- Two-entry gate:
  - `I Need Urgent Debt Help`
  - `Check My Debt Defense Options`
- Early state eligibility check with excluded states kept as configuration:
  - `DC, DE, ID, OK, WV, WY`
- Individuals only / business debt disqualification logic.
- Supported debt types:
  - Credit Card
  - Medical
  - Payday Loans
  - Utilities
  - Auto Repossession
- Unsupported debt types:
  - Student Loans
  - Tax
  - State or City Government
  - Tribal Debts
  - Child Support
  - Court Related
- Unsecured debt qualification gate.
- Multiple debt capture with type, amount, security, stage, document status, and creditor/collector name for each debt.
- Urgency scoring based on:
  - lawsuit/summons
  - default judgment
  - garnishment
  - wage/bank impact
  - deadlines/court dates
  - validation notice status
  - collector behavior
  - debt amount
  - number of debts
- Case Readiness Scorecard.
- Simulated upload-first prompt.
- Results-before-contact flow.
- SMS consent appears only when SMS delivery is selected.
- WhatsApp consent appears only when WhatsApp delivery is selected.

## Google Sheets setup

1. Create a new Google Sheet.
2. Click `Extensions → Apps Script`.
3. Paste the contents of `google-apps-script.gs` into `Code.gs`.
4. Save the project.
5. Click `Deploy → New deployment`.
6. Select type: `Web app`.
7. Set `Execute as` to `Me`.
8. Set `Who has access` to `Anyone`.
9. Deploy and copy the Web App URL.
10. Open `credo-debt-defense-widget.html`.
11. Replace:

```js
const CONFIG = {
  googleScriptUrl: "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE",
  ...
}
```

with your deployed Web App URL.

## Important production notes

- The widget uses `fetch(..., { mode: "no-cors" })` for Google Apps Script compatibility. The browser cannot read the response, so successful posting is assumed if the network request does not throw.
- The upload step is intentionally simulated. Replace the upload placeholder with your real upload tool later.
- Disclaimer, SMS consent, WhatsApp consent, and attorney-advertising copy are placeholders and should be reviewed before production.
- The excluded-state list is stored in one place inside `CONFIG.excludedStates`.
- Tracking events are not included because they were not required for this MVP.

## Main configuration block

Inside `credo-debt-defense-widget.html`:

```js
var CONFIG = {
  googleScriptUrl: "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE",
  phoneDisplay: "(718) 865-8350",
  phoneHref: "tel:+17188658350",
  privacyUrl: "https://credolegal.com/privacy-policy",
  termsUrl: "https://credolegal.com/term-of-service",
  excludedStates: ["DC", "DE", "ID", "OK", "WV", "WY"],
  logoUrl: "https://cdn.prod.website-files.com/6903ad8d7b4674d0123baecd/6903af5ee5e121af84994b38_Credo%20Logo%20Red.png"
};
```
