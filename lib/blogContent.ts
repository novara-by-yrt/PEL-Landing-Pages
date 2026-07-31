const CTA_MARKER = "<!--BLOG_CTA_BOX-->";

/**
 * Derives a short plain-text excerpt from a post's HTML body.
 * None of the migrated posts carry a frontmatter `excerpt`, so listings
 * fall back to stripping tags/entities from the first ~150 characters.
 */
export function excerptFrom(html: string, maxLen = 150): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

/**
 * Splits a blog post's HTML body around the point where the mid-article
 * CTA box should render. Honours an explicit `<!--BLOG_CTA_BOX-->` marker
 * when a post has one (hand-placed to match a specific source position);
 * otherwise picks a sensible spot automatically so every post gets the box
 * without needing per-file edits.
 */
export function splitContentForMidArticleCta(html: string): { before: string; after: string | null } {
  if (html.includes(CTA_MARKER)) {
    const [before, after] = html.split(CTA_MARKER);
    return { before, after };
  }

  const h2Positions: number[] = [];
  const h2Re = /<h2[\s>]/gi;
  let m: RegExpExecArray | null;
  while ((m = h2Re.exec(html))) h2Positions.push(m.index);

  if (h2Positions.length >= 2) {
    const splitAt = h2Positions[Math.floor(h2Positions.length / 2)];
    return { before: html.slice(0, splitAt), after: html.slice(splitAt) };
  }

  if (html.length > 600) {
    const midpoint = Math.floor(html.length / 2);
    const closingP = html.indexOf("</p>", midpoint);
    if (closingP !== -1) {
      const splitAt = closingP + 4;
      return { before: html.slice(0, splitAt), after: html.slice(splitAt) };
    }
  }

  return { before: html, after: null };
}
