#!/usr/bin/env node
/**
 * Master Post-Processor for Skynology MDX content.
 * 1. Consolidates treatment-info tables into single consolidated <table> elements with perfect Label-Value alignment.
 * 2. Decodes base64 HTML blocks (Dr Sabrina box, 3-step consultation, logos).
 * 3. Cleans up leftover shortcode tags, WP classes, and internal URLs.
 *
 * Usage: node scripts/post-process-mdx.js
 */

const fs = require('fs');
const path = require('path');

const KNOWN_LABELS = [
  'Procedure Time', 'Duration',
  'Return to Work',
  'Anaesthesia', 'Anesthesia',
  'Hospital stay', 'Hospital Stay', 'Clinic stay',
  'Excercise', 'Exercise',
  'Final results', 'Final Results',
  'Pre admission tests', 'Pre-admission tests', 'Pre admission test', 'Pre Admission tests',
  'Addresses',
  'Down time', 'Downtime',
  'Driving'
];
KNOWN_LABELS.sort((a, b) => b.length - a.length);

/**
 * Decode Base64 encoded strings in content (Salient VC raw_content blocks).
 */
function decodeBase64Blobs(content) {
  if (!content) return '';

  return content.replace(/(?:JTV|JTND)[A-Za-z0-9+/=]{20,}|[A-Za-z0-9+/=]{40,}/g, (match) => {
    try {
      const decodedBuf = Buffer.from(match, 'base64').toString('utf-8');
      if (decodedBuf.includes('%3C') || decodedBuf.includes('%5B') || decodedBuf.includes('<')) {
        let decoded = decodeURIComponent(decodedBuf);
        decoded = decoded.replace(/\[recent_posts_carousel\]/gi, '');
        return decoded;
      }
    } catch (e) {
      // Ignore non-base64 strings
    }
    return match;
  });
}

/**
 * Consolidates single-row treatment-info tables into unified <table> blocks
 * with accurate Label-Value pairing.
 */
function consolidateTreatmentTables(content) {
  const trMatches = [...content.matchAll(/<tr>\s*<td>\s*<strong>([^<]+)<\/strong>\s*<\/td>\s*<td>\s*([\s\S]*?)\s*<\/td>\s*<\/tr>/gi)];
  if (trMatches.length === 0) return content;

  const rawItems = trMatches.map(m => ({ label: m[1].trim(), value: m[2].trim() }));

  // Re-align shifted items so Label 0 is Procedure Time/Duration, Label 1 is previous item's label, etc.
  const aligned = [];
  for (let i = 0; i < rawItems.length; i++) {
    let label = 'Procedure Time';
    if (i > 0 && rawItems[i - 1].label && rawItems[i - 1].label !== 'Down time' && rawItems[i - 1].label !== 'Downtime') {
      label = rawItems[i - 1].label;
    }
    const value = rawItems[i].value;
    if (label && value) {
      aligned.push({ label, value });
    }
  }

  if (aligned.length === 0) return content;

  // Split content by table boundaries and replace
  const firstTableIdx = content.search(/<table class="treatment-info">/i);
  const lastTableEndIdx = content.lastIndexOf('</table>');

  if (firstTableIdx === -1 || lastTableEndIdx === -1) return content;

  let prefix = content.substring(0, firstTableIdx).trimEnd();
  // Remove orphan <span>Duration</span> or <span>Procedure Time</span> before table
  prefix = prefix.replace(/<span[^>]*>(?:Duration|Procedure Time)<\/span>\s*$/gi, '').trimEnd();

  const suffix = content.substring(lastTableEndIdx + '</table>'.length);

  const rowsHtml = aligned.map(({ label, value }) => `  <tr><td><strong>${label}</strong></td><td>${value}</td></tr>`).join('\n');
  const consolidatedTable = `\n\n<table class="treatment-info">\n<tbody>\n${rowsHtml}\n</tbody>\n</table>\n\n`;

  return prefix + consolidatedTable + suffix;
}

/**
 * Master post-processing pipeline
 */
