/* Pashu Mitra logo component (DBIM 5.2.4 Lockup 3B, 5.3, 5.5; RTI logo guide
 * geometry for integrity rules only).
 *
 *   PMLogo.html({ variant: "horizontal"|"vertical"|"mark", tone: "black"|"white",
 *                 lang: "en"|"hi"|…, height: <px>, context: "header"|"footer"|"page" })
 *
 * The ONLY inputs are those five. There is deliberately no style, class, filter
 * or transform input. Rules enforced here (and by tests/logo_rules.test.mjs):
 *  - aspect ratio locked: width and height attributes always come from the
 *    master file's own ratio;
 *  - clear space of 2 horn-stem widths on all sides (spec.clear_space_unit);
 *  - minimum sizes: lockup 57 px high, mark 30 px; below that the mark-only
 *    variant is used automatically, and the mark is clamped at 30 px;
 *  - header = black lockup, footer = white lockup (DBIM 5.3); no other colours;
 *  - language: the name appears in the user's language where a master exists
 *    (English, Hindi); other languages use English until masters are supplied.
 * The link wrapper (see PMLogo.link) has the accessible name "Pashu Mitra – Home". */
(function (root) {
  "use strict";
  var SPEC = root.PM_LOGO_SPEC;
  var BASE = "assets/brand/";
  var LANG3 = { en: "eng", hi: "hin" };           // regional masters: add as supplied
  var ALT = { eng: "Pashu Mitra", hin: "पशु मित्र" };

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return "&#" + c.charCodeAt(0) + ";"; }); }

  function resolve(opts) {
    opts = opts || {};
    var ctx = opts.context === "header" || opts.context === "footer" ? opts.context : "page";
    var tone = ctx === "header" ? "black" : ctx === "footer" ? "white" : (opts.tone === "white" ? "white" : "black");
    var lang3 = LANG3[String(opts.lang || "en").slice(0, 2).toLowerCase()] || "eng";
    var variant = opts.variant === "vertical" || opts.variant === "mark" ? opts.variant : "horizontal";
    var h = Math.round(Number(opts.height) || (variant === "mark" ? 40 : 57));

    var file, minH;
    function pick(v) {
      var name = v === "mark" ? "pashumitra_mark_xxx_" + tone + ".svg"
        : "pashumitra_" + (v === "horizontal" ? "standard" : "alternate") + "_" + lang3 + "_" + tone + ".svg";
      var f = SPEC.files[name];
      // the lockup's smallest legal height keeps the mark at its own 57 px minimum
      var min = v === "mark" ? SPEC.min_px.mark_min : SPEC.min_px.horizontal_min_h * (f.h / SPEC.mark.h);
      return { name: name, f: f, min: min };
    }
    var p = pick(variant);
    if (variant !== "mark" && h < p.min) { variant = "mark"; p = pick("mark"); }   // automatic mark-only switch
    if (h < p.min) h = Math.ceil(p.min);
    var w = Math.round(h * p.f.w / p.f.h);
    var markPx = variant === "mark" ? h : h * SPEC.mark.h / p.f.h;
    var cs = Math.round(markPx * SPEC.clear_space_unit / SPEC.mark.h * 10) / 10;
    return { src: BASE + p.name, w: w, h: h, cs: cs, variant: variant, lang3: lang3, tone: tone };
  }

  function html(opts) {
    var r = resolve(opts);
    // clear space is padding on the wrapper; the <img> itself never carries style.
    return '<span class="pm-logo-wrap" style="padding:' + r.cs + 'px">' +
      '<img class="pm-logo" src="' + esc(r.src) + '" width="' + r.w + '" height="' + r.h + '" alt="' +
      esc(ALT[r.lang3]) + '" decoding="async"></span>';
  }

  function link(opts) {
    return '<a class="pm-logo-link" href="#/" aria-label="Pashu Mitra – Home">' + html(opts) + "</a>";
  }

  root.PMLogo = { html: html, link: link, resolve: resolve, spec: SPEC };
})(typeof window !== "undefined" ? window : globalThis);
