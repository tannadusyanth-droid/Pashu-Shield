# AUDIT_AFTER — Pashu Mitra, 07/10/2026

Basis: static review plus 109 automated frontend tests (see §4). **Nothing was run in a browser**: no Lighthouse, axe, NVDA/TalkBack or screenshots exist for this build. "Pass" below means "implemented and covered by a test or a code review", not "certified". The DBIM F.1 item numbers are provisional (the DBIM file was not supplied; AUDIT_BEFORE §0). Only 28 of the 43 items could be scored; 15 are unscored. F.2 (ministry checklist) items are N-A: this is not a ministry site, except where adapted (header/footer/nav).

## 1. DBIM F.1 (provisional topics)
| # | Topic | Before | After | Evidence |
|---|---|---|---|---|
| 01 | One colour group | Fail | Pass (hex unverified, D-02) | `dbim-tokens.css` |
| 02 | Functional palette only | Fail | Partial | 310 hexes mapped; HC theme and `app.js` inline colours not hand-checked |
| 03 | Deep Blue unused | Pass | Pass | grep |
| 04 | Noto Sans self-hosted per script | Fail | **Fail until fonts are fetched** | `@font-face` + `scripts/fetch-fonts.sh`; no files |
| 05 | Type scale | Fail | Partial | tokens; essential 12 px labels remain (D-07) |
| 06 | Line height, real text | Partial | Partial | base 1.5 |
| 07 | One icon style | Fail | Partial | header icons SVG line 24 px; dashboards still use emoji |
| 08 | Buttons and states | Partial | Partial | tokens; hover inversion D-03 |
| 09 | Lockup 3B, black on white | Fail | Pass (interim wordmark fonts) | `logo_rules.test.mjs` |
| 10 | Footer key colour + white lockup | Fail | Pass (code) | `shell3.test.mjs` |
| 11 | Header 3 sticky + engagement bar | Fail | Partial | co-brand slots not built; dashboard title bars still key-coloured (D-12) |
| 12 | Skip link first | Pass | Pass | static test |
| 13 | Language selector "अ \| A" | Partial | Pass (code) | test |
| 14 | Global nav, 3 levels | Fail | Partial | real routes only (D-18) |
| 15 | Footer links, last updated | Partial | Pass (code) | data-driven DD/MM/YYYY |
| 16 | Banner carousel | Fail | Fail | no content; CCPS flag off (D-24) |
| 17 | Ticker with pause | Fail | Partial | hidden until announcements exist |
| 18 | Imagery budgets | Partial | Partial | `check-images.mjs` 18 files OK; no licence register |
| 19 | British English, DD/MM/YYYY | n/v | n/v | no spell-check job yet |
| 20 | Accessible PDFs | n/v | N-A | no PDFs |
| 21 | Content lifecycle, maker-checker | Fail | Fail | roadmap |
| 22 | Multilingual EN+HI | Partial | Partial | shell en+hi; per-language URLs not done (D-26) |
| 23 | Cookie banner | Fail | Pass (code) | Accept / Reject / Customise, no pre-ticks |
| 24 | Search | Partial | Partial | synonyms, spelling, category filter, ?q=, voice via browser; no PDF/image metadata search |
| 25 | Forms (Annex B) | Partial | Partial | shared validators + error summary helpers; per-form rework not done |
| 26 | WCAG 2.1 AA | Partial | Partial | static tests only |
| 27 | Performance budgets | n/v | n/v | 81 MB model/wasm lazy-loaded? not verified |
| 28 | Consented analytics | Fail | Fail | consent API exists; no analytics wired |
| 29–43 | Remaining F.1 items | — | Not scored | need DBIM file |

## 2. GIGW 3.0 matrix
The existing `docs/compliance/01-gap-matrix.md` stands. Changes in this pass: Q01 logo (Pass), Q05 last-updated (Pass, per page), Q09–Q14 pages reachable when signed in (fixed, D-20), L07 internal links verified by test; A11y claims unverified; security items per SECURITY_CHECKLIST.md.

## 3. Logo audit after
Mark, 10 lockups, icons, social image present; ≤ 4.2 KB each; single colour; rendered only through `PMLogo`; tests enforce minimum size, no filters/transforms/shadows, black header / white footer. Gaps: interim wordmark fonts, no regional-language masters, no co-brand logos.

## 4. Automated checks (all pass on 07/10/2026)
Frontend `node --test`: 109 tests (new: logo 11, header/footer/consent/links/a11y-static 13, validators 7; the rest are the existing suites, 3 updated); 3 browser tests skipped as before. Contrast gate: 94 pairs, 0 failures. Image budgets: 0 over. Backend validators: 2 vectors suites OK. The existing backend suite was not run (no pytest here).
