import type { Metadata } from "next";
import Link from "next/link";
import PublicationsList from "@/components/PublicationsList";
import { getAllPosts } from "@/lib/mdx";
import { TreatmentStyles, TpIcon } from "@/components/treatment";
import { BlogCTA } from "@/components/blog/BlogCTA";

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

      <TreatmentStyles />
      <div className="tp">
        <style>{`
          .pub-hero {
            position: relative; overflow: hidden; color: #fff;
            background:
              linear-gradient(160deg, rgba(18,16,54,0.92), rgba(69,61,155,0.85)),
              url('/uploads/2024/07/blog-bg.jpg') center / cover no-repeat;
            padding: clamp(3.5rem, 7vw, 5.5rem) 1.5rem 3rem;
          }
          .pub-hero-glow { position: absolute; top: -180px; right: -100px; width: 520px; height: 340px; border-radius: 50%; background: radial-gradient(circle, rgba(188,160,221,0.32), transparent 70%); pointer-events: none; }
          .pub-hero-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; }
          .pub-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 24px; }
          .pub-breadcrumb a { color: rgba(255,255,255,0.75); text-decoration: none; }
          .pub-breadcrumb a:hover { color: #fff; }
          .pub-hero h1 { font-family: var(--tp-display); font-weight: 600; font-size: clamp(2.1rem, 5vw, 3.25rem); line-height: 1.15; color: #fff; margin: 16px 0 0; max-width: 20ch; }
          .pub-hero p.pub-lead { font-size: 1.0625rem; color: rgba(255,255,255,0.82); max-width: 60ch; margin: 1.1rem 0 0; line-height: 1.6; }
          .pub-stats { display: flex; gap: clamp(1.5rem, 5vw, 3rem); flex-wrap: wrap; margin-top: 2.5rem; padding-top: 1.75rem; border-top: 1px solid rgba(255,255,255,0.14); }
          .pub-stat-value { font-family: var(--tp-display); font-size: 1.75rem; font-weight: 600; color: var(--tp-lavender-300); }
          .pub-stat-label { font-size: 0.875rem; color: rgba(255,255,255,0.7); margin-top: 2px; }

          .pub-body { max-width: 1200px; margin: 0 auto; padding: clamp(3rem, 6vw, 4.5rem) 1.5rem 5rem; }
        `}</style>

        {/* Hero */}
        <section className="pub-hero">
          <div className="pub-hero-glow" />
          <div className="pub-hero-inner">
            <nav aria-label="Breadcrumb" className="pub-breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span style={{ color: "rgba(255,255,255,0.9)" }}>Publications</span>
            </nav>

            <span className="tp-eyebrow"><TpIcon name="sparkle" size={13} />Clinical Research &amp; Publications</span>

            <h1>Publications &amp; Scientific Papers</h1>

            <p className="pub-lead">
              Explore peer-reviewed scientific publications, medical research, and academic journal articles authored by Oculoplastic Surgeon Dr Sabrina Shah-Desai.
            </p>

            <div className="pub-stats">
              <div>
                <div className="pub-stat-value">32+</div>
                <div className="pub-stat-label">Published Papers</div>
              </div>
              <div>
                <div className="pub-stat-value">20+ Years</div>
                <div className="pub-stat-label">Oculoplastic Innovation</div>
              </div>
              <div>
                <div className="pub-stat-value">Global</div>
                <div className="pub-stat-label">Medical Journals &amp; PubMed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Publications list + CTA */}
        <div className="pub-body">
          <PublicationsList initialPublications={publicationsData} />
        </div>

        <BlogCTA />
      </div>
    </>
  );
}
