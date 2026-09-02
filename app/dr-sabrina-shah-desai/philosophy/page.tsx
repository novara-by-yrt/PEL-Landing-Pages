import type { Metadata } from "next";
import { Philosophy } from "@/components/about/Philosophy";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";
const URL = `${SITE_URL}/dr-sabrina-shah-desai/philosophy`;
const DESCRIPTION =
  "Dr Sabrina Shah-Desai's philosophy of care: beauty as an act of nature, guided by the intuitive holistic vision she calls her third eye.";

export const metadata: Metadata = {
  title: "Philosophy | Dr Sabrina Shah-Desai",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    url: URL,
    title: "Philosophy | Dr Sabrina Shah-Desai",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function PhilosophyPage() {
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <Philosophy />
    </>
  );
}