function processContent(content) {
  let clean = content;

  // 1. Decode base64 blocks (Dr Sabrina box, 3-step consultation, logos)
  clean = decodeBase64Blobs(clean);

  // 2. Consolidate and align treatment info tables
  clean = consolidateTreatmentTables(clean);

  // 3. Remove visual wrapper shortcodes (WPBakery / Salient)
  clean = clean.replace(/\[\/carousel\]/gi, '');
  clean = clean.replace(/\[carousel[^\]]*\]/gi, '');
  clean = clean.replace(/\[\/page_submenu\]/gi, '');
  clean = clean.replace(/\[page_submenu[^\]]*\]/gi, '');
  clean = clean.replace(/\[\/clients\]/gi, '');
  clean = clean.replace(/\[clients[^\]]*\]/gi, '');
  clean = clean.replace(/\[recent_posts_carousel\]/gi, '');

  // 4. Convert fancy-ul
  clean = clean.replace(/\[fancy-ul[^\]]*\]([\s\S]*?)\[\/fancy-ul\]/gi, '<ul>$1</ul>');

  // 5. Convert toggles
  clean = clean.replace(/\[toggles[^\]]*\]/gi, '');
  clean = clean.replace(/\[\/toggles\]/gi, '');
  clean = clean.replace(
    /\[toggle[^\]]*title="([^"]*)"[^\]]*\]([\s\S]*?)\[\/toggle\]/gi,
    '<details><summary>$1</summary><div>$2</div></details>'
  );

  // 6. Strip any remaining orphan shortcode tags
  clean = clean.replace(/\[[a-z_-]+[^\]]*\]([\s\S]*?)\[\/[a-z_-]+\]/gi, '$1');
  clean = clean.replace(/\[\/?[a-z_-]+[^\]]*\]/gi, '');

  // ── 7. Strip Gutenberg block comments ────────────────────────────────
  // <!-- wp:paragraph -->, <!-- /wp:paragraph -->, <!-- wp:heading {"level":3} -->,
  // <!-- wp:rank-math/faq-block {"questions":[...]} -->, etc.
  // Use [\s\S]*? to handle nested JSON objects (e.g. arrays of objects)
  clean = clean.replace(/<!--\s*\/?wp:[a-z-]+(?:\/[a-z-]+)?(?:\s+\{[\s\S]*?\})?\s*-->\s*\n?/gi, '');

  // ── 8. Strip WordPress block CSS classes ─────────────────────────────
  // class="wp-block-heading", class="wp-block-list", class="wp-block-image", etc.
  clean = clean.replace(/\s+class="wp-block-[^"]*"/gi, '');

  // ── 9. URL Rewriting & Thumbnail Dimension Removal ───────────────────
  // localhost with any port (8888, 3000, etc.)
  clean = clean.replace(/https?:\/\/localhost:\d+\/skynology\/wp-content\/uploads\//gi, '/uploads/');
  // localhost without port (port 80)
  clean = clean.replace(/https?:\/\/localhost\/skynology\/wp-content\/uploads\//gi, '/uploads/');
  clean = clean.replace(/https?:\/\/(www\.)?skynology\.com\/wp-content\/uploads\//gi, '/uploads/');
  clean = clean.replace(/\/wp-content\/uploads\//g, '/uploads/');

  // Internal page links (with or without trailing slash)
  clean = clean.replace(/https?:\/\/localhost:\d+\/skynology(?=\/|["']|$)/gi, '');
  clean = clean.replace(/https?:\/\/localhost\/skynology(?=\/|["']|$)/gi, '');
  clean = clean.replace(/https?:\/\/(www\.)?skynology\.com\//gi, '/');

  // perfecteyesltd.com links → keep as-is (external service)

  // Strip WP thumbnail dimension suffix e.g. /uploads/2018/10/photo-600x400.jpg -> /uploads/2018/10/photo.jpg
  clean = clean.replace(/(\/uploads\/[^\s"'\)]+)-\d+x\d+(\.[a-zA-Z0-9]+)/gi, '$1$2');

  // ── 10. Sanitize HTML for MDX ────────────────────────────────────────
  clean = clean.replace(/\s+style="[^"]*"/gi, '');
  clean = clean.replace(/\s+style='[^']*'/gi, '');
  clean = clean.replace(/\s+on[a-z]+="[^"]*"/gi, '');
  clean = clean.replace(/<(b|strong|span|em|i)>\s*<\/\1>/gi, '');
  clean = clean.replace(/\s+class="[^"]*(?:aligncenter|wp-image-\d+)[^"]*"/gi, '');

  // ── 11. Decode HTML entities ─────────────────────────────────────────
  clean = clean.replace(/&nbsp;/g, ' ');

  // ── 12. Clean up empty paragraphs & excessive line breaks ────────────
  clean = clean.replace(/<p>\s*<\/p>/gi, '');
  clean = clean.replace(/\n{3,}/g, '\n\n');
  clean = clean.trim();

  return clean;
}

// ── Main Execution ─────────────────────────────────────────────────────────

const CONTENT_DIR = path.join(__dirname, '..', 'content');

let processed = 0;
let unchanged = 0;

function walkDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith('.mdx')) {
      const raw = fs.readFileSync(fullPath, 'utf-8');

      const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!fmMatch) {
        unchanged++;
        continue;
      }

      let frontmatter = fmMatch[1];
      const content = fmMatch[2];

      // Fix featuredImage thumbnail path in frontmatter
      frontmatter = frontmatter.replace(/(featuredImage:\s*["']?\/uploads\/[^\s"'\)]+)-\d+x\d+(\.[a-zA-Z0-9]+)/gi, '$1$2');

      // Rewrite localhost URLs in frontmatter (canonicalUrl, etc.)
      frontmatter = frontmatter.replace(/https?:\/\/localhost:\d+\/skynology\//gi, '/');
      frontmatter = frontmatter.replace(/https?:\/\/localhost\/skynology\//gi, '/');

      const processedContent = processContent(content);

      if (processedContent !== content || frontmatter !== fmMatch[1]) {
        const output = `---\n${frontmatter}\n---\n${processedContent}\n`;
        fs.writeFileSync(fullPath, output, 'utf-8');
        processed++;
      } else {
        unchanged++;
      }
    }
  }
}

console.log('🔄 Running master MDX post-processing...\n');
walkDir(CONTENT_DIR);
console.log(`\n🎉 Complete! Processed: ${processed} files, Unchanged: ${unchanged} files.`);
