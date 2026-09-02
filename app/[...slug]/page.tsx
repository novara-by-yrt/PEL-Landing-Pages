import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs, type PostFrontmatter } from "@/lib/mdx";
import {
  buildWebPageSchema,
  buildProductSchema,
  buildFaqSchema,
  buildMedicalProcedureSchema,
  buildPhysicianSchema,
} from "@/lib/schema";
import { ACCREDITATION_LOGOS, isBeforeAfterImage, resolveHeroImage } from "@/lib/page-utils";
import { DrSabrinaBio } from "@/components/about/DrSabrinaBio";
import BlepharoplastyQuizForm from "@/components/forms/BlepharoplastyQuizForm";
import ContactSection from "@/components/home/ContactSection";
import PatientStories from "@/components/home/PatientStories";
import HomeFaq from "@/components/home/HomeFaq";
import { BeforeAfterGallery } from "@/components/treatment/BeforeAfterGallery";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import { PATIENT_STORIES } from "@/lib/reviews";
import treatmentMetaRaw from "@/content/treatment-meta.json";
import { TREATMENT_PATHS } from "@/lib/treatment-urls";
import { TREATMENT_BEFORE_AFTER } from "@/lib/treatment-before-after";
import { DEFAULT_OG_IMAGE, metadataTitle, resolveDescription, resolveTitle } from "@/lib/seo";
import type { TreatmentMeta } from "@/components/treatment/types";
import {
  TreatmentHero,
  TreatmentAdvantages,
  TreatmentOverview,
  TreatmentContent,
  TreatmentBeforeAfter,
  TreatmentVideoTestimonials,
  TeamBioCarousel,
  TreatmentExpert,
  TreatmentPricing,
  TreatmentFAQ,
  TreatmentGlance,
  TreatmentSimilar,
  RelatedBlogs,
  TreatmentCTA,
  PageHero,
} from "@/components/treatment";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";


const treatmentMeta = treatmentMetaRaw as unknown as Record<string, TreatmentMeta>;
const TREATMENT_SLUGS = new Set(Object.keys(treatmentMeta));

