import type { Metadata } from "next";
import Image from "next/image";
import PublicationsList from "@/components/PublicationsList";
import publicationsData from "@/content/publications-data.json";
import { TpIcon } from "@/components/treatment";
import { BlogCTA } from "@/components/blog/BlogCTA";
import ContactSection from "@/components/home/ContactSection";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import styles from "./page.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export const metadata: Metadata = {
  title: "Publications & Scientific Research | Dr Sabrina Shah-Desai",
  description:
    "Explore peer-reviewed medical publications, research papers, and scientific journal articles by Oculoplastic Surgeon Dr Sabrina Shah-Desai.",
  alternates: {
    canonical: `${SITE_URL}/publications`,
  },
  openGraph: {
    title: "Publications & Scientific Research | Dr Sabrina Shah-Desai",
    description:
      "Peer-reviewed scientific publications, clinical research papers, and medical journal articles by Dr Sabrina Shah-Desai.",
    url: `${SITE_URL}/publications`,
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function PublicationsPage() {
  // Collection JSON-LD Schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Publications & Scientific Research by Dr Sabrina Shah-Desai",
    url: `${SITE_URL}/publications`,
    description:
      "A comprehensive list of peer-reviewed journal articles, research papers, and publications in oculoplastic and aesthetic surgery by Dr Sabrina Shah-Desai.",
    author: {
      "@type": "Person",
      name: "Dr Sabrina Shah-Desai",
      jobTitle: "Oculoplastic Surgeon & Aesthetic Specialist",
    },
    hasPart: publicationsData.slice(0, 15).map((pub) => ({
      "@type": "ScholarlyArticle",
      headline: pub.rawTitle,
      name: pub.rawTitle,
      url: pub.url,
      datePublished: pub.date,
      publisher: {
        "@type": "Organization",
        name: pub.journal,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="tp">

        {/* Hero */}
        <section className={styles.pubHero}>
          <div className={styles.pubHeroGlow} />
          <div className={styles.pubHeroInner}>
            <div className={styles.pubHeroCopy}>
            <span className="tp-eyebrow"><TpIcon name="sparkle" size={13} />Clinical Research &amp; Publications</span>

            <h1>Publications &amp; Scientific Papers</h1>

            <p className={styles.pubLead}>
              Explore peer-reviewed scientific publications, medical research, and academic journal articles authored by Oculoplastic Surgeon Dr Sabrina Shah-Desai.
            </p>

            <div className={styles.pubStats}>
              <div>
                <div className={styles.pubStatValue}>32+</div>
                <div className={styles.pubStatLabel}>Published Papers</div>
              </div>
              <div>
                <div className={styles.pubStatValue}>20+ Years</div>
                <div className={styles.pubStatLabel}>Oculoplastic Innovation</div>
              </div>
              <div>
                <div className={styles.pubStatValue}>Global</div>
                <div className={styles.pubStatLabel}>Medical Journals &amp; PubMed</div>
              </div>
            </div>
            </div>

            {/* Portrait alongside the copy from 900px up; below that the hero
                stays a single column and the image is dropped rather than
                pushing the heading off a phone screen. */}
            <figure className={styles.pubHeroFigure}>
              <Image
                src="/Dr%20Sabrina%20Publications.jpeg"
                alt="Dr Sabrina Shah-Desai"
                width={1066}
                height={1600}
                sizes="(min-width: 1200px) 400px, 34vw"
                className={styles.pubHeroImg}
                priority
              />
            </figure>
          </div>
        </section>

        {/* Publications list + CTA */}
        <div className={styles.pubBody}>
          <PublicationsList initialPublications={publicationsData} />
        </div>

        <BlogCTA />
        <ContactSection />
      </div>
    </>
  );
}
