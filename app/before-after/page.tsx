import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/mdx";

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
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, hsl(199 90% 22%), hsl(199 90% 32%))",
          color: "#fff",
          padding: "5rem 0 4rem",
          textAlign: "center",
        }}
      >
        <div className="container">
          <p className="hero-eyebrow">Real Results</p>
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2.25rem, 6vw, 3.5rem)",
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Before & After Gallery
          </h1>
          <p style={{ color: "hsl(0 0% 100% / 0.8)", fontSize: "1.125rem", maxWidth: "48ch", margin: "0 auto" }}>
            Genuine patient results across our full range of surgical and non-surgical treatments.
          </p>
        </div>
      </div>

      {/* Gallery grid */}
      <section className="section container">
        <div className="grid-cards-2">
          {cases.map((caseItem) => (
            <Link
              key={caseItem.slug}
              href={`/before-after/${caseItem.slug}`}
              style={{ textDecoration: "none" }}
            >
              <article className="card">
                {caseItem.frontmatter.featuredImage && (
                  <div className="card-image">
                    <Image
                      src={caseItem.frontmatter.featuredImage}
                      alt={`Before and after: ${caseItem.frontmatter.title}`}
                      width={640}
                      height={400}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="card-body">
                  <h2 className="card-title">{caseItem.frontmatter.title}</h2>
                  {caseItem.frontmatter.excerpt && (
                    <p className="card-excerpt">{caseItem.frontmatter.excerpt}</p>
                  )}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--clr-primary)",
                      marginTop: "1rem",
                    }}
                  >
                    View case →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