/* One URL per page, and no others.
 *
 * This used to emit every path the WordPress migration knew about — the
 * canonical treatment paths, all 168 keys of the URL map, the page hierarchy
 * and the file slugs — which put most documents on the web at two, three or
 * four addresses at once. That was deliberate while this was the clinic's
 * site: the aliases kept old inbound links alive. This repository serves
 * standalone landing pages, so it is only duplication, and 25 of those paths
 * resolved to nothing and prerendered a 404 shell.
 *
 * What is emitted now is exactly the address each page already declares as
 * its canonical (generateMetadata below): the nested path for a treatment,
 * the file slug for everything else. Legacy URLs are still handled — the
 * redirects in next.config.ts 301 them here — they are just no longer pages
 * of their own.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { slug: string[] }[] = [];

  for (const fileSlug of getPostSlugs("pages")) {
    /* A file whose own slug resolves to a different document is a duplicate
     * of that document — the URL map points it elsewhere — so it gets no URL
     * of its own. content/pages/about-drsabrina.mdx is the one such file: the
     * map sends /about-drsabrina to dr-sabrina-shah-desai, and it has done
     * since the migration, so nothing here has ever rendered it. */
    const page = getPostBySlug("pages", fileSlug);
    if (!page || page.slug !== fileSlug) continue;

    params.push({ slug: (TREATMENT_PATHS[fileSlug] ?? fileSlug).split("/") });
  }

  return params;
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
  // Treatments are canonical at their nested WordPress path, not the flat slug.
  // Everything else is canonical at its own file slug — not at
  // slugSegments.join("/"), which is whatever alias URL this particular
  // request happened to use. Content reachable by several old URLs (a flat
  // slug, a nested WordPress path, sometimes both) previously had each of
  // those alias requests self-canonicalize to itself, so the same page
  // published several different "correct" canonicals depending on which URL
  // a crawler hit — Google's fix for that is to ignore ours and pick its own,
  // which is exactly the "Google chose a different canonical" pattern seen
  // in Search Console for pages like /non-surgical/facial-contouring-uk.
  const metaFileSlug = frontmatter.slug || slugSegments[slugSegments.length - 1];
  const canonicalPath = TREATMENT_PATHS[metaFileSlug] ?? metaFileSlug;
  const url = `${SITE_URL}/${canonicalPath}`;

  const title = resolveTitle(frontmatter.seo?.title, frontmatter.title);
  const description = resolveDescription(
    frontmatter.seo?.description,
    frontmatter.excerpt,
    page.content,
  );

  return {
    title: metadataTitle(title),
    description,
    alternates: { canonical: frontmatter.seo?.canonicalUrl || url },
    openGraph: {
      type: (["website", "article", "book", "profile"].includes(frontmatter.seo?.og?.type || "")
        ? (frontmatter.seo?.og?.type as "website" | "article")
        : "website"),
      url,
      title: resolveTitle(frontmatter.seo?.og?.title, title),
      description: frontmatter.seo?.og?.description || description,
      images: frontmatter.featuredImage
        ? [{ url: `${SITE_URL}${frontmatter.featuredImage}` }]
        : [DEFAULT_OG_IMAGE],
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
  const fileSlug = frontmatter.slug || slugSegments[slugSegments.length - 1];
  // Treatments are canonical at their nested WordPress path, not the flat slug;
  // everything else is canonical at its own file slug (see generateMetadata
  // above for why this can't fall back to the requested slugSegments).
  const canonicalPath = TREATMENT_PATHS[fileSlug] ?? fileSlug;
  const url = `${SITE_URL}/${canonicalPath}`;
  const treatment = TREATMENT_SLUGS.has(fileSlug) ? treatmentMeta[fileSlug] : null;

  const pageSchema = buildWebPageSchema(frontmatter, url);
  const productSchema = frontmatter.schema?.productSchemaNeeded
    ? buildProductSchema(frontmatter, url)
    : null;
  const faqSchema = frontmatter.faq?.length
    ? buildFaqSchema(frontmatter.faq, url, frontmatter.title)
    : null;

  /* Medical entity markup, per the pre-launch SEO plan: a MedicalProcedure on
     every treatment page (the highest-impact one for procedure searches), and
     the Physician record on the surgeon's own page. */
  const procedureSchema = treatment
    ? buildMedicalProcedureSchema(frontmatter, url, treatment.glance)
    : null;
  const physicianSchema =
    fileSlug === "dr-sabrina-shah-desai" ? buildPhysicianSchema() : null;

  const schemas = (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {productSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />}
      {procedureSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }} />}
      {physicianSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }} />}
    </>
  );

  if (treatment) {
    return (
      <TreatmentPage
        treatment={treatment}
        treatmentSlug={fileSlug}
        frontmatter={frontmatter}
        content={content}
        schemas={schemas}
      />
    );
  }

  if (fileSlug === "dr-sabrina-shah-desai") {
    return (
      <>
        {schemas}
        <DrSabrinaBio faq={frontmatter.faq} />
      </>
    );
  }

  /* This page's own content used to be an iframe embed of a third-party
     survey widget — the wrong tool for the job, and it was pointed at a
     stale URL besides. The actual candidacy quiz is a Contact Form 7 form
     driven by a small "quiz-step" plugin (Next/Prev, one field per screen,
     a progress bar); BlepharoplastyQuizForm reproduces that natively, field
     for field, off the plugin's source. No lead/heroImage here — the quiz's
     own first step already carries the same intro image, heading and body
     copy this page's frontmatter has, so showing both would repeat it. */
  if (fileSlug === "self-test-survey") {
    return (
      <>
        {schemas}
        <div className="tp">
          <PageHero
            eyebrow="Am I A Candidate?"
            h1="Blepharoplasty Candidacy Test"
          />
          <section style={{ padding: "0 1.5rem clamp(3rem, 6vw, 5rem)" }}>
            <BlepharoplastyQuizForm />
          </section>
        </div>
      </>
    );
  }

  return <GenericPage frontmatter={frontmatter} content={content} schemas={schemas} />;
}

// ── Treatment page layout ────────────────────────────────────────────────────
//
// Every treatment renders through this one component, so a section changed
// here changes on all of them — that is the intent, and new treatments pick it
// up with no extra work.
//
// Three of the sections are the home page's own components rather than
// treatment-only variants, and should stay that way:
//   • MeetDrSabrina  — the home About panel, with the treatment page's title.
//   • HomeFaq        — the home accordion, fed the page's own FAQ items.
//   • PatientStories — the home reviews rail, fed the shared PATIENT_STORIES.

