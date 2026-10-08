#!/usr/bin/env node
/* Image size budgets (DBIM 6, 5.5): banners/backgrounds <= 500 KB, thumbnails <= 100 KB,
 * logos <= 100 KB, any other raster <= 5 MB. Exit 1 on a breach (CI). */
import { readdirSync, statSync } from "node:fs";
import { join, extname, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..", "frontend");
const KB = 1024, ext = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico"]);
const limit = p => /pashumitra_|favicon|logo/i.test(p) ? 100 * KB : /thumb/i.test(p) ? 100 * KB : /banner|hero|background/i.test(p) ? 500 * KB
  : /icon-|apple-touch|social-/i.test(p) ? 500 * KB : 5 * 1024 * KB;
let bad = 0, n = 0;
(function walk(d) {
  for (const f of readdirSync(d)) {
    if (["node_modules", "models", "wasm", "vendor", "tests"].includes(f)) continue;
    const p = join(d, f), st = statSync(p);
    if (st.isDirectory()) { walk(p); continue; }
    if (!ext.has(extname(f).toLowerCase())) continue;
    n++; const lim = limit(relative(root, p));
    if (st.size > lim) { bad++; console.error(`FAIL ${relative(root, p)} ${(st.size / KB).toFixed(0)} KB > ${(lim / KB).toFixed(0)} KB`); }
  }
})(root);
console.log(`${n} images checked, ${bad} over budget`);
process.exit(bad ? 1 : 0);
