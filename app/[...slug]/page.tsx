import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs, type PostFrontmatter } from "@/lib/mdx";
import {
  buildWebPageSchema,
  buildProductSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";
import { resolveHeroImage } from "@/lib/page-utils";
import pageHierarchy from "@/content/page-hierarchy.json";
import urlMapData from "@/content/url-map.json";
import treatmentMetaRaw from "@/content/treatment-meta.json";
import type { TreatmentMeta, BreadcrumbItem } from "@/components/treatment/types";
import {
  TreatmentStyles,
  TreatmentHero,
  TreatmentFactBar,
  TreatmentAdvantages,
  TreatmentContent,
  TreatmentExpert,
  TreatmentPricing,
  TreatmentFAQ,
  TreatmentReviews,
  RealSelfWidget,
  TreatmentSimilar,
  RelatedBlogs,
  TreatmentCTA,
  PageHero,
} from "@/components/treatment";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

const childPages: Record<string, string[]> = pageHierarchy.childPages;
const urlToMdxMap: Record<string, string> = urlMapData.urlToMdx;

const treatmentMeta = treatmentMetaRaw as unknown as Record<string, TreatmentMeta>;
const TREATMENT_SLUGS = new Set(Object.keys(treatmentMeta));

export async function generateStaticParams() {
  const fileSlugs = getPostSlugs("pages");
  const paramsList: { slug: string[] }[] = [];
  const addedPaths = new Set<string>();

  for (const urlPath of Object.keys(urlToMdxMap)) {
    if (!addedPaths.has(urlPath)) {
      addedPaths.add(urlPath);
      paramsList.push({ slug: urlPath.split("/") });
    }
  }

  for (const segs of Object.values(childPages)) {
    const key = segs.join("/");
    if (!addedPaths.has(key)) {
      addedPaths.add(key);
      paramsList.push({ slug: segs });
    }
  }

  for (const fileSlug of fileSlugs) {
    if (!addedPaths.has(fileSlug)) {
      addedPaths.add(fileSlug);
      paramsList.push({ slug: [fileSlug] });
    }
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
  const isNoIndex = frontmatter.seo?.robots?.includes("noindex");

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
  if (!page) notFound();

  const { frontmatter, content } = page;
  const canonicalPath = slugSegments.join("/");
  const url = `${SITE_URL}/${canonicalPath}`;
  const fileSlug = frontmatter.slug || slugSegments[slugSegments.length - 1];
  const treatment = TREATMENT_SLUGS.has(fileSlug) ? treatmentMeta[fileSlug] : null;

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    ...slugSegments.map((seg, i) => ({
      name: seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      url: `${SITE_URL}/${slugSegments.slice(0, i + 1).join("/")}`,
    })),
  ];

  const pageSchema = buildWebPageSchema(frontmatter, url);
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, url);
  const productSchema = frontmatter.schema?.productSchemaNeeded
    ? buildProductSchema(frontmatter, url)
    : null;
  const faqSchema = frontmatter.faq?.length
    ? buildFaqSchema(frontmatter.faq, url, frontmatter.title)
    : null;

  const schemas = (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {productSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />}
    </>
  );

  if (treatment) {
    return <TreatmentPage treatment={treatment} frontmatter={frontmatter} content={content} breadcrumbItems={breadcrumbItems} schemas={schemas} />;
  }

  return <GenericPage frontmatter={frontmatter} content={content} breadcrumbItems={breadcrumbItems} schemas={schemas} />;
}

// ── Treatment page layout ────────────────────────────────────────────────────

function TreatmentPage({
  treatment,
  frontmatter,
  content,
  breadcrumbItems,
  schemas,
}: {
  treatment: TreatmentMeta;
  frontmatter: PostFrontmatter;
  content: string;
  breadcrumbItems: BreadcrumbItem[];
  schemas: React.ReactNode;
}) {
  const isSurgical = treatment.type === "surgical";

  return (
    <>
      {schemas}
      <TreatmentStyles />
      <div className="tp">
        <TreatmentHero
          breadcrumbItems={breadcrumbItems}
          siteUrl={SITE_URL}
          isSurgical={isSurgical}
          h1={treatment.h1 || frontmatter.title}
          subtitle={treatment.subtitle}
          heroImage={treatment.heroImage}
          heroImageAlt={`${frontmatter.title} illustration`}
        />
        <TreatmentFactBar glance={treatment.glance} title={frontmatter.title} />
        <TreatmentAdvantages advantages={treatment.advantages} title={frontmatter.title} />
        <TreatmentContent content={content} />
        <TreatmentExpert />
        <TreatmentPricing pricing={treatment.pricing} title={frontmatter.title} />
        <TreatmentFAQ faq={frontmatter.faq} title={frontmatter.title} />
        <TreatmentReviews reviews={treatment.reviews} />
        <TreatmentSimilar items={treatment.similarTreatments} />
        <TreatmentCTA />
        <RelatedBlogs />
        <RealSelfWidget />
      </div>
    </>
  );
}

// ── Generic page layout ──────────────────────────────────────────────────────
// Plain template for everything else (privacy notices, self-test-survey,
// thank-you, terms, and other one-off pages): hero, prose content, optional
// FAQ, CTA. The 12 "Eye Conditions" pages have their own rich template at
// app/condition/[slug]/page.tsx and live in content/condition/.

function GenericPage({
  frontmatter,
  content,
  breadcrumbItems,
  schemas,
}: {
  frontmatter: PostFrontmatter;
  content: string;
  breadcrumbItems: { name: string; url: string }[];
  schemas: React.ReactNode;
}) {
  return (
    <>
      {schemas}
      <TreatmentStyles />
      <div className="tp">
        <PageHero
          breadcrumbItems={breadcrumbItems}
          siteUrl={SITE_URL}
          h1={frontmatter.title}
          lead={frontmatter.excerpt}
          heroImage={resolveHeroImage(frontmatter)}
          heroImageAlt={frontmatter.title}
        />

        <div className="container prose-container" style={{ padding: "3rem 1.5rem 1rem" }}>
          <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <TreatmentFAQ faq={frontmatter.faq} title={frontmatter.title} />
        <TreatmentCTA />
      </div>
    </>
  );
}
