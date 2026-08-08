import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import {
  buildWebPageSchema,
  buildProductSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";
import Link from "next/link";
import { resolveHeroImage, ACCREDITATION_LOGOS } from "@/lib/page-utils";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import MeetDrSabrina from "@/components/shared/MeetDrSabrina";
import HomeFaq from "@/components/home/HomeFaq";
import PatientStories from "@/components/home/PatientStories";
import { PATIENT_STORIES } from "@/lib/reviews";
import {
  PageHero,
  TreatmentOverview,
  TreatmentAdvantages,
  TreatmentSpotlight,
  TreatmentSimilar,
  TreatmentCTA,
} from "@/components/treatment";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export async function generateStaticParams() {
  return getPostSlugs("condition").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("condition", slug);
  if (!post) return {};
  const { frontmatter } = post;
  const url = `${SITE_URL}/condition/${slug}`;
  const isNoIndex = frontmatter.seo?.robots?.includes("noindex");
  return {
    title: frontmatter.seo?.title || frontmatter.title,
    description: frontmatter.seo?.description || frontmatter.excerpt || "",
    robots: isNoIndex ? "noindex,nofollow" : "index,follow",
    alternates: { canonical: frontmatter.seo?.canonicalUrl || url },
    openGraph: {
      url,
      type: "website",
      title: frontmatter.seo?.og?.title || frontmatter.seo?.title || frontmatter.title,
      description: frontmatter.seo?.og?.description || frontmatter.seo?.description || frontmatter.excerpt || "",
      images: frontmatter.featuredImage ? [{ url: `${SITE_URL}${frontmatter.featuredImage}` }] : [],
    },
  };
}

// Rich template for the 12 "Eye Conditions" nav pages: hero image, overview,
// causes, accreditation strip, related-treatment spotlight, expert section,
// FAQ, CTA — all driven by frontmatter so each condition's MDX file (in
// content/condition/) stays the single source of truth.
//
// Three sections are the home page's own components, not condition-page
// variants, matching the treatment template's convention — see the comment
// above TreatmentPage in app/[...slug]/page.tsx:
//   • MeetDrSabrina  — the home About panel, with this page's own title.
//   • HomeFaq        — the home accordion, fed the page's own FAQ items.
//   • PatientStories — the home reviews rail, fed the shared PATIENT_STORIES.
export default async function ConditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug("condition", slug);
  if (!post) notFound();

  const { frontmatter, content } = post;
  const url = `${SITE_URL}/condition/${slug}`;

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Eye Conditions", url: `${SITE_URL}/condition/hooded-eyelids` },
    { name: frontmatter.title, url },
  ];

  const pageSchema = buildWebPageSchema(frontmatter, url);
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, url);
  const productSchema = frontmatter.schema?.productSchemaNeeded ? buildProductSchema(frontmatter, url) : null;
  const faqSchema = frontmatter.faq?.length ? buildFaqSchema(frontmatter.faq, url, frontmatter.title) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {productSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />}
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
          <AccreditedStrip logos={ACCREDITATION_LOGOS} />
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

        {frontmatter.showExpertSection && (
          <MeetDrSabrina id="expert" title="Meet the Expert: Dr Sabrina Shah-Desai" />
        )}

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
        <TreatmentCTA />
      </div>
    </>
  );
}
