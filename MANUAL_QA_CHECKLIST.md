# Manual QA Checklist

Use this checklist on a staging page before production launch. Record browser, device, date, tester, and pass/fail notes.

## Layout And Accessibility

- [ ] Desktop layout renders without overlapping text or controls.
- [ ] Mobile layout renders without horizontal scrolling.
- [ ] Header logo or fallback brand renders.
- [ ] Call button uses the configured phone number.
- [ ] Keyboard tab order reaches options, fields, Previous, Continue, Submit, and reset controls.
- [ ] Focus states are visible on buttons, options, inputs, selects, and links.
- [ ] Validation errors are visible and identify the field or option group to fix.

## Entry Gate

- [ ] `I Need Urgent Debt Help` path can continue.
- [ ] `Check My Debt Defense Options` path can continue.
- [ ] Continuing without selecting an entry option shows validation.

## Eligibility

- [ ] Allowed state can continue.
- [ ] Excluded states `DC`, `DE`, `ID`, `OK`, `WV`, and `WY` show the state eligibility note.
- [ ] Excluded state results route to `Not a Fit`.
- [ ] `Myself` can continue.
- [ ] `A family member` shows authorization question.
- [ ] Family path requires authorization answer.
- [ ] `A business` can continue but results route to `Not a Fit`.
- [ ] Optional ZIP accepts blank.
- [ ] Invalid ZIP shows validation.

## Debt Inventory

- [ ] One debt path works.
- [ ] Multiple debt path works.
- [ ] `6+ debts` creates six cards.
- [ ] Add another debt works up to the configured maximum.
- [ ] Remove debt works and never removes the last remaining card.
- [ ] Missing debt type shows validation.
- [ ] Missing amount shows validation.
- [ ] Missing secured/unsecured status shows validation.
- [ ] Missing stage shows validation.
- [ ] Missing document status shows validation.

## Debt Type Branches

- [ ] Credit Card + unsecured can route to `Qualified`.
- [ ] Medical + unsecured can route to `Qualified`.
- [ ] Payday Loans + unsecured can route to `Qualified`.
- [ ] Utilities + unsecured can route to `Qualified`.
- [ ] Auto Repossession shows the repossession question immediately after selection.
- [ ] Auto Repossession + already repossessed can route to review/qualified logic for possible deficiency balance.
- [ ] Supported debt + secured collateral routes to `Not a Fit` unless auto-repossession facts support review.
- [ ] Supported debt + unsure security routes to `Needs Review`.
- [ ] Student Loans only routes to `Not a Fit`.
- [ ] Tax only routes to `Not a Fit`.
- [ ] State or City Government only routes to `Not a Fit`.
- [ ] Tribal Debts only routes to `Not a Fit`.
- [ ] Child Support only routes to `Not a Fit`.
- [ ] Court Related only routes to `Not a Fit`.
- [ ] Other / Not Sure routes to `Needs Review`.
- [ ] Mixed supported and unsupported debts route to `Partially Qualified`.

## Urgency Logic

- [ ] Behind on payments contributes to priority.
- [ ] In collections contributes to priority.
- [ ] Collection notices contribute to priority.
- [ ] Collector calls contribute to priority.
- [ ] Lawsuit / summons branch shows lawsuit-specific result copy.
- [ ] Default judgment branch shows judgment-specific result copy.
- [ ] Garnishment branch shows garnishment-specific result copy.
- [ ] Wages or bank account affected branch shows garnishment/enforcement result copy.
- [ ] Not sure branch can continue and contributes to review/readiness logic.
- [ ] Deadline within 7 days raises priority.
- [ ] Debt validation notice answers are captured.

## Collector Behavior

