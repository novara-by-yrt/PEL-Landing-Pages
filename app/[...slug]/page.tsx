import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs, pageExistsExact, type PostFrontmatter } from "@/lib/mdx";
import {
  buildWebPageSchema,
  buildProductSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";
import { resolveHeroImage } from "@/lib/page-utils";
import { DrSabrinaBio } from "@/components/about/DrSabrinaBio";
import ContactSection from "@/components/home/ContactSection";
import PatientStories from "@/components/home/PatientStories";
import HomeFaq from "@/components/home/HomeFaq";
import MeetDrSabrina from "@/components/shared/MeetDrSabrina";
import { PATIENT_STORIES } from "@/lib/reviews";
import pageHierarchy from "@/content/page-hierarchy.json";
import urlMapData from "@/content/url-map.json";
import treatmentMetaRaw from "@/content/treatment-meta.json";
import { TREATMENT_PATHS } from "@/lib/treatment-urls";
import type { TreatmentMeta, BreadcrumbItem } from "@/components/treatment/types";
import {
  TreatmentHero,
  TreatmentFactBar,
  TreatmentAdvantages,
  TreatmentContent,
  TreatmentPricing,
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

/** "upper-eyelid-blepharoplasty-uk" -> "Upper Eyelid Blepharoplasty UK" */
const ACRONYMS = new Set(["uk", "usa", "ipl", "rf", "prp"]);
function humaniseSegment(seg: string): string {
  return seg
    .split("-")
    .map((w) => (ACRONYMS.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

export async function generateStaticParams() {
  const fileSlugs = getPostSlugs("pages");
  const paramsList: { slug: string[] }[] = [];
  const addedPaths = new Set<string>();

  // Canonical treatment paths first — these are the indexable URLs.
  for (const urlPath of Object.values(TREATMENT_PATHS)) {
    if (!addedPaths.has(urlPath)) {
      addedPaths.add(urlPath);
      paramsList.push({ slug: urlPath.split("/") });
    }
  }

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
  // Treatments are canonical at their nested WordPress path, not the flat slug.
  const metaFileSlug = frontmatter.slug || slugSegments[slugSegments.length - 1];
  const canonicalPath = TREATMENT_PATHS[metaFileSlug] ?? slugSegments.join("/");
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
  const fileSlug = frontmatter.slug || slugSegments[slugSegments.length - 1];
  // Treatments are canonical at their nested WordPress path, not the flat slug.
  const canonicalPath = TREATMENT_PATHS[fileSlug] ?? slugSegments.join("/");
  const url = `${SITE_URL}/${canonicalPath}`;
  const treatment = TREATMENT_SLUGS.has(fileSlug) ? treatmentMeta[fileSlug] : null;

  const canonicalSegments = canonicalPath.split("/");
  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    ...canonicalSegments.map((seg, i) => {
      const segPath = canonicalSegments.slice(0, i + 1);
      const isLast = i === canonicalSegments.length - 1;
      // Only link intermediate crumbs that lead to a real page — the previous
      // site's category pages (/surgical, /non-surgical) aren't migrated yet.
      const linkable = isLast || pageExistsExact("pages", segPath);
      return {
        name: humaniseSegment(seg),
        url: linkable ? `${SITE_URL}/${segPath.join("/")}` : "",
      };
    }),
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
    return (
      <TreatmentPage
        treatment={treatment}
        treatmentSlug={fileSlug}
        frontmatter={frontmatter}
        content={content}
        breadcrumbItems={breadcrumbItems}
        schemas={schemas}
      />
    );
  }

  if (fileSlug === "dr-sabrina-shah-desai") {
    return (
      <>
        {schemas}
        <DrSabrinaBio breadcrumbItems={breadcrumbItems} siteUrl={SITE_URL} faq={frontmatter.faq} />
      </>
    );
  }

  return <GenericPage frontmatter={frontmatter} content={content} breadcrumbItems={breadcrumbItems} schemas={schemas} />;
}

// ── Treatment page layout ────────────────────────────────────────────────────
//
// Every treatment renders through this one component, so a section changed
// here changes on all of them — that is the intent, and new treatments pick it
// up with no extra work.
//
// Three of the sections are the home page's own components rather than
// treatment-only variants, and should stay that way:
//   • MeetDrSabrina  — the home About panel, with the treatment page's title.
//   • HomeFaq        — the home accordion, fed the page's own FAQ items.
//   • PatientStories — the home reviews rail, fed the shared PATIENT_STORIES.

function TreatmentPage({
  treatment,
  treatmentSlug,
  frontmatter,
  content,
  breadcrumbItems,
  schemas,
}: {
  treatment: TreatmentMeta;
  treatmentSlug: string;
  frontmatter: PostFrontmatter;
  content: string;
  breadcrumbItems: BreadcrumbItem[];
  schemas: React.ReactNode;
}) {
  const isSurgical = treatment.type === "surgical";

  return (
    <>
      {schemas}
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
        <MeetDrSabrina id="expert" title="Meet the Expert: Dr Sabrina Shah-Desai" />
        <TreatmentPricing
          pricing={treatment.pricing}
          title={frontmatter.title}
          pricingTitle={treatment.pricingTitle}
          pricingLead={treatment.pricingLead}
        />
        <HomeFaq
          items={frontmatter.faq ?? []}
          eyebrow={`Patient questions about ${frontmatter.title}`}
          title="Frequently asked questions"
          lead="Call or email us today, we would be delighted to answer your questions."
          contentIsHtml
          footer={
            <Link href="/contact" className="tp-btn tp-btn-primary">
              Ask a Question or Book an Appointment
            </Link>
          }
        />
        <PatientStories stories={PATIENT_STORIES} />
        <TreatmentSimilar items={treatment.similarTreatments} currentSlug={treatmentSlug} />
        <TreatmentCTA />
        <RelatedBlogs />
        <RealSelfWidget />
        <ContactSection />
      </div>
    </>
  );
}

// ── Generic page layout ──────────────────────────────────────────────────────
// Plain template for everything else (privacy notices, self-test-survey,
// thank-you, terms, and other one-off pages): hero, prose content, optional
// FAQ, CTA. The 12 "Eye Conditions" pages have their own rich template at
// app/condition/[slug]/page.tsx and live in content/condition/.
//
// Two sections are the home page's own components, matching the convention
// on the treatment and condition templates:
//   • HomeFaq        — the home accordion, fed the page's own FAQ items.
//   • PatientStories — the home reviews rail, fed the shared PATIENT_STORIES.

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
      <div className="tp">
        <PageHero
          breadcrumbItems={breadcrumbItems}
          siteUrl={SITE_URL}
          h1={frontmatter.title}
          lead={frontmatter.excerpt}
          heroImage={resolveHeroImage(frontmatter)}
          heroImageAlt={frontmatter.title}
        />

        <TreatmentContent content={content} />

        {frontmatter.faq?.length ? (
          <HomeFaq
            items={frontmatter.faq}
            eyebrow={`Patient questions about ${frontmatter.title}`}
            title="Frequently asked questions"
            lead="Call or email us today, we would be delighted to answer your questions."
            contentIsHtml
            footer={
              <Link href="/contact" className="tp-btn tp-btn-primary">
                Ask a Question or Book an Appointment
              </Link>
            }
          />
        ) : null}
        <PatientStories stories={PATIENT_STORIES} />
        <TreatmentCTA />
      </div>
    </>
  );
}
