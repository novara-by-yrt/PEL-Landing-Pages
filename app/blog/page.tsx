import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { TreatmentStyles, TpIcon } from "@/components/treatment";
import { BlogCard } from "@/components/blog/BlogCard";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";
const POSTS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: "Blog | Expert Eye & Aesthetic Insights",
  description:
    "Expert articles on cosmetic eye surgery, non-surgical treatments, skincare, and aesthetic medicine from the Perfect Eyes team.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: { url: `${SITE_URL}/blog`, type: "website" },
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
      <TreatmentStyles />
      <div className="tp">
        <style>{`
          .blog-archive-hero {
            position: relative; overflow: hidden; color: #fff; text-align: center;
            background:
              linear-gradient(160deg, rgba(18,16,54,0.92), rgba(69,61,155,0.85)),
              url('/uploads/2024/07/blog-bg.jpg') center / cover no-repeat;
            padding: clamp(3.5rem, 7vw, 5.5rem) 1.5rem;
          }
          .blog-archive-glow { position: absolute; top: -180px; left: 50%; transform: translateX(-50%); width: 560px; height: 340px; border-radius: 50%; background: radial-gradient(circle, rgba(188,160,221,0.32), transparent 70%); pointer-events: none; }
          .blog-archive-hero .tp-eyebrow { justify-content: center; color: var(--tp-lavender-300); }
          .blog-archive-hero h1 { position: relative; font-family: var(--tp-display); font-weight: 600; font-size: clamp(2.1rem, 5vw, 3.1rem); line-height: 1.15; color: #fff; margin: 16px auto 0; max-width: 20ch; }
          .blog-archive-hero p { position: relative; font-size: 1.0625rem; color: rgba(255,255,255,0.82); max-width: 52ch; margin: 1rem auto 0; line-height: 1.6; }

          .blog-archive-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.75rem; margin-top: 3rem; }

          .blog-pagination { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 3.5rem; flex-wrap: wrap; }
          .blog-page-link, .blog-page-ellipsis {
            display: inline-flex; align-items: center; justify-content: center;
            min-width: 40px; height: 40px; padding: 0 12px; border-radius: 999px;
            font-family: var(--tp-body); font-size: 0.875rem; font-weight: 600;
            text-decoration: none; color: var(--tp-indigo-700); border: 1px solid var(--tp-line);
            transition: background 160ms var(--tp-ease), color 160ms var(--tp-ease), border-color 160ms var(--tp-ease);
          }
          .blog-page-link:hover { background: var(--tp-lavender-050); }
          .blog-page-link.is-active { background: var(--tp-indigo-700); border-color: var(--tp-indigo-700); color: #fff; }
          .blog-page-link.is-disabled { opacity: 0.35; pointer-events: none; }
          .blog-page-ellipsis { border: none; color: var(--tp-mist); min-width: auto; padding: 0 4px; }
        `}</style>

        {/* Hero */}
        <section className="blog-archive-hero">
          <div className="blog-archive-glow" />
          <span className="tp-eyebrow"><TpIcon name="sparkle" size={13} />Our Journal</span>
          <h1>Insights &amp; Expert Advice</h1>
          <p>Evidence-based articles on eye health, cosmetic treatments, and aesthetic medicine from Dr Sabrina Shah-Desai and the Perfect Eyes team.</p>
        </section>

        {/* Post grid */}
        <section className="tp-section">
          <div className="container">
            <div className="blog-archive-grid">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav aria-label="Blog pagination" className="blog-pagination">
                <Link
                  href={currentPage > 1 ? `/blog?page=${currentPage - 1}` : "#"}
                  className={`blog-page-link${currentPage === 1 ? " is-disabled" : ""}`}
                  aria-disabled={currentPage === 1}
                >
                  <TpIcon name="chevron" size={14} style={{ transform: "rotate(180deg)" }} />
                </Link>

                {pageNumbers.map((n, i) => {
                  const prev = pageNumbers[i - 1];
                  const showEllipsis = prev !== undefined && n - prev > 1;
                  return (
                    <span key={n} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {showEllipsis && <span className="blog-page-ellipsis">…</span>}
                      <Link
                        href={`/blog?page=${n}`}
                        className={`blog-page-link${n === currentPage ? " is-active" : ""}`}
                      >
                        {n}
                      </Link>
                    </span>
                  );
                })}

                <Link
                  href={currentPage < totalPages ? `/blog?page=${currentPage + 1}` : "#"}
                  className={`blog-page-link${currentPage === totalPages ? " is-disabled" : ""}`}
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
