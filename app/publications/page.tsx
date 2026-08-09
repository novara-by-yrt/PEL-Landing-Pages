import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PublicationsList from "@/components/PublicationsList";
import { getAllPosts } from "@/lib/mdx";
import { TpIcon } from "@/components/treatment";
import { BlogCTA } from "@/components/blog/BlogCTA";
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
      <div className="tp">

        {/* Hero */}
        <section className={styles.pubHero}>
          <div className={styles.pubHeroGlow} />
          <div className={styles.pubHeroInner}>
            <div className={styles.pubHeroCopy}>
            <nav aria-label="Breadcrumb" className={styles.pubBreadcrumb}>
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span style={{ color: "rgba(255,255,255,0.9)" }}>Publications</span>
            </nav>

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
      </div>
    </>
  );
}
