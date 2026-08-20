import type { Metadata } from "next";
import Link from "next/link";
import BeginJourney from "@/components/shared/BeginJourney";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import ContactSection from "@/components/home/ContactSection";
import CatalogueGrid from "@/components/catalogue/CatalogueGrid";
import { PageHero } from "@/components/treatment/PageHero";
import { TpIcon } from "@/components/treatment/TpIcon";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { getTreatmentCatalogue } from "@/lib/catalogue";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import styles from "@/components/catalogue/CataloguePage.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";
const URL = `${SITE_URL}/treatments`;

export const metadata: Metadata = {
  title: "All Treatments | Surgical & Non-Surgical",
  description:
    "Every surgical and non-surgical treatment at Perfect Eyes Clinic, from blepharoplasty and ptosis surgery to tear trough fillers, polynucleotides and laser resurfacing.",
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    type: "website",
    title: "All Treatments at Perfect Eyes Clinic",
    description:
      "Every surgical and non-surgical eye and facial treatment offered by Dr Sabrina Shah-Desai on Harley Street.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function TreatmentsIndexPage() {
  const { surgical, nonSurgical } = getTreatmentCatalogue();

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Treatments", url: URL },
  ];

  /* An ItemList per group, so the two collections are legible to a crawler as
     lists of treatments rather than as an undifferentiated page of links. */
  const listSchema = (name: string, items: { title: string; href: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `${SITE_URL}${item.href}`,
    })),
  });

  const groups = [
    {
      id: "surgical",
      eyebrow: "Surgical",
      title: "Surgical treatments",
      blurb:
        "Procedures performed by Dr Sabrina Shah-Desai, a consultant oculoplastic surgeon, in a CQC-regulated theatre.",
      items: surgical,
    },
    {
      id: "non-surgical",
      eyebrow: "Non-surgical",
      title: "Non-surgical treatments",
      blurb:
        "Injectable, energy-based and skin treatments for the eyes and face, most with little or no downtime.",
      items: nonSurgical,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems, URL)),
        }}
      />
      {groups.map((group) => (
        <script
          key={group.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema(group.title, group.items)) }}
        />
      ))}

      <div className="tp">
        <PageHero
          breadcrumbItems={breadcrumbItems}
          siteUrl={SITE_URL}
          eyebrow="Treatments"
          h1="Every treatment we offer"
          lead={`${surgical.length + nonSurgical.length} surgical and non-surgical treatments for the eyelids, the area around the eyes and the wider face - each one explained in full on its own page.`}
        >
          {/* A way to act without scrolling. The condition and treatment
              templates both put their CTAs inside the first viewport; these
              index pages are the same kind of landing page and were the only
              two without one. */}
          <div className={styles.heroCtas}>
            <Link href="/contact" className="tp-btn tp-btn-inverse">
              Book a Consultation
            </Link>
            <Link
              href="/self-test-survey"
              className="tp-btn"
              style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              Take the Eyelid Surgery Test
            </Link>
          </div>
        </PageHero>

        <AccreditedStrip />

        {groups.map((group, index) => (
          <section
            key={group.id}
            id={group.id}
            className={`${styles.section} ${index % 2 === 1 ? styles.sectionAlt : ""}`}
            aria-labelledby={`${group.id}-heading`}
          >
            <div className="container">
              <div className={styles.head}>
                <span className={styles.eyebrow}>
                  <TpIcon name="sparkle" size={13} />
                  {group.eyebrow}
                </span>
                <h2 id={`${group.id}-heading`} className={styles.title}>
                  {group.title}
                </h2>
                <p className={styles.blurb}>{group.blurb}</p>
                <span className={styles.rule} aria-hidden="true" />
              </div>

              <CatalogueGrid
                items={group.items}
                cta="Read about this treatment"
                /* Only the first group's opening row is above the fold. */
                eager={index === 0 ? 3 : 0}
              />
            </div>
          </section>
        ))}

        <section className={styles.note} aria-label="About these treatments">
          <div className="container">
            <p className={styles.noteText}>
              Suitability is decided at consultation, not from a list. Individual results
              vary, and not every treatment shown here is appropriate for every patient.
            </p>
          </div>
        </section>

        <BeginJourney />
        <ContactSection />
      </div>
    </>
  );
}
