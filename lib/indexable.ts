import type { PostFrontmatter } from "@/lib/mdx";

/**
 * Whether a page should be advertised to crawlers and LLM agents.
 *
 * Two content signals disqualify a page, and both are declared in its own
 * frontmatter, so a page marked noindex drops out of the sitemap and llms.txt
 * automatically rather than needing a hard-coded denylist kept in sync:
 *
 *   • seo.robots contains "noindex" — advertising it contradicts the meta tag.
 *   • seo.canonicalUrl points elsewhere — the page is a legacy alias, so the
 *     canonical target belongs in the listing instead of this URL.
 */
export function isIndexable(frontmatter: PostFrontmatter, ownPath: string): boolean {
  const robots = frontmatter.seo?.robots ?? [];
  if (robots.some((r) => r.toLowerCase().includes("noindex"))) return false;

  const canonical = frontmatter.seo?.canonicalUrl;
  if (canonical) {
    const normalise = (p: string) => `/${p.replace(/^\/|\/$/g, "")}`;
    if (normalise(canonical) !== normalise(ownPath)) return false;
  }
  return true;
}
