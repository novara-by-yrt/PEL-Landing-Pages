import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/home/ContactSection";
import PatientStories from "@/components/home/PatientStories";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import BeginJourney from "@/components/shared/BeginJourney";
import { getAllPosts, type Post } from "@/lib/mdx";
import { RESULT_CATEGORIES, type ResultCategory } from "@/lib/results";
import { PATIENT_STORIES } from "@/lib/reviews";
import { TreatmentFAQ } from "@/components/treatment";
import { buildFaqSchema } from "@/lib/schema";
import styles from "./page.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export const metadata: Metadata = {
  title: "Results - Before & After Gallery",
  description:
    "View real patient before and after results for blepharoplasty, tear trough fillers, polynucleotides, Morpheus8, and more cosmetic eye treatments.",
  alternates: { canonical: `${SITE_URL}/before-after` },
};


/* Reassurance beside the photographs. A results gallery is where someone
   decides whether to enquire, and until now the page answered none of the
   questions that decision turns on - what actually happens, how long it
   takes, whether these results are representative. */
const RESULTS_FAQ = [
  {
    question: "Are these results typical?",
    answer:
      "Every photograph on this page is a patient of the clinic, published with their consent and not retouched. They are real outcomes rather than a best-case selection, but they are not a promise: anatomy, age, skin quality and healing all differ, and what is achievable for you is assessed in person at consultation.",
  },
  {
    question: "How long before I look like the after photograph?",
    answer:
      "Most surgical photographs here are taken at three to six months, once swelling has settled and scars have matured. The early weeks look different from the final result, and that is expected. Non-surgical results appear sooner - usually within two to six weeks depending on the treatment.",
  },
  {
    question: "How soon can I go back to work?",
    answer:
      "For eyelid surgery, most patients take seven to ten days before returning to work and are comfortable in public at around two weeks. Non-surgical treatments generally need little or no time away. Dr Shah-Desai will give you a realistic timeline for your own procedure at consultation.",
  },
  {
    question: "What happens at the first appointment?",
    answer:
      "A consultation is an examination and a conversation, not a sales appointment. Your concern is assessed, the options are explained - including the option of doing nothing - and you are given written information and a quotation to consider in your own time.",
  },
];

/* The stylesheet has always styled an arrow inside the card's link, including
   its hover nudge, but no arrow was ever rendered - so the rule sat dead and
   the link read as plain text. */
function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const JOURNEY_STEPS = [
  {
    title: "Consultation",
    body: "An examination with Dr Shah-Desai, a discussion of what is realistic for your anatomy, and written information to take away.",
  },
  {
    title: "Planning",
    body: "A treatment plan and quotation, with time to consider it. Surgery is scheduled once you are ready, not on the day.",
  },
  {
    title: "Treatment",
    body: "Carried out in a CQC-regulated setting. Most eyelid surgery is performed under local anaesthetic with sedation.",
  },
  {
    title: "Aftercare",
    body: "Scheduled follow-up, direct access to the team while you heal, and review photographs once the result has settled.",
  },
];

