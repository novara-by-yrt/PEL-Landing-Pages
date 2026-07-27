import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/mdx";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skynology.com";
const POSTS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: "Blog | Expert Eye & Aesthetic Insights",
  description:
    "Expert articles on cosmetic eye surgery, non-surgical treatments, skincare, and aesthetic medicine from the Skynology team.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: { url: `${SITE_URL}/blog`, type: "website" },
};

// ISR — revalidate every hour so new posts appear without a full rebuild
export const revalidate = 3600;

export default function BlogArchivePage() {
  const allPosts = getAllPosts("posts");
  // Filter out no-index posts from the listing
  const posts = allPosts
    .filter((p) => !p.frontmatter.seo?.robots?.includes("noindex"))
    .slice(0, POSTS_PER_PAGE);

  return (
    <>
      {/* Page header */}
      <div
        style={{
          background: "linear-gradient(135deg, hsl(199 90% 22%), hsl(199 90% 32%))",
          color: "#fff",
          padding: "5rem 0 4rem",
          textAlign: "center",
        }}
      >
        <div className="container">
          <p className="hero-eyebrow">Our Journal</p>
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2.25rem, 6vw, 3.5rem)",
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Insights & Expert Advice
          </h1>
          <p style={{ color: "hsl(0 0% 100% / 0.8)", fontSize: "1.125rem", maxWidth: "48ch", margin: "0 auto" }}>
            Evidence-based articles on eye health, cosmetic treatments, and aesthetic medicine.
          </p>
        </div>
      </div>

      {/* Blog grid */}
      <section className="section container">
        <div className="grid-cards">
          {posts.map((post) => (
            <article key={post.slug} className="card">
              {post.frontmatter.featuredImage && (
                <div className="card-image">
                  <Image
                    src={post.frontmatter.featuredImage}
                    alt={post.frontmatter.title}
                    width={640}
                    height={360}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="card-body">
                {post.frontmatter.categories && post.frontmatter.categories.length > 0 && (
                  <div className="card-meta">
                    <span className="badge">{post.frontmatter.categories[0]}</span>
                    {post.frontmatter.date && (
                      <time dateTime={post.frontmatter.date}>
                        {new Date(post.frontmatter.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    )}
                  </div>
                )}
                <h2 className="card-title">
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {post.frontmatter.title}
                  </Link>
                </h2>
                {post.frontmatter.excerpt && (
                  <p className="card-excerpt">{post.frontmatter.excerpt}</p>
                )}
                <Link
                  href={`/blog/${post.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--clr-primary)",
                    marginTop: "1rem",
                    transition: "gap 0.15s ease",
                  }}
                >
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {allPosts.length > POSTS_PER_PAGE && (
          <p
            style={{
              textAlign: "center",
              marginTop: "3rem",
              color: "var(--clr-text-muted)",
            }}
          >
            Showing {POSTS_PER_PAGE} of {allPosts.length} articles.
          </p>
        )}
      </section>
    </>
  );
}
