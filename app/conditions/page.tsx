import type { Metadata } from "next";
import BeginJourney from "@/components/shared/BeginJourney";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import ContactSection from "@/components/home/ContactSection";
import CatalogueGrid from "@/components/catalogue/CatalogueGrid";
import { PageHero } from "@/components/treatment/PageHero";
import { TpIcon } from "@/components/treatment/TpIcon";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { getConditionCatalogue } from "@/lib/catalogue";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import styles from "@/components/catalogue/CataloguePage.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";
const URL = `${SITE_URL}/conditions`;

export const metadata: Metadata = {
  title: "Eye Conditions We Treat",
  description:
    "Every eye and eyelid condition treated at Perfect Eyes Ltd — from hooded eyelids, ptosis and eye bags to chalazion, xanthelasma and thyroid eye disease.",
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    type: "website",
    title: "Eye Conditions Treated at Perfect Eyes Ltd",
    description:
      "The eye and eyelid conditions treated by Dr Sabrina Shah-Desai, consultant oculoplastic surgeon, on Harley Street.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ConditionsIndexPage() {
  const conditions = getConditionCatalogue();

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Eye Conditions", url: URL },
  ];

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Eye conditions treated at Perfect Eyes Ltd",
    numberOfItems: conditions.length,
    itemListElement: conditions.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems, URL)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />

      <div className="tp">
        <PageHero
          breadcrumbItems={breadcrumbItems}
          siteUrl={SITE_URL}
          eyebrow="Eye Conditions"
          h1="Conditions we treat"
          lead={`${conditions.length} conditions of the eyelids and the area around the eyes, each explained on its own page — what causes it, how it is assessed, and the treatments that address it.`}
        />

        <AccreditedStrip />

        <section className={styles.section} aria-labelledby="conditions-heading">
          <div className="container">
            <div className={styles.head}>
              <span className={styles.eyebrow}>
                <TpIcon name="sparkle" size={13} />
                A to Z
              </span>
              <h2 id="conditions-heading" className={styles.title}>
                Every condition we treat
              </h2>
              <p className={styles.blurb}>
                If what you are experiencing is not listed, it is still worth asking — these
                are the conditions seen most often, not the only ones.
              </p>
              <span className={styles.rule} aria-hidden="true" />
            </div>

            <CatalogueGrid items={conditions} cta="Read about this condition" eager={3} />
          </div>
        </section>

        <section className={styles.note} aria-label="About these conditions">
          <div className="container">
            <p className={styles.noteText}>
              These pages describe conditions in general terms and are not a diagnosis. If
              a change to your eyes or eyelids has come on suddenly, or is painful, seek
              medical advice rather than waiting for a cosmetic consultation.
            </p>
          </div>
        </section>

        <BeginJourney />
        <ContactSection />
      </div>
    </>
  );
}
