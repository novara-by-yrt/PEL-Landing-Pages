#!/usr/bin/env node
/**
 * Skynology WordPress → Next.js MDX Migration Script
 *
 * Connects to the local MySQL database and exports all published content
 * (pages, posts, before-after CPT, eye-condition CPT) as .mdx files with
 * structured frontmatter mapped from:
 *   - wp_posts core fields
 *   - Rank Math SEO meta (rank_math_title, rank_math_description, etc.)
 *   - ACF fields (faqqa repeater, meta_og_type, product_schema_needed)
 *   - wp_terms (categories, tags)
 *   - Featured image (wp_postmeta _thumbnail_id → attachment URL)
 *
 * Usage:
 *   node scripts/migrate-wp-to-mdx.js
 *
 * Output:
 *   content/pages/*.mdx
 *   content/posts/*.mdx
 *   content/before-after/*.mdx
 *   content/eye-condition/*.mdx
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// ─── Config ───────────────────────────────────────────────────────────────────

const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'skynology',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock', // MAMP socket
};

// Post types to migrate → folder name mapping
const POST_TYPE_MAP = {
  page: 'pages',
  post: 'posts',
  'before-after': 'before-after',
  'eye-condition': 'eye-condition',
};

// Output root
const OUTPUT_DIR = path.join(process.cwd(), 'content');

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Sanitise a string for use as a YAML value.
 */
function yamlStr(value) {
  if (!value) return '""';
  const escaped = String(value)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, ' ')
    .trim();
  return `"${escaped}"`;
}

/**
 * Convert WPBakery / Salient shortcodes into clean semantic HTML.
 *
 * Instead of just stripping shortcode tags (which leaves orphan closing tags
 * and loses structured data), this converts recognised shortcodes into
 * meaningful HTML before removing any remaining shortcode syntax.
 */
function stripShortcodes(content) {
  if (!content) return '';

  let clean = content;

  // ── 1. Decode base64-encoded blobs (Salient's "raw_content" blocks) ────
  // These look like random base64 strings inline — e.g. JTNDZGl2...JTNFCg==
  clean = clean.replace(/(?<=>|^|\n)([A-Za-z0-9+/=]{40,})(?=<|$|\n)/g, (match) => {
    try {
      const decoded = decodeURIComponent(
        Buffer.from(match, 'base64').toString('utf-8')
          .replace(/%(?![0-9A-Fa-f]{2})/g, '%25')
      );
      // Only use decoded content if it looks like HTML
      if (decoded.includes('<') && decoded.includes('>')) return decoded;
      return match;
    } catch {
      return match;
    }
  });

  // ── 2. Remove self-closing shortcodes like [vc_empty_space /] ─────────
  clean = clean.replace(/\[([a-z_]+)[^\]]*\/\]/gi, '');

  // ── 3. Remove VC/Nectar structural wrapper tags (keep inner content) ──
  for (let i = 0; i < 10; i++) {
    const before = clean;
    clean = clean.replace(
      /\[\/?(vc_[a-z_]+|nectar_[a-z_]+|icon_list_item|icon_list|tab|tabs|section|col|row|split_line_heading|nectar_highlighted_text|divider|image_with_animation|recent_posts|testimonial_slider|testimonial|nectar_video_lightbox|team_member|nectar_icon|button|pricing_table|pricing_column|milestone|nectar_cta|nectar_single_testimonial|nectar_star_rating|nectar_badge|nectar_gradient_text)[^\]]*\]/gi,
      ''
    );
    if (clean === before) break;
  }

  // ── 4. Convert [text-with-icon]...[/text-with-icon] sequences ─────────
  // These are treatment info grids. Pattern after VC stripping:
  //   <value html>[/text-with-icon]<label text>
  // They come in sequences, so we collect all items and build an HTML table.
  clean = convertTextWithIconBlocks(clean);

  // ── 5. Strip [carousel] and [/carousel] wrappers ──────────────────────
  // Carousel is just a visual wrapper in Salient. Keep the content inside.
  clean = clean.replace(/\[\/carousel\]/gi, '');
  clean = clean.replace(/\[carousel[^\]]*\]/gi, '');

  // ── 6. Strip [page_submenu] / [/page_submenu] ─────────────────────────
  clean = clean.replace(/\[\/page_submenu\]/gi, '');
  clean = clean.replace(/\[page_submenu[^\]]*\]/gi, '');

  // ── 7. Convert [fancy-ul] ─────────────────────────────────────────────
  // These wrap bullet lists; the inner content is usually <li> items
  clean = clean.replace(/\[fancy-ul[^\]]*\]([\s\S]*?)\[\/fancy-ul\]/gi, '<ul>$1</ul>');

  // ── 8. Strip [clients] (JS-driven logo slider) ────────────────────────
  clean = clean.replace(/\[\/clients\]/gi, '');
  clean = clean.replace(/\[clients[^\]]*\]/gi, '');

  // ── 9. Convert [toggles] into <details> elements ──────────────────────
  clean = clean.replace(/\[toggles[^\]]*\]/gi, '');
  clean = clean.replace(/\[\/toggles\]/gi, '');
  clean = clean.replace(
    /\[toggle[^\]]*title="([^"]*)"[^\]]*\]([\s\S]*?)\[\/toggle\]/gi,
    '<details><summary>$1</summary><div>$2</div></details>'
  );

  // ── 10. Final catch-all: remove any remaining shortcode tags ──────────
  // This handles anything we didn't explicitly convert above.
  // First try matched open/close pairs (keep inner content)
  clean = clean.replace(/\[[a-z_-]+[^\]]*\]([\s\S]*?)\[\/[a-z_-]+\]/gi, '$1');
  // Then remove any orphan opening or closing tags
  clean = clean.replace(/\[\/?[a-z_-]+[^\]]*\]/gi, '');

  // ── 11. Clean up excessive whitespace ─────────────────────────────────
  clean = clean.replace(/\n{3,}/g, '\n\n');
  clean = clean.trim();

  return clean;
}

