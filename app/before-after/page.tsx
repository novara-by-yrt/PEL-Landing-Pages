import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/mdx";
import { TpIcon, PageHero, TreatmentCTA } from "@/components/treatment";
import styles from "./page.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export const metadata: Metadata = {
  title: "Before & After Gallery",
  description:
    "View real patient before and after results for blepharoplasty, tear trough fillers, polynucleotides, Morpheus8, and more cosmetic eye treatments.",
  alternates: { canonical: `${SITE_URL}/before-after` },
};

export default function BeforeAfterIndexPage() {
  const cases = getAllPosts("before-after");

  return (
    <>
      <div className="tp">

        <PageHero
          breadcrumbItems={[
            { name: "Home", url: SITE_URL },
            { name: "Before & After", url: `${SITE_URL}/before-after` },
          ]}
          siteUrl={SITE_URL}
          eyebrow="Real Patient Results"
          h1="Before & After Gallery"
          lead="Genuine patient results across our full range of surgical and non-surgical eye treatments."
        />

        <div className={styles.baGrid}>
          {cases.map((caseItem) => (
            <Link key={caseItem.slug} href={`/before-after/${caseItem.slug}`} className={styles.baCard}>
              {caseItem.frontmatter.featuredImage && (
                <div className={styles.baCardImage}>
                  <Image
                    src={caseItem.frontmatter.featuredImage}
                    alt={`Before and after: ${caseItem.frontmatter.title}`}
                    fill
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className={styles.baCardBody}>
                <h2 className={styles.baCardTitle}>{caseItem.frontmatter.title}</h2>
                {(caseItem.frontmatter.excerpt || caseItem.frontmatter.galleryDescription) && (
                  <p className={styles.baCardExcerpt}>
                    {caseItem.frontmatter.excerpt || caseItem.frontmatter.galleryDescription}
                  </p>
                )}
                <span className={styles.baCardLink}>
                  View case <TpIcon name="arrow" size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <TreatmentCTA />
      </div>
    </>
  );
}
