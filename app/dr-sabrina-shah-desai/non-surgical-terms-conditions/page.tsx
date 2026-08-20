import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { TermsConditions } from "@/components/legal/TermsConditions";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";
const URL = `${SITE_URL}/dr-sabrina-shah-desai/non-surgical-terms-conditions`;
const DESCRIPTION =
  "Terms and conditions covering appointments, payment, refunds and complaints at Perfect Eyes Ltd and Perfect Skin Studio.";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    url: URL,
    title: "Terms & Conditions | Perfect Eyes Clinic",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function TermsConditionsPage() {
  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Dr Sabrina Shah-Desai", url: `${SITE_URL}/dr-sabrina-shah-desai` },
    { name: "Terms and Conditions", url: URL },
  ];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${URL}#webpage`,
    url: URL,
    name: "Terms and Conditions",
    description: DESCRIPTION,
    inLanguage: "en-GB",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, URL);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <TermsConditions breadcrumbItems={breadcrumbItems} siteUrl={SITE_URL} />
    </>
  );
}
