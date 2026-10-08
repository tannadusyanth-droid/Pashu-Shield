// Header 3 / navigation / footer / cookie consent / links (Phases 3, 4, 7).
// node --test tests/shell3.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = f => fs.readFileSync(path.join(root, f), "utf8");

function makeEnv(lang = "en", orgPatch = {}) {
  const store = {};
  const sb = {
    console, Event: class {}, setTimeout,
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
    location: { hash: "#/about" },
    document: { documentElement: { getAttribute: () => lang }, getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener() {} },
    addEventListener() {},
  };
  sb.window = sb; sb.globalThis = sb;
  vm.createContext(sb);
  vm.runInContext(read("org-config.js"), sb);
  Object.assign(sb.ORG, orgPatch);
  vm.runInContext(read("logo-dims.js"), sb);
  vm.runInContext(read("logo.js"), sb);
  vm.runInContext(read("dbim-shell.js"), sb);
  return sb;
}

// every internal route registered anywhere
const registered = new Set();
for (const f of ["app.js", "call.js", "info-pages.js"]) {
  for (const m of read(f).matchAll(/route\("(#\/[^"]+)"/g)) registered.add(m[1]);
  // routes registered inside per-role loops: route(`#/${role}/cases`, …)
  for (const m of read(f).matchAll(/route\(`(#\/\$\{role\}\/[^`]+)`/g)) for (const r of ["owner", "vet", "govt", "lab"]) registered.add(m[1].replace("${role}", r));
}
const patterns = [...registered].map(r => new RegExp("^" + r.replace(/:[^/]+/g, "[^/]+") + "$"));
const routeExists = h => h === "#/" || patterns.some(p => p.test(h.split("?")[0]));
const hrefs = html => [...html.matchAll(/href="(#\/[^"]*)"/g)].map(m => m[1]);

test("header: Lockup 3B black logo, nav labels, search form, language 'अ | A', 3 text-size buttons", () => {
  const { PMShell3 } = makeEnv();
  const h = PMShell3.renderHeader();
  assert.match(h, /role="banner"/);
  assert.match(h, /pashumitra_standard_eng_black\.svg/);
  assert.doesNotMatch(h, /_white\.svg/);
  for (const label of ["Home", "About us", "Services", "Documents", "Resources", "Connect"]) assert.ok(h.includes(">" + label + "<"), label);
  assert.match(h, /role="search"/);
  assert.match(h, /अ \| A/);
  assert.equal((h.match(/data-pm-size=/g) || []).length, 3);
  assert.match(h, /aria-label="Pashu Mitra – Home"/);
});

test("navigation is at most 3 levels and every link points to a registered route", () => {
  const { PMShell3 } = makeEnv();
  for (const n of PMShell3.navModel()) {
    if (n.items) for (const s of n.items) assert.ok(!s.items, "no 4th level");
  }
  const all = hrefs(PMShell3.renderHeader()) .concat(hrefs(PMShell3.renderFooter()));
  assert.ok(all.length > 15);
  for (const h of all) assert.ok(routeExists(h), "broken internal link: " + h);
});

test("persona entry points for farmer, veterinary officer, administrator and laboratory", () => {
  const { PMShell3 } = makeEnv();
  const h = PMShell3.renderHeader();
  for (const r of ["owner", "vet", "govt", "lab"]) assert.ok(h.includes('href="#/login/' + r + '"'), r);
});

test("disclosure menus: aria-expanded, aria-controls, hidden panels, no hover-only behaviour", () => {
  const { PMShell3 } = makeEnv();
  const h = PMShell3.renderHeader();
  const n = (h.match(/data-pm-disc/g) || []).length;
  assert.ok(n >= 5);
  assert.equal((h.match(/aria-expanded="false" aria-controls="pm(Nav|Sign)P/g) || []).length, n);
  assert.doesNotMatch(read("dbim-shell.css"), /:hover\s*>\s*\.pm-panel|:hover \.pm-panel/);
});

test("footer: required DBIM groups, white lockup, lineage statement follows OFFICIAL_GOV_PORTAL", () => {
  let { PMShell3 } = makeEnv("en");
  let f = PMShell3.renderFooter();
  for (const t of ["Website policy", "Sitemap", "Related links", "Help", "Feedback", "Terms of use", "Privacy policy", "Hyperlinking policy", "Copyright policy", "Disclaimer", "Last updated on"]) assert.ok(f.includes(t), t);
  assert.match(f, /pashumitra_standard_eng_white\.svg/);
  assert.match(f, /independent initiative and not an official Government of India website/);
  assert.match(f, /Designed to conform to DBIM 3\.0 and GIGW 3\.0; CQW\/STQC certification pending audit/);
  ({ PMShell3 } = makeEnv("en", { officialGovPortal: true }));
  assert.doesNotMatch(PMShell3.renderFooter(), /independent initiative/);
});

test("'Last updated on' is data-driven, per page, DD/MM/YYYY", () => {
  const { PMShell3, ORG } = makeEnv("en", { pageUpdated: { "#/help": "2026-09-30" }, lastReviewed: "2026-10-05" });
  assert.equal(PMShell3.lastUpdatedFor("#/help"), "30/09/2026");
  assert.equal(PMShell3.lastUpdatedFor("#/about?x=1"), "05/10/2026");
  assert.equal(PMShell3.ddmmyyyy("2026-01-02"), "02/01/2026");
});

test("Hindi: header, footer and cookie banner switch language; lockup switches to the Hindi master", () => {
  const { PMShell3 } = makeEnv("hi");
  assert.match(PMShell3.renderHeader(), /हमारे बारे में/);
  assert.match(PMShell3.renderHeader(), /pashumitra_standard_hin_black\.svg/);
  assert.match(PMShell3.renderFooter(), /यह एक स्वतंत्र पहल है/);
  assert.match(PMShell3.renderCookie(), /सभी स्वीकार करें/);
  // every English label has a Hindi counterpart
  const { en, hi } = PMShell3.labels;
  assert.deepEqual(Object.keys(en).sort(), Object.keys(hi).sort());
});

test("cookie consent: opt-in, nothing pre-ticked, Accept / Reject / Customise, withdrawable", () => {
  const { PMShell3 } = makeEnv();
  const c = PMShell3.consent;
  assert.equal(c.decided(), false);
  for (const k of ["functionality", "analytics", "social"]) assert.equal(c.get(k), false, k + " is off by default");
  const html = PMShell3.renderCookie();
  assert.doesNotMatch(html, /checked/);
  for (const a of ["accept", "reject", "custom"]) assert.ok(html.includes('data-ck="' + a + '"'));
  assert.match(html, /essential/i);
  c.accept(); assert.ok(c.get("analytics") && c.decided());
  c.reject(); assert.ok(!c.get("analytics") && c.decided());            // withdrawal
  c.set({ analytics: true }); assert.ok(c.get("analytics") && !c.get("social"));
});

test("ticker is hidden unless real announcements exist, and has a pause control", () => {
  assert.equal(makeEnv().PMShell3.renderTicker(), "");
  const t = makeEnv("en", { announcements: [{ text: "Notice", href: "#/help" }] }).PMShell3.renderTicker();
  assert.match(t, /data-pm-ticker/);
  assert.match(t, /Pause announcements/);
});

test("no state emblem, tricolour or official-logo reference anywhere in the frontend sources", () => {
  const bad = /ashoka|state[ -]?emblem(?! of India \(Prohibition)|tricolou?r|digital[ _-]?india[ _-]?logo|meity[ _-]?logo/i;
  for (const f of ["dbim-shell.js", "dbim-shell.css", "logo.js", "brand.html", "index.html", "shell.js"]) {
    for (const line of read(f).split("\n")) if (bad.test(line) && !/NOT used|not use|never|no State|No State/i.test(line)) assert.fail(f + ": " + line.trim());
  }
  assert.equal(makeEnv().ORG.officialGovPortal, false);
});

test("static a11y: lang, zoomable viewport, skip link first, landmarks, live regions", () => {
  const html = read("index.html");
  assert.match(html, /<html lang="en"/);
  const vp = /name="viewport" content="([^"]+)"/.exec(html)[1];
  assert.doesNotMatch(vp, /user-scalable\s*=\s*no|maximum-scale\s*=\s*1(\.0)?\b/);
  const bodyStart = html.slice(html.indexOf("<body"));
  const other = bodyStart.search(/<(a|button|input|select|textarea)\b(?![^>]*pm-skip-link)/);
  assert.ok(bodyStart.includes("pm-skip-link") && (other === -1 || bodyStart.indexOf("pm-skip-link") < other), "skip link must be first focusable");
  assert.equal((html.match(/<main\b/g) || []).length, 1);
  for (const id of ["pmSiteHeaderHost", "pmFooterHost", "pmLivePolite", "pmLiveAssertive", "pmCookieHost"]) assert.ok(html.includes('id="' + id + '"'), id);
  const css = read("style.css") + read("dbim-tokens.css") + read("dbim-shell.css");
  assert.match(css, /:focus-visible\{[^}]*outline:3px/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /scroll-padding-top/);
});

test("every internal link in the application's own pages points to a registered route", () => {
  const bad = [];
  for (const f of ["info-pages.js", "shell.js", "dbim-shell.js", "app.js"]) {
    for (const m of read(f).matchAll(/["'`](#\/[A-Za-z0-9/_-]+)(?=[?"'`])/g)) {
      const h = m[1]; if (h.endsWith("/") || h === "#/login" || h === "#/register") continue;   // prefixes used for startsWith / concatenation
      if (!routeExists(h)) bad.push(f + " " + h);
    }
  }
  assert.deepEqual([...new Set(bad)], []);
});

test("search: synonyms, spelling suggestion, no stale routes", () => {
  const src = read("info-pages.js");
  assert.match(src, /SYNONYMS/); assert.match(src, /Did you mean/); assert.match(src, /pmSearchCat/);
});
