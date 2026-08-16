import Link from "next/link";
import { getAllPosts, type Post } from "@/lib/mdx";
import { TpIcon } from "@/components/treatment";
import { BlogCard } from "@/components/blog/BlogCard";
import styles from "@/app/blog/page.module.css";

export const POSTS_PER_PAGE = 12;

/** Indexable posts, newest first — the same set the sitemap advertises. */
export function getArchivePosts(): Post[] {
  return getAllPosts("posts").filter((p) => !p.frontmatter.seo?.robots?.includes("noindex"));
}

export function getTotalPages(): number {
  return Math.max(1, Math.ceil(getArchivePosts().length / POSTS_PER_PAGE));
}

/**
 * Page 1 lives at /blog, the rest at /blog/page/N.
 *
 * The archive used to paginate on `?page=N`, which cost it two things. The
 * query parameter made the route dynamic — reading searchParams opts a page
 * out of static rendering entirely, so every visit to the journal index paid
 * for a server render of a page whose contents change when someone publishes,
 * not per request. And because each of those URLs canonicalised back to
 * /blog, everything past the first twelve posts existed for Google only as a
 * sitemap entry, with no crawlable path to it from the site itself.
 *
 * As paths, all of them prerender at build time and each carries its own
 * canonical, so the crawler can walk the archive the way a reader does.
 */
export function pageHref(n: number): string {
  return n <= 1 ? "/blog" : `/blog/page/${n}`;
}

export default function BlogArchive({ currentPage }: { currentPage: number }) {
  const allPosts = getArchivePosts();
  const totalPages = getTotalPages();
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
                  href={currentPage > 1 ? pageHref(currentPage - 1) : "#"}
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
                        href={pageHref(n)}
                        className={`${styles.blogPageLink}${n === currentPage ? ` ${styles.isActive}` : ""}`}
                      >
                        {n}
                      </Link>
                    </span>
                  );
                })}

                <Link
                  href={currentPage < totalPages ? pageHref(currentPage + 1) : "#"}
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