/**
 * Convert sequences of [text-with-icon] content into a semantic HTML table.
 *
 * After VC opening tags are stripped, the pattern in the content is:
 *   <span><strong>Value</strong></span>[/text-with-icon]<span>Label</span>
 *
 * We extract label–value pairs and render them as a clean treatment info grid.
 */
function convertTextWithIconBlocks(content) {
  // Find regions that contain [/text-with-icon] sequences
  // Each item: everything between the previous boundary and [/text-with-icon],
  // followed by the label text up to the next item or end.
  const marker = '[/text-with-icon]';
  if (!content.includes(marker)) return content;

  // Split content into segments around text-with-icon blocks
  // We'll process each contiguous group of text-with-icon items
  const lines = content.split('\n');
  const result = [];
  let itemBuffer = [];
  let inBlock = false;

  for (const line of lines) {
    if (line.includes(marker)) {
      inBlock = true;
      // This line contains one or more text-with-icon items
      // Extract pairs from this line
      const pairs = extractTextWithIconPairs(line);
      itemBuffer.push(...pairs);
    } else {
      // Flush any accumulated items as a table
      if (inBlock && itemBuffer.length > 0) {
        result.push(buildTreatmentInfoTable(itemBuffer));
        itemBuffer = [];
        inBlock = false;
      }
      result.push(line);
    }
  }

  // Flush final block
  if (itemBuffer.length > 0) {
    result.push(buildTreatmentInfoTable(itemBuffer));
  }

  return result.join('\n');
}

/**
 * Extract label–value pairs from a line containing [/text-with-icon] markers.
 * Pattern: <value_html>[/text-with-icon]<label_html>
 */
function extractTextWithIconPairs(line) {
  const pairs = [];
  const marker = '[/text-with-icon]';

  // Remove wrapping <p> tags for processing
  let text = line.replace(/^\s*<p>\s*/i, '').replace(/\s*<\/p>\s*$/i, '');

  // Split on the marker
  const segments = text.split(marker);

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i].trim();
    if (!segment) continue;

    if (i < segments.length - 1) {
      // This segment is a value, the next segment starts with the label
      // But the label might be at the start of the next segment (before the next value)
      const value = stripTags(segment).trim();
      // The label will be at the start of the next segment
      // Look for: <span>Label</span> or <br><span>Label</span> at the start of next segment
      const nextSeg = (segments[i + 1] || '').trim();
      const labelMatch = nextSeg.match(/^(?:<br\s*\/?>)?\s*<span[^>]*>([^<]+)<\/span>/i);
      if (labelMatch && value) {
        pairs.push({ label: labelMatch[1].trim(), value });
      } else if (value) {
        // No clear label follows — might be the last item
        pairs.push({ label: '', value });
      }
    }
  }

  return pairs;
}

