import type { Metadata } from "next";
import Link from "next/link";
import PublicationsList from "@/components/PublicationsList";
import { getAllPosts } from "@/lib/mdx";

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
  },
};

export default function PublicationsPage() {
  // Dynamically load all blog posts with category or tag "Publications" or "Scientific Papers"
  const allPosts = getAllPosts("posts");
  const publicationsData = allPosts
    .filter((post) => {
      const cats = post.frontmatter.categories || [];
      const tags = post.frontmatter.tags || [];
      const allTaxonomies = [...cats, ...tags].map((t) => t.toLowerCase());
      return allTaxonomies.some(
        (t) =>
          t.includes("publication") ||
          t.includes("scientific-paper") ||
          t.includes("scientific paper")
      );
    })
    .map((post) => {
      const title = post.frontmatter.title;
      const linkMatch = post.content.match(/href=\"([^\"]+)\"/i);

      let journal = "Medical Journal";
      if (title.includes("Ophthal Plast Reconstr Surg")) journal = "Ophthalmic Plastic & Reconstructive Surgery";
      else if (title.includes("Annals of Emergency Medicine")) journal = "Annals of Emergency Medicine";
      else if (title.includes("Archives of Plastic Surgery")) journal = "Archives of Plastic Surgery";
      else if (title.includes("Journal of Bombay Ophthalmologists")) journal = "Journal of Bombay Ophthalmologists";
      else if (title.includes("Journal Aesthetic Nursing")) journal = "Journal of Aesthetic Nursing";

      return {
        slug: post.slug,
        title: title.replace(/\"/g, "&quot;"),
        rawTitle: title,
        date: post.frontmatter.date || "",
        journal,
        url: `/blog/${post.slug}`,
        externalUrl: linkMatch ? linkMatch[1] : null,
        featuredImage: post.frontmatter.featuredImage || null,
      };
    });

  // Build Breadcrumb & Collection JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Publications",
        item: `${SITE_URL}/publications`,
      },
    ],
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Hero Header */}
      <div
        className="hero"
        style={{
          padding: "4.5rem 0 4rem",
          background: "linear-gradient(135deg, hsl(220 25% 12%) 0%, hsl(199 90% 18%) 100%)",
          color: "#fff",
        }}
      >
        <div className="container">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
            <ol
              style={{
                display: "flex",
                gap: "0.5rem",
                listStyle: "none",
                fontSize: "0.875rem",
                color: "hsl(0 0% 100% / 0.75)",
                padding: 0,
                margin: 0,
              }}
            >
              <li>
                <Link href="/" style={{ color: "hsl(0 0% 100% / 0.8)", textDecoration: "none" }}>
                  Home
                </Link>
              </li>
              <li>/</li>
              <li style={{ color: "#fff", fontWeight: 600 }}>Publications</li>
            </ol>
          </nav>

          {/* Badge */}
          <div style={{ marginBottom: "1rem" }}>
            <span
              style={{
                display: "inline-block",
                padding: "0.35rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "0.03em",
                backgroundColor: "hsl(38 92% 58% / 0.2)",
                color: "var(--clr-accent)",
                border: "1px solid hsl(38 92% 58% / 0.4)",
              }}
            >
              Clinical Research & Publications
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              color: "#fff",
              lineHeight: 1.15,
              maxWidth: "22ch",
              marginBottom: "1rem",
            }}
          >
            Publications & Scientific Papers
          </h1>

          <p
            style={{
              fontSize: "1.125rem",
              color: "hsl(0 0% 100% / 0.85)",
              maxWidth: "60ch",
              lineHeight: 1.6,
              marginBottom: "2.5rem",
            }}
          >
            Explore peer-reviewed scientific publications, medical research, and academic journal articles authored by Oculoplastic Surgeon Dr Sabrina Shah-Desai.
          </p>

          {/* Stats Bar */}
          <div
            style={{
              display: "flex",
              gap: "2.5rem",
              flexWrap: "wrap",
              paddingTop: "1.5rem",
              borderTop: "1px solid hsl(0 0% 100% / 0.15)",
            }}
          >
            <div>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--clr-accent)" }}>
                32+
              </div>
              <div style={{ fontSize: "0.875rem", color: "hsl(0 0% 100% / 0.75)" }}>
                Published Papers
              </div>
            </div>
            <div>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--clr-accent)" }}>
                20+ Years
              </div>
              <div style={{ fontSize: "0.875rem", color: "hsl(0 0% 100% / 0.75)" }}>
                Oculoplastic Innovation
              </div>
            </div>
            <div>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--clr-accent)" }}>
                Global
              </div>
              <div style={{ fontSize: "0.875rem", color: "hsl(0 0% 100% / 0.75)" }}>
                Medical Journals & PubMed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ padding: "4rem 1.5rem 6rem" }}>
        <PublicationsList initialPublications={publicationsData} />

        {/* CTA Banner (Matching original site banner) */}
        <section
          id="publications-cta"
          style={{
            marginTop: "6rem",
            padding: "4rem 2rem",
            borderRadius: "24px",
            background: "linear-gradient(135deg, hsl(199 90% 22%) 0%, hsl(220 25% 12%) 100%)",
            color: "#fff",
            textAlign: "center",
            boxShadow: "0 20px 50px hsl(220 25% 12% / 0.15)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              marginBottom: "1rem",
              color: "#fff",
            }}
          >
            Book your Treatment Experience
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "hsl(0 0% 100% / 0.8)",
              maxWidth: "50ch",
              margin: "0 auto 2rem",
              lineHeight: 1.6,
            }}
          >
            Call or email us today — we would be delighted to answer your questions and discuss your personal treatment plan.
          </p>

          <Link
            href="/contact"
            id="btn-publications-cta-appointment"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.875rem 2.25rem",
              borderRadius: "9999px",
              backgroundColor: "var(--clr-accent)",
              color: "hsl(220 25% 12%)",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 16px hsl(38 92% 58% / 0.3)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            Book an Appointment
            <svg
              style={{ width: "18px", height: "18px" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </section>
      </div>
    </>
  );
}
