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
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/before-after`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${SITE_URL}/international-patients`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
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

  return [...staticRoutes, ...posts, ...pages, ...beforeAfter, ...conditions];
}
