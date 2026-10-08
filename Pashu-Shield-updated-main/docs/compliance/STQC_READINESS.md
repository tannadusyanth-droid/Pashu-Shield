# STQC / CQW audit readiness punch-list (07/10/2026)
Designed to conform to DBIM 3.0 and GIGW 3.0; CQW/STQC certification pending audit. Nothing here claims certification.

**Must do before an audit (blocking)**
1. Run on a deployed preview: Lighthouse (mobile), axe/pa11y, NVDA + TalkBack pass; record results in AUDIT_AFTER.md.
2. Fetch and commit Noto Sans files; regenerate logos with Noto Sans Bold; check Hindi lockup (D-09, BRAND_GUIDELINES).
3. Verify palette hex against the DBIM Toolkit (D-02); obtain the DBIM/GIGW text and finish the F.1 scoring (items 29–43).
4. Replace every `[OWNER ACTION]` placeholder (PLACEHOLDERS.md); nominate the Web Information Manager and nodal officer; get policy pages approved.
5. Security: remove inline handlers, self-host Leaflet, enforce the CSP; move tokens off `localStorage`; remove/guard demo credentials; remove `animal_health.db` and the helpline number from the repo history if not public; run `pip-audit`; confirm data hosting in India.
6. Hindi (and Marathi/Telugu) translation review with a shared glossary; per-language URLs.
7. Forms: apply `PMValidators` to every form; Aadhaar only with consent; acknowledgement page with reference number.

**Should do**
Essential text ≥ Paragraph 1 pass (D-07); replace emoji icons with the line set; session-timeout warning; cookie-gated privacy-safe analytics; content lifecycle and maker-checker; link checker and spell-check in CI; image licence register; co-brand logo slots; offline shell for farmer flows.

**Needs owner decisions**
Regional language priority; tagline; whether the portal is ever officially government-run (`officialGovPortal`, NSSO); CCPS credentials; demo-access card policy.
