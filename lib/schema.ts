import { FaqItem, PostFrontmatter } from "./mdx";

// ─── Site-wide defaults ────────────────────────────────────────────────────────

const SITE_NAME = "Perfect Eyes Ltd";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";
const ORG_LOGO = `${SITE_URL}/uploads/logo.png`;

// ─── JSON-LD Builders ─────────────────────────────────────────────────────────

/**
 * WebPage schema — base for all pages
 */
export function buildWebPageSchema(frontmatter: PostFrontmatter, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: frontmatter.seo?.title || frontmatter.title,
    description: frontmatter.seo?.description || "",
    inLanguage: "en-GB",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
  };
}

/**
 * BlogPosting schema — for blog posts
 */
export function buildBlogPostingSchema(frontmatter: PostFrontmatter, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogpost`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: frontmatter.seo?.title || frontmatter.title,
    description: frontmatter.seo?.description || frontmatter.excerpt || "",
    image: frontmatter.featuredImage
      ? { "@type": "ImageObject", url: `${SITE_URL}${frontmatter.featuredImage}` }
      : undefined,
    datePublished: frontmatter.date,
    dateModified: frontmatter.modified || frontmatter.date,
    author: {
      "@type": "Person",
      name: frontmatter.author?.name || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: ORG_LOGO },
    },
  };
}

/**
 * Product schema — for treatment/procedure pages
 */
export function buildProductSchema(frontmatter: PostFrontmatter, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: frontmatter.seo?.title || frontmatter.title,
    description: frontmatter.seo?.description || "",
    url,
    image: frontmatter.featuredImage
      ? `${SITE_URL}${frontmatter.featuredImage}`
      : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 5.0,
      ratingCount: 158,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

/**
 * FAQPage schema — from MDX frontmatter faq array
 */
export function buildFaqSchema(faq: FaqItem[], url: string, pageTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faqpage`,
    name: pageTitle,
    url,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList schema
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[], pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Organization schema — site-wide
 */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: ORG_LOGO },
  };
}
