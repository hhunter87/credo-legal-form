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

- [ ] Clicking `I Need Urgent Debt Help` starts the urgent path with `entry_path = urgent_debt_help`.
- [ ] Clicking `Check My Debt Defense Options` starts the normal path with `entry_path = debt_defense_options_check`.
- [ ] The two entry buttons do not route into the same main step sequence.

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

## Urgent Triage Flow

- [ ] Urgent path asks basic eligibility first: state and individual/family/business routing.
- [ ] After urgent eligibility, the first major question is `What is happening right now?`
- [ ] Urgent triage includes lawsuit/summons/court papers.
- [ ] Urgent triage includes deadline, court date, or hearing date.
- [ ] Urgent triage includes default judgment.
- [ ] Urgent triage includes wage garnishment.
- [ ] Urgent triage includes bank account or wages already affected.
- [ ] Urgent triage includes repeated collector calls.
- [ ] Urgent triage includes workplace calls.
- [ ] Urgent triage includes family/friend/other contact.
- [ ] Urgent triage includes threats or abusive language.
- [ ] Urgent triage includes letters/notices that are not understood.
- [ ] Urgent triage includes not sure but has documents.
- [ ] Urgent triage includes none of these / not sure.
- [ ] Urgent path does not show the full `How many debts do you want reviewed?` inventory as the first branch-specific question.

## Urgent Branch Modules

- [ ] Urgent lawsuit/summons selection shows `Do not ignore court papers` copy.
- [ ] Urgent lawsuit/summons asks when papers were received.
- [ ] Urgent lawsuit/summons asks whether papers mention a response deadline, court date, or hearing date.
- [ ] Urgent lawsuit/summons asks whether papers are available.
- [ ] Urgent lawsuit/summons can produce High or Critical urgency.
- [ ] Urgent default judgment selection shows judgment-specific copy.
- [ ] Urgent default judgment asks for judgment copy, judgment date knowledge, and wage/bank impact.
- [ ] Urgent garnishment/bank-wage selection shows active collection enforcement copy.
- [ ] Urgent garnishment/bank-wage asks about wages, bank account, and paperwork.
- [ ] Urgent garnishment/bank-wage can produce Critical urgency.
- [ ] Urgent collector workplace calls/threats route to the collector harassment branch.
- [ ] Urgent collector harassment asks collector behavior details.
- [ ] Urgent collector harassment can produce Moderate or High urgency depending on severity.
- [ ] Urgent not-sure/document path shows the simulated upload placeholder when documents are available or uncertain.
- [ ] Urgent compact qualification asks debt type, secured/unsecured status, amount, and one/multiple/not sure.
- [ ] Urgent compact qualification does not require detailed per-debt cards before results.

## Normal Debt Inventory

- [ ] One debt path works.
- [ ] Multiple debt path works.
- [ ] `3-5 debts` starts with three cards.
- [ ] `6+ debts` creates six cards.
- [ ] `Not sure` starts with one card and can continue after required debt details are entered.
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

## Quick Summary Before Contact

- [ ] `Your Quick Debt Defense Summary` appears before name, phone, email, consent, or follow-up capture.
- [ ] Snapshot ID appears in `CL-DF-12345` format.
- [ ] Generated date/time appears.
- [ ] Entry path appears.
- [ ] Qualification status appears.
- [ ] Debt Defense Priority Level appears.
- [ ] Case Readiness Scorecard appears.
- [ ] Situation Type appears.
- [ ] Top 3 Findings appear.
- [ ] Recommended next step appears.
- [ ] Full Snapshot preview appears.
- [ ] Full Snapshot preview includes priority level, risk flags, document checklist, collector behavior review, case readiness breakdown, suggested next steps, and Snapshot ID.
- [ ] Main CTA says `Send Me My Full Debt Defense Snapshot` or a channel-specific Full Snapshot variant.
- [ ] Copy avoids legal advice and outcome guarantees.
- [ ] Disclaimer says the tool does not create an attorney-client relationship.
- [ ] Critical urgent result shows `Call Credo Legal Now` before lower-priority CTAs.
- [ ] Critical urgent result shows `Request an Immediate Callback`.
- [ ] Critical urgent result shows `Text Me My Full Snapshot` and `Email Me My Full Snapshot`.
- [ ] High urgent result shows `Request a Callback Today`.
- [ ] Moderate/Low urgent result prioritizes sending the Full Snapshot, scheduling a call, message-first, or email-first follow-up.
- [ ] Business or otherwise `Not a Fit` urgent result does not show aggressive urgent legal CTAs.

## Full Debt Defense Snapshot Report

