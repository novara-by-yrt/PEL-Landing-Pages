import type { Metadata } from "next";
import BlogArchive from "@/components/blog/BlogArchive";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export const metadata: Metadata = {
  title: "Blog | Expert Eye & Aesthetic Insights",
  description:
    "Expert articles on cosmetic eye surgery, non-surgical treatments, skincare, and aesthetic medicine from the Perfect Eyes team.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: { url: `${SITE_URL}/blog`, type: "website", images: [DEFAULT_OG_IMAGE] },
};

// ISR — revalidate every hour so new posts appear without a full rebuild.
// This now actually takes effect: the page reads no searchParams, so it
// prerenders instead of rendering per request. Page 2 onwards live at
// /blog/page/[page].
export const revalidate = 3600;

export default function BlogArchivePage() {
  return <BlogArchive currentPage={1} />;
}
