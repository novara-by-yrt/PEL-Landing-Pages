import { getAllPosts, type Post } from "@/lib/mdx";
import { TREATMENT_PATHS } from "@/lib/treatment-urls";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

/**
 * A sitemap is a list of pages you are asking to have indexed, so a page
 * carrying noindex has no business in it — the two instructions contradict
 * each other and Search Console reports it as an error. The page templates
 * already read the same frontmatter flag to emit the robots tag; this keeps
 * the sitemap in step with it automatically, rather than by a hand-kept
 * exclusion list that would drift.
 */
const isIndexable = (post: Post) => !post.frontmatter.seo?.robots?.includes("noindex");

export default function sitemap(): MetadataRoute.Sitemap {
  /* Routes that exist as hand-written pages under app/ rather than as content
     files, so nothing below discovers them. Seven of these were missing
     entirely — /team, /publications and /journey-of-eye-care among them —
     which left the clinic's strongest E-E-A-T pages (the surgeon's peer-
     reviewed publication list, the clinical team, the care pathway)
     advertised nowhere. Any new page added under app/ needs a line here. */
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/before-after`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/case-studies`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${SITE_URL}/contact-cosmetic-eye-surgeon`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/international-patients`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${SITE_URL}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${SITE_URL}/publications`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/journey-of-eye-care`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/dr-sabrina-club`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/dr-sabrina-shah-desai/philosophy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/dr-sabrina-shah-desai/non-surgical-terms-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Blog posts
  const posts = getAllPosts("posts").filter(isIndexable).map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.modified || post.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Pages — treatments are listed at their canonical nested path, not the flat slug.
  const pages = getAllPosts("pages").filter(isIndexable).map((page) => ({
    url: `${SITE_URL}/${TREATMENT_PATHS[page.slug] ?? page.slug}`,
    lastModified: new Date(page.frontmatter.modified || page.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Before/After
  const beforeAfter = getAllPosts("before-after").filter(isIndexable).map((post) => ({
    url: `${SITE_URL}/before-after/${post.slug}`,
    lastModified: new Date(post.frontmatter.modified || post.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Eye Conditions
  const conditions = getAllPosts("condition").filter(isIndexable).map((post) => ({
    url: `${SITE_URL}/condition/${post.slug}`,
    lastModified: new Date(post.frontmatter.modified || post.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  /* Three URLs are reachable from two sources — /blog and
     /dr-sabrina-shah-desai exist both as a hand-listed route and as a content
     file, and two treatment slugs resolve to the same nested ultraclear path.
     Listing a URL twice is the same kind of contradiction as listing a
     noindex one, so the first entry wins and later duplicates drop out. */
  const all = [...staticRoutes, ...posts, ...pages, ...beforeAfter, ...conditions];
  const seen = new Set<string>();
  return all.filter((entry) => !seen.has(entry.url) && seen.add(entry.url));
}
