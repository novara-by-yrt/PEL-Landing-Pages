import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { TreatmentStyles, TpIcon, PageHero, TreatmentCTA } from "@/components/treatment";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

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

      <TreatmentStyles />
      <div className="tp">
        <PageHero
          breadcrumbItems={[
            { name: "Home", url: SITE_URL },
            { name: "Before & After", url: `${SITE_URL}/before-after` },
            { name: frontmatter.title, url },
          ]}
          siteUrl={SITE_URL}
          eyebrow="Before & After"
          h1={frontmatter.title}
        />

        {/* Hero image */}
        {frontmatter.featuredImage && (
          <div className="container prose-container" style={{ marginTop: "-2rem", position: "relative", zIndex: 1 }}>
            <div style={{ borderRadius: "var(--tp-radius-lg)", overflow: "hidden", boxShadow: "var(--tp-shadow-md)", aspectRatio: "16/9", position: "relative" }}>
              <Image src={frontmatter.featuredImage} alt={`Before and after: ${frontmatter.title}`} fill style={{ objectFit: "cover" }} priority sizes="(max-width: 768px) 100vw, 72ch" />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container prose-container" style={{ padding: "3rem 1.5rem 1rem" }}>
          <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
          <div style={{ marginTop: "2rem" }}>
            <Link href="/before-after" className="tp-btn tp-btn-secondary">
              <TpIcon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} /> View all cases
            </Link>
          </div>
        </div>

        <TreatmentCTA />
      </div>
    </>
  );
}
