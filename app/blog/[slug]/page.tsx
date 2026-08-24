import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPostSlugs, type ProsConsData } from "@/lib/mdx";
import { splitContentForMidArticleCta } from "@/lib/blogContent";
import {
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";
import { RelatedBlogs } from "@/components/treatment";
import { BlogCtaBox } from "@/components/blog/BlogCtaBox";
import { BlogSidebarForm } from "@/components/forms/BlogSidebarForm";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { BlogShareIcons } from "@/components/blog/BlogShareIcons";
import { DEFAULT_OG_IMAGE, metadataTitle, resolveDescription, resolveRobots, resolveTitle } from "@/lib/seo";
import SafeImage from "@/components/shared/SafeImage";
import HomeFaq from "@/components/home/HomeFaq";
import { ProsCons } from "@/components/blog/ProsCons";
import styles from "./page.module.css";

/** Marks where a post's extracted "Pros and Cons" section belongs in the
 *  body - set by the migration that pulled it into frontmatter.prosAndCons.
 *  See components/blog/ProsCons.tsx for why that migration happened. */
const PROS_AND_CONS_MARKER = "<!--PROS_AND_CONS-->";

/** Renders one prose chunk, splitting out <ProsCons> at the marker if this
 *  chunk happens to contain it - the CTA-box split above already cut the
 *  body in two, and the marker only ever ends up in one of those halves. */
function Prose({ html, prosAndCons }: { html: string; prosAndCons?: ProsConsData }) {
  if (prosAndCons && html.includes(PROS_AND_CONS_MARKER)) {
    const [before, after] = html.split(PROS_AND_CONS_MARKER);
    return (
      <>
        <div className="prose" dangerouslySetInnerHTML={{ __html: before }} />
        <ProsCons data={prosAndCons} />
        <div className="prose" dangerouslySetInnerHTML={{ __html: after }} />
      </>
    );
  }
  return <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
}

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

  const title = resolveTitle(frontmatter.seo?.title, frontmatter.title);
  const description = resolveDescription(
    frontmatter.seo?.description,
    frontmatter.excerpt,
    post.content,
  );

  return {
    title: metadataTitle(title),
    description,
    keywords: frontmatter.seo?.focusKeyword
      ? [frontmatter.seo.focusKeyword]
      : undefined,
    robots: resolveRobots(frontmatter.seo?.robots),
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
      {/* JSON-LD schemas - inlined, no render-blocking */}
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
            <nav aria-label="Breadcrumb" className={styles.blogBreadcrumb}>
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog">Blog</Link>
              <span aria-hidden="true">/</span>
              <span style={{ color: "rgba(255,255,255,0.9)" }}>{frontmatter.title}</span>
            </nav>

            {/* Category and share sit in one row, not paired with the
                breadcrumb above - on mobile the breadcrumb often wraps to two
                lines on its own, and a long breadcrumb pushed the share icons
                onto their own orphaned row below it. Category pills and share
                icons are both compact, so this row stays on one line at
                virtually every width. */}
            <div className={styles.blogHeroMetaRow}>
              {frontmatter.categories && frontmatter.categories.length > 0 && (
                <div className={styles.blogCategories}>
                  {frontmatter.categories.map((cat) => (
                    <span key={cat} className={styles.blogCategoryPill}>{cat}</span>
                  ))}
                </div>
              )}
              <BlogShareIcons url={url} title={frontmatter.title} />
            </div>

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
            <Prose html={contentBefore} prosAndCons={frontmatter.prosAndCons} />
            {contentAfter !== null && (
              <>
                <BlogCtaBox />
                <Prose html={contentAfter} prosAndCons={frontmatter.prosAndCons} />
              </>
            )}

            {/* FAQ section — same accordion component and design as the
                homepage and treatment pages, so the FAQ pattern is one
                design across the whole site rather than a blog-only variant. */}
            {frontmatter.faq && frontmatter.faq.length > 0 && (
              <HomeFaq
                items={frontmatter.faq}
                eyebrow="Good to know"
                title="Frequently asked questions"
                lead="Still unsure? Our team is glad to talk you through anything before you book."
                contentIsHtml
                fullWidth
                footer={
                  <Link href="/contact" className="tp-btn tp-btn-primary">
                    Ask a Question or Book an Appointment
                  </Link>
                }
              />
            )}
          </article>

          <aside className={styles.blogSidebar}>
            <BlogSidebarForm />
          </aside>
        </div>

        <BlogCTA />
        <RelatedBlogs topic={frontmatter.title} excludeSlug={slug} />
      </div>
    </>
  );
}
