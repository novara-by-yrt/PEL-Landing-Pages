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

/**
 * Yoast wrote its title templates into the export unresolved on some posts, so
 * the frontmatter carries the literal template rather than a title — e.g.
 * "%title% %page% %sep% PEL | Perfect Eyes Ltd". Those strings are truthy, so
 * a plain `seo?.title || title` fallback publishes the template as the page
 * title. Anything containing a %placeholder% is treated as absent.
 */
export function resolveTitle(seoTitle: string | undefined, fallback: string): string {
  if (!seoTitle || /%[a-z_]+%/i.test(seoTitle)) return fallback;
  return seoTitle;
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

  const text = toPlainText(body);
  if (!text) return undefined;
  if (text.length <= limit) return text;

  const window = text.slice(0, limit + 1);
  const sentence = window.search(/[.!?](\s|$)/);
  if (sentence > 80) return window.slice(0, sentence + 1).trim();

  const cut = window.lastIndexOf(" ");
  return `${window.slice(0, cut > 0 ? cut : limit).trim()}…`;
}
