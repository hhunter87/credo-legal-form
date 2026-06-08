# AGENTS.md — Credo Legal Widget

## Project goal

Make the Credo Legal Debt Defense Options Check widget production-ready while preserving the plain embeddable HTML/CSS/JS implementation.

## Non-negotiables

- Keep the final widget embeddable on a normal website without requiring React, Next.js, or a build system.
- Preserve the excluded-state configuration: DC, DE, ID, OK, WV, WY.
- Preserve the results-before-contact flow.
- Keep upload simulated for now.
- Keep Google Apps Script / Google Sheets as the MVP lead destination.
- Do not add mandatory third-party tracking.
- Do not provide legal advice or guarantee outcomes in UI copy.

## Coding preferences

- Prefer simple, readable vanilla JavaScript.
- Keep configuration centralized.
- Avoid global namespace pollution where practical.
- Add defensive validation and graceful error states.
- Keep CSS scoped to the widget container.
- Maintain accessibility basics: labels, keyboard navigation, visible focus states, meaningful button text.
- Keep copy professional, calm, and consumer-friendly.

## Testing expectations

Before finishing, check:

- Mobile layout.
- Desktop layout.
- Urgent path.
- Options-check path.
- Qualified supported debt path.
- Unsupported debt path.
- Excluded state path.
- Unsecured vs secured path.
- Lawsuit/summons branch.
- Default judgment branch.
- Garnishment branch.
- Collector harassment branch.
- Upload placeholder branch.
- SMS consent conditional display.
- WhatsApp consent conditional display.
- Google Apps Script payload shape.
