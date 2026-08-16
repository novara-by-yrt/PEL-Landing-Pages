#!/usr/bin/env node
/**
 * Migration safety net: does every URL the old site publishes still resolve
 * on the new one?
 *
 * A page that 404s the day the switch happens loses whatever ranking and
 * inbound links it had accumulated, and nothing in the new codebase can tell
 * you which pages those are — the answer lives on the live site and in Search
 * Console. This takes that list and reports, per URL, whether the new site
 * answers it, answers it after a redirect, or does not answer it at all.
 *
 *   node scripts/check-legacy-urls.js old-urls.txt --base http://localhost:3000
 *
 * old-urls.txt is one URL per line — full URLs or paths, blank lines and
 * lines starting with # ignored. An XML sitemap or a CSV exported from Search
 * Console works too; anything that looks like a URL is extracted, so you can
 * pass the file as it came out of the tool.
 *
 * Writes two files next to the input:
 *   legacy-url-report.csv    every URL, its status, and where it ended up
 *   legacy-redirects.suggested.json
 *       the URLs that 404, in the shape content/legacy-redirects.json uses,
 *       with destinations left blank for you to fill in. Merge it into that
 *       file and next.config.ts serves them as 301s.
 *
 * Exit code is 1 when anything 404s, so CI can gate a launch on it.
 */

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const baseIdx = args.indexOf("--base");
const BASE = (baseIdx !== -1 ? args[baseIdx + 1] : "http://localhost:3000").replace(/\/$/, "");
const CONCURRENCY = Number(args[args.indexOf("--concurrency") + 1]) || 8;

if (!file) {
  console.error("usage: node scripts/check-legacy-urls.js <url-list> [--base URL] [--concurrency N]");
  process.exit(2);
}

/* Accepts a plain list, an XML sitemap, or a Search Console CSV — pull anything
   URL-shaped out and let the de-duplication sort out the rest. */
function extractPaths(text) {
  const out = new Set();
  const push = (raw) => {
    let u = raw.trim().replace(/^["'<]|["'>,]$/g, "");
    if (!u || u.startsWith("#")) return;
    try {
      const parsed = u.startsWith("http") ? new URL(u) : new URL(u, "https://placeholder.invalid");
      // Query strings and fragments are not separate pages to redirect.
      let p = parsed.pathname;
      if (p.length > 1) p = p.replace(/\/+$/, "");
      out.add(p || "/");
    } catch {
      /* not a URL */
    }
  };
  const locs = text.match(/<loc>([\s\S]*?)<\/loc>/gi);
  if (locs) locs.forEach((l) => push(l.replace(/<\/?loc>/gi, "")));
  text.split(/[\s,;]+/).forEach((tok) => {
    if (/^https?:\/\//i.test(tok) || /^\//.test(tok)) push(tok);
  });
  return [...out].sort();
}

async function check(p) {
  const url = BASE + p;
  try {
    // Follow redirects so the verdict is about where the visitor lands, not
    // about the first hop. A 301 that ends in a 404 is still a lost page.
    const res = await fetch(url, { redirect: "follow", headers: { "user-agent": "legacy-url-check" } });
    const landed = new URL(res.url).pathname;
    return {
      path: p,
      status: res.status,
      redirected: res.redirected,
      landed,
      verdict:
        res.status === 404 ? "MISSING" :
        res.status >= 500 ? "SERVER_ERROR" :
        res.status >= 400 ? `HTTP_${res.status}` :
        res.redirected ? "OK_REDIRECT" : "OK",
    };
  } catch (err) {
    return { path: p, status: 0, redirected: false, landed: "", verdict: "UNREACHABLE", error: String(err.message || err) };
  }
}

async function pool(items, n, fn) {
  const results = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        results[idx] = await fn(items[idx]);
      }
    }),
  );
  return results;
}

(async () => {
  const paths = extractPaths(fs.readFileSync(file, "utf8"));
  if (!paths.length) {
    console.error(`No URLs found in ${file}`);
    process.exit(2);
  }
  console.log(`Checking ${paths.length} old URLs against ${BASE}\n`);

  const results = await pool(paths, CONCURRENCY, check);

  const by = (v) => results.filter((r) => r.verdict === v);
  const missing = by("MISSING");
  const errored = results.filter((r) => ["SERVER_ERROR", "UNREACHABLE"].includes(r.verdict) || r.verdict.startsWith("HTTP_"));

  for (const [label, rows] of [
    ["Resolve directly", by("OK")],
    ["Resolve via redirect", by("OK_REDIRECT")],
    ["MISSING (404)", missing],
    ["Errors", errored],
  ]) {
    console.log(`${String(rows.length).padStart(5)}  ${label}`);
  }

  if (missing.length) {
    console.log("\nURLs with no home on the new site — each of these loses its traffic:");
    missing.forEach((r) => console.log("   404  " + r.path));
  }
  if (errored.length) {
    console.log("\nURLs that errored:");
    errored.forEach((r) => console.log(`   ${r.status || r.verdict}  ${r.path}`));
  }

  const dir = path.dirname(path.resolve(file));
  const csv = ["old_url,status,redirected,landed_on,verdict"]
    .concat(results.map((r) => [r.path, r.status, r.redirected, r.landed, r.verdict].join(",")))
    .join("\n");
  fs.writeFileSync(path.join(dir, "legacy-url-report.csv"), csv + "\n");

  if (missing.length) {
    const stub = { redirects: Object.fromEntries(missing.map((r) => [r.path, ""])) };
    fs.writeFileSync(path.join(dir, "legacy-redirects.suggested.json"), JSON.stringify(stub, null, 2) + "\n");
    console.log(`\nWrote legacy-url-report.csv and legacy-redirects.suggested.json to ${dir}`);
    console.log("Fill in each destination, merge into content/legacy-redirects.json, rebuild.");
  } else {
    console.log(`\nWrote legacy-url-report.csv to ${dir}. Nothing is missing.`);
  }

  process.exit(missing.length ? 1 : 0);
})();
