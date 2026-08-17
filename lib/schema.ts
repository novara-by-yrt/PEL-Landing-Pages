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
    // A crumb with no URL (a category level that has no page of its own) is
    // emitted name-only — schema.org allows that, but `item: ""` is invalid.
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
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

/* ── Medical entity schemas ────────────────────────────────────────────────
   Added for the pre-launch SEO plan. Google treats health and aesthetic pages
   as YMYL and leans on structured data to establish who is treating whom and
   with what, so these carry the qualifications and registrations that the
   About page already states in prose. Every value here is drawn from what the
   site already publishes - nothing is asserted that a visitor cannot read. */

const CLINIC_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "121 Harley Street",
  addressLocality: "London",
  postalCode: "W1G 6AX",
  addressCountry: "GB",
};

/** The reviews rail states 4.9 from 230+ Google reviews. */
const CLINIC_RATING = {
  "@type": "AggregateRating",
  ratingValue: "4.9",
  reviewCount: "230",
  bestRating: "5",
};

/**
 * MedicalBusiness — the clinic as a medical entity, for the home and contact
 * pages. A plain Organization does not tell a search engine that this is a
 * clinic with an address, opening hours and a medical speciality.
 */
export function buildMedicalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE_URL}/#clinic`,
    name: SITE_NAME,
    alternateName: "The Perfect Eyes Clinic",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: ORG_LOGO },
    image: `${SITE_URL}/PEL_logo_without_background.png`,
    telephone: "+44 20 7183 5121",
    email: "enquiries@perfecteyesltd.com",
    address: CLINIC_ADDRESS,
    medicalSpecialty: ["Ophthalmologic", "PlasticSurgery", "Dermatology"],
    priceRange: "££££",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "18:00",
      },
    ],
    aggregateRating: CLINIC_RATING,
    sameAs: [
      "https://www.instagram.com/drsabrinashahdesaiofficial/",
      "https://twitter.com/perfecteyesltd",
    ],
  };
}

/**
 * Physician — Dr Shah-Desai herself. The single strongest E-E-A-T signal
 * available to a clinic built around one named surgeon.
 */
export function buildPhysicianSchema() {
  const url = `${SITE_URL}/dr-sabrina-shah-desai`;
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${url}#physician`,
    name: "Dr Sabrina Shah-Desai",
    honorificSuffix: "MS, FRCS (Ed) Ophth",
    url,
    image: `${SITE_URL}/dr-sabrina-profile.png`,
    jobTitle: "Consultant Oculoplastic Surgeon",
    medicalSpecialty: ["Ophthalmologic", "PlasticSurgery"],
    worksFor: { "@id": `${SITE_URL}/#clinic` },
    address: CLINIC_ADDRESS,
    telephone: "+44 20 7183 5121",
    knowsAbout: [
      "Oculoplastic surgery",
      "Upper and lower blepharoplasty",
      "Ptosis surgery",
      "Revision eyelid surgery",
      "Periocular aesthetic medicine",
    ],
    memberOf: [
      { "@type": "Organization", name: "Royal College of Surgeons of England" },
      { "@type": "Organization", name: "British Oculoplastic Surgery Society (BOPSS)" },
    ],
    aggregateRating: CLINIC_RATING,
  };
}

/**
 * MedicalProcedure — one per treatment page. The strategy calls this the
 * highest-impact addition, because it is what produces rich results for
 * procedure-specific searches.
 *
 * `glance` supplies the facts the page already shows: the at-a-glance panel's
 * anaesthesia and duration lines map onto real properties rather than being
 * left as prose.
 */
export function buildMedicalProcedureSchema(
  frontmatter: PostFrontmatter,
  url: string,
  glance?: { label: string; value: string }[],
) {
  const find = (needle: string) =>
    glance?.find((g) => g.label.toLowerCase().includes(needle))?.value;

  const anaesthesia = find("anaesth") || find("anesth");
  const preparation = find("pre admission") || find("pre-admission");
  const followup = find("follow") || find("down time") || find("downtime");

  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": `${url}#procedure`,
    name: frontmatter.title,
    url,
    description: frontmatter.seo?.description || frontmatter.excerpt || undefined,
    procedureType: { "@type": "MedicalProcedureType", name: "Percutaneous procedure" },
    bodyLocation: "Eyelid",
    ...(anaesthesia ? { howPerformed: `Anaesthesia: ${anaesthesia}` } : {}),
    ...(preparation ? { preparation } : {}),
    ...(followup ? { followup } : {}),
    performer: { "@id": `${SITE_URL}/dr-sabrina-shah-desai#physician` },
    provider: { "@id": `${SITE_URL}/#clinic` },
  };
}

/**
 * MedicalCondition — one per eye-condition page, linking a condition to the
 * treatments offered for it.
 */
export function buildMedicalConditionSchema(
  frontmatter: PostFrontmatter,
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    "@id": `${url}#condition`,
    name: frontmatter.title,
    url,
    description: frontmatter.seo?.description || frontmatter.excerpt || undefined,
    associatedAnatomy: { "@type": "AnatomicalStructure", name: "Eyelid" },
    relevantSpecialty: { "@type": "MedicalSpecialty", name: "Ophthalmologic" },
  };
}
