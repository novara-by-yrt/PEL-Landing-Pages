import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skynology.com";

export async function generateStaticParams() {
  return getPostSlugs("eye-condition").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("eye-condition", slug);
  if (!post) return {};
  const { frontmatter } = post;
  const url = `${SITE_URL}/condition/${slug}`;
  return {
    title: frontmatter.seo?.title || frontmatter.title,
    description: frontmatter.seo?.description || frontmatter.excerpt || "",
    alternates: { canonical: frontmatter.seo?.canonicalUrl || url },
  };
}

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug("eye-condition", slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  const url = `${SITE_URL}/condition/${slug}`;

  const pageSchema = buildWebPageSchema(frontmatter, url);
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", url: SITE_URL },
      { name: "Conditions", url: `${SITE_URL}/condition` },
      { name: frontmatter.title, url },
    ],
    url
  );

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

      {/* Hero */}
      <div className="hero" style={{ padding: "4rem 0 3rem" }}>
        <div className="container">
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
      </div>
    </>
  );
}
