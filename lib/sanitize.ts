/**
 * sanitize.ts — strips / converts HTML attributes that break React rendering.
 *
 * WPBakery saves inline style strings like style="color:red;font-size:14px"
 * in the raw post_content. When this HTML is included in MDX and rendered
 * by next-mdx-remote, React throws:
 *   "The `style` prop expects a mapping from style properties to values, not a string."
 *
 * This helper removes problematic inline style attributes from raw HTML strings
 * so they can be safely passed to MDXRemote.
 */

/**
 * Remove inline style attributes from HTML strings.
 * Called at render-time on MDX content before passing to MDXRemote.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";
  // Strip style="..." attributes
  return html.replace(/\s+style="[^"]*"/gi, "");
}
