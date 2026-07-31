import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getPostSlugs, type PostFrontmatter } from "@/lib/mdx";
import {
  buildWebPageSchema,
  buildProductSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";
import pageHierarchy from "@/content/page-hierarchy.json";
import urlMapData from "@/content/url-map.json";
import treatmentMetaRaw from "@/content/treatment-meta.json";
import type { TreatmentMeta, BreadcrumbItem } from "@/components/treatment/types";
import {
  TreatmentStyles,
  TreatmentHero,
  TreatmentFactBar,
  TreatmentAdvantages,
  TreatmentContent,
  TreatmentExpert,
  TreatmentPricing,
  TreatmentFAQ,
  TreatmentReviews,
  RealSelfWidget,
  TreatmentSimilar,
  RelatedBlogs,
  TreatmentCTA,
} from "@/components/treatment";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

const childPages: Record<string, string[]> = pageHierarchy.childPages;
const urlToMdxMap: Record<string, string> = urlMapData.urlToMdx;

const treatmentMeta = treatmentMetaRaw as unknown as Record<string, TreatmentMeta>;
const TREATMENT_SLUGS = new Set(Object.keys(treatmentMeta));


export async function generateStaticParams() {
  const fileSlugs = getPostSlugs("pages");
  const paramsList: { slug: string[] }[] = [];
  const addedPaths = new Set<string>();

  for (const urlPath of Object.keys(urlToMdxMap)) {
    if (!addedPaths.has(urlPath)) {
      addedPaths.add(urlPath);
      paramsList.push({ slug: urlPath.split("/") });
    }
  }

  for (const segs of Object.values(childPages)) {
    const key = segs.join("/");
    if (!addedPaths.has(key)) {
      addedPaths.add(key);
      paramsList.push({ slug: segs });
    }
  }

  for (const fileSlug of fileSlugs) {
    if (!addedPaths.has(fileSlug)) {
      addedPaths.add(fileSlug);
      paramsList.push({ slug: [fileSlug] });
    }
  }

  return paramsList;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug: slugSegments } = await params;
  const page = getPostBySlug("pages", slugSegments);
  if (!page) return {};

  const { frontmatter } = page;
  const canonicalPath = slugSegments.join("/");
  const url = `${SITE_URL}/${canonicalPath}`;
  const isNoIndex = frontmatter.seo?.robots?.includes("noindex");

  return {
    title: frontmatter.seo?.title || frontmatter.title,
    description: frontmatter.seo?.description || frontmatter.excerpt || "",
    robots: isNoIndex ? "noindex,nofollow" : "index,follow",
    alternates: { canonical: frontmatter.seo?.canonicalUrl || url },
    openGraph: {
      type: (["website", "article", "book", "profile"].includes(frontmatter.seo?.og?.type || "")
        ? (frontmatter.seo?.og?.type as "website" | "article")
        : "website"),
      url,
      title: frontmatter.seo?.og?.title || frontmatter.seo?.title || frontmatter.title,
      description:
        frontmatter.seo?.og?.description ||
        frontmatter.seo?.description ||
        frontmatter.excerpt ||
        "",
      images: frontmatter.featuredImage
        ? [{ url: `${SITE_URL}${frontmatter.featuredImage}` }]
        : [],
    },
  };
}

export default async function CatchAllPageRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugSegments } = await params;
  const page = getPostBySlug("pages", slugSegments);
  if (!page) notFound();

  const { frontmatter, content } = page;
  const canonicalPath = slugSegments.join("/");
  const url = `${SITE_URL}/${canonicalPath}`;
  const fileSlug = frontmatter.slug || slugSegments[slugSegments.length - 1];
  const treatment = TREATMENT_SLUGS.has(fileSlug) ? treatmentMeta[fileSlug] : null;

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    ...slugSegments.map((seg, i) => ({
      name: seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      url: `${SITE_URL}/${slugSegments.slice(0, i + 1).join("/")}`,
    })),
  ];

  const pageSchema = buildWebPageSchema(frontmatter, url);
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, url);
  const productSchema = frontmatter.schema?.productSchemaNeeded
    ? buildProductSchema(frontmatter, url)
    : null;
  const faqSchema = frontmatter.faq?.length
    ? buildFaqSchema(frontmatter.faq, url, frontmatter.title)
    : null;

  const schemas = (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {productSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />}
    </>
  );

  if (treatment) {
    return <TreatmentPage treatment={treatment} frontmatter={frontmatter} content={content} breadcrumbItems={breadcrumbItems} schemas={schemas} />;
  }

  return <GenericPage frontmatter={frontmatter} content={content} breadcrumbItems={breadcrumbItems} schemas={schemas} />;
}

// ── Treatment page layout ────────────────────────────────────────────────────

