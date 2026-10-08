#!/usr/bin/env python3
"""Build the Pashu Mitra brand kit (DBIM 5.2.4 Lockup 3B, 5.3, 5.5; RTI logo
guide geometry only for integrity rules). Single source of truth for the mark.

  python3 scripts/build_logos.py

Outputs frontend/assets/brand/*.svg, PNG icons, favicon.ico, social image and
frontend/assets/brand/logo-spec.json (sizes read by logo.js and the tests).
Wordmarks are OUTLINED paths (no font dependency). Interim fonts are used unless
NOTO_LATIN_BOLD / NOTO_DEVA_BOLD point at Noto Sans Bold .ttf files; re-run once
scripts/fetch-fonts.sh has produced them (see BRAND_GUIDELINES.md)."""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from outline_text import outline
from pathgeom import bbox, flat
import numpy as np
from PIL import Image, ImageDraw

ROOT = os.path.join(os.path.dirname(__file__), "..", "frontend")
OUT = os.path.join(ROOT, "assets", "brand"); os.makedirs(OUT, exist_ok=True)
LATIN = os.environ.get("NOTO_LATIN_BOLD", "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf")
DEVA = os.environ.get("NOTO_DEVA_BOLD", "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf")
KEY = "#0F5757"; TONES = {"black": "#000000", "white": "#FFFFFF"}
NAMES = {"eng": ("Pashu Mitra", False, LATIN), "hin": ("पशु मित्र", True, DEVA)}

# ---- the mark: shield with horns-as-M and sun cut out (evenodd), 50 x 58 units ----
def circ(cx, cy, r, k=0.5523):
    return (f"M{cx+r} {cy} C{cx+r} {cy+k*r} {cx+k*r} {cy+r} {cx} {cy+r} C{cx-k*r} {cy+r} {cx-r} {cy+k*r} {cx-r} {cy} "
            f"C{cx-r} {cy-k*r} {cx-k*r} {cy-r} {cx} {cy-r} C{cx+k*r} {cy-r} {cx+r} {cy-k*r} {cx+r} {cy} Z")
SHIELD = "M32 3 L57 11 V30 C57 45 46 55 32 61 C18 55 7 45 7 30 V11 Z"
HORNS = ("M16 46 V22 C16 20 18 19 20 20 L32 32 L44 20 C46 19 48 20 48 22 V46 H42 V31 L32 41 L22 31 V46 Z")
MARK_D = SHIELD + " " + HORNS + " " + circ(32, 14, 3.3)
MARK_W, MARK_H = 50, 58            # shield bbox: x 7..57, y 3..61
MARK_T = "translate(-7 -3)"
STEM = 6                           # horn-stem width of the M (units)
X = 2 * STEM                       # clear-space unit = 2 stem widths (12 units, ~0.21 x mark height)
GAP = 16                           # mark-to-name gap (horizontal lockup)
NAME_EM = 27                       # name size in units (cap height ~ 19.7)
SIZES = {"horizontal_min_h": 57, "mark_min": 30}   # px, RTI guide 15 mm / 8 mm screen equivalents

def name_path(lang):
    text, deva, font = NAMES[lang]
    d, adv, *_ = outline(font, text, deva=deva)
    x0, y0, x1, y1 = bbox(d)
    return d, (x0, y0, x1, y1)

def svg(w, h, body, title, desc):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:g} {h:g}" width="{w:g}" height="{h:g}" role="img">'
            f'<title>{title}</title><desc>{desc}</desc>{body}</svg>\n')

def mark_el(fill, x=0, y=0):
    return f'<path transform="translate({x:g} {y:g}) {MARK_T}" fill="{fill}" fill-rule="evenodd" d="{MARK_D}"/>'

def name_el(lang, fill, x, y_mid=None, x_mid=None, y_top=None):
    d, (x0, y0, x1, y1) = name_path(lang); s = NAME_EM
    w, h = (x1 - x0) * s, (y1 - y0) * s
    tx = (x_mid - w / 2) if x_mid is not None else x
    ty = (y_mid - h / 2) if y_mid is not None else y_top
    return (f'<path transform="translate({tx - x0 * s:.2f} {ty - y0 * s:.2f}) scale({s})" fill="{fill}" d="{d}"/>', w, h)

def horizontal(lang, tone):
    fill = TONES[tone]; el, w, h = name_el(lang, fill, MARK_W + GAP, y_mid=MARK_H / 2)
    W = MARK_W + GAP + w
    return W, MARK_H, mark_el(fill) + el

def vertical(lang, tone):
    fill = TONES[tone]; vgap = 12
    el, w, h = name_el(lang, fill, 0, x_mid=0, y_top=MARK_H + vgap)   # measure first
    W = max(MARK_W, w); H = MARK_H + vgap + h
    el, w, h = name_el(lang, fill, 0, x_mid=W / 2, y_top=MARK_H + vgap)
    return W, H, mark_el(fill, (W - MARK_W) / 2) + el

