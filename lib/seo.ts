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
