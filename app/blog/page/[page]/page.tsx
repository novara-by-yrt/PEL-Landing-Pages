import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArchive, { getTotalPages } from "@/components/blog/BlogArchive";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export const revalidate = 3600;

/** Page 2 onwards. Page 1 is /blog, so it is deliberately not generated here —
 *  two URLs listing the same twelve posts is exactly the duplication the
 *  canonical tag would then have to clean up. */
export function generateStaticParams() {
  const total = getTotalPages();
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ page: String(i + 2) }));
}

function parsePage(raw: string): number | null {
  // Only plain integers resolve. "/blog/page/02" and "/blog/page/abc" are not
  // alternative spellings of page 2 — they 404 rather than becoming a second
  // URL for content that already has one.
  if (!/^[1-9]\d*$/.test(raw)) return null;
  const n = Number(raw);
  return n >= 2 && n <= getTotalPages() ? n : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const n = parsePage(page);
  if (!n) return {};

  const url = `${SITE_URL}/blog/page/${n}`;
  return {
    title: `Expert Eye & Aesthetic Insights - Page ${n}`,
    /* Named per page rather than repeating page one's line fifteen times.
       Fifteen URLs sharing a description tells a crawler they are the same
       page, which is the opposite of what path-based pagination is for. */
    description: `Page ${n} of expert articles on cosmetic eye surgery, non-surgical treatments and aesthetic medicine from the Perfect Eyes team.`,
    /* Self-referencing, not pointing back at /blog. A paginated page is not a
       duplicate of page one - it lists different posts - and canonicalising it
       away is what previously hid everything past post twelve from the
       crawler. */
    alternates: { canonical: url },
    openGraph: { url, type: "website", images: [DEFAULT_OG_IMAGE] },
  };
}

export default async function BlogArchivePaginated({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const n = parsePage(page);
  if (!n) notFound();
  return <BlogArchive currentPage={n} />;
}
