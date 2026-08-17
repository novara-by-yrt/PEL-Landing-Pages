import { getAllPosts, type PostFrontmatter } from "@/lib/mdx";
import { isIndexable } from "@/lib/indexable";
import { TREATMENT_PATHS } from "@/lib/treatment-urls";
import { getTotalPages } from "@/components/blog/BlogArchive";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

function lastModified(frontmatter: PostFrontmatter): Date {
  const raw = frontmatter.modified || frontmatter.date;
  const d = raw ? new Date(raw) : new Date();
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

/** Content collection -> sitemap entries, skipping anything non-indexable. */
function collection(
  dir: "posts" | "pages" | "before-after" | "condition",
  toPath: (slug: string) => string,
  priority: number,
  changeFrequency: "daily" | "weekly" | "monthly",
): MetadataRoute.Sitemap {
  return getAllPosts(dir)
    .map((entry) => ({ entry, path: toPath(entry.slug) }))
    .filter(({ entry, path }) => isIndexable(entry.frontmatter, path))
    .map(({ entry, path }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: lastModified(entry.frontmatter),
      changeFrequency,
      priority,
    }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Hand-built routes that have no MDX behind them (app/**/page.tsx). Kept
  // explicit so a new landing page is a deliberate addition, not a surprise.
  // /dr-sabrina-club is intentionally absent — the page itself is noindex.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/before-after`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/treatments`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/conditions`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/case-studies`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/journey-of-eye-care`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/publications`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact-cosmetic-eye-surgeon`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/international-patients`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blepharoplasty-quiz`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/dr-sabrina-shah-desai/philosophy`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/dr-sabrina-shah-desai/non-surgical-terms-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const posts = collection("posts", (s) => `/blog/${s}`, 0.7, "monthly");

  // Treatments are advertised at the canonical nested path the previous site
  // published; the flat slug 301s to it (next.config.ts), so only one is listed.
  const pages = collection("pages", (s) => `/${TREATMENT_PATHS[s] ?? s}`, 0.8, "monthly");

  const beforeAfter = collection("before-after", (s) => `/before-after/${s}`, 0.6, "monthly");
  const conditions = collection("condition", (s) => `/condition/${s}`, 0.8, "monthly");

  /* Paginated archive pages, /blog/page/2 onwards. Each is its own canonical
     URL listing its own twelve posts, and together they are the only crawl
     path from the site to every post past the first page. */
  const blogPages: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, getTotalPages() - 1) },
    (_, i) => ({
      url: `${SITE_URL}/blog/page/${i + 2}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }),
  );

  const all = [...staticRoutes, ...blogPages, ...posts, ...pages, ...beforeAfter, ...conditions];

  // Guard against a slug and a static route resolving to the same URL.
  const seen = new Set<string>();
  return all.filter((e) => !seen.has(e.url) && seen.add(e.url));
}