function TreatmentPage({
  treatment,
  frontmatter,
  content,
  breadcrumbItems,
  schemas,
}: {
  treatment: TreatmentMeta;
  frontmatter: PostFrontmatter;
  content: string;
  breadcrumbItems: BreadcrumbItem[];
  schemas: React.ReactNode;
}) {
  const isSurgical = treatment.type === "surgical";

  return (
    <>
      {schemas}
      <TreatmentStyles />
      <div className="tp">
        <TreatmentHero
          breadcrumbItems={breadcrumbItems}
          siteUrl={SITE_URL}
          isSurgical={isSurgical}
          h1={treatment.h1 || frontmatter.title}
          subtitle={treatment.subtitle}
          heroImage={treatment.heroImage}
          heroImageAlt={`${frontmatter.title} illustration`}
        />
        <TreatmentFactBar glance={treatment.glance} title={frontmatter.title} />
        <TreatmentAdvantages advantages={treatment.advantages} title={frontmatter.title} />
        <TreatmentContent content={content} />
        <TreatmentExpert />
        <TreatmentPricing pricing={treatment.pricing} title={frontmatter.title} />
        <TreatmentFAQ faq={frontmatter.faq} title={frontmatter.title} />
        <TreatmentReviews reviews={treatment.reviews} />
        <TreatmentSimilar items={treatment.similarTreatments} />
        <TreatmentCTA />
        <RelatedBlogs />
        <RealSelfWidget />
      </div>
    </>
  );
}

// ── Generic page layout ──────────────────────────────────────────────────────

function GenericPage({
  frontmatter,
  content,
  breadcrumbItems,
  schemas,
}: {
  frontmatter: PostFrontmatter;
  content: string;
  breadcrumbItems: { name: string; url: string }[];
  schemas: React.ReactNode;
}) {
  return (
    <>
      {schemas}

      {/* Hero */}
      <div className="hero" style={{ padding: "4rem 0 3rem" }}>
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
            <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", fontSize: "0.875rem", color: "hsl(0 0% 100% / 0.7)", padding: 0, margin: 0, flexWrap: "wrap" }}>
              {breadcrumbItems.map((item, index) => (
                <li key={item.url} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {index > 0 && <span aria-hidden="true">/</span>}
                  {index === breadcrumbItems.length - 1 ? (
                    <span style={{ color: "#fff", fontWeight: 600 }}>{item.name}</span>
                  ) : (
                    <Link href={item.url.replace(SITE_URL, "") || "/"} style={{ color: "hsl(0 0% 100% / 0.75)" }}>{item.name}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", color: "#fff", lineHeight: 1.15, maxWidth: "24ch" }}>
            {frontmatter.title}
          </h1>

          {frontmatter.excerpt && (
            <p style={{ fontSize: "1.125rem", color: "hsl(0 0% 100% / 0.8)", maxWidth: "56ch", marginTop: "1rem", lineHeight: 1.6 }}>
              {frontmatter.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Featured image */}
      {frontmatter.featuredImage && frontmatter.featuredImage !== "NONE" && (
        <div className="container prose-container" style={{ marginTop: "-2rem", position: "relative", zIndex: 1 }}>
          <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 64px hsl(220 25% 12% / 0.14)", aspectRatio: "16/7", position: "relative" }}>
            <Image
              src={frontmatter.featuredImage}
              alt={frontmatter.title}
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="(max-width: 768px) 100vw, 72ch"
            />
          </div>
        </div>
      )}

      {/* Page content */}
      <div className="container prose-container" style={{ padding: "3rem 1.5rem 5rem" }}>
        <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />

        {/* FAQ */}
        {frontmatter.faq && frontmatter.faq.length > 0 && (
          <section style={{ marginTop: "4rem" }}>
            <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "1.5rem" }}>Frequently Asked Questions</h2>
            <div className="faq-list">
              {frontmatter.faq.map((item, i) => (
                <details key={i} className="faq-item">
                  <summary className="faq-question">
                    {item.question}
                    <span className="faq-icon" aria-hidden="true">+</span>
                  </summary>
                  <div className="faq-answer" dangerouslySetInnerHTML={{ __html: item.answer }} />
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Consultation CTA */}
        <section style={{ marginTop: "5rem", padding: "3.5rem 2rem", borderRadius: "24px", background: "linear-gradient(135deg, hsl(199 90% 22%) 0%, hsl(220 25% 12%) 100%)", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.25rem", boxShadow: "0 20px 50px hsl(220 25% 12% / 0.15)" }}>
          <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#fff", margin: 0 }}>
            Book Your Consultation Today
          </h2>
          <p style={{ fontSize: "1.125rem", color: "hsl(0 0% 100% / 0.85)", maxWidth: "50ch", margin: 0, lineHeight: 1.6 }}>
            Get personalised advice and expert care from Dr Sabrina Shah-Desai and our leading aesthetic team.
          </p>
          <Link href="/contact" style={{ marginTop: "0.5rem", display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem 2.25rem", borderRadius: "9999px", backgroundColor: "var(--clr-accent)", color: "hsl(220 25% 12%)", fontSize: "1rem", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 16px hsl(38 92% 58% / 0.3)" }}>
            Book an Appointment
            <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </section>
      </div>
    </>
  );
}
