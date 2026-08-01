import treatmentPaths from "@/content/treatment-paths.json";

/**
 * Canonical URL path for every treatment page.
 *
 * Keys are the MDX filename / treatment-meta.json key (the flat slug the
 * migration originally produced). Values are the nested paths the previous
 * WordPress site published, verified against its page-sitemap.xml and each
 * page's rel="canonical". These nested paths are the canonical URLs; the flat
 * slugs 301 to them (see next.config.ts).
 *
 * The data lives in content/treatment-paths.json because next.config.ts needs
 * the same map to build its redirects, and importing a .ts module there breaks
 * page rendering under Turbopack — JSON imports are safe in both places.
 */
export const TREATMENT_PATHS: Record<string, string> = treatmentPaths.paths;

/** Reverse lookup: canonical nested path -> flat MDX slug. */
export const PATH_TO_TREATMENT: Record<string, string> = Object.fromEntries(
  Object.entries(TREATMENT_PATHS).map(([slug, path]) => [path, slug])
);

/**
 * Canonical site-root-relative href for a treatment, e.g. "/surgical/...".
 * Falls back to the flat slug for anything that isn't a treatment page.
 */
export function treatmentHref(slug: string): string {
  return `/${TREATMENT_PATHS[slug] ?? slug}`;
}

/**
 * Canonical path (no leading slash) for a URL that may have been requested via
 * a flat slug or a legacy nested alias. Returns null when the slug isn't a
 * treatment page.
 */
export function canonicalTreatmentPath(slugSegments: string[]): string | null {
  const joined = slugSegments.join("/");
  if (PATH_TO_TREATMENT[joined]) return joined;
  return TREATMENT_PATHS[joined] ?? null;
}
