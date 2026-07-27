import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import {
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skynology.com";

// ── Static params — generates a page for every blog post at build time ─────
export async function generateStaticParams() {
  const slugs = getPostSlugs("posts");
  return slugs.map((slug) => ({ slug }));
}

// ── Per-post metadata (replaces Rank Math) ─────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("posts", slug);
  if (!post) return {};

  const { frontmatter } = post;
  const url = `${SITE_URL}/blog/${slug}`;
  const robots = frontmatter.seo?.robots;
  const isNoIndex = robots?.includes("noindex");

  return {
    title: frontmatter.seo?.title || frontmatter.title,
    description: frontmatter.seo?.description || frontmatter.excerpt || "",
    keywords: frontmatter.seo?.focusKeyword
      ? [frontmatter.seo.focusKeyword]
      : undefined,
    robots: isNoIndex ? "noindex,nofollow" : "index,follow",
    alternates: { canonical: frontmatter.seo?.canonicalUrl || url },
    openGraph: {
      type: "article",
      url,
      title: frontmatter.seo?.og?.title || frontmatter.seo?.title || frontmatter.title,
      description:
        frontmatter.seo?.og?.description ||
        frontmatter.seo?.description ||
        frontmatter.excerpt ||
        "",
      images: frontmatter.featuredImage
        ? [{ url: `${SITE_URL}${frontmatter.featuredImage}` }]
        : [],
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.modified,
    },
  };
}

// ── Page component ─────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug("posts", slug);
  if (!post) notFound();

  const { frontmatter, content } = post;
  const url = `${SITE_URL}/blog/${slug}`;

  // JSON-LD schemas
  const blogSchema = buildBlogPostingSchema(frontmatter, url);
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", url: SITE_URL },
      { name: "Blog", url: `${SITE_URL}/blog` },
      { name: frontmatter.title, url },
    ],
    url
  );
  const faqSchema =
    frontmatter.faq && frontmatter.faq.length > 0
      ? buildFaqSchema(frontmatter.faq, url, frontmatter.title)
      : null;

  const formattedDate = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      {/* JSON-LD schemas — inlined, no render-blocking */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero / Post header */}
      <div
        style={{
          background: "linear-gradient(135deg, hsl(199 90% 22%), hsl(199 90% 32%))",
          color: "#fff",
          padding: "4rem 0 3rem",
        }}
      >
        <div className="container prose-container">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb" style={{ color: "hsl(0 0% 100% / 0.7)" }}>
            <Link href="/" style={{ color: "hsl(38 92% 70%)" }}>Home</Link>
            <span className="breadcrumb-sep" aria-hidden="true">›</span>
            <Link href="/blog" style={{ color: "hsl(38 92% 70%)" }}>Blog</Link>
            <span className="breadcrumb-sep" aria-hidden="true">›</span>
            <span>{frontmatter.title}</span>
          </nav>

          {/* Categories */}
          {frontmatter.categories && frontmatter.categories.length > 0 && (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              {frontmatter.categories.map((cat) => (
                <span
                  key={cat}
                  style={{
                    background: "hsl(0 0% 100% / 0.15)",
                    color: "#fff",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.875rem, 5vw, 2.75rem)",
              lineHeight: 1.15,
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            {frontmatter.title}
          </h1>

          {frontmatter.excerpt && (
            <p style={{ fontSize: "1.125rem", color: "hsl(0 0% 100% / 0.8)", maxWidth: "56ch", lineHeight: 1.6 }}>
              {frontmatter.excerpt}
            </p>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginTop: "1.5rem",
              fontSize: "0.875rem",
              color: "hsl(0 0% 100% / 0.7)",
              flexWrap: "wrap",
            }}
          >
            {frontmatter.author?.name && (
              <span>By <strong style={{ color: "#fff" }}>{frontmatter.author.name}</strong></span>
            )}
            {formattedDate && (
              <time dateTime={frontmatter.date}>{formattedDate}</time>
            )}
          </div>
        </div>
      </div>

      {/* Featured image */}
      {frontmatter.featuredImage && (
        <div className="container prose-container" style={{ marginTop: "-2rem", zIndex: 1, position: "relative" }}>
          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 24px 64px hsl(220 25% 12% / 0.14)",
              aspectRatio: "16/7",
              position: "relative",
            }}
          >
            <Image
              src={frontmatter.featuredImage}
              alt={frontmatter.title}
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="(max-width: 768px) 100vw, 72ch"
            />
          </div>
        </div>
      )}

      {/* Article content */}
      <article
        className="container prose-container"
        style={{ padding: "3rem 1.5rem 5rem" }}
      >
        <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />

        {/* FAQ section */}
        {frontmatter.faq && frontmatter.faq.length > 0 && (
          <section style={{ marginTop: "4rem" }}>
            <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "1.5rem" }}>
              Frequently Asked Questions
            </h2>
            <div className="faq-list">
              {frontmatter.faq.map((item, i) => (
                <details key={i} className="faq-item">
                  <summary className="faq-question">
                    {item.question}
                    <span className="faq-icon" aria-hidden="true">+</span>
                  </summary>
                  <div className="faq-answer">{item.answer}</div>
                </details>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