function TreatmentPage({
  treatment,
  treatmentSlug,
  frontmatter,
  content,
  schemas,
}: {
  treatment: TreatmentMeta;
  treatmentSlug: string;
  frontmatter: PostFrontmatter;
  content: string;
  schemas: React.ReactNode;
}) {
  const isSurgical = treatment.type === "surgical";
  const beforeAfterSlug = TREATMENT_BEFORE_AFTER[treatmentSlug];
  const beforeAfterGallery = beforeAfterSlug
    ? getPostBySlug("before-after", beforeAfterSlug)?.frontmatter.gallery
    : undefined;

  /* Most treatment heroes are now a before/after photograph of a patient
     rather than a stock picture of the procedure, so "<treatment> illustration"
     would describe the wrong kind of image to a screen reader.

     Membership of one of the page's own before/after galleries is the test,
     not the filename: plenty of genuine result photos are called things like
     poly.jpg or 3-2-1.png. The filename check only has to catch a hero that
     is a result photo without being listed in a gallery on this page. */
  const heroIsBeforeAfter =
    isBeforeAfterImage(treatment.heroImage) ||
    [...(frontmatter.gallery ?? []), ...(beforeAfterGallery ?? [])].some(
      (item) => item?.image === treatment.heroImage,
    );
  /* The chip over the hero photo. Derived from the image rather than stored,
     because the stored value went stale the moment a hero changed: two pages
     still said "Surgical Procedure" and one "In Treatment" over what is now a
     results photo. Nothing is claimed over a hero that is not a result. */
  const heroBadge = heroIsBeforeAfter ? "Before & After" : treatment.heroBadge;

  const heroImageAlt = heroIsBeforeAfter
    ? `${frontmatter.title} before and after, a patient of Dr Sabrina Shah-Desai`
    : `${frontmatter.title} illustration`;

  return (
    <>
      {schemas}
      <div className="tp">
        <TreatmentHero
          h1={treatment.h1 || frontmatter.title}
          subtitle={treatment.subtitle}
          heroImage={treatment.heroImage}
          heroImageAlt={heroImageAlt}
          heroBadge={heroBadge}
          heroBg={treatment.heroBg}
          heroBgOpacity={treatment.heroBgOpacity}
        />
        <AccreditedStrip />
        <TreatmentGlance glance={treatment.glance} title={frontmatter.title} />
        <TreatmentAdvantages
          advantages={treatment.advantages}
          title={frontmatter.title}
          heading={treatment.advantagesHeading}
        />
        {frontmatter.overviewPanels?.map((panel, i) => (
          <TreatmentOverview
            key={i}
            {...panel}
            heading={panel.heading || frontmatter.title}
            imageSide={i % 2 === 0 ? "right" : "left"}
          />
        ))}
        <TreatmentContent content={content} />
        <BeforeAfterGallery
          gallery={frontmatter.gallery}
          heading={frontmatter.galleryHeading}
          description={frontmatter.galleryDescription}
          title={frontmatter.title}
        />
        <TreatmentBeforeAfter
          gallery={beforeAfterGallery}
          title={frontmatter.title}
          isSurgical={isSurgical}
        />
        <TreatmentVideoTestimonials data={frontmatter.videoTestimonials} />
        <TeamBioCarousel data={frontmatter.teamBios} />
        <TreatmentExpert />
        <TreatmentPricing
          pricing={treatment.pricing}
          title={frontmatter.title}
          pricingTitle={treatment.pricingTitle}
          pricingLead={treatment.pricingLead}
        />
        <TreatmentFAQ faq={frontmatter.faq} title={frontmatter.title} />
        {/* The shared reviews rail, same as every other page - replaces the
            treatment-only "Patient Reviews" grid, which showed a different,
            RealSelf-sourced set of quotes per treatment and so contradicted
            the one set of reviews the rest of the site shows. */}
        <PatientStories />
        <TreatmentSimilar items={treatment.similarTreatments} currentSlug={treatmentSlug} />
        <TreatmentCTA />
        <RelatedBlogs topic={frontmatter.title} />
        <ContactSection />
      </div>
    </>
  );
}

// ── Generic page layout ──────────────────────────────────────────────────────
// Plain template for everything else (privacy notices, self-test-survey,
// thank-you, terms, and other one-off pages): hero, prose content, optional
// FAQ, CTA. The 12 "Eye Conditions" pages have their own rich template at
// app/condition/[slug]/page.tsx and live in content/condition/.
//
// Two sections are the home page's own components, matching the convention
// on the treatment and condition templates:
//   • HomeFaq        — the home accordion, fed the page's own FAQ items.
//   • PatientStories — the home reviews rail, fed the shared PATIENT_STORIES.

function GenericPage({
  frontmatter,
  content,
  schemas,
}: {
  frontmatter: PostFrontmatter;
  content: string;
  schemas: React.ReactNode;
}) {
  return (
    <>
      {schemas}
      <div className="tp">
        <PageHero
          h1={frontmatter.title}
          lead={frontmatter.excerpt}
          heroImage={resolveHeroImage(frontmatter)}
          heroImageAlt={frontmatter.title}
        />

        {/* Opt-in, same flag and placement the condition template uses: the
            strip belongs on a page that introduces the people behind the
            clinic, not on a privacy notice. */}
        {frontmatter.showAccreditation && <AccreditedStrip logos={ACCREDITATION_LOGOS} />}

        <TreatmentContent content={content} />
        <BeforeAfterGallery
          gallery={frontmatter.gallery}
          heading={frontmatter.galleryHeading}
          description={frontmatter.galleryDescription}
          title={frontmatter.title}
        />

        {frontmatter.faq?.length ? (
          <HomeFaq
            items={frontmatter.faq}
            eyebrow={`Patient questions about ${frontmatter.title}`}
            title="Frequently asked questions"
            lead="Call or email us today, we would be delighted to answer your questions."
            contentIsHtml
            footer={
              <Link href="/contact" className="tp-btn tp-btn-primary">
                Ask a Question or Book an Appointment
              </Link>
            }
          />
        ) : null}
        <PatientStories stories={PATIENT_STORIES} />
        <TreatmentCTA />
      </div>
    </>
  );
}