- [ ] Full report is generated client-side after assessment.
- [ ] Full report includes Snapshot Header.
- [ ] Full report includes Situation Summary.
- [ ] Full report includes Debt Defense Priority Level.
- [ ] Full report includes Credo Legal Fit Check.
- [ ] Full report includes Potential Risk Flags.
- [ ] Full report includes Collector Behavior Review.
- [ ] Full report includes Document Checklist.
- [ ] Full report includes Case Readiness Scorecard.
- [ ] Full report includes Suggested Next 3 Steps.
- [ ] Full report includes Common Mistakes to Avoid.
- [ ] Full report includes Important Disclaimer.
- [ ] Lawsuit path risk flags include lawsuit/court papers and deadline when selected.
- [ ] Lawsuit path document checklist includes summons, complaint, court name, date served, response deadline, and hearing date.
- [ ] Garnishment path risk flags include garnishment or wage/bank impact.
- [ ] Garnishment path document checklist includes garnishment notice, employer notice, bank notice, court order if available, and date affected.
- [ ] Collector harassment path risk flags include workplace calls and/or threats when selected.
- [ ] Collector Behavior Review includes selected behaviors when collector behavior was reported.
- [ ] Collector Call Log Template is included.
- [ ] Unsupported-only path still produces useful fit explanation without aggressive legal CTAs.

## Delivery And Consent

- [ ] Delivery screen asks `Where should we send your Full Debt Defense Snapshot?`
- [ ] Delivery option says `Text me my full snapshot`.
- [ ] Delivery option says `Email me my full snapshot`.
- [ ] Delivery option says `Send it via WhatsApp`.
- [ ] Delivery option says `Call me with my results`.
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
- [ ] Submitted row includes `snapshot_id`.
- [ ] Submitted row includes `situation_type`.
- [ ] Submitted row includes `quick_summary_text`.
- [ ] Submitted row includes `quick_summary_json`.
- [ ] Submitted row includes `full_report_text`.
- [ ] Submitted row includes `full_report_json`.
- [ ] Submitted row includes `risk_flags_json`.
- [ ] Submitted row includes `document_checklist_json`.
- [ ] Submitted row includes `suggested_next_steps_json`.
- [ ] Submitted row includes `common_mistakes_json`.
- [ ] Submitted row includes `readiness_helped_json`.
- [ ] Submitted row includes `readiness_missing_json`.
- [ ] Submitted row includes `collector_call_log_template_included`.
- [ ] Submitted row includes `full_snapshot_requested`.
- [ ] Submitted row includes `full_snapshot_delivery_channel`.
- [ ] Submitted row includes `actual_delivery_enabled`.
- [ ] Submitted row includes `entry_path`.
- [ ] Submitted row includes `urgent_branch`.
- [ ] Submitted row includes `urgent_events`.
- [ ] Submitted row includes `disqualification_reason`.
- [ ] Submitted row includes `excluded_state_flag`.
- [ ] Submitted row includes `individual_or_business`.
- [ ] Submitted row includes `debt_count` and `debt_types`.
- [ ] Normal options path submits blank `urgent_branch` unless lawsuit, judgment, garnishment, bank/wage impact, or collector harassment answers trigger escalation.
- [ ] `sms_consent` is `Yes` only for SMS delivery with consent checked.
- [ ] `whatsapp_consent` is `Yes` only for WhatsApp delivery with consent checked.
- [ ] `debts_json` is valid JSON.
- [ ] `raw_answers_json` is valid JSON.
- [ ] `quick_summary_json`, `full_report_json`, `risk_flags_json`, `document_checklist_json`, and `suggested_next_steps_json` are valid JSON.

## Confirmation Screen

- [ ] Confirmation screen says `Your Full Debt Defense Snapshot has been created.`
- [ ] Confirmation screen shows Snapshot ID.
- [ ] Confirmation screen shows selected delivery channel.
- [ ] Confirmation screen shows follow-up preference.
- [ ] Confirmation screen shows priority level.
- [ ] Confirmation screen shows recommended next step.
- [ ] When `CONFIG.actualDeliveryEnabled = false`, confirmation does not claim SMS, email, or WhatsApp was successfully sent.
- [ ] When `CONFIG.actualDeliveryEnabled = false`, confirmation says the request was submitted and the Snapshot is saved for follow-up.

## Regression Smoke Paths

- [ ] Qualified path: NY, individual, one unsecured credit-card debt, collections/calls, SMS delivery, SMS consent, call today.
- [ ] Excluded-state path: DC, individual, unsecured credit-card debt, email delivery.
- [ ] Unsupported path: NY, individual, student loan only, email delivery.
- [ ] Secured path: NY, individual, secured non-auto debt, call delivery.
- [ ] Urgent lawsuit path: NY, individual, lawsuit/summons selected, deadline within 7 days, unsecured credit-card debt, Critical result, immediate callback CTA.
- [ ] Urgent garnishment path: NY, individual, wage garnishment selected, unsecured debt, Critical result, call-now/immediate callback CTA.
- [ ] Urgent harassment path: NY, individual, workplace calls/threats selected, harassment branch, collector behavior review recommendation.
- [ ] Normal collection Snapshot path: NY, individual, unsecured credit-card debt in collections, Quick Summary before contact, Full Snapshot preview, email delivery.
- [ ] Unsupported Snapshot path: NY, individual, student loan only, `Not a Fit for Credo Legal Intake`, useful fit explanation, no aggressive legal CTAs.
- [ ] Normal options lawsuit escalation: options path, full debt inventory, lawsuit stage, High/Critical urgency while remaining visibly different from urgent triage path.
- [ ] WhatsApp path: NY, individual, unsecured medical debt, WhatsApp delivery, WhatsApp consent.
