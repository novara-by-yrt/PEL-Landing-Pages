import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/mdx";
import { TreatmentStyles, TpIcon, PageHero, TreatmentCTA } from "@/components/treatment";

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
      <TreatmentStyles />
      <div className="tp">
        <style>{`
          .ba-grid { max-width: 1200px; margin: 0 auto; padding: clamp(3rem, 6vw, 4.5rem) 1.5rem 5rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
          .ba-card { display: block; text-decoration: none; background: #fff; border: 1px solid var(--tp-line); border-radius: var(--tp-radius-lg); overflow: hidden; box-shadow: var(--tp-shadow-xs); transition: transform 240ms var(--tp-ease), box-shadow 240ms var(--tp-ease); }
          .ba-card:hover { transform: translateY(-4px); box-shadow: var(--tp-shadow-md); }
          .ba-card-image { aspect-ratio: 16/10; position: relative; overflow: hidden; background: var(--tp-fog); }
          .ba-card-body { padding: 1.5rem 1.75rem 1.75rem; }
          .ba-card-title { font-family: var(--tp-display); font-weight: 600; font-size: 1.15rem; line-height: 1.35; color: var(--tp-ink); margin-bottom: 0.5rem; }
          .ba-card-excerpt { font-size: 0.9375rem; color: var(--tp-slate); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 1rem; }
          .ba-card-link { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 600; color: var(--tp-indigo-700); }
        `}</style>

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

        <div className="ba-grid">
          {cases.map((caseItem) => (
            <Link key={caseItem.slug} href={`/before-after/${caseItem.slug}`} className="ba-card">
              {caseItem.frontmatter.featuredImage && (
                <div className="ba-card-image">
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
              <div className="ba-card-body">
                <h2 className="ba-card-title">{caseItem.frontmatter.title}</h2>
                {(caseItem.frontmatter.excerpt || caseItem.frontmatter.galleryDescription) && (
                  <p className="ba-card-excerpt">
                    {caseItem.frontmatter.excerpt || caseItem.frontmatter.galleryDescription}
                  </p>
                )}
                <span className="ba-card-link">
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
