import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/mdx";
import { buildOrganizationSchema } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skynology.com";

export const metadata: Metadata = {
  title: "Skynology | Expert Eye & Aesthetic Treatments",
  description:
    "Skynology offers expert cosmetic eye surgery and non-surgical aesthetic treatments in the UK — blepharoplasty, tear trough fillers, polynucleotides, Morpheus8, and more.",
  alternates: { canonical: SITE_URL },
  openGraph: { url: SITE_URL, type: "website" },
};

const FEATURED_TREATMENTS = [
  { href: "/blepharoplasty-treatment-in-london", label: "Blepharoplasty", icon: "👁️" },
  { href: "/ptosis-surgery", label: "Ptosis Surgery", icon: "⬆️" },
  { href: "/non-surgical-tear-trough-fillers-uk", label: "Tear Trough Fillers", icon: "💉" },
  { href: "/polynucleotides", label: "Polynucleotides", icon: "✨" },
  { href: "/morpheus8", label: "Morpheus8", icon: "🔬" },
  { href: "/before-after", label: "Before & After", icon: "🔄" },
];

const STATS = [
  { value: "20+", label: "Years Experience" },
  { value: "5,000+", label: "Patients Treated" },
  { value: "5.0★", label: "Average Rating" },
  { value: "100%", label: "Personalised Care" },
];

export default function HomePage() {
  const recentPosts = getAllPosts("posts")
    .filter((p) => !p.frontmatter.seo?.robots?.includes("noindex"))
    .slice(0, 3);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero" aria-label="Hero section">
        <div className="container hero-content">
          <p className="hero-eyebrow">
            <span aria-hidden="true">⭐</span> Expert Cosmetic Eye Surgery
          </p>
          <h1>
            See the World Through<br />
            <span style={{ color: "hsl(38 92% 70%)" }}>Beautiful Eyes</span>
          </h1>
          <p className="hero-lead">
            Industry-leading surgical and non-surgical eye treatments, delivered by
            specialist surgeons with 20+ years of experience.
          </p>
          <div className="hero-actions">
            <Link href="/contact-cosmetic-eye-surgeon" className="btn btn-primary btn-lg">
              Book Consultation
            </Link>
            <Link
              href="/before-after"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1rem",
                fontWeight: 600,
                color: "hsl(0 0% 100% / 0.9)",
                padding: "1rem 2rem",
                border: "2px solid hsl(0 0% 100% / 0.3)",
                borderRadius: "9999px",
                transition: "border-color 0.15s ease, background 0.15s ease",
              }}
            >
              View Results →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <div
        style={{
          background: "var(--clr-text)",
          color: "#fff",
          padding: "2rem 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontWeight: 700,
                    color: "hsl(38 92% 70%)",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: "0.8125rem", color: "hsl(0 0% 100% / 0.6)", marginTop: "0.375rem" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured Treatments ──────────────────────────────────────────── */}
      <section className="section container">
        <div className="section-header">
          <span className="section-eyebrow">Our Treatments</span>
          <h2 className="section-title">Expertly Delivered, Beautifully Refined</h2>
          <p className="section-subtitle">
            From precision surgery to non-invasive rejuvenation, every treatment is
            tailored to your anatomy and goals.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
            gap: "1rem",
          }}
        >
          {FEATURED_TREATMENTS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="treatment-card"
            >
              <span style={{ fontSize: "2rem" }} aria-hidden="true">{t.icon}</span>
              {t.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Recent Blog Posts ─────────────────────────────────────────────── */}
      {recentPosts.length > 0 && (
        <section className="section" style={{ background: "var(--clr-bg-subtle)" }}>
          <div className="container">
            <div className="section-header">
              <span className="section-eyebrow">Expert Insights</span>
              <h2 className="section-title">Latest from Our Journal</h2>
            </div>
            <div className="grid-cards">
              {recentPosts.map((post) => (
                <article key={post.slug} className="card">
                  {post.frontmatter.featuredImage && (
                    <div className="card-image">
                      <Image
                        src={post.frontmatter.featuredImage}
                        alt={post.frontmatter.title}
                        width={640}
                        height={360}
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        loading="lazy"
                        sizes="(max-width: 1280px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="card-body">
                    <h3 className="card-title">
                      <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                        {post.frontmatter.title}
                      </Link>
                    </h3>
                    {post.frontmatter.excerpt && (
                      <p className="card-excerpt">{post.frontmatter.excerpt}</p>
                    )}
                    <Link href={`/blog/${post.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--clr-primary)", marginTop: "1rem" }}>
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/blog" className="btn btn-outline">
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="section container" style={{ textAlign: "center" }}>
        <div
          style={{
            background: "linear-gradient(135deg, hsl(199 90% 22%), hsl(199 90% 32%))",
            color: "#fff",
            padding: "5rem 3rem",
            borderRadius: "24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.875rem, 5vw, 2.75rem)",
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            Ready to Transform Your Look?
          </h2>
          <p style={{ color: "hsl(0 0% 100% / 0.8)", fontSize: "1.125rem", maxWidth: "46ch", margin: "0 auto 2rem" }}>
            Book a personalised consultation and discover which treatments are right for you.
          </p>
          <Link href="/contact-cosmetic-eye-surgeon" className="btn btn-primary btn-lg"
            style={{ background: "hsl(38 92% 58%)", color: "hsl(220 25% 12%)" }}
          >
            Book Consultation →
          </Link>
        </div>
      </section>
    </>
  );
}
