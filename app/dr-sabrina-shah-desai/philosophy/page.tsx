import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { Philosophy } from "@/components/about/Philosophy";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";
const URL = `${SITE_URL}/dr-sabrina-shah-desai/philosophy`;
const DESCRIPTION =
  "Dr Sabrina Shah-Desai's philosophy of care: beauty as an act of nature, guided by the intuitive holistic vision she calls her third eye.";

export const metadata: Metadata = {
  title: "Philosophy | Dr Sabrina Shah-Desai",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { type: "website", url: URL, title: "Philosophy | Dr Sabrina Shah-Desai" },
};

export default function PhilosophyPage() {
  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Dr Sabrina Shah-Desai", url: `${SITE_URL}/dr-sabrina-shah-desai` },
    { name: "Philosophy", url: URL },
  ];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${URL}#webpage`,
    url: URL,
    name: "Philosophy",
    description: DESCRIPTION,
    inLanguage: "en-GB",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, URL);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Philosophy />
    </>
  );
}