def build():
    spec = {"clear_space_unit": X, "mark": {"w": MARK_W, "h": MARK_H}, "min_px": SIZES, "files": {}}
    label = {"eng": "Pashu Mitra", "hin": "पशु मित्र"}
    for lang in NAMES:
        for kind, fn, fname in (("horizontal", horizontal, "standard"), ("vertical", vertical, "alternate")):
            for tone in TONES:
                W, H, body = fn(lang, tone)
                name = f"pashumitra_{fname}_{lang}_{tone}.svg"
                open(os.path.join(OUT, name), "w", encoding="utf-8").write(
                    svg(round(W, 2), round(H, 2), body, f'{label[lang]} logo', f'{label[lang]}: shield mark with horns forming an M, and the name.'))
                spec["files"][name] = {"w": round(W, 2), "h": round(H, 2), "variant": kind, "lang": lang, "tone": tone}
    for tone in TONES:
        name = f"pashumitra_mark_xxx_{tone}.svg"
        open(os.path.join(OUT, name), "w").write(svg(MARK_W, MARK_H, mark_el(TONES[tone]), "Pashu Mitra mark", "Shield with horns forming an M."))
        spec["files"][name] = {"w": MARK_W, "h": MARK_H, "variant": "mark", "lang": "xxx", "tone": tone}
    # favicon master: key colour, transparent cut-outs so it works on light and dark tabs
    open(os.path.join(OUT, "favicon.svg"), "w").write(svg(MARK_W, MARK_H, mark_el(KEY), "Pashu Mitra", "Pashu Mitra mark"))
    return spec

# ---------------- raster helpers (supersampled, even-odd) ----------------
def raster_paths(items, W, H, ss=4, bg=None):
    """items: [(d, (a,b,c,d,e,f) affine, rgb)]; returns RGBA image."""
    acc = Image.new("RGBA", (W * ss, H * ss), bg or (0, 0, 0, 0))
    for d, (a, b, c, dd, e, f), rgb in items:
        m = np.zeros((H * ss, W * ss), dtype=np.uint8)
        for poly in flat(d):
            mk = Image.new("1", (W * ss, H * ss), 0)
            ImageDraw.Draw(mk).polygon([((a * x + c * y + e) * ss, (b * x + dd * y + f) * ss) for x, y in poly], fill=1)
            m ^= np.array(mk, dtype=np.uint8)
        layer = Image.new("RGBA", (W * ss, H * ss), rgb + (255,))
        acc.paste(layer, (0, 0), Image.fromarray(m * 255))
    return acc.resize((W, H), Image.LANCZOS)

def mark_items(rgb, scale, ox, oy):
    return [(MARK_D, (scale, 0, 0, scale, ox - 7 * scale, oy - 3 * scale), rgb)]

def icons():
    hexrgb = lambda h: tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))
    key, white = hexrgb(KEY), (255, 255, 255)
    def sq(n, fg, bg, pad):
        s = n * (1 - 2 * pad) / MARK_H
        return raster_paths(mark_items(fg, s, (n - MARK_W * s) / 2, (n - MARK_H * s) / 2), n, n, bg=bg + (255,))
    sq(180, key, white, .16).convert("RGB").save(os.path.join(OUT, "apple-touch-icon.png"))
    for n in (192, 512):
        sq(n, key, white, .12).convert("RGB").save(os.path.join(OUT, f"icon-{n}.png"))
        sq(n, white, key, .22).convert("RGB").save(os.path.join(OUT, f"icon-maskable-{n}.png"))   # 80% safe zone
    ico = [raster_paths(mark_items(key, n * .88 / MARK_H, (n - MARK_W * n * .88 / MARK_H) / 2, n * .06), n, n) for n in (16, 32, 48)]
    ico[2].save(os.path.join(ROOT, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)], append_images=ico[:2])
    # 1200x630 social card: key colour only (DBIM 5.3), white lockup
    W, H, _ = horizontal("eng", "white"); s = 2.6
    d, (x0, y0, x1, y1) = name_path("eng")
    ox, oy = (1200 - W * s) / 2, (630 - MARK_H * s) / 2
    items = mark_items(white, s, ox, oy) + [(d, (NAME_EM * s, 0, 0, NAME_EM * s, ox + (MARK_W + GAP) * s - x0 * NAME_EM * s,
                                                  oy + (MARK_H / 2) * s - ((y0 + y1) / 2) * NAME_EM * s), white)]
    raster_paths(items, 1200, 630, ss=2, bg=key + (255,)).convert("RGB").save(os.path.join(OUT, "social-1200x630.png"))

if __name__ == "__main__":
    spec = build(); icons()
    sizes = {n: os.path.getsize(os.path.join(OUT, n)) for n in os.listdir(OUT)}
    spec["bytes"] = sizes
    json.dump(spec, open(os.path.join(OUT, "logo-spec.json"), "w"), indent=1, ensure_ascii=False)
    # same data for the browser component (logo.js) so sizes are never hand-copied
    js = {k: v for k, v in spec.items() if k != "bytes"}
    open(os.path.join(ROOT, "logo-dims.js"), "w").write(
        "/* GENERATED by scripts/build_logos.py – do not edit. */\nwindow.PM_LOGO_SPEC = " + json.dumps(js, ensure_ascii=False) + ";\n")
    print("built", len(spec["files"]), "logos; largest SVG", max(v for k, v in sizes.items() if k.endswith(".svg")), "bytes")
