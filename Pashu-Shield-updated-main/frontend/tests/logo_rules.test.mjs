// Logo integrity rules (DBIM 5.3, 5.5; RTI logo guide geometry). Fails the build if
// a logo is rendered below minimum size, with filters/transforms/shadows, in colour
// on the header, or above 100 KB. Run: node --test tests/logo_rules.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const brand = path.join(root, "assets", "brand");
const read = f => fs.readFileSync(path.join(root, f), "utf8");

function load() {
  const sandbox = { window: {}, globalThis: {} };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(read("logo-dims.js"), sandbox);
  vm.runInContext(read("logo.js"), sandbox);
  return sandbox.PMLogo;
}
const PM = load();
const NAME = /^pashumitra_(standard|alternate|mark)_(eng|hin|xxx)_(black|white)\.svg$/;

test("every logo file follows the naming rule, is < 100 KB and is single-colour outlines only", () => {
  const files = fs.readdirSync(brand).filter(f => f.startsWith("pashumitra_"));
  assert.ok(files.length >= 10, "expected 10 masters");
  for (const f of files) {
    assert.match(f, NAME, f);
    assert.ok(fs.statSync(path.join(brand, f)).size < 100 * 1024, f + " must be < 100 KB");
    const svg = fs.readFileSync(path.join(brand, f), "utf8");
    const tone = f.includes("_black") ? "#000000" : "#FFFFFF";
    for (const bad of [/<text/i, /<image/i, /filter/i, /Gradient/i, /opacity/i, /stroke/i, /rotate|skew|matrix/i, /<style/i]) {
      assert.doesNotMatch(svg, bad, `${f} contains ${bad}`);
    }
    const fills = [...svg.matchAll(/fill="(#[0-9A-Fa-f]{6})"/g)].map(m => m[1].toUpperCase());
    assert.ok(fills.length && fills.every(c => c === tone), `${f} must use only ${tone}`);
  }
});

test("only black-on-white and white-on-dark lockups exist (DBIM 5.3)", () => {
  const tones = new Set(Object.values(PM.spec.files).map(f => f.tone));
  assert.deepEqual([...tones].sort(), ["black", "white"]);
});

test("header is always the black lockup; footer always white; even when asked otherwise", () => {
  assert.equal(PM.resolve({ context: "header", tone: "white" }).tone, "black");
  assert.equal(PM.resolve({ context: "footer", tone: "black" }).tone, "white");
});

test("below the minimum the lockup switches to the mark; the mark is clamped at 30 px", () => {
  const small = PM.resolve({ variant: "horizontal", height: 40 });
  assert.equal(small.variant, "mark");
  assert.ok(small.h >= 30);
  assert.equal(PM.resolve({ variant: "mark", height: 12 }).h, 30);
  assert.equal(PM.resolve({ variant: "horizontal", height: 57 }).variant, "horizontal");
  const v = PM.resolve({ variant: "vertical", height: 60 });          // below vertical minimum
  assert.equal(v.variant, "mark");
});

test("aspect ratio is locked to the master file", () => {
  for (const variant of ["horizontal", "vertical", "mark"]) for (const lang of ["en", "hi"]) {
    const r = PM.resolve({ variant, lang, height: 120 });
    const f = PM.spec.files[r.src.split("/").pop()];
    assert.ok(Math.abs(r.w / r.h - f.w / f.h) < 0.01, `${variant}/${lang} ratio`);
  }
});

test("clear space is applied on every render and scales with the mark", () => {
  const out = PM.html({ variant: "horizontal", height: 114 });
  const pad = Number(/padding:([\d.]+)px/.exec(out)[1]);
  assert.ok(Math.abs(pad - 114 * PM.spec.clear_space_unit / PM.spec.mark.h) < 0.2);
});

test("component accepts no style, class, filter or transform input", () => {
  const out = PM.html({ height: 80, style: "filter:blur(2px)", className: "x", filter: "grayscale(1)", transform: "rotate(3deg)", opacity: 0.5 });
  assert.doesNotMatch(out, /blur|grayscale|rotate|opacity|class="x"/);
  assert.equal((out.match(/style="/g) || []).length, 1, "only the wrapper's clear-space padding");
});

test("language switches the name where a master exists, falls back to English otherwise", () => {
  assert.match(PM.resolve({ lang: "hi" }).src, /_hin_/);
  assert.match(PM.resolve({ lang: "en" }).src, /_eng_/);
  assert.match(PM.resolve({ lang: "te" }).src, /_eng_/);
});

test("logo link has the accessible name 'Pashu Mitra – Home'", () => {
  assert.match(PM.link({ context: "header" }), /aria-label="Pashu Mitra – Home"/);
});

test("no code renders a logo master outside logo.js; no CSS filters/transforms/shadows on logos", () => {
  for (const f of ["app.js", "shell.js", "info-pages.js", "call.js", "index.html"]) {
    assert.doesNotMatch(read(f), /<img[^>]*brand\/pashumitra_/, f + " must use PMLogo");
  }
  const css = read("style.css") + read("dbim-tokens.css");
  for (const m of css.matchAll(/([^{}]*\.pm-logo[^{}]*)\{([^{}]*)\}/g)) {
    assert.doesNotMatch(m[2], /filter|transform|box-shadow|text-shadow|opacity|border|outline(?!-offset)/, m[1]);
  }
});

test("header logo is rendered in the black tone via PMLogo (shell.js)", () => {
  assert.match(read("shell.js"), /PMLogo\.html\(\{[^}]*context:\s*"header"/);
});
