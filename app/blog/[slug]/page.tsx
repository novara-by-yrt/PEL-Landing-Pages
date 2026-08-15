import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { splitContentForMidArticleCta } from "@/lib/blogContent";
import {
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";
import { RelatedBlogs, TpIcon } from "@/components/treatment";
import { BlogCtaBox } from "@/components/blog/BlogCtaBox";
import { BlogContactForm } from "@/components/blog/BlogContactForm";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { BlogShareIcons } from "@/components/blog/BlogShareIcons";
import { DEFAULT_OG_IMAGE, resolveDescription, resolveTitle } from "@/lib/seo";
import SafeImage from "@/components/shared/SafeImage";
import styles from "./page.module.css";

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

  const title = resolveTitle(frontmatter.seo?.title, frontmatter.title);
  const description = resolveDescription(
    frontmatter.seo?.description,
    frontmatter.excerpt,
    post.content,
  );

  return {
    title,
    description,
    keywords: frontmatter.seo?.focusKeyword
      ? [frontmatter.seo.focusKeyword]
      : undefined,
    robots: isNoIndex ? "noindex,nofollow" : "index,follow",
    alternates: { canonical: frontmatter.seo?.canonicalUrl || url },
    openGraph: {
      type: "article",
      url,
      title: resolveTitle(frontmatter.seo?.og?.title, title),
      description: frontmatter.seo?.og?.description || description,
      images: frontmatter.featuredImage
        ? [{ url: `${SITE_URL}${frontmatter.featuredImage}` }]
        : [DEFAULT_OG_IMAGE],
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
      <div className="tp">

        {/* Hero / Post header */}
        <section className={styles.blogHero}>
          <div className={styles.blogHeroGlow} />
          <div className={`container ${styles.blogHeroInner}`}>
            <div className={styles.blogHeroTop}>
              <nav aria-label="Breadcrumb" className={styles.blogBreadcrumb}>
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/blog">Blog</Link>
                <span aria-hidden="true">/</span>
                <span style={{ color: "rgba(255,255,255,0.9)" }}>{frontmatter.title}</span>
              </nav>
              <BlogShareIcons url={url} title={frontmatter.title} />
            </div>

            {frontmatter.categories && frontmatter.categories.length > 0 && (
              <div className={styles.blogCategories}>
                {frontmatter.categories.map((cat) => (
                  <span key={cat} className={styles.blogCategoryPill}>{cat}</span>
                ))}
              </div>
            )}

            <h1 className="tp-h1">{frontmatter.title}</h1>

            {frontmatter.excerpt && <p className={styles.tpSub}>{frontmatter.excerpt}</p>}

            <div className={styles.blogByline}>
              {frontmatter.author?.name && frontmatter.author.name !== "Dr Sabrina Shah-Desai" ? (
                <>Written by <strong>{frontmatter.author.name}</strong>. Reviewed by Medical Director <strong>Dr Sabrina Shah-Desai</strong></>
              ) : (
                <>Written and reviewed by <strong>Dr Sabrina Shah-Desai</strong>, Medical Director</>
              )}
            </div>
            {formattedDate && (
              <div className={styles.blogMeta}>
                <time dateTime={frontmatter.date}>Published on {formattedDate}</time>
              </div>
            )}
          </div>
        </section>

        {/* Article content + sidebar */}
        <div className={`container ${styles.blogLayout}`}>
          <article className={styles.blogMain}>
            {frontmatter.featuredImage && (
              <div className={styles.blogFeaturedImg}>
                <SafeImage
                  src={frontmatter.featuredImage}
                  alt={frontmatter.title}
                  sizes="(max-width: 960px) 100vw, 760px"
                  priority
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
                <div className={styles.tpFaqList}>
                  {frontmatter.faq.map((item, i) => (
                    <details key={i} className={styles.tpFaqItem}>
                      <summary className={styles.tpFaqQ}>
                        {item.question}
                        <span className={styles.tpFaqChev} aria-hidden="true"><TpIcon name="chevron" size={16} /></span>
                      </summary>
                      <div className={styles.tpFaqA} dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </details>
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className={styles.blogSidebar}>
            <BlogContactForm />
          </aside>
        </div>

        <BlogCTA />
        <RelatedBlogs excludeSlug={slug} />
      </div>
    </>
  );
}