- [ ] Repeated calls can be selected.
- [ ] Workplace calls can be selected.
- [ ] Family/friends/others contact can be selected.
- [ ] Threats can be selected.
- [ ] Abusive language can be selected.
- [ ] Threatening arrest/jail/criminal charges can be selected.
- [ ] Threatening garnishment without clear legal basis can be selected.
- [ ] Refusing to explain or verify the debt can be selected.
- [ ] Letters/notices only is mutually exclusive with aggressive behavior options.
- [ ] None of these is mutually exclusive with all other behavior options.
- [ ] Harassment/collector behavior result branch appears when appropriate.

## Upload Placeholder

- [ ] Collection letter / notice shows the simulated upload placeholder.
- [ ] Lawsuit / summons / court papers shows the simulated upload placeholder.
- [ ] Judgment papers shows the simulated upload placeholder.
- [ ] Garnishment or bank levy notice shows the simulated upload placeholder.
- [ ] Not sure document status shows the simulated upload placeholder.
- [ ] Upload button records upload intent.
- [ ] Placeholder copy clearly states no file is uploaded.

## Results Before Contact

- [ ] Results appear before name, phone, email, consent, or follow-up capture.
- [ ] Qualification status appears.
- [ ] Debt Defense Priority Level appears.
- [ ] Case Readiness Scorecard appears.
- [ ] Recommended next step appears.
- [ ] Missing information checklist appears.
- [ ] Copy avoids legal advice and outcome guarantees.
- [ ] Disclaimer says the tool does not create an attorney-client relationship.

## Delivery And Consent

- [ ] Text/SMS delivery shows phone and SMS consent.
- [ ] SMS delivery does not show WhatsApp consent.
- [ ] Email delivery shows email and does not show phone unless later follow-up requires it.
- [ ] Email delivery does not show SMS or WhatsApp consent.
- [ ] WhatsApp delivery shows phone and WhatsApp consent.
- [ ] WhatsApp delivery does not show SMS consent.
- [ ] Call delivery shows phone and no SMS/WhatsApp consent.
- [ ] First and last name are required.
- [ ] Invalid phone shows validation.
- [ ] Invalid email shows validation.
- [ ] Switching from SMS to another channel clears SMS consent in the payload.
- [ ] Switching from WhatsApp to another channel clears WhatsApp consent in the payload.

## Follow-Up Preference

- [ ] Call me now is available.
- [ ] Call me today is available.
- [ ] Schedule a call is available.
- [ ] Message me first is available.
- [ ] Email me first is available.
- [ ] Phone is requested if call/message follow-up is selected and no valid phone exists.
- [ ] Email is requested if email-first follow-up is selected and no valid email exists.

## Submission And Google Sheets

- [ ] Demo mode logs payload to browser console when `googleScriptUrl` is still the placeholder.
- [ ] Configured Apps Script URL receives the POST.
- [ ] Google Sheet creates `Credo Debt Leads` tab if missing.
- [ ] Google Sheet writes headers if missing.
- [ ] Google Sheet appends missing headers without deleting existing data.
- [ ] Submitted row includes `lead_id`, contact fields, qualification, urgency, readiness, debt details, and raw JSON.
- [ ] `sms_consent` is `Yes` only for SMS delivery with consent checked.
- [ ] `whatsapp_consent` is `Yes` only for WhatsApp delivery with consent checked.
- [ ] `debts_json` is valid JSON.
- [ ] `raw_answers_json` is valid JSON.

## Regression Smoke Paths

- [ ] Qualified path: NY, individual, one unsecured credit-card debt, collections/calls, SMS delivery, SMS consent, call today.
- [ ] Excluded-state path: DC, individual, unsecured credit-card debt, email delivery.
- [ ] Unsupported path: NY, individual, student loan only, email delivery.
- [ ] Secured path: NY, individual, secured non-auto debt, call delivery.
- [ ] Lawsuit path: NY, individual, unsecured credit-card debt, summons/lawsuit documents, urgent path.
- [ ] Garnishment path: NY, individual, unsecured debt, garnishment stage, call-now follow-up.
- [ ] WhatsApp path: NY, individual, unsecured medical debt, WhatsApp delivery, WhatsApp consent.