/**
 * Strip HTML tags from a string, keeping just the text.
 */
function stripTags(html) {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Build a clean HTML treatment info table from label–value pairs.
 */
function buildTreatmentInfoTable(items) {
  const filtered = items.filter(i => i.value);
  if (filtered.length === 0) return '';

  const rows = filtered.map(({ label, value }) => {
    if (label) {
      return `<tr><td><strong>${label}</strong></td><td>${value}</td></tr>`;
    }
    return `<tr><td colspan="2">${value}</td></tr>`;
  }).join('\n');

  return `<table class="treatment-info">\n<tbody>\n${rows}\n</tbody>\n</table>`;
}

/**
 * Sanitise raw HTML so it's safe for React/MDX rendering.
 * - Removes inline style="..." attributes (React expects objects, not strings)
 * - Removes on* event handler attributes
 * - Collapses multi-line HTML tags (MDX parser requires tags on same line)
 * - Unwraps unnecessary <span> nesting inside headings
 */
function sanitizeForMdx(content) {
  if (!content) return '';
  let clean = content;

  // Strip inline style attributes (double and single quotes)
  clean = clean.replace(/\s+style="[^"]*"/gi, '');
  clean = clean.replace(/\s+style='[^']*'/gi, '');

  // Strip event handlers like onclick, onmouseover etc.
  clean = clean.replace(/\s+on[a-z]+="[^"]*"/gi, '');

  // ── Rewrite WP URLs to Next.js paths ─────────────────────────────────
  // localhost:8888/skynology/wp-content/uploads/... → /uploads/...
  clean = clean.replace(
    /https?:\/\/localhost:\d+\/skynology\/wp-content\/uploads\//gi,
    '/uploads/'
  );
  // Production WP domain uploads (adjust domain as needed)
  clean = clean.replace(
    /https?:\/\/(www\.)?skynology\.com\/wp-content\/uploads\//gi,
    '/uploads/'
  );
  // Generic wp-content/uploads → /uploads/
  clean = clean.replace(/\/wp-content\/uploads\//g, '/uploads/');

  // Internal links: localhost:8888/skynology/some-page/ → /some-page/
  clean = clean.replace(
    /https?:\/\/localhost:\d+\/skynology\//gi,
    '/'
  );
  // Production internal links
  clean = clean.replace(
    /https?:\/\/(www\.)?skynology\.com\//gi,
    '/'
  );

  // Collapse multi-line opening/closing tags to a single line
  clean = clean.replace(/<([a-z][a-z0-9]*)[^>]*>\s*\n\s*(<[^>]+>)/gi, '<$1>$2');

  // Remove empty <span> wrappers that only wrap other tags (MDX strict mode issue)
  clean = clean.replace(/<(h[1-6])[^>]*>\s*<span[^>]*>\s*<span[^>]*>([\s\S]*?)<\/span>\s*<\/span>\s*<\/(h[1-6])>/gi, '<$1>$2</$3>');
  clean = clean.replace(/<(h[1-6])[^>]*>\s*<span[^>]*>([\s\S]*?)<\/span>\s*<\/(h[1-6])>/gi, '<$1>$2</$3>');

  // Fix: <h5><span>text\n</span></h5> - span split across lines in heading
  clean = clean.replace(/<(h[1-6]|p)[^>]*>\s*<span[^>]*>\s*([\s\S]*?)\n\s*<\/span>\s*<\/(h[1-6]|p)>/gi, (m, open, inner, close) => {
    return `<${open}>${inner.trim()}</${close}>`;
  });

  // Remove empty <b></b>, <strong></strong>, <span></span> tags
  clean = clean.replace(/<(b|strong|span|em|i)>\s*<\/\1>/gi, '');

  // Remove WP-specific class attributes like aligncenter, wp-image-NNNN
  clean = clean.replace(/\s+class="[^"]*(?:aligncenter|wp-image-\d+)[^"]*"/gi, '');

  return clean;
}

/**
 * Parse a serialised PHP array from wp_postmeta (basic string extraction).
 */
function parsePhpSerial(str) {
  if (!str || !str.startsWith('a:')) return null;
  try {
    const matches = [...str.matchAll(/s:\d+:"([^"]+)"/g)];
    return matches.map(m => m[1]);
  } catch {
    return null;
  }
}

/**
 * Build YAML frontmatter block from a data object.
 */
function buildFrontmatter(data) {
  const lines = ['---'];

  const addField = (key, value) => {
    if (value === null || value === undefined || value === '') return;
    lines.push(`${key}: ${value}`);
  };

  addField('title', yamlStr(data.title));
  addField('slug', `"${data.slug}"`);
  addField('date', `"${data.date}"`);
  addField('modified', `"${data.modified}"`);
  addField('postType', `"${data.postType}"`);

  if (data.featuredImage) addField('featuredImage', yamlStr(data.featuredImage));
  if (data.excerpt)       addField('excerpt', yamlStr(data.excerpt));

  if (data.categories?.length) {
    lines.push('categories:');
    data.categories.forEach(c => lines.push(`  - ${yamlStr(c)}`));
  }

  if (data.tags?.length) {
    lines.push('tags:');
    data.tags.forEach(t => lines.push(`  - ${yamlStr(t)}`));
  }

  if (data.author?.name) {
    lines.push('author:');
    addField('  name', yamlStr(data.author.name));
    if (data.author.slug) addField('  slug', `"${data.author.slug}"`);
  }

  // SEO block
  lines.push('seo:');
  addField('  title', yamlStr(data.seo.title || data.title));
  addField('  description', yamlStr(data.seo.description));
  if (data.seo.focusKeyword) addField('  focusKeyword', yamlStr(data.seo.focusKeyword));
  if (data.seo.canonicalUrl) addField('  canonicalUrl', yamlStr(data.seo.canonicalUrl));
  if (data.seo.robots?.length) {
    lines.push('  robots:');
    data.seo.robots.forEach(r => lines.push(`    - "${r}"`));
  }
  if (data.seo.isPillar) addField('  isPillar', 'true');
  if (data.seo.og?.title || data.seo.og?.description || data.seo.og?.type) {
    lines.push('  og:');
    if (data.seo.og.title)       addField('    title', yamlStr(data.seo.og.title));
    if (data.seo.og.description) addField('    description', yamlStr(data.seo.og.description));
    if (data.seo.og.type)        addField('    type', `"${data.seo.og.type}"`);
  }

  // Schema
  if (data.schema?.type || data.schema?.productSchemaNeeded) {
    lines.push('schema:');
    if (data.schema.type)               addField('  type', `"${data.schema.type}"`);
    if (data.schema.productSchemaNeeded) lines.push('  productSchemaNeeded: true');
  }

  // FAQ
  if (data.faq?.length) {
    lines.push('faq:');
    data.faq.forEach(item => {
      lines.push(`  - question: ${yamlStr(item.question)}`);
      lines.push(`    answer: ${yamlStr(item.answer)}`);
    });
  }

  lines.push('---');
  return lines.join('\n');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function migrate() {
  console.log('🔌 Connecting to MySQL (MAMP socket)...');
  const db = await mysql.createConnection(DB_CONFIG);
  console.log('✅ Connected.\n');

  // Ensure output directories exist
  Object.values(POST_TYPE_MAP).forEach(folder => {
    const dir = path.join(OUTPUT_DIR, folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  const postTypes = Object.keys(POST_TYPE_MAP);

  // Fetch all published posts
  const [posts] = await db.execute(
    `SELECT p.ID, p.post_type, p.post_name, p.post_title, p.post_content,
            p.post_excerpt, p.post_status,
            DATE_FORMAT(p.post_date_gmt, '%Y-%m-%dT%TZ') AS date,
            DATE_FORMAT(p.post_modified_gmt, '%Y-%m-%dT%TZ') AS modified,
            u.display_name AS author_name, u.user_nicename AS author_slug
     FROM wp_posts p
     LEFT JOIN wp_users u ON u.ID = p.post_author
     WHERE p.post_type IN (${postTypes.map(() => '?').join(',')})
       AND p.post_status = 'publish'
     ORDER BY p.post_type, p.post_name`,
    postTypes
  );

  console.log(`📄 Found ${posts.length} published posts to migrate.\n`);

  let success = 0, skipped = 0;

  for (const post of posts) {
    const folder = POST_TYPE_MAP[post.post_type];
    if (!folder) { skipped++; continue; }

    // Fetch all meta for this post
    const [metaRows] = await db.execute(
      `SELECT meta_key, meta_value FROM wp_postmeta WHERE post_id = ?`,
      [post.ID]
    );
    const meta = {};
    metaRows.forEach(r => { meta[r.meta_key] = r.meta_value; });

    // Featured image
    let featuredImage = null;
    const thumbId = meta['_thumbnail_id'];
    if (thumbId) {
      const [attachRows] = await db.execute(
        `SELECT meta_value FROM wp_postmeta WHERE post_id = ? AND meta_key = '_wp_attached_file'`,
        [parseInt(thumbId)]
      );
      if (attachRows.length) {
        featuredImage = `/uploads/${attachRows[0].meta_value}`;
      }
    }

    // Categories & Tags (posts only)
    let categories = [], tags = [];
    if (post.post_type === 'post') {
      const [termRows] = await db.execute(
        `SELECT t.name, tt.taxonomy
         FROM wp_terms t
         JOIN wp_term_taxonomy tt ON tt.term_id = t.term_id
         JOIN wp_term_relationships tr ON tr.term_taxonomy_id = tt.term_taxonomy_id
         WHERE tr.object_id = ? AND tt.taxonomy IN ('category', 'post_tag')`,
        [post.ID]
      );
      categories = termRows.filter(r => r.taxonomy === 'category').map(r => r.name);
      tags = termRows.filter(r => r.taxonomy === 'post_tag').map(r => r.name);
    }

    // Rank Math SEO
    const robotsRaw = meta['rank_math_robots'];
    const robots = robotsRaw ? parsePhpSerial(robotsRaw) : [];

    const seo = {
      title: meta['rank_math_title'] || post.post_title,
      description: meta['rank_math_description'] || '',
      focusKeyword: meta['rank_math_focus_keyword'] || '',
      canonicalUrl: meta['rank_math_canonical_url'] || '',
      robots: robots || [],
      isPillar: meta['rank_math_pillar_content'] === 'on',
      og: {
        title: meta['rank_math_facebook_title'] || '',
        description: meta['rank_math_facebook_description'] || '',
        type: meta['meta_og_type'] || '',
      },
    };

    // Schema flags
    const schema = {
      type: meta['product_schema_needed'] === 'Yes' ? 'Product' : null,
      productSchemaNeeded: meta['product_schema_needed'] === 'Yes',
    };

    // FAQ (ACF repeater: faqqa)
    const faqCount = parseInt(meta['faqqa'] || '0');
    const faq = [];
    for (let i = 0; i < faqCount; i++) {
      const q = meta[`faqqa_${i}_faq_question`] || '';
      const a = meta[`faqqa_${i}_faq_ans`] || '';
      if (q) faq.push({ question: q, answer: a });
    }

    // Build frontmatter
    const frontmatterData = {
      title: post.post_title,
      slug: post.post_name,
      date: post.date,
      modified: post.modified,
      postType: post.post_type,
      featuredImage,
      excerpt: post.post_excerpt || '',
      categories,
      tags,
      author: { name: post.author_name, slug: post.author_slug },
      seo,
      schema,
      faq,
    };

    const frontmatter = buildFrontmatter(frontmatterData);
    const cleanContent = sanitizeForMdx(stripShortcodes(post.post_content));
    const mdxContent = `${frontmatter}\n\n${cleanContent}\n`;

    const fileName = `${post.post_name}.mdx`;
    const filePath = path.join(OUTPUT_DIR, folder, fileName);
    fs.writeFileSync(filePath, mdxContent, 'utf8');
    console.log(`✅ ${post.post_type}/${fileName}`);
    success++;
  }

  await db.end();
  console.log(`\n🎉 Migration complete! Exported: ${success}, Skipped: ${skipped}`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);
}

migrate().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
