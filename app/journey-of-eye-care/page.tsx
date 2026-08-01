import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/mdx";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { TreatmentExpert, TreatmentCTA, TreatmentFAQ } from "@/components/treatment";
import { JourneySections } from "@/components/journey/JourneySections";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";
const SLUG = "journey-of-eye-care";
const URL = `${SITE_URL}/${SLUG}`;

export async function generateMetadata(): Promise<Metadata> {
  const page = getPostBySlug("pages", SLUG);
  if (!page) return {};
  const { frontmatter } = page;
  return {
    title: frontmatter.seo?.title || frontmatter.title,
    description:
      frontmatter.seo?.description ||
      "A lifelong, four-step approach to eye care — skincare, non-surgical treatments, surgery and long-term maintenance, guided by Dr Sabrina Shah-Desai.",
    alternates: { canonical: URL },
    openGraph: { type: "article", url: URL },
  };
}

export default function JourneyOfEyeCarePage() {
  const page = getPostBySlug("pages", SLUG);
  if (!page) notFound();

  const { frontmatter, content } = page;
  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Journey of Eye Care", url: URL },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebPageSchema(frontmatter, URL)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems, URL)),
        }}
      />

      <div className="tp">

        <JourneySections content={content} />

        <TreatmentExpert />
        <TreatmentFAQ faq={frontmatter.faq} title="Eye Care" />
        <TreatmentCTA />
      </div>
    </>
  );
}
