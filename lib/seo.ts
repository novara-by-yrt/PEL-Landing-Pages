/**
 * Fallback social-share image, used wherever a page has no photo of its own
 * (most pages don't set frontmatter.featuredImage). Next.js resolves this
 * relative path against metadataBase (set in app/layout.tsx), so it doesn't
 * need to be a full URL here.
 *
 * Any page that defines its own `openGraph` object needs to spread this in
 * explicitly — Next.js metadata merging replaces the whole `openGraph`
 * object per-route rather than merging its fields with the root layout's,
 * so a page that sets openGraph without images ends up with none at all.
 */
export const DEFAULT_OG_IMAGE = {
  url: "/PEL_logo_without_background.png",
  width: 719,
  height: 347,
  alt: "The Perfect Eyes Clinic",
};

/** The brand as it appears in the title template in app/layout.tsx. */
export const SITE_NAME = "Perfect Eyes Ltd";

/**
 * Removes a brand sign-off the title has already made for itself.
 *
 * Every page title goes through the `%s | Perfect Eyes Ltd` template in the
 * root layout, and a good many of the migrated titles end in the brand
 * *as well* — Yoast had its own suffix configured, so the export carries it
 * baked into the string. The two compose into "Meet the Team | Perfect Eyes
 * Ltd | Perfect Eyes Ltd", which is what 17 pages were publishing, and the
 * "- PEL" house abbreviation adds a third mention of the same clinic on 52
 * more. Beyond looking careless in a result listing, it spends characters
 * from the ~60 Google renders on repeating a word the user can already see.
 *
 * Only a *trailing* brand mention is stripped, and only when it is the last
 * thing in the string: a title that legitimately opens with the clinic's
 * name, or names it mid-sentence, is left exactly as written.
 */
export function stripBrandSuffix(title: string): string {
  let out = title.trim();
  // Repeat: the export produced doubled suffixes on some pages.
  for (;;) {
    const next = out
      // " | Perfect Eyes Ltd", " - Perfect Eyes Ltd.", " — Perfect Eyes Ltd"
      .replace(/\s*[|\-–—]\s*Perfect\s+Eyes\s+Ltd\.?\s*$/i, "")
      // The in-house abbreviation, which only ever appears as a sign-off.
      .replace(/\s*[|\-–—]\s*PEL\.?\s*$/i, "")
      .trim();
    if (next === out || !next) break;
    out = next;
  }
  return out || title.trim();
}

/**
 * Yoast wrote its title templates into the export unresolved on some posts, so
 * the frontmatter carries the literal template rather than a title — e.g.
 * "%title% %page% %sep% PEL | Perfect Eyes Ltd". Those strings are truthy, so
 * a plain `seo?.title || title` fallback publishes the template as the page
 * title. Anything containing a %placeholder% is treated as absent.
 *
 * The result is brand-stripped, because the layout's title template appends
 * the brand to whatever this returns.
 */
export function resolveTitle(seoTitle: string | undefined, fallback: string): string {
  if (!seoTitle || /%[a-z_]+%/i.test(seoTitle)) return stripBrandSuffix(fallback);
  return stripBrandSuffix(seoTitle);
}

/**
 * A page title as it should be handed to Next's `metadata.title`.
 *
 * The root layout appends "| Perfect Eyes Ltd" to every plain string. Most
 * titles want that. A handful name the clinic mid-sentence — "Temple Fillers
 * - Perfect Eyes Ltd London, UK" — where the brand is not a suffix to strip
 * without rewriting the author's line, but appending to it still produces the
 * clinic's name twice. Those are passed through as `absolute`, which opts out
 * of the template and leaves the title exactly as written.
 */
export function metadataTitle(title: string): string | { absolute: string } {
  return title.toLowerCase().includes(SITE_NAME.toLowerCase()) ? { absolute: title } : title;
}

/** Strips tags and collapses whitespace, for deriving text from stored HTML. */
function toPlainText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&#x27;/g, "'")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * A page with no description tag at all is worse than an imperfect one: the
 * search result then quotes whatever text the crawler picks. Where neither the
 * SEO field nor an excerpt exists, the opening of the page's own body is used,
 * cut at a sentence or word boundary rather than mid-word.
 */
export function resolveDescription(
  seoDescription: string | undefined,
  excerpt: string | undefined,
  body?: string,
  limit = 155,
): string | undefined {
  const chosen = seoDescription?.trim() || excerpt?.trim();
  if (chosen) return chosen;
  if (!body) return undefined;

  /* Bare URLs are removed before the opening of the body is used as a
     description. Thirty-one of the publication posts have a body consisting
     of nothing but a link to the author's PubMed listing, so the text derived
     from them was the literal string "https://pubmed.ncbi.nlm.nih.gov/?term=
     shah-desai" — published as the meta description of thirty-one pages, all
     identical. Google discards a description like that and writes its own,
     and on the chance it is shown it tells the reader nothing. What is left
     after stripping has to be a real sentence's worth of prose, or this
     returns nothing and lets the caller supply something meaningful. */
  const text = toPlainText(body)
    .replace(/\bhttps?:\/\/\S+/gi, " ")
    .replace(/\bwww\.\S+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length < 40) return undefined;
  if (text.length <= limit) return text;

  const window = text.slice(0, limit + 1);
  const sentence = window.search(/[.!?](\s|$)/);
  if (sentence > 80) return window.slice(0, sentence + 1).trim();

  const cut = window.lastIndexOf(" ");
  return `${window.slice(0, cut > 0 ? cut : limit).trim()}…`;
}
