import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/home/ContactSection";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import BeginJourney from "@/components/shared/BeginJourney";
import styles from "./Philosophy.module.css";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M12.5 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Philosophy() {
  return (
    <div className={styles.page}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="philosophy-title">
        <span className={styles.heroGlow} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroBody}>
              <span className={styles.eyebrow}>Philosophy</span>
              <h1 id="philosophy-title" className={styles.heroTitle}>
                Beautiful people are{" "}
                <span className={styles.heroTitleAccent}>acts of nature or works of art.</span>
              </h1>
              <span className={styles.rule} aria-hidden="true" />
              <blockquote className={styles.quote}>
                <p>For beautiful eyes, look for the good in others.</p>
                <p>For beautiful lips, speak only words of kindness.</p>
              </blockquote>
              <div className={styles.heroActions}>
                <Link href="/contact-cosmetic-eye-surgeon" className="tp-btn tp-btn-primary">
                  Book a Consultation
                  <span className="tp-btn-arrow" aria-hidden="true">
                    <Arrow />
                  </span>
                </Link>
                <Link href="/dr-sabrina-shah-desai" className="tp-btn tp-btn-secondary">
                  Meet Dr Sabrina
                </Link>
              </div>
            </div>

            <figure className={styles.heroFigure}>
              <Image
                src="/uploads/2018/10/Sabrina-office.jpg"
                alt="Dr Sabrina Shah-Desai"
                fill
                sizes="(min-width: 900px) 44vw, 100vw"
                loading="eager"
                className={styles.heroImg}
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ── Accredited & recognised by ───────────────────────────────────── */}
      <AccreditedStrip />

      {/* ── Ajna ─────────────────────────────────────────────────────────── */}
      <section id="ajna" className={`${styles.section} ${styles.cream}`} aria-labelledby="ajna-heading">
        <div className="container">
          <div className={styles.split}>
            <figure className={styles.figure}>
              <Image
                src="/uploads/2018/11/Non-surgical-facelift-london.jpg"
                alt="The third eye, positioned at the centre of the forehead"
                fill
                sizes="(min-width: 1000px) 46vw, 100vw"
                className={styles.figureImg}
              />
              <span className={styles.figureScrim} aria-hidden="true" />
              <figcaption className={styles.figureCaption}>
                <span className={styles.figureCaptionTitle}>Ajna</span>
                <span className={styles.figureCaptionMeta}>The Eye of Knowledge</span>
              </figcaption>
            </figure>

            <div className={styles.prose}>
              <span className={styles.eyebrow}>The Eye of Knowledge</span>
              <h2 id="ajna-heading" className={styles.h2}>
                Ajna: the eye that sees <span className={styles.h2Accent}>beyond.</span>
              </h2>
              <span className={styles.rule} aria-hidden="true" />
              <div className={styles.proseBody}>
                <p>
                  The two physical eyes see the past and present; the &ldquo;third eye&rdquo; sees
                  the future.
                </p>
                <p>
                  Sabrina is an intuitive and empathetic clinician, who practises her
                  &ldquo;third eye&rdquo; skills of visualisation to expertly manage her patients
                  in a holistic manner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Begin your Perfect Eyes and Skin journey ─────────────────────── */}
      <BeginJourney />

      {/* ── Contact our clinic ───────────────────────────────────────────── */}
      <ContactSection />
    </div>
  );
}
