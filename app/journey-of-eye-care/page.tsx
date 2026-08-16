import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { TreatmentExpert, TreatmentCTA } from "@/components/treatment";
import ContactSection from "@/components/home/ContactSection";
import { EyeCareJourney } from "@/components/journey/EyeCareJourney";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";
const URL = `${SITE_URL}/journey-of-eye-care`;
const DESCRIPTION =
  "A lifelong, four-step approach to eye care: skincare, non-surgical treatments, surgery and long-term maintenance, guided by Dr Sabrina Shah-Desai.";

export const metadata: Metadata = {
  title: "The Journey of Eye Care",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "article",
    url: URL,
    title: "The Journey of Eye Care | Perfect Eyes Ltd",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function JourneyOfEyeCarePage() {
  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Journey of Eye Care", url: URL },
  ];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${URL}#webpage`,
    url: URL,
    name: "The Journey of Eye Care",
    description: DESCRIPTION,
    inLanguage: "en-GB",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, URL);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <EyeCareJourney breadcrumbItems={breadcrumbItems} siteUrl={SITE_URL} />

      <div className="tp">
        <TreatmentExpert />
        <TreatmentCTA />
        <ContactSection />
      </div>
    </>
  );
}
