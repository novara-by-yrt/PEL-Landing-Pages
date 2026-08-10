import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { TpIcon } from "@/components/treatment";
import { BlogCard } from "@/components/blog/BlogCard";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import styles from "./page.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";
const POSTS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: "Blog | Expert Eye & Aesthetic Insights",
  description:
    "Expert articles on cosmetic eye surgery, non-surgical treatments, skincare, and aesthetic medicine from the Perfect Eyes team.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: { url: `${SITE_URL}/blog`, type: "website", images: [DEFAULT_OG_IMAGE] },
};

// ISR — revalidate every hour so new posts appear without a full rebuild
export const revalidate = 3600;

export default async function BlogArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const allPosts = getAllPosts("posts").filter((p) => !p.frontmatter.seo?.robots?.includes("noindex"));

  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, parseInt(pageParam || "1", 10) || 1), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  // Windowed page numbers: first, last, and a small range around the current page.
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === totalPages || Math.abs(n - currentPage) <= 1
  );

  return (
    <>
      <div className="tp">

        {/* Hero */}
        <section className={styles.blogArchiveHero}>
          <div className={styles.blogArchiveGlow} />
          <span className="tp-eyebrow"><TpIcon name="sparkle" size={13} />Our Journal</span>
          <h1>Insights &amp; Expert Advice</h1>
          <p>Evidence-based articles on eye health, cosmetic treatments, and aesthetic medicine from Dr Sabrina Shah-Desai and the Perfect Eyes team.</p>
        </section>

        {/* Post grid */}
        <section className="tp-section">
          <div className="container">
            <div className={styles.blogArchiveGrid}>
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav aria-label="Blog pagination" className={styles.blogPagination}>
                <Link
                  href={currentPage > 1 ? `/blog?page=${currentPage - 1}` : "#"}
                  className={`${styles.blogPageLink}${currentPage === 1 ? ` ${styles.isDisabled}` : ""}`}
                  aria-disabled={currentPage === 1}
                >
                  <TpIcon name="chevron" size={14} style={{ transform: "rotate(180deg)" }} />
                </Link>

                {pageNumbers.map((n, i) => {
                  const prev = pageNumbers[i - 1];
                  const showEllipsis = prev !== undefined && n - prev > 1;
                  return (
                    <span key={n} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {showEllipsis && <span className={styles.blogPageEllipsis}>…</span>}
                      <Link
                        href={`/blog?page=${n}`}
                        className={`${styles.blogPageLink}${n === currentPage ? ` ${styles.isActive}` : ""}`}
                      >
                        {n}
                      </Link>
                    </span>
                  );
                })}

                <Link
                  href={currentPage < totalPages ? `/blog?page=${currentPage + 1}` : "#"}
                  className={`${styles.blogPageLink}${currentPage === totalPages ? ` ${styles.isDisabled}` : ""}`}
                  aria-disabled={currentPage === totalPages}
                >
                  <TpIcon name="chevron" size={14} />
                </Link>
              </nav>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
