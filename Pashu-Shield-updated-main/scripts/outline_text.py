#!/usr/bin/env python3
"""Turn a text string into outlined SVG path data (DBIM 5.2.4: identifiers are
outlined so they never depend on installed fonts).
Latin: simple advance-width layout with kerning from the font's 'kern'/GPOS-free
pairs ignored (fine for a two-word identifier).
Devanagari: minimal shaper (ि reordering + GSUB ligature/single lookups of the
deva features, no GPOS mark positioning) – enough for the identifier strings in
brand/strings.json; each result must be visually checked (see build_logos.py).
Outputs (path_d, advance, ascent, descent) in font units scaled to size 1 em."""
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

DEVA_FEATS = ["locl","nukt","akhn","rkrf","blwf","half","vatu","cjct","pres","abvs","blws","psts","haln","ccmp","liga"]

def _lookups(font, feats):
    gsub = font["GSUB"].table
    sr = next(s for s in gsub.ScriptList.ScriptRecord if s.ScriptTag in ("dev2", "deva"))
    idx = set(sr.Script.DefaultLangSys.FeatureIndex)
    out = []
    for tag in feats:
        for i in sorted(idx):
            fr = gsub.FeatureList.FeatureRecord[i]
            if fr.FeatureTag == tag:
                out += [l for l in fr.Feature.LookupListIndex if l not in out]
    return out, gsub.LookupList.Lookup

def _apply(glyphs, lookup_ids, lookups):
    for li in lookup_ids:
        for st in lookups[li].SubTable:
            if st.LookupType == 7: st = st.ExtSubTable
            t = st.LookupType if hasattr(st, "LookupType") else None
            changed = True
            while changed:
                changed = False
                for i in range(len(glyphs)):
                    if hasattr(st, "mapping") and glyphs[i] in st.mapping:   # type 1 single
                        glyphs[i] = st.mapping[glyphs[i]]; changed = False
                    elif hasattr(st, "ligatures") and glyphs[i] in st.ligatures:  # type 4
                        for lig in st.ligatures[glyphs[i]]:
                            n = len(lig.Component)
                            if glyphs[i+1:i+1+n] == list(lig.Component):
                                glyphs[i:i+1+n] = [lig.LigGlyph]; changed = True; break
                    if changed: break
    return glyphs

def shape_deva(font, text):
    cm = font.getBestCmap()
    g = [cm[ord(c)] for c in text]
    # reorder ि (U+093F) before its consonant cluster (cluster = C (virama C)*)
    out, i = [], 0
    while i < len(text):
        if text[i] == " ": out.append(g[i]); i += 1; continue
        j = i + 1
        while j + 1 < len(text) and text[j] == "\u094d": j += 2
        cl = g[i:j]
        if j < len(text) and text[j] == "\u093f": out += [g[j]] + cl; j += 1
        else: out += cl
        i = j
        while i < len(text) and text[i] in "\u0941\u0942\u0947\u0948\u094b\u094c": out.append(g[i]); i += 1
    ids, lk = _lookups(font, DEVA_FEATS)
    return _apply(out, ids, lk)

def mark_offset(font, mark, base):
    """GPOS MarkBasePos (type 4): base_anchor - mark_anchor, in font units, or None."""
    if "GPOS" not in font: return None
    for l in font["GPOS"].table.LookupList.Lookup:
        for st in l.SubTable:
            t = st.ExtSubTable if st.LookupType == 9 else st
            if t.LookupType != 4 or mark not in t.MarkCoverage.glyphs or base not in t.BaseCoverage.glyphs: continue
            mr = t.MarkArray.MarkRecord[t.MarkCoverage.glyphs.index(mark)]
            a = t.BaseArray.BaseRecord[t.BaseCoverage.glyphs.index(base)].BaseAnchor[mr.Class]
            if a: return a.XCoordinate - mr.MarkAnchor.XCoordinate, a.YCoordinate - mr.MarkAnchor.YCoordinate
    return None

def outline(font_path, text, deva=False, font_number=0):
    f = TTFont(font_path, fontNumber=font_number)
    upm = f["head"].unitsPerEm
    gs = f.getGlyphSet()
    names = shape_deva(f, text) if deva else [f.getBestCmap()[ord(c)] for c in text]
    x = 0; parts = []; base_x = 0; base = None
    for n in names:
        pen = SVGPathPen(gs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
        if deva and f["hmtx"][n][0] == 0 and base:                       # zero-advance mark
            dx, dy = mark_offset(f, n, base) or (0, 0)
            gs[n].draw(TransformPen(pen, (1/upm, 0, 0, -1/upm, (base_x + dx)/upm, dy/upm)))
        else:
            gs[n].draw(TransformPen(pen, (1/upm, 0, 0, -1/upm, x/upm, 0)))   # y down, 1 em = 1
            base, base_x = n, x; x += gs[n].width
        parts.append(pen.getCommands())
    hhea = f["hhea"]
    return " ".join(p for p in parts if p), x/upm, hhea.ascent/upm, -hhea.descent/upm, names
