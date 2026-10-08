# AUDIT_BEFORE — Pashu Shield / Pashu-Mitra (Phase 0)

Date: 07/10/2026 · Method: static review of the uploaded zip (129 files). Nothing was run in a browser; no Lighthouse/axe numbers exist yet.
Status: Pass / Partial / Fail / N-A. Severity: S1 blocker, S2 major, S3 minor.

## 0. Limits of this audit (read first)
1. The DBIM 3.0, GIGW 3.0, GuDApps, UX Handbook and RTI .md files were NOT in the upload (only the zip). DBIM Checklist F.1 is therefore scored by topic area from the prompt's own rules. Item numbers below are provisional and must be reconciled once the DBIM .md is supplied. The existing `01-gap-matrix.md` already records the same document-availability caveat for GIGW.
2. No network in this environment: DBIM Toolkit hex values (Phase 1.1) and the GitHub repo were not checked. The zip has no `.git`, so branch `redesign/dbim-gigw` and per-phase commits need a `git init` on your side or a re-upload from a clone.
3. Existing docs/compliance already cover GIGW 3.0 (Q/A/C/L matrix). This audit builds on it and adds DBIM and logo.

## 1. Stack (kept; no migration)
| Layer | Finding |
|---|---|
| Frontend | Vanilla JS single-page app, no framework, no build, no package.json. `app.js` 5,830 lines, `call.js` 2,457, `style.css` 2,250. Hash router (`#/owner/dashboard`). Vercel static deploy (`buildCommand` is an echo). |
| i18n | Home-grown `I18N` object: en, mr, hi, te. `<html lang>` updated on switch. No per-language URLs. |
| Backend | Python Flask-style `app.py` (5,437 lines), SQLite, Socket.IO, Render. Clerk-backed farmer OTP plus own OTP service. |
| ML / voice | `ml-backend` (sklearn pickles), Whisper-tiny ONNX in the browser (44 MB models + 37 MB wasm), Asterisk examples (MOCK mode). |
| Tests | 7 Node UI tests, ~15 Python test files. No lint, no CI, no type-check. Baseline run not yet done. |
| Third party | Leaflet from unpkg (CSS and JS). No web fonts. |

Naming: the code and docs say "Pashu-Mitra"; your prompt says "Pashu Shield". Decision needed (section 7).

## 2. Page and component scores
| Area (routes) | DBIM colour/type | Header/footer | A11y (static) | Forms | Notes |
|---|---|---|---|---|---|
| Public: `#/`, login/register/forgot/reset | Fail | Fail | Partial | Partial | Indigo palette; role cards on home |
| Info: about, contact, feedback, help, policies, sitemap, search | Fail | Partial | Partial | Partial | Placeholders marked `[OWNER ACTION]` (good) |
| Owner (farmer): dashboard, herds, livestock, report, webcall, calls | Fail | Fail | Partial | Partial | 122 inline `onclick` in app.js |
| Vet: dashboard, reports, advisories, vaccination, search, calls | Fail | Fail | Partial | Partial | |
| Lab: dashboard, queue, samples | Fail | Fail | Partial | Partial | |
| Govt/admin: dashboard, analytics, GIS, national, zoonotic, stock, AI, export | Fail | Fail | Partial | N-A | Map and charts need text alternatives |
| Components: header (`pm-brand`), a11y bar, footer, cookie banner, search, stepper | Fail | Partial | Pass/Partial | n/a | A11y bar and skip link already exist; no cookie banner |

## 3. DBIM F.1 by topic (provisional numbering)
| # | Topic | Status | Evidence / fix | Sev |
|---|---|---|---|---|
| F1-01 | One primary colour group | Fail | Indigo `#3d4db8`/`#2C3690`/`#6C7AE0`; not a DBIM group | S2 |
| F1-02 | Functional palette only otherwise | Fail | Many off-palette hexes (`#FFD54F`, `#1FA971`, `#E53935`, `#E08A1E`…) | S2 |
| F1-03 | Deep Blue #1D0A69 not used | Pass | Not present | – |
| F1-04 | Noto Sans, self-hosted, per script | Fail | System font stack; no font files | S1 |
| F1-05 | Type scale desktop/mobile | Fail | Ad-hoc px; A−/A/A+ exists via `--pm-text-scale` | S2 |
| F1-06 | Line height 1.2–1.5, no image text | Partial | Not verified per page | S3 |
| F1-07 | Single icon style, SVG, key colour | Fail | Emoji used as icons (e.g. 🐄 fallback, manifest data-URI) | S2 |
| F1-08 | Buttons: ≤3-word labels, states | Partial | 44 px targets present; states not uniform | S3 |
| F1-09 | Logo: Lockup 3B, black on white header | Fail | Logo file missing (see section 4) | S1 |
| F1-10 | Footer key colour + white lockup | Fail | Footer exists (`pm-footer`), not in DBIM colours | S2 |
| F1-11 | Header 3 layout, sticky, engagement bar | Fail | Header is organisation block + a11y bar; no global search | S2 |
| F1-12 | Skip link first focusable | Pass | `index.html` line 1 of body | – |
| F1-13 | Language selector "अ \| A" | Partial | Select/buttons exist; no icon pattern | S3 |
| F1-14 | Global nav, 3 levels, 3-click | Fail | Role bottom-nav only; no Services/Documents/Resources/Connect | S2 |
| F1-15 | Footer links: policies, sitemap, help, feedback, last updated | Partial | Policies, sitemap, feedback pages exist; last-updated is not data-driven | S2 |
| F1-16 | Banner carousel with pause | Fail | None | S3 |
| F1-17 | Announcement ticker with pause | Fail | None | S3 |
| F1-18 | Imagery budgets, alt ≤140, licence register | Partial | 4 `alt=` sites, dynamic; no register | S3 |
| F1-19 | British English, DD/MM/YYYY | Not verified | Needs content pass | S3 |
| F1-20 | Accessible PDFs only, size in link text | Not verified | | S3 |
| F1-21 | Content lifecycle, maker-checker | Fail | Not in code | S3 |
| F1-22 | Multilingual EN+HI complete, per-language URLs | Partial | en/mr/hi/te present; hash routing blocks `/hi/` URLs | S2 |
| F1-23 | Cookie banner Accept/Reject/Customise | Fail | None found | S1 |
| F1-24 | Search: text + voice, filters | Partial | `#/search` exists; voice module exists but not wired to search | S2 |
| F1-25 | Forms (Annexure B) | Partial | Needs a per-form pass | S2 |
| F1-26 | Accessibility (WCAG 2.1 AA) | Partial | Strong base (live regions, focus-visible, 44 px); see section 5 | S2 |
| F1-27 | Performance budgets | Not verified | 81 MB of model/wasm shipped; must stay lazy | S2 |
| F1-28 | Analytics with consent | Fail | None | S3 |
| F1-29 to F1-43 | Remaining F.1 items | Not scored | Need the DBIM .md for exact wording | – |

