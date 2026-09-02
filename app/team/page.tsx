import type { Metadata } from "next";
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <TeamRoster />
    </>
  );
}
