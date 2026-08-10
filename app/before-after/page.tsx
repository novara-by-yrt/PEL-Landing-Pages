import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PatientStories from "@/components/home/PatientStories";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import BeginJourney from "@/components/shared/BeginJourney";
import GoogleMark from "@/components/shared/GoogleMark";
import { getAllPosts, type Post } from "@/lib/mdx";
import { RESULT_CATEGORIES, type ResultCategory } from "@/lib/results";
import { PATIENT_STORIES } from "@/lib/reviews";
import styles from "./page.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export const metadata: Metadata = {
  title: "Results — Before & After Gallery",
  description:
    "View real patient before and after results for blepharoplasty, tear trough fillers, polynucleotides, Morpheus8, and more cosmetic eye treatments.",
  alternates: { canonical: `${SITE_URL}/before-after` },
};

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

  const total = cases.length;

  return (
    <div className={styles.page}>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="results-title">
        <span className={styles.heroGlow} aria-hidden="true" />

        <div className="container">
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Results</span>
          </nav>

          <span className={styles.eyebrow}>Real patient results</span>
          <h1 id="results-title" className={styles.heroTitle}>
            Before &amp; after, case by case
          </h1>
          <p className={styles.heroLead}>
            Genuine patient results across the full range of surgical and non-surgical eye
            treatments, each photographed and reviewed by Dr Sabrina Shah-Desai.
          </p>

          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt className={styles.statLabel}>Case studies</dt>
              <dd className={styles.statValue}>{total}</dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statLabel}>Surgical experience</dt>
              <dd className={styles.statValue}>25+ years</dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statLabel}>Patient rating</dt>
              <dd className={`${styles.statValue} ${styles.statRating}`}>
                <GoogleMark className={styles.googleMark} />
                4.9
              </dd>
            </div>
          </dl>

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
              <h2 id={`${group.id}-heading`} className={styles.groupTitle}>
                {group.label}
              </h2>
              <p className={styles.groupBlurb}>{group.blurb}</p>
              <span className={styles.rule} aria-hidden="true" />
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
    </div>
  );
}