export default function BeforeAfterIndexPage() {
  const cases = getAllPosts("before-after");
  const bySlug = new Map(cases.map((c) => [c.slug, c]));

  /* Grouped rather than JS-filtered: eleven cases all fit in the document, so
     every case stays in the HTML for search engines, each category gets a real
     anchor to link to, and the page ships no client JavaScript for filtering. */
  type Group = ResultCategory & { items: Post[] };

  const groups: Group[] = RESULT_CATEGORIES.map((category) => ({
    ...category,
    items: category.slugs
      .map((slug) => bySlug.get(slug))
      .filter((p): p is Post => Boolean(p)),
  })).filter((group) => group.items.length > 0);

  /* Anything not listed in a category still gets shown, so adding a case study
     can never make it silently invisible here. */
  const grouped = new Set(RESULT_CATEGORIES.flatMap((c) => c.slugs));
  const ungrouped = cases.filter((c) => !grouped.has(c.slug));
  if (ungrouped.length > 0) {
    groups.push({
      id: "more",
      label: "More results",
      blurb: "Further case studies from the clinic.",
      slugs: [],
      items: ungrouped,
    });
  }


  /* The hero's showcase panel. Taken from the content rather than named here,
     so it can never point at a case that has been renamed or withdrawn. */
  const featured = groups[0]?.items[0];

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildFaqSchema(RESULTS_FAQ, `${SITE_URL}/before-after`, "Before and after results"),
          ),
        }}
      />
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="results-title">
        <span className={styles.heroGlow} aria-hidden="true" />

        <div className="container">
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Results</span>
          </nav>

          {/* Two columns from 1000px, one below it. The copy column used to
              run alone across a 1440px page, which left the right-hand half
              of the opening screen empty; on a gallery, the thing that
              belongs in that space is the work itself. */}
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>Real patient results</span>
              <h1 id="results-title" className={styles.heroTitle}>
                Before &amp; after, case by case
              </h1>
              <p className={styles.heroLead}>
                Genuine patient results across the full range of surgical and non-surgical eye
                treatments, each photographed and reviewed by Dr Sabrina Shah-Desai.
              </p>

              {/* Somewhere to act without scrolling. Measured, the first CTA
                  on this page sat 4,968px down on a laptop - and a gallery is
                  a high-intent page, so it is the wrong one to make people
                  scroll before they can book. */}
              <div className={styles.heroCtas}>
                <Link href="/contact-cosmetic-eye-surgeon" className="tp-btn tp-btn-primary">
                  Book a Consultation
                </Link>
                <Link href="/self-test-survey" className="tp-btn tp-btn-secondary">
                  Take the Free Self-Test
                </Link>
              </div>
            </div>

            {featured?.frontmatter.featuredImage ? (
              <Link href={`/before-after/${featured.slug}`} className={styles.showcase}>
                <span className={styles.showcaseMedia}>
                  <Image
                    src={featured.frontmatter.featuredImage}
                    alt={`Before and after ${featured.frontmatter.title}, a patient of Dr Sabrina Shah-Desai`}
                    fill
                    sizes="(min-width: 1000px) 46vw, (min-width: 620px) 92vw, 100vw"
                    className={styles.showcaseImg}
                    priority
                  />
                </span>
                <span className={styles.showcaseFoot}>
                  <span className={styles.showcaseLabel}>Featured case</span>
                  <span className={styles.showcaseTitle}>{featured.frontmatter.title}</span>
                  <span className={styles.showcaseCta} aria-hidden="true">
                    View case
                    <Arrow />
                  </span>
                </span>
              </Link>
            ) : null}
          </div>

          {/* Deep links into each category, matching the Results nav panel. */}
          <nav className={styles.jump} aria-label="Jump to a category">
            {groups.map((group) => (
              <a key={group.id} href={`#${group.id}`} className={styles.jumpChip}>
                {group.label}
                <span className={styles.jumpCount}>{group.items.length}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <AccreditedStrip />

      {/* ── Case groups ────────────────────────────────────────────────── */}
      {groups.map((group, groupIndex) => (
        <section
          key={group.id}
          id={group.id}
          className={`${styles.group} ${groupIndex % 2 === 1 ? styles.groupAlt : ""}`}
          aria-labelledby={`${group.id}-heading`}
        >
          <div className="container">
            <div className={styles.groupHead}>
              <span className={styles.rule} aria-hidden="true" />
              <h2 id={`${group.id}-heading`} className={styles.groupTitle}>
                {group.label}
                <span className={styles.groupCount}>
                  {group.items.length} {group.items.length === 1 ? "case" : "cases"}
                </span>
              </h2>
              <p className={styles.groupBlurb}>{group.blurb}</p>
            </div>

            <ul className={styles.grid}>
              {group.items.map((item, index) => {
                const summary =
                  item.frontmatter.excerpt || item.frontmatter.galleryDescription || "";

                return (
                  <li key={item.slug} className={styles.card}>
                    <Link href={`/before-after/${item.slug}`} className={styles.cardLink}>
                      <div className={styles.cardMedia}>
                        {item.frontmatter.featuredImage ? (
                          <Image
                            src={item.frontmatter.featuredImage}
                            alt={`Before and after ${item.frontmatter.title}, a patient of Dr Sabrina Shah-Desai`}
                            fill
                            sizes="(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw"
                            className={styles.cardImg}
                            /* The first row is what a visitor lands on; the
                               rest wait until they scroll to them. */
                            loading={groupIndex === 0 && index < 3 ? "eager" : "lazy"}
                          />
                        ) : (
                          <span className={styles.cardFallback} aria-hidden="true" />
                        )}
                        <span className={styles.cardTag}>{group.label}</span>
                      </div>

                      <div className={styles.cardBody}>
                        <h3 className={styles.cardTitle}>{item.frontmatter.title}</h3>
                        {summary ? <p className={styles.cardText}>{summary}</p> : null}
                        <span className={styles.cardCta}>
                          View case
                          <Arrow />
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      {/* ── What to expect ─────────────────────────────────────────────── */}
      <section className={styles.group} aria-labelledby="journey-heading">
        <div className="container">
          <div className={styles.groupHead}>
            <span className={styles.rule} aria-hidden="true" />
            <h2 id="journey-heading" className={styles.groupTitle}>
              What to expect
            </h2>
            <p className={styles.groupBlurb}>
              The path from first appointment to settled result, in four steps.
            </p>
          </div>

          <ol className={styles.journey}>
            {JOURNEY_STEPS.map((step, index) => (
              <li key={step.title} className={styles.journeyStep}>
                <span className={styles.journeyNum} aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className={styles.journeyTitle}>{step.title}</h3>
                <p className={styles.journeyBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <TreatmentFAQ faq={RESULTS_FAQ} title="Results" />

      {/* ── Note on results ────────────────────────────────────────────── */}
      <section className={styles.note} aria-label="About these results">
        <div className="container">
          <p className={styles.noteText}>
            Individual results vary. Every photograph shows a real patient of the clinic,
            published with consent, and is not retouched. Suitability and likely outcome are
            discussed at consultation.
          </p>
        </div>
      </section>

      <PatientStories stories={PATIENT_STORIES} />
      <BeginJourney />
      <ContactSection />
    </div>
  );
}
