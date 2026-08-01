import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { TreatmentStyles, PageHero, TreatmentCTA } from "@/components/treatment";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

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

      <TreatmentStyles />
      <div className="tp">
        <PageHero
          breadcrumbItems={[
            { name: "Home", url: SITE_URL },
            { name: "Conditions", url: `${SITE_URL}/condition` },
            { name: frontmatter.title, url },
          ]}
          siteUrl={SITE_URL}
          eyebrow="Eye Condition"
          h1={frontmatter.title}
          lead={frontmatter.excerpt}
          heroImage={frontmatter.featuredImage}
          heroImageAlt={frontmatter.title}
        />

        {/* Page content */}
        <div className="container prose-container" style={{ padding: "3rem 1.5rem 1rem" }}>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        <TreatmentCTA />
      </div>
    </>
  );
}
