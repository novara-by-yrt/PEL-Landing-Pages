#!/usr/bin/env node
/**
 * Guards the treatment hero images.
 *
 * Two failure modes this catches, both of which have already happened once:
 *
 *  1. An SVG hero. next/image refuses to optimise SVG unless
 *     `images.dangerouslyAllowSVG` is set, which it deliberately is not —
 *     remote SVGs can carry script, and these are fetched from a third-party
 *     origin. Any .svg hero therefore 400s at the optimiser and can never
 *     render. Twenty-nine treatments shipped in exactly that state.
 *
 *  2. A local hero whose file is not in public/ — a typo or a deleted asset.
 *
 * It also reports how many heroes still depend on the WordPress origin, which
 * is the thing that has to be resolved before the old site is switched off.
 *
 *   node scripts/check-hero-images.js             # check, exit 1 on failure
 *   node scripts/check-hero-images.js --manifest  # rewrite the manifest
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const META = path.join(ROOT, "content", "treatment-meta.json");
const MANIFEST = path.join(ROOT, "content", "uploads-hero-manifest.txt");

const meta = JSON.parse(fs.readFileSync(META, "utf8"));
const entries = Object.entries(meta);

const svg = [];
const missing = [];
const remote = [];

for (const [slug, value] of entries) {
  const hero = value.heroImage || "";
  if (!hero) {
    missing.push(`${slug}: no heroImage at all`);
    continue;
  }
  if (/\.svg$/i.test(hero)) {
    svg.push(`${slug}: ${hero}`);
    continue;
  }
  if (hero.startsWith("/uploads/")) {
    remote.push([slug, hero]);
    continue;
  }
  if (!fs.existsSync(path.join(ROOT, "public", decodeURIComponent(hero)))) {
    missing.push(`${slug}: ${hero} is not in public/`);
  }
}

if (process.argv.includes("--manifest")) {
  const files = [...new Set(remote.map(([, h]) => h))].sort();
  const rows = remote
    .map(([slug, h]) => `${h.replace("/uploads/", "")}  <- ${slug}`)
    .sort();
  fs.writeFileSync(
    MANIFEST,
    `# Treatment hero images still served from the WordPress origin
#
# Every path below is fetched from UPLOADS_ORIGIN (next.config.ts) rather than
# from public/. When the old site is switched off these become 404s, and each
# one breaks BOTH the /treatments card and the hero of the treatment page
# itself -- TreatmentHero renders a bare next/image with no fallback.
#
# Before go-live: copy these ${files.length} files into public/uploads/ (preserving the
# date folders), or repoint UPLOADS_ORIGIN at wherever they end up.
#
# ${files.length} distinct files, used by ${remote.length} treatments.
# Regenerate: node scripts/check-hero-images.js --manifest

${files.map((f) => f.replace("/uploads/", "")).join("\n")}

# --- which treatment uses which ---
${rows.map((r) => `# ${r}`).join("\n")}
`,
  );
  console.log(`Manifest written: ${files.length} files, ${remote.length} treatments.`);
}

console.log(`Treatments: ${entries.length}`);
console.log(`  local heroes (ship with the repo): ${entries.length - remote.length}`);
console.log(`  heroes from the WordPress origin:  ${remote.length}`);

if (svg.length) {
  console.error(`\n${svg.length} hero(es) are SVG and cannot be rendered by next/image:`);
  svg.forEach((s) => console.error(`  - ${s}`));
}
if (missing.length) {
  console.error(`\n${missing.length} hero(es) point at a file that is not there:`);
  missing.forEach((s) => console.error(`  - ${s}`));
}

if (svg.length || missing.length) process.exit(1);
console.log("\nOK — no SVG heroes, no missing local files.");
