# DECISIONS — conflicts and resolutions

Rule: DBIM wins on visual identity; GIGW/WCAG win on accessibility and security; otherwise the stricter rule wins.

| ID | Date | Conflict / choice | Resolution | Basis |
|---|---|---|---|---|
| D-01 | 07/10/2026 | Product name: code says Pashu-Mitra, brief said Pashu Shield | Owner confirmed **Pashu Mitra**. Logo/lockup/manifest use it. | Owner |
| D-02 | 07/10/2026 | DBIM hex values come from a scanned PDF; Toolkit not reachable | Used the prompt's values; **unverified**. Verify against dbimtoolkit.digifootprint.gov.in before release. | DBIM 2.1 |
| D-03 | 07/10/2026 | DBIM Green `#2D8686` with white text is 4.32:1 (WCAG needs 4.5:1), so it cannot be a hover/pressed shade for white-text buttons | Key `#0F5757` for text, links, buttons, footer. `#2D8686` limited to non-text UI (3:1). Primary-button hover inverts to white with key text and 2px key border (8.33:1). | WCAG 1.4.3 beats DBIM palette use |
| D-04 | 07/10/2026 | DBIM allows only palette colours, but status badges need tints | Badge backgrounds are Linen with Brown text; status is carried by border, icon and wording, never colour alone | DBIM 2.2, WCAG 1.4.1 |
| D-05 | 07/10/2026 | DBIM: page white, cards Linen. App had tinted page, white cards | Page `#FFFFFF`, `--card` Linen, inputs stay white | DBIM 2.4 |
| D-06 | 07/10/2026 | Mustard Yellow is a warning colour but fails as text | Background only, with Brown text | DBIM 2.2, WCAG 1.4.3 |
| D-07 | 07/10/2026 | Small text (12px / 10px mobile) vs essential content needing Paragraph 1 | Automatic mapping put 12–13.9px items on Paragraph 2. Essential labels and errors must be re-checked per component in Phase 7. | DBIM 4.3 |
| D-08 | 07/10/2026 | Language URLs: DBIM wants distinct URLs, app uses hash routing | Non-breaking `#/hi/…` first; path routing (`/hi/`) is roadmap | Owner |
| D-09 | 07/10/2026 | Noto Sans cannot be fetched without network | `@font-face` and `scripts/fetch-fonts.sh` provided; system stack until files are committed | DBIM 4.1 |
| D-10 | 07/10/2026 | Colours inside `app.js` (charts, map) are hex, not CSS variables | Mapped to DBIM hex now; moving them to tokens is a Phase 3 task, so a theme swap does not yet recolour charts | DBIM 2.1 |
| D-11 | 07/10/2026 | Logo concept | Owner chose concept C (horns as M in a shield). Original artwork, single colour, evenodd cut-outs. | DBIM 5.2, 5.5 |
| D-12 | 07/10/2026 | DBIM 5.3 header black lockup vs `.app-header` key-colour bars on dashboards | Public/site header (`pm-site-header`) is white with the black lockup now. Dashboard role bars remain key colour until Phase 3 rebuilds Header 3. | DBIM 5.3 |
| D-13 | 07/10/2026 | Clear-space unit not defined by DBIM | 2 horn-stem widths (12 units). Geometry idea from the RTI logo guide; no RTI value or colour reused. | RTI guide (supplementary) |
| D-14 | 07/10/2026 | Tagline is optional in Lockup 3B; no approved wording | Not drawn in masters; `[Tagline]` placeholder listed. | "Do not invent facts" |
| D-15 | 07/10/2026 | Name hyphen: UI said "Pashu-Mitra" | All user-facing strings changed to "Pashu Mitra". Deployment identifiers (Vercel project `pashu-mitra-smoky`, cache and storage keys) deliberately unchanged. Existing branding tests rewritten to the new rules. | Owner (D-01) |
| D-16 | 07/10/2026 | Regional-language lockups | English and Hindi masters only; Marathi/Telugu fall back to English until masters exist (DBIM 5.2.4 wants the name in the selected language). | DBIM 5.2.4 |
| D-17 | 07/10/2026 | DBIM Header 3 wants search, language, accessibility controls and nav in a sticky header; 320 px screens cannot afford ~200 px of sticky chrome | Desktop: engagement bar + main bar. Below 900 px the engagement bar and nav collapse behind two 44 px buttons ("Language and display", "Menu"); only the 57 px logo row stays sticky. | DBIM 5.4.3, WCAG 1.4.10 |
| D-18 | 07/10/2026 | DBIM nav lists Schemes, Notices, Publications, RTI, Photos, Videos, which have no content here | Not shown (no fake links). Nav uses only registered routes; a test fails on any broken internal link. Listed in PLACEHOLDERS.md. | "Do not invent facts"; GIGW L07 |
| D-19 | 07/10/2026 | "Reuse the existing voice module" for search | Not verified that the repo's voice code is reusable in the browser. Voice search uses the browser's SpeechRecognition when present (the browser vendor processes audio), hidden otherwise. | DPDP minimisation |
| D-20 | 07/10/2026 | Router bounced signed-in users away from public information pages, so footer links failed on dashboards | Only `#/`, `#/login*`, `#/register*` bounce. Information pages open for everyone. | GIGW Q09–Q14 |
| D-21 | 07/10/2026 | Strict CSP breaks the app today (120+ inline `onclick`, unpkg scripts, Whisper wasm) | Enforced: `frame-ancestors`, `base-uri`, `object-src`, `form-action`. Full policy in Report-Only until inline handlers are removed. Plus HSTS, CORP. | GIGW 5.3, CERT-In |
| D-22 | 07/10/2026 | Auth token is in `localStorage` (readable by any XSS), brief wants HttpOnly/SameSite cookies and CSRF | Not changed: needs a backend session redesign and would risk OTP/calling flows. Recorded as gap S-06. | GIGW 5.3 |
| D-23 | 07/10/2026 | Brief: remove demo credentials from production. Existing owner decision and test keep the demo-access card visible | Left as is; flagged for owner (S-07). A flag to hide it in production is the recommended change. | Owner decision vs GIGW 5.3 |
| D-24 | 07/10/2026 | Banner carousel, What's-new, social feed, CCPS | Ticker is built (hidden without announcements). Carousel/feed not built: no supplied content. `ccpsEnabled=false` slot only. | DBIM A.4 |
| D-25 | 07/10/2026 | Hindi UI strings (header, footer, cookie banner) | Drafted by me; need native-speaker review and the shared glossary before release. Marathi and Telugu fall back to English in the new shell. | DBIM 7.5 |
| D-26 | 07/10/2026 | Per-language URLs (`/hi/`) | Not done: hash routing kept (D-08). Language is stored in `pm_lang` and on `<html lang>`. | DBIM 7.5 |
