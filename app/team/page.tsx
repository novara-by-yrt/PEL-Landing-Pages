import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { TeamRoster } from "@/components/about/TeamRoster";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";
const URL = `${SITE_URL}/team`;
const DESCRIPTION =
  "Meet the aesthetic practitioners, surgical coordinators and patient care specialists at the Perfect Eyes Clinic clinic on Harley Street, London.";

export const metadata: Metadata = {
  title: "Meet the Team",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    url: URL,
    title: "Meet the Team | Perfect Eyes Clinic",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function TeamPage() {
  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Team", url: URL },
  ];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${URL}#webpage`,
    url: URL,
    name: "Meet the Team",
    description: DESCRIPTION,
    inLanguage: "en-GB",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, URL);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <TeamRoster breadcrumbItems={breadcrumbItems} siteUrl={SITE_URL} />
    </>
  );
}
