import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/treatment/PageHero";
import BlepharoplastyQuizForm from "@/components/forms/BlepharoplastyQuizForm";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";
const URL = `${SITE_URL}/blepharoplasty-quiz`;
const DESCRIPTION =
  "Answer twelve short questions and find out whether you are a good candidate for blepharoplasty (eyelid surgery) with Perfect Eyes Ltd.";

export const metadata: Metadata = {
  title: "Blepharoplasty Candidacy Quiz",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "article",
    url: URL,
    title: "Blepharoplasty Candidacy Quiz",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function BlepharoplastyQuizPage() {
  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Blepharoplasty Quiz", url: URL },
  ];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${URL}#webpage`,
    url: URL,
    name: "Blepharoplasty Candidacy Quiz",
    description: DESCRIPTION,
    inLanguage: "en-GB",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, URL);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="tp">
        <PageHero
          breadcrumbItems={breadcrumbItems}
          siteUrl={SITE_URL}
          eyebrow="Am I A Candidate?"
          h1="Blepharoplasty Candidacy Quiz"
          lead="Twelve short questions to help us understand your eyes and whether blepharoplasty is right for you."
        />

        <section style={{ padding: "0 1.5rem clamp(3rem, 6vw, 5rem)" }}>
          <BlepharoplastyQuizForm />
        </section>
      </div>
    </>
  );
}
