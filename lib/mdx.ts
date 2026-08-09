import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoData {
  title?: string;
  description?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  robots?: string[];
  isPillar?: boolean;
  og?: {
    title?: string;
    description?: string;
    type?: string;
  };
}

export interface SchemaData {
  type?: string;
  productSchemaNeeded?: boolean;
}

export interface CauseItem {
  title: string;
  description: string;
  icon?: string;
}

export interface OverviewData {
  eyebrow?: string;
  heading?: string;
  paragraphs: string[];
  image?: string;
  imageBadge?: string;
}

export interface RelatedTreatmentItem {
  title: string;
  description?: string;
  image: string;
  href?: string;
  priceFrom?: string;
  facts?: { label: string; value: string }[];
}

export interface VideoTestimonialItem {
  thumbnail: string;
  title: string;
  url: string;
}

export interface VideoTestimonialsData {
  heading?: string;
  ratingBadge?: string;
  ratingBadgeAlt?: string;
  videos: VideoTestimonialItem[];
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  modified: string;
  postType: string;
  featuredImage?: string;
  heroImage?: string;
  excerpt?: string;
  categories?: string[];
  tags?: string[];
  author?: { name?: string; slug?: string };
  seo: SeoData;
  schema?: SchemaData;
  faq?: FaqItem[];
  overview?: OverviewData;
  overviewPanels?: OverviewData[];
  causes?: CauseItem[];
  causesEyebrow?: string;
  causesHeading?: string;
  relatedTreatments?: RelatedTreatmentItem[];
  relatedTreatmentsEyebrow?: string;
  relatedTreatmentsHeading?: string;
  showExpertSection?: boolean;
  showAccreditation?: boolean;
  intro?: string;
  galleryHeading?: string;
  galleryDescription?: string;
  gallery?: GalleryItem[];
  videoTestimonials?: VideoTestimonialsData;
}

export interface GalleryItem {
  image: string;
  alt?: string;
  /** Intrinsic pixel size, so next/image reserves the right box and never distorts. */
  width?: number;
  height?: number;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  slug: string;
}

// ─── Content directory ────────────────────────────────────────────────────────

const contentDir = path.join(process.cwd(), "content");

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Get all MDX files from a content folder.
 */
export function getPostSlugs(folder: string): string[] {
  const dir = path.join(contentDir, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

import urlMapData from "@/content/url-map.json";
import treatmentPathsData from "@/content/treatment-paths.json";

const urlToMdxMap: Record<string, string> = urlMapData.urlToMdx;

/** Canonical nested treatment path -> MDX filename. */
const treatmentPathToMdx: Record<string, string> = Object.fromEntries(
  Object.entries(treatmentPathsData.paths as Record<string, string>).map(
    ([fileSlug, urlPath]) => [urlPath, fileSlug]
  )
);

/**
 * Resolve candidate filename for a single or multi-segment slug.
 */
function resolveMdxFilename(
  folder: string,
  slugInput: string | string[],
  { allowFuzzy = true }: { allowFuzzy?: boolean } = {}
): string | null {
  const segments = Array.isArray(slugInput) ? slugInput : [slugInput];
  const fullPath = segments.join("/");
  const fullHyphen = segments.join("-");
  const lastSegment = segments[segments.length - 1];

  const dir = path.join(contentDir, folder);
  if (!fs.existsSync(dir)) return null;

  // 0. Canonical treatment path (authoritative — takes precedence over the
  // migration URL map, which doesn't cover every nested treatment path).
  const treatmentFile = treatmentPathToMdx[fullPath];
  if (treatmentFile && fs.existsSync(path.join(dir, `${treatmentFile}.mdx`))) {
    return treatmentFile;
  }

  // 1. Check exact URL map for fullPath
  if (urlToMdxMap[fullPath] && fs.existsSync(path.join(dir, `${urlToMdxMap[fullPath]}.mdx`))) {
    return urlToMdxMap[fullPath];
  }

  // 2. Check exact URL map for lastSegment
  if (urlToMdxMap[lastSegment] && fs.existsSync(path.join(dir, `${urlToMdxMap[lastSegment]}.mdx`))) {
    return urlToMdxMap[lastSegment];
  }

  // 3. Direct match with fullHyphen
  if (fs.existsSync(path.join(dir, `${fullHyphen}.mdx`))) {
    return fullHyphen;
  }

  // 4. Direct match with lastSegment
  if (fs.existsSync(path.join(dir, `${lastSegment}.mdx`))) {
    return lastSegment;
  }

  // 5. Scan frontmatter slug
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (!f.endsWith(".mdx")) continue;
    const filePath = path.join(dir, f);
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const fmSlug = parsed.data.slug;
    if (fmSlug === fullPath || fmSlug === fullHyphen || fmSlug === lastSegment) {
      return f.replace(/\.mdx$/, "");
    }
  }

  // 6. Fuzzy fallback — only for slugs that look like legacy multi-segment WP
  // paths (e.g. 'surgical/eyelid-surgery/blepharoplasty-uk' -> the file
  // 'blepharoplasty-treatment-in-london'). A bare single-word slug like
  // "chalazion" must NOT hit this: substring matching would happily "resolve"
  // it to an unrelated file (e.g. surgical-eyelid-surgery-chalazion-removal-uk)
  // instead of correctly 404ing when no page owns that slug.
  const looksLikeLegacyPath = segments.length > 1 || /-uk$/.test(lastSegment);
  if (allowFuzzy && looksLikeLegacyPath) {
    const baseKeyword = lastSegment.replace(/-uk$/, "").replace(/^surgical-/, "").replace(/^eyelid-surgery-/, "");
    for (const f of files) {
      if (!f.endsWith(".mdx")) continue;
      const name = f.replace(/\.mdx$/, "");
      if (name.includes(baseKeyword) || name.includes(lastSegment)) {
        return name;
      }
    }
  }

  return null;
}

/**
 * Does a page exist at exactly this path?
 *
 * Deliberately skips the fuzzy fallback, so a URL like /surgical/eyelid-surgery
 * — which has no page of its own but would substring-match an unrelated
 * treatment file — reports false. Used for breadcrumbs so intermediate
 * segments only become links when they lead somewhere real.
 */
export function pageExistsExact(folder: string, slugInput: string | string[]): boolean {
  return resolveMdxFilename(folder, slugInput, { allowFuzzy: false }) !== null;
}

/**
 * Read and parse a single MDX file by folder + slug (supports string or string[]).
 */
export function getPostBySlug(folder: string, slugInput: string | string[]): Post | null {
  const resolvedFilename = resolveMdxFilename(folder, slugInput);
  if (!resolvedFilename) return null;

  const filePath = path.join(contentDir, folder, `${resolvedFilename}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    frontmatter: data as PostFrontmatter,
    content,
    slug: resolvedFilename,
  };
}

/**
 * Get all posts from a folder, sorted by date descending.
 */
export function getAllPosts(folder: string): Post[] {
  const slugs = getPostSlugs(folder);
  const posts = slugs
    .map((slug) => getPostBySlug(folder, slug))
    .filter((p): p is Post => p !== null);

  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date || 0).getTime();
    const dateB = new Date(b.frontmatter.date || 0).getTime();
    return dateB - dateA;
  });
}

/**
 * Get posts paginated.
 */
export function getPostsPaginated(
  folder: string,
  page: number,
  perPage: number
): { posts: Post[]; total: number; totalPages: number } {
  const all = getAllPosts(folder);
  const total = all.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const posts = all.slice(start, start + perPage);
  return { posts, total, totalPages };
}
