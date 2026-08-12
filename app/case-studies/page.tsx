import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { TpIcon, TreatmentCTA } from "@/components/treatment";
import { BlogCard } from "@/components/blog/BlogCard";
import ContactSection from "@/components/home/ContactSection";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import styles from "./page.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export const metadata: Metadata = {
  title: "Case Studies - Thyroid Eye Disease, Blepharoplasty, Ptosis Repair, Skin Cancer & More | Perfect Eyes Ltd",
  description:
    "Case Studies - Thyroid Eye Disease, Blepharoplasty, Scarless droopy eyelid (ptosis) repair, Male Eyelid Lifts, Skin Cancer, Liquid Facelifts, Eyebag Surgery UK.",
  alternates: { canonical: `${SITE_URL}/case-studies` },
  openGraph: { url: `${SITE_URL}/case-studies`, type: "website", images: [DEFAULT_OG_IMAGE] },
};

// ISR — revalidate every hour so new case studies appear without a full rebuild
export const revalidate = 3600;

export default function CaseStudiesPage() {
  const caseStudies = getAllPosts("posts").filter(
    (p) => !p.frontmatter.seo?.robots?.includes("noindex") && p.frontmatter.categories?.includes("Case Study")
  );

  return (
    <div className="tp">
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <span className="tp-eyebrow">
          <TpIcon name="sparkle" size={13} />
          Real Patient Stories
        </span>
        <h1>Case Studies</h1>
        <p>A closer look at real patient journeys, shared in their own words and presented by Dr Sabrina Shah-Desai.</p>
      </section>

      <AccreditedStrip />

      <section className="tp-section">
        <div className="container">
          <div className={styles.grid}>
            {caseStudies.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <TreatmentCTA />
      <ContactSection />
    </div>
  );
}
