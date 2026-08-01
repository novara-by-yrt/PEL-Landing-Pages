import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPostSlugs, type PostFrontmatter } from "@/lib/mdx";
import {
  buildWebPageSchema,
  buildProductSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";
import pageHierarchy from "@/content/page-hierarchy.json";
import urlMapData from "@/content/url-map.json";
import treatmentMetaRaw from "@/content/treatment-meta.json";
import type { TreatmentMeta, BreadcrumbItem } from "@/components/treatment/types";
import AutoScrollCarousel from "@/components/home/AutoScrollCarousel";
import {
  TreatmentStyles,
  TreatmentHero,
  TreatmentFactBar,
  TreatmentAdvantages,
  TreatmentContent,
  TreatmentOverview,
  TreatmentExpert,
  TreatmentPricing,
  TreatmentFAQ,
  TreatmentReviews,
  RealSelfWidget,
  TreatmentSimilar,
  TreatmentSpotlight,
  RelatedBlogs,
  TreatmentCTA,
  PageHero,
} from "@/components/treatment";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

const ACCREDITATION_LOGOS = [
  { src: "/uploads/2024/09/11.png", alt: "The Royal College of Ophthalmologists Logo" },
  { src: "/uploads/2024/09/22.png", alt: "The Royal College of Surgeons of Edinburgh Logo" },
  { src: "/uploads/2024/09/31.png", alt: "BAPRAS Logo" },
  { src: "/uploads/2024/09/41.png", alt: "General Medical Council" },
  { src: "/uploads/2024/09/51.png", alt: "APRASSA Logo" },
  { src: "/uploads/2024/09/61.png", alt: "South African Society for SASDS Dermatologic Surgery Logo" },
  { src: "/uploads/2024/09/71.png", alt: "BOPSS British Oculoplastic Surgery Society" },
];

const childPages: Record<string, string[]> = pageHierarchy.childPages;
const urlToMdxMap: Record<string, string> = urlMapData.urlToMdx;

const treatmentMeta = treatmentMetaRaw as unknown as Record<string, TreatmentMeta>;
const TREATMENT_SLUGS = new Set(Object.keys(treatmentMeta));

// Matches the "Eye Conditions" nav in Header.tsx — these get the rich
// ConditionPage template (hero image, overview, causes, related treatment
// spotlight, accreditation, FAQ) instead of the plain GenericPage.
const CONDITION_SLUGS = new Set([
  "condition-hooded-eyelids",
  "eye-bags",
  "droopy-ptosis-eye",
  "dark-circles-under-eyes",
  "condition-hollow-sunken-eyes",
  "crows-feet",
  "condition-swollen-eyelids",
  "chalazion",
  "xanthelasma",
  "monolids",
  "thyroid-disease-puffy-eyes",
  "eyelid-cancer",
]);

// The hero's visual image is deliberately separate from featuredImage (used
// for OG/meta only): some pages have a real photo on the live site but no
// hero image at all, and forcing featuredImage into the hero misrepresents
// that. Set `heroImage` explicitly (including `heroImage: null` to force no
// hero photo) when it needs to differ from the default of "reuse featuredImage".
function resolveHeroImage(frontmatter: PostFrontmatter): string | undefined {
  if (frontmatter.heroImage !== undefined) return frontmatter.heroImage || undefined;
  return frontmatter.featuredImage && frontmatter.featuredImage !== "NONE"
    ? frontmatter.featuredImage
    : undefined;
}

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

  if (CONDITION_SLUGS.has(fileSlug)) {
    return <ConditionPage frontmatter={frontmatter} content={content} breadcrumbItems={breadcrumbItems} schemas={schemas} />;
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

// ── Condition page layout ────────────────────────────────────────────────────
// Rich template for the 12 "Eye Conditions" nav pages (see CONDITION_SLUGS):
// hero image, overview, causes, accreditation strip, related-treatment
// spotlight, expert section, FAQ, CTA — all driven by frontmatter so each
// condition's MDX file stays the single source of truth.

function ConditionPage({
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

        {frontmatter.overview ? (
          <TreatmentOverview
            eyebrow={frontmatter.overview.eyebrow}
            heading={frontmatter.overview.heading || `What is ${frontmatter.title}?`}
            paragraphs={frontmatter.overview.paragraphs}
            image={frontmatter.overview.image}
            imageBadge={frontmatter.overview.imageBadge}
          />
        ) : (
          <div className="container prose-container" style={{ padding: "3rem 1.5rem 1rem" }}>
            <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}

        {frontmatter.overview && content.trim() && (
          <div className="container prose-container" style={{ padding: "0 1.5rem 1rem" }}>
            <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}

        {frontmatter.causes && frontmatter.causes.length > 0 && (
          <TreatmentAdvantages
            advantages={frontmatter.causes}
            title={frontmatter.title}
            eyebrow={frontmatter.causesEyebrow || "Understanding the condition"}
            heading={frontmatter.causesHeading || `Causes of ${frontmatter.title}`}
          />
        )}

        {frontmatter.showAccreditation && (
          <div style={{ background: "#fff", padding: "2.5rem 0", borderTop: "1px solid var(--tp-line)", borderBottom: "1px solid var(--tp-line)" }}>
            <AutoScrollCarousel items={ACCREDITATION_LOGOS} speed={35} />
          </div>
        )}

        {frontmatter.relatedTreatments && frontmatter.relatedTreatments.length > 0 && (
          frontmatter.relatedTreatments.length <= 2 ? (
            <TreatmentSpotlight
              items={frontmatter.relatedTreatments}
              eyebrow={frontmatter.relatedTreatmentsEyebrow || "Treatment options"}
              heading={frontmatter.relatedTreatmentsHeading || `Treatments for ${frontmatter.title}`}
            />
          ) : (
            <TreatmentSimilar
              items={frontmatter.relatedTreatments}
              eyebrow={frontmatter.relatedTreatmentsEyebrow || "Treatment options"}
              heading={frontmatter.relatedTreatmentsHeading || `Treatments for ${frontmatter.title}`}
            />
          )
        )}

        {frontmatter.showExpertSection && <TreatmentExpert />}

        <TreatmentFAQ faq={frontmatter.faq} title={frontmatter.title} />
        <TreatmentCTA />
      </div>
    </>
  );
}

// ── Generic page layout ──────────────────────────────────────────────────────
// Plain template for everything else (privacy notices, self-test-survey,
// thank-you, terms, and other one-off pages): hero, prose content, optional
// FAQ, CTA. Deliberately simple — condition-specific sections live only in
// ConditionPage above.

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
