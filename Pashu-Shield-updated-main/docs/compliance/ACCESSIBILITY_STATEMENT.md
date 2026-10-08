# Accessibility statement — Pashu Mitra (DRAFT)

Designed to conform to WCAG 2.1 AA, GIGW 3.0 and DBIM 3.0. **Conformance has not been audited.** CQW/STQC certification pending audit.
This is an independent initiative and not an official Government of India website.

## What is built in
Skip link first on every page; one `main`; landmarks; visible 3 px focus ring; targets ≥ 44 px; text size A− A A+ and high-contrast and reduced-motion controls; keyboard-operable disclosure menus (Escape closes); route-change focus and announcement; live regions in the initial HTML; text colours checked at ≥ 4.5:1 by `scripts/check-contrast.mjs`; cookie banner and forms operable by keyboard; ticker has a pause control.

## Known gaps (as of 07/10/2026)
Not tested with NVDA, TalkBack or VoiceOver. Axe/pa11y/Lighthouse are configured in CI but have not been run on this build. Map and chart text alternatives not verified. Reflow at 320 px and 400 % zoom not verified. Essential labels still set at 12 px need a component pass (D-07). Regional-language content (Marathi, Telugu) in the new shell falls back to English.

## Feedback
Report accessibility problems through the Feedback page or [Nodal Officer / WIM contact: placeholder]. Date of statement: 07/10/2026.
