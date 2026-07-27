import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skynology.com";

export async function generateStaticParams() {
  return getPostSlugs("before-after").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("before-after", slug);
  if (!post) return {};
  const { frontmatter } = post;
  const url = `${SITE_URL}/before-after/${slug}`;
  return {
    title: frontmatter.seo?.title || frontmatter.title,
    description: frontmatter.seo?.description || "",
    alternates: { canonical: url },
    openGraph: {
      url,
      type: "website",
      images: frontmatter.featuredImage
        ? [{ url: `${SITE_URL}${frontmatter.featuredImage}` }]
        : [],
    },
  };
}

export default async function BeforeAfterCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug("before-after", slug);
  if (!post) notFound();

  const { frontmatter, content } = post;
  const url = `${SITE_URL}/before-after/${slug}`;

  const pageSchema = buildWebPageSchema(frontmatter, url);
  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "Home", url: SITE_URL },
      { name: "Before & After", url: `${SITE_URL}/before-after` },
      { name: frontmatter.title, url },
    ],
    url
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, hsl(199 90% 22%), hsl(199 90% 32%))", color: "#fff", padding: "4rem 0 3rem" }}>
        <div className="container prose-container">
          <nav className="breadcrumb" aria-label="Breadcrumb" style={{ color: "hsl(0 0% 100% / 0.7)" }}>
            <Link href="/" style={{ color: "hsl(38 92% 70%)" }}>Home</Link>
            <span className="breadcrumb-sep" aria-hidden="true">›</span>
            <Link href="/before-after" style={{ color: "hsl(38 92% 70%)" }}>Before & After</Link>
            <span className="breadcrumb-sep" aria-hidden="true">›</span>
            <span>{frontmatter.title}</span>
          </nav>
          <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.875rem, 5vw, 3rem)", color: "#fff", lineHeight: 1.15, marginTop: "1rem" }}>
            {frontmatter.title}
          </h1>
        </div>
      </div>

      {/* Hero image */}
      {frontmatter.featuredImage && (
        <div className="container prose-container" style={{ marginTop: "-2rem", position: "relative", zIndex: 1 }}>
          <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 64px hsl(220 25% 12% / 0.14)", aspectRatio: "16/9", position: "relative" }}>
            <Image src={frontmatter.featuredImage} alt={`Before and after: ${frontmatter.title}`} fill style={{ objectFit: "cover" }} priority sizes="(max-width: 768px) 100vw, 72ch" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container prose-container" style={{ padding: "3rem 1.5rem 5rem" }}>
        <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <Link href="/before-after" className="btn btn-outline">
            ← View all cases
          </Link>
        </div>
      </div>
    </>
  );
}