Only 28 of 43 rows are scored; the rest need the source file rather than my recollection.

## 4. Logo audit
- `frontend/assets/` holds only a README. `pashu-mitra-logo.png` does not exist, yet `index.html`, `manifest.json` and `org-config.js` reference it. Header falls back to text; favicon and PWA icons are broken (S1).
- Manifest also embeds an emoji data-URI icon and marks one PNG as both `any` and `maskable` (S3).
- No SVG logo, no clear-space or minimum-size rule, no `<Logo>` component, no social image, no black/white variants.
- State Emblem: not used (pass). Existing `org-config.js` already follows the no-invented-government-info rule, which is compatible with `OFFICIAL_GOV_PORTAL=false`.

## 5. Accessibility, security, performance (highlights)
Contrast (computed): DBIM key `#0F5757` on white 8.33 ✔; `#606060` on white 6.29, on Linen 5.24 ✔; Liberty Green, Coral Red, Blue on white 4.53 / 4.53 / 4.50 (pass, no margin).
Trap found: DBIM variant `#2D8686` is 4.32 on white and 3.59 on Linen, so it fails as text. Use it only for non-text UI at ≥3:1 on white, and use `#0F5757` for text and links. Existing `#6C7AE0` (3.82), `#FFD54F` (1.41), `#1FA971` (3.01) fail on white.
Accessibility strengths: skip link, live regions in initial HTML, `focus-visible` rings, 44 px targets, text-size control, existing browser audit docs. Gaps: map/GIS and charts need text alternatives; inline `onclick` handlers (122) hurt maintainability; reflow at 320 px and 400% unverified.
Security: Vercel sets nosniff, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy; no HSTS or CSP in `vercel.json`. Backend CSP is report-only by default and cannot be enforced while 122 inline handlers and unpkg scripts exist (S2). Backend sends SAMEORIGIN while Vercel sends DENY (S3). OTP has expiry, attempts, resend cool-down, rate limits (good). No `security.txt`.
Repo hygiene: `backend/animal_health.db` (286 KB) is in the zip and not git-ignored; `server.log` and `__pycache__` are in the zip (ignored by `.gitignore`, so likely zip artefacts, but please confirm they are not tracked). Check the DB for real user data (S1 until confirmed). A phone number (7382210251) is hard-coded in `render.yaml` and `voice/README.md`; confirm it is intended to be public (S2, DPDP).
Performance: `index.html` has no deferred scripts; Leaflet loads render-blocking from unpkg; service worker caches the shell (good) and uses `no-store` on app JS (hurts repeat loads).

## 6. Risks to existing features
- Whisper/ONNX voice, WebRTC calling and Socket.IO depend on current CSP-free loading, `microphone=(self)` and the `/api` rewrite. Any CSP must allow `wasm-unsafe-eval`, `worker-src`, `connect-src` for the Render backend and `wss:`.
- Hash routes are used by the service worker, tests and links; moving to path routes (`/hi/…`) is a breaking change.
- Replacing indigo tokens touches ~2,250 lines of CSS and inline styles in JS templates.

## 7. Decisions needed before Phase 1
1. Product name: Pashu Shield or Pashu-Mitra (affects logo, lockup, manifest, every string).
2. Language URLs: keep hash routes with a `?lang=`/`#/hi/…` scheme, or move to path routing (`/hi/`) with a Vercel rewrite. Recommend `#/hi/…` first (non-breaking), path routing later.
3. Regional languages after English and Hindi: Marathi and Telugu already exist (the data is Maharashtra-centred). Confirm priority order.
4. Confirm DBIM Green default and that `#2D8686` is restricted to non-text use.
5. Please supply the DBIM/GIGW .md files again (or confirm I may proceed from the prompt) so the 43-item list is exact.
6. Confirm the committed DB holds no real data, and whether the helpline number may be public.
7. Re-upload as a git clone (or confirm I deliver patches/zip instead of commits).
