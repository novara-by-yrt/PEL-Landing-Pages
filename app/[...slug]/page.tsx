import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import {
  buildWebPageSchema,
  buildProductSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";
import pageHierarchy from "@/content/page-hierarchy.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skynology.com";

const childPages: Record<string, string[]> = pageHierarchy.childPages;

export async function generateStaticParams() {
  const fileSlugs = getPostSlugs("pages");
  const paramsList: { slug: string[] }[] = [];

  for (const fileSlug of fileSlugs) {
    // Check if this page has a parent-child hierarchy in WordPress
    if (childPages[fileSlug]) {
      // Use the exact WordPress URL path segments
      paramsList.push({ slug: childPages[fileSlug] });
    }

    // Always add the flat single-segment param (for direct slug access)
    paramsList.push({ slug: [fileSlug] });
  }

  return paramsList;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug: slugSegments } = await params;
  const page = getPostBySlug("pages", slugSegments);
  if (!page) return {};

  const { frontmatter } = page;
  const canonicalPath = slugSegments.join("/");
  const url = `${SITE_URL}/${canonicalPath}`;
  const robots = frontmatter.seo?.robots;
  const isNoIndex = robots?.includes("noindex");

  return {
    title: frontmatter.seo?.title || frontmatter.title,
    description: frontmatter.seo?.description || frontmatter.excerpt || "",
    robots: isNoIndex ? "noindex,nofollow" : "index,follow",
    alternates: { canonical: frontmatter.seo?.canonicalUrl || url },
    openGraph: {
      type: (["website", "article", "book", "profile"].includes(frontmatter.seo?.og?.type || "")
        ? (frontmatter.seo?.og?.type as "website" | "article")
        : "website"),
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
    },
  };
}

export default async function CatchAllPageRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugSegments } = await params;
  const page = getPostBySlug("pages", slugSegments);

  if (!page) {
    notFound();
  }

  const { frontmatter, content } = page;
  const canonicalPath = slugSegments.join("/");
  const url = `${SITE_URL}/${canonicalPath}`;

  // Breadcrumbs: Home > Section > Page
  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    ...slugSegments.map((seg, i) => {
      const itemUrl = `${SITE_URL}/${slugSegments.slice(0, i + 1).join("/")}`;
      const name = seg
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return { name, url: itemUrl };
    }),
  ];

  const pageSchema = buildWebPageSchema(frontmatter, url);

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, url);

  const productSchema = frontmatter.schema?.productSchemaNeeded
    ? buildProductSchema(frontmatter, url)
    : null;

  const faqSchema =
    frontmatter.faq && frontmatter.faq.length > 0
      ? buildFaqSchema(frontmatter.faq, url, frontmatter.title)
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
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
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}

      {/* Hero */}
      <div className="hero" style={{ padding: "4rem 0 3rem" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
            <ol
              style={{
                display: "flex",
                gap: "0.5rem",
                listStyle: "none",
                fontSize: "0.875rem",
                color: "hsl(0 0% 100% / 0.7)",
                padding: 0,
                margin: 0,
                flexWrap: "wrap",
              }}
            >
              {breadcrumbItems.map((item, index) => (
                <li key={item.url} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {index > 0 && <span aria-hidden="true">/</span>}
                  {index === breadcrumbItems.length - 1 ? (
                    <span style={{ color: "#fff", fontWeight: 600 }}>{item.name}</span>
                  ) : (
                    <Link href={item.url.replace(SITE_URL, "") || "/"} style={{ color: "hsl(0 0% 100% / 0.75)" }}>
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              color: "#fff",
              lineHeight: 1.15,
              maxWidth: "24ch",
            }}
          >
            {frontmatter.title}
          </h1>

          {frontmatter.excerpt && (
            <p style={{ fontSize: "1.125rem", color: "hsl(0 0% 100% / 0.8)", maxWidth: "56ch", marginTop: "1rem", lineHeight: 1.6 }}>
              {frontmatter.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Featured image */}
      {frontmatter.featuredImage && (
        <div className="container prose-container" style={{ marginTop: "-2rem", position: "relative", zIndex: 1 }}>
          <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 64px hsl(220 25% 12% / 0.14)", aspectRatio: "16/7", position: "relative" }}>
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

      {/* Page content */}
      <div className="container prose-container" style={{ padding: "3rem 1.5rem 5rem" }}>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* FAQ */}
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
      </div>
    </>
  );
}
