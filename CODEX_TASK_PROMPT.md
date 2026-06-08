# Codex Task Prompt — Credo Legal Debt Defense Options Check Widget

You are working on a production-ready embeddable website widget for Credo Legal.

## Project context

Credo Legal is a New York law firm serving individuals in the USA with unsecured consumer debt issues. The current MVP is a plain HTML/CSS/JS embed widget plus a Google Apps Script endpoint that writes leads into Google Sheets.

The widget must remain suitable for direct website embedding. Do not convert it into a framework-only app unless you also preserve a final single-file or simple embed output.

## Core business requirements

Build and polish a dynamic multi-step intake widget for consumer debt leads.

Primary audience: individuals dealing with debt collection, credit card debt, medical debt, payday loan debt, utilities debt, or auto repossession deficiency issues.

Credo Legal supports only individuals, not business debt.

Supported debt types, all high-value leads:
- Credit Card
- Medical
- Payday Loans
- Utilities
- Auto Repossession, only when it looks like a post-repossession deficiency or unsecured balance

Unsupported / disqualified debt types:
- Student Loans
- Tax
- State or City Government
- Tribal Debts
- Child Support
- Court Related

Credo Legal works with unsecured debts only.

Excluded-state configuration must stay in the code and must default to:
- DC
- DE
- ID
- OK
- WV
- WY

Do not remove this configuration. Keep it easy to edit.

## Required user flow

The user flow must be:

1. Entry gate with two options:
   - “I Need Urgent Debt Help”
   - “Check My Debt Defense Options”

2. Qualification gate:
   - State eligibility with excluded states
   - Individual vs business
   - Supported vs unsupported debt type
   - Unsecured vs secured

3. Debt inventory:
   - Ask if user has one or multiple debts
   - Collect debt type, amount, stage, secured/unsecured status, document status, and collector/creditor name for each relevant debt

4. Stage and urgency logic:
   - Behind on payments
   - In collections
   - Receiving collection notices
   - Receiving collector calls
   - Served with lawsuit / summons
   - Default judgment
   - Garnishment
   - Bank account or wages affected
   - Not sure

5. Collector behavior / harassment logic:
   - Repeated calls
   - Workplace calls
   - Contacting family/friends/others
   - Threats
   - Abusive language
   - Threatening arrest/jail/criminal charges
   - Threatening garnishment without clear legal basis
   - Refusing to explain or verify the debt
   - Letters/notices only
   - None of these

6. Document and upload-first logic:
   - If user has a letter, notice, summons, judgment, garnishment paper, or cannot explain the issue, show an upload-first prompt
   - Upload must stay simulated for now
   - Do not implement real file upload unless clearly isolated behind a placeholder function/config

7. Results screen before contact capture:
   - Qualification status
   - Debt Defense Priority Level
   - Case Readiness Scorecard
   - Recommended next step
   - Missing information checklist

8. Results delivery step:
   - “Text me the results”
   - “Email me the results”
   - “Send via WhatsApp”
   - “Call me with the results”

9. Contact details and consent:
   - Ask for phone only when needed
   - Ask for email only when needed
   - Show SMS consent only when SMS/text is selected
   - Show WhatsApp consent only when WhatsApp is selected
   - Include placeholder legal disclaimer copy

10. Follow-up preference:
   - Call me now
   - Call me today
   - Schedule a call
   - Message me first
   - Email me first

11. Submit to Google Sheet through Google Apps Script.

## Scoring requirements

Keep two separate scores:

### Debt Urgency Score, 0–100

It should consider:
- Lawsuit / summons
- Default judgment
- Garnishment
- Wage/bank impact
- Deadline / court date
- Validation notice timing
- Collector behavior
- Debt amount
- Multiple-debt complexity

Levels:
- 0–24: Low Priority
- 25–49: Moderate Priority
- 50–74: High Priority
- 75–100: Critical Priority

### Case Readiness Score, 0–100

It should consider:
- Supported debt type identified
- Unsecured debt confirmed
- Debt amount provided
- Number of debts provided
- Stage identified
- Collector/creditor name provided
- Document/notice/summons/judgment/letter availability
- Date/deadline/court date known
- Collector behavior described
- Result delivery channel selected

Levels:
- 0–30: Needs More Information
- 31–60: Partially Ready
- 61–80: Ready for Initial Review
- 81–100: High-Readiness Case

## Qualification status requirements

Use these statuses:
- Qualified
- Partially Qualified
- Needs Review
- Not a Fit

Do not hard-block submissions unless the UI copy makes it clear and still lets the user send results or request a low-priority review.

## Google Sheet payload requirements

The submitted payload should include, at minimum:
- created_at
- lead_id
- entry_path
- first_name
- last_name
- phone
- email
- state
- state_name
- zip
- delivery_channel
- follow_up_preference
- sms_consent
- whatsapp_consent
- person_type
- authorized_for_other
- qualification_status
- qualification_reasons
- urgency_score
- urgency_level
- readiness_score
- readiness_level
- recommended_next_action
- number_of_debts
- total_estimated_debt
- largest_debt_amount
- supported_debt_types
- unsupported_debt_types
- all_debt_types
- debt_security
- debt_stage
- lawsuit_or_summons
- deadline_or_court_date
- default_judgment
- garnishment
- wages_or_bank_affected
- collector_calls
- workplace_calls
- family_or_friend_contact
- threats_or_abusive_language
- collector_behaviors
- validation_notice_status
- has_documents
- upload_intent
- collector_names
- user_description
- debts_json
- raw_answers_json

## Existing files

You should review these files first:
- `credo-debt-defense-widget.html`
- `google-apps-script.gs`
- `README.md`

## What I want you to do

1. Review the current MVP code for bugs, broken branches, validation gaps, state-management issues, and Google Apps Script submission issues.
2. Preserve the business logic above unless you find a clear bug or conflict.
3. Make the widget production-ready while keeping it plain embeddable HTML/CSS/JS.
4. Improve mobile responsiveness and UX polish.
5. Add strong client-side validation without making the flow feel heavy.
6. Make configuration easy to edit in one place.
7. Keep the upload flow simulated, clearly marked as a placeholder.
8. Keep all disclaimers and legal/SMS/WhatsApp consent copy as placeholders that can be reviewed by counsel before launch.
9. Keep tracking optional. Do not add required third-party tracking code.
10. Improve README with setup, Google Sheet deployment, testing steps, and embed instructions.
11. Create a concise manual QA checklist covering all major branches.
12. Run whatever tests or local checks are reasonable in the environment and summarize what passed/failed.

## Important copy and compliance guardrails

Do not promise outcomes.
Do not say Credo Legal can definitely stop collectors.
Do not provide legal advice.
Do not say a person definitely has or does not have a claim.
Use careful language such as:
- “may”
- “could”
- “may require review”
- “your exact options depend on your documents and situation”
- “this does not create an attorney-client relationship”

## Deliverables

Please provide:
1. Updated production-ready widget file.
2. Updated Google Apps Script file if needed.
3. Updated README.
4. Manual QA checklist.
5. Summary of changes.
6. Any remaining risks or items that require legal review.

## Definition of done

The task is complete when:
- The widget can be embedded as plain HTML/CSS/JS.
- The flow works on mobile and desktop.
- All required branches are reachable.
- Excluded states are handled.
- Unsupported debt types are routed to Not a Fit or Needs Review.
- Unsecured debt qualification is preserved.
- Results are shown before contact capture.
- SMS consent appears only for SMS/text delivery.
- WhatsApp consent appears only for WhatsApp delivery.
- Google Sheet submission has a clear setup path.
- README explains exactly how to deploy and test.
