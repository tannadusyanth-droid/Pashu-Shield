# DESIGN_SYSTEM — Pashu Mitra (Phase 1 status)

Designed to conform to DBIM 3.0 and GIGW 3.0; CQW/STQC certification pending audit.

## Files
- `frontend/dbim-tokens.css` — palette, type scale, Noto Sans `@font-face`, base typography, links, buttons, focus, reduced motion (loaded after `style.css`).
- `frontend/style.css` — legacy and `--pm-*` variables now point at DBIM tokens. 310 hard-coded hexes were mapped by `scripts/migrate_palette.py` (kept for audit).
- `scripts/check-contrast.mjs` — CI gate: palette matrix plus every same-rule colour/background pair in the stylesheets (87 pairs checked, 0 failing).
- `scripts/fetch-fonts.sh` — builds the self-hosted, subsetted Noto Sans files (needs network).

## Theme swap
`<html data-dbim-theme="blue">` swaps the primary group (Blue values from the brief). Burgundy, Purple, Chrome Yellow and Cinnamon Red are not defined because their hex values were not supplied.

## Colour rules in force
Page white, cards Linen, text Brown `#150202`, links and buttons key `#0F5757`, Deep Blue `#1D0A69` unused. `#2D8686` is non-text only; Mustard is background only with Brown text; `#606060` for input borders and secondary text.

## Components added in Phases 2–4
`logo.js` (PMLogo), `dbim-shell.js/css` (Header 3, nav, footer, cookie banner, ticker), `validators.js`. Banner and post sizes reserved for the CCPS slot (off): banners 1800×338 / 1800×500 / 1800×600 (≤ 500 KB), short banners 320×245 and 640×245, posts 960×245.

## Known gaps after Phase 1
1. Font files are not yet in `frontend/fonts/` (run the script).
2. Icons are still emoji (Phase 1.3 icon set not started).
3. Component pass (header, footer, nav, cookie banner, stepper) belongs to Phases 1.4 and 3.
4. High-contrast opt-in theme was remapped but not re-verified.
5. Colour pairs set in separate rules, and anything in `app.js` inline styles, are not covered by the script; axe in a browser comes in Phase 7.
6. Palette hex values unverified against the DBIM Toolkit (D-02).
