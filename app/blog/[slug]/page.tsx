import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { splitContentForMidArticleCta } from "@/lib/blogContent";
import {
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";
import { TreatmentStyles, RelatedBlogs, TpIcon } from "@/components/treatment";
import { BlogCtaBox } from "@/components/blog/BlogCtaBox";
import { BlogContactForm } from "@/components/blog/BlogContactForm";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { BlogShareIcons } from "@/components/blog/BlogShareIcons";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

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

  const { before: contentBefore, after: contentAfter } = splitContentForMidArticleCta(content);

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

      <TreatmentStyles />
      <div className="tp">
        <style>{`
          .blog-hero {
            position: relative; overflow: hidden; color: #fff;
            background:
              linear-gradient(160deg, rgba(18,16,54,0.92), rgba(69,61,155,0.85)),
              url('/uploads/2024/07/blog-bg.jpg') center / cover no-repeat;
          }
          .blog-hero-glow { position: absolute; top: -160px; right: -120px; width: 460px; height: 460px; border-radius: 50%; background: radial-gradient(circle, rgba(188,160,221,0.35), transparent 70%); pointer-events: none; }
          .blog-hero-inner { position: relative; z-index: 1; padding: 3rem 1.5rem 3.5rem; }
          .blog-hero-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
          .blog-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,0.6); flex-wrap: wrap; margin-bottom: 20px; }
          .blog-breadcrumb a { color: rgba(255,255,255,0.75); text-decoration: none; }
          .blog-breadcrumb a:hover { color: #fff; }
          .blog-categories { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.1rem; }
          .blog-category-pill { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 0.3rem 0.9rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
          .blog-hero h1 { color: #fff; max-width: 26ch; }
          .blog-hero .tp-sub { color: rgba(255,255,255,0.82); max-width: 62ch; }
          .blog-byline { margin-top: 1.5rem; font-size: 0.875rem; color: rgba(255,255,255,0.75); }
          .blog-byline strong { color: #fff; }
          .blog-meta { display: flex; align-items: center; gap: 1.25rem; margin-top: 0.6rem; font-size: 0.8125rem; color: rgba(255,255,255,0.6); flex-wrap: wrap; }

          .blog-layout { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: clamp(1.5rem, 4vw, 3rem); align-items: start; padding: 3rem 1.5rem 2rem; }
          .blog-main { min-width: 0; max-width: 80ch; }
          .blog-featured-img { border-radius: var(--tp-radius-xl); overflow: hidden; box-shadow: var(--tp-shadow-md); aspect-ratio: 16/10; position: relative; margin-bottom: 2rem; }
          .blog-sidebar { position: sticky; top: calc(var(--header-height, 72px) + 1.5rem); }
          @media (max-width: 960px) {
            .blog-layout { grid-template-columns: 1fr; }
            .blog-main { max-width: 100%; }
            .blog-sidebar { position: static; }
          }

          .tp-faq-list { display: flex; flex-direction: column; }
          .tp-faq-item { border-bottom: 1px solid var(--tp-hairline); }
          .tp-faq-item:first-child { border-top: 1px solid var(--tp-hairline); }
          .tp-faq-q { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.25rem 0; cursor: pointer; list-style: none; font-family: var(--tp-display); font-weight: 600; font-size: 1.05rem; color: var(--tp-ink); }
          .tp-faq-q::-webkit-details-marker { display: none; }
          .tp-faq-chev { flex-shrink: 0; color: var(--tp-indigo-700); transition: transform 220ms var(--tp-ease); }
          .tp-faq-item[open] .tp-faq-chev { transform: rotate(90deg); }
          .tp-faq-a { padding: 0 0 1.5rem; font-size: 0.9375rem; color: var(--tp-slate); line-height: 1.7; }
        `}</style>

        {/* Hero / Post header */}
        <section className="blog-hero">
          <div className="blog-hero-glow" />
          <div className="container blog-hero-inner">
            <div className="blog-hero-top">
              <nav aria-label="Breadcrumb" className="blog-breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/blog">Blog</Link>
                <span aria-hidden="true">/</span>
                <span style={{ color: "rgba(255,255,255,0.9)" }}>{frontmatter.title}</span>
              </nav>
              <BlogShareIcons url={url} title={frontmatter.title} />
            </div>

            {frontmatter.categories && frontmatter.categories.length > 0 && (
              <div className="blog-categories">
                {frontmatter.categories.map((cat) => (
                  <span key={cat} className="blog-category-pill">{cat}</span>
                ))}
              </div>
            )}

            <h1 className="tp-h1">{frontmatter.title}</h1>

            {frontmatter.excerpt && <p className="tp-sub">{frontmatter.excerpt}</p>}

            <div className="blog-byline">
              {frontmatter.author?.name && frontmatter.author.name !== "Dr Sabrina Shah-Desai" ? (
                <>Written by <strong>{frontmatter.author.name}</strong>. Reviewed by Medical Director <strong>Dr Sabrina Shah-Desai</strong></>
              ) : (
                <>Written and reviewed by <strong>Dr Sabrina Shah-Desai</strong>, Medical Director</>
              )}
            </div>
            {formattedDate && (
              <div className="blog-meta">
                <time dateTime={frontmatter.date}>Published on {formattedDate}</time>
              </div>
            )}
          </div>
        </section>

        {/* Article content + sidebar */}
        <div className="container blog-layout">
          <article className="blog-main">
            {frontmatter.featuredImage && (
              <div className="blog-featured-img">
                <Image
                  src={frontmatter.featuredImage}
                  alt={frontmatter.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  sizes="(max-width: 960px) 100vw, 70ch"
                />
              </div>
            )}
            <div className="prose" dangerouslySetInnerHTML={{ __html: contentBefore }} />
            {contentAfter !== null && (
              <>
                <BlogCtaBox />
                <div className="prose" dangerouslySetInnerHTML={{ __html: contentAfter }} />
              </>
            )}

            {/* FAQ section */}
            {frontmatter.faq && frontmatter.faq.length > 0 && (
              <section style={{ marginTop: "3rem" }}>
                <div className="tp-head" style={{ marginBottom: "1.5rem" }}>
                  <span className="tp-eyebrow"><TpIcon name="quote" size={13} />FAQ</span>
                  <h2>Frequently Asked Questions</h2>
                </div>
                <div className="tp-faq-list">
                  {frontmatter.faq.map((item, i) => (
                    <details key={i} className="tp-faq-item">
                      <summary className="tp-faq-q">
                        {item.question}
                        <span className="tp-faq-chev" aria-hidden="true"><TpIcon name="chevron" size={16} /></span>
                      </summary>
                      <div className="tp-faq-a" dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </details>
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="blog-sidebar">
            <BlogContactForm />
          </aside>
        </div>

        <BlogCTA />
        <RelatedBlogs excludeSlug={slug} />
      </div>
    </>
  );
}
