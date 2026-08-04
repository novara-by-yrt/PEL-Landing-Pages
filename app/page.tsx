import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AutoScrollCarousel from "@/components/home/AutoScrollCarousel";
import ContactSection from "@/components/home/ContactSection";
import HeroVideo from "@/components/home/HeroVideo";
import JourneyCards, { type JourneyStep } from "@/components/home/JourneyCards";
import PatientStories from "@/components/home/PatientStories";
import TeamCarousel, { type TeamMember } from "@/components/home/TeamCarousel";
import TreatmentsCarousel, { type Treatment } from "@/components/home/TreatmentsCarousel";
import VideoCard from "@/components/home/VideoCard";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import BeginJourney from "@/components/shared/BeginJourney";
import { PATIENT_STORIES } from "@/lib/reviews";
import styles from "./page.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export const metadata: Metadata = {
  title: "Perfect Eyes Ltd | London's Leading Cosmetic Eye Surgeon",
  description:
    "Rejuvenate your eyes with blepharoplasty, fillers, and laser treatments by Dr Sabrina Shah-Desai, a leading cosmetic eye surgeon in London.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    url: SITE_URL,
    type: "website",
    title: "London's Leading Cosmetic Eye Surgeon - Perfect Eyes Ltd",
    description:
      "Rejuvenate your eyes with blepharoplasty, fillers, and laser treatments by Dr. Sabrina Shah-Desai, leading cosmetic eye surgeon in London.",
  },
};

const SURGICAL_TREATMENTS: Treatment[] = [
  {
    image: "/uploads/2018/10/Eye-Lid-Lifts-Upper-Lid-Blepharoplasty-london.jpg",
    title: "Upper Lid Blepharoplasty",
    href: "/surgical/eyelid-surgery/upper-eyelid-blepharoplasty-uk",
    tag: "Eyes",
    blurb: "Removes the redundant upper-lid skin that hoods the eye, restoring the lid's natural contour.",
  },
  {
    image: "/uploads/2018/10/Eye-Bag-Surgery-Lower-Lid-Blepharoplasty-london.jpg",
    title: "Eye Bag Surgery",
    href: "/surgical/eyelid-surgery/eye-bag-removal-blepharoplasty-uk",
    tag: "Eyes",
    blurb: "Lower-lid surgery addressing under-eye bags, puffiness and the shadow they cast.",
  },
  {
    image: "/uploads/2018/10/eyeboost.jpg",
    title: "Festoons & Malar Bags",
    href: "/surgical/festoons-malar-bags-treatment-uk",
    tag: "Eyes",
    blurb: "Treatment for fluid-filled festoons and malar bags across the lower lid and upper cheek.",
  },
  {
    image: "/uploads/2018/11/Ptosis-surgery-uk.jpg",
    title: "Ptosis Surgery",
    href: "/surgical/eyelid-surgery/droppy-eye-ptosis-surgery-uk",
    tag: "Eyes",
    blurb: "Tightens the muscle that lifts a drooping upper eyelid, reopening the eye.",
  },
  {
    image: "/uploads/2018/10/Double-eyelid-surgery-london.jpg",
    title: "Double Eyelid Surgery",
    href: "/surgical/eyelid-surgery/double-eyelids-asian-blepharoplasty-uk",
    tag: "Eyes",
    blurb: "Creates or refines an upper-lid crease, planned around Asian eyelid anatomy.",
  },
  {
    image: "/uploads/2024/09/hyaluronidase-dissolving.jpg",
    title: "Hyaluronidase Dissolving",
    href: "/eyelid-swelling-migrated-fillers-hyaluronidase-dissolving",
    tag: "Revision",
    blurb: "Dissolves migrated or unwanted hyaluronic acid filler around the eyes and midface.",
  },
  {
    image: "/uploads/2024/07/eyelid-lump.jpg",
    title: "Eyelid Lump & Bump Removal",
    href: "/surgical/eyelid-surgery/lump-on-eyelid-bumps-treatment-uk",
    tag: "Eyes",
    blurb: "Assessment and removal of cysts, chalazia and other lesions on the eyelid.",
  },
  {
    image: "/uploads/2025/03/revision-surgeyr-1-min.jpg",
    title: "Revision Blepharoplasty",
    href: "/surgical/eyelid-surgery/revision-blepharoplasty-uk",
    tag: "Revision",
    blurb: "Corrective work after previous eyelid surgery or filler complications.",
  },
  {
    image: "/uploads/2025/03/browlift-min.jpg",
    title: "Brow Lift",
    href: "/surgical/browlift-treatment-uk",
    tag: "Brow",
    blurb: "Repositions a heavy or descended brow to open up the upper eye area.",
  },
];

const NONSURGICAL_TREATMENTS: Treatment[] = [
  {
    image: "/uploads/2018/10/Silhoutte-Soft-treatment-london.jpg",
    title: "Endolift®",
    href: "/non-surgical/endolift-for-malar-bags-uk",
    tag: "Laser",
    blurb: "Laser-assisted tightening of the lower lid and malar area, without incisions.",
  },
  {
    image: "/uploads/2025/03/Morpheus-min.jpg",
    title: "Morpheus8",
    href: "/non-surgical/morpheus8-treatment-uk",
    tag: "Skin",
    blurb: "Radiofrequency microneedling that remodels and firms facial skin.",
  },
  {
    image: "/uploads/2024/09/supeor-sulcus.jpg",
    title: "Superior Sulcus Filler",
    href: "/non-surgical-injectables-medical-aesthetic",
    tag: "Injectable",
    blurb: "Restores volume to a hollowed upper-lid sulcus above the eye.",
  },
  {
    image: "/uploads/2018/10/tear-trough-treatment-london.jpg",
    title: "Tear Trough Fillers",
    href: "/non-surgical/tear-trough-fillers-uk",
    tag: "Injectable",
    blurb: "Softens under-eye hollows with precisely placed hyaluronic acid.",
  },
  {
    image: "/uploads/2018/10/Ultherapy-london.jpg",
    title: "Ellansé",
    href: "/ellanse",
    tag: "Injectable",
    blurb: "A collagen-stimulating filler used to rebuild facial volume and contour.",
  },
  {
    image: "/uploads/2024/09/ultraclear-laser.jpg",
    title: "UltraClear Laser",
    href: "/non-surgical/ultraclear-laser-treatment-uk",
    tag: "Laser",
    blurb: "Cold-fibre laser resurfacing that targets texture, tone and fine lines.",
  },
  {
    image: "/uploads/2018/11/Non-surgical-facelift-fillers-london.jpg",
    title: "Non-Surgical Facial Contouring",
    href: "/non-surgical-facial-contouring",
    tag: "Injectable",
    blurb: "Injectable contouring to rebalance facial proportions without surgery.",
  },
  {
    image: "/uploads/2017/08/Sofwave.jpg",
    title: "Sofwave™",
    href: "/non-surgical/sofwave-treatment-uk",
    tag: "Skin",
    blurb: "Ultrasound energy that lifts and tightens skin across the brow and face.",
  },
  {
    image: "/uploads/2025/06/Plasma-Pen.jpg",
    title: "Plexr / Plasma Pen",
    href: "/plexr-plasma-pen",
    tag: "Skin",
    blurb: "Plasma treatment for eyelid skin laxity as an alternative to surgery.",
  },
];

const MEDIA_LOGOS = [
  { src: "/uploads/2024/09/logo1.svg", alt: "Media logo 1" },
  { src: "/uploads/2024/09/logo2.svg", alt: "Media logo 2" },
  { src: "/uploads/2024/09/logo3.svg", alt: "Media logo 3" },
  { src: "/uploads/2024/09/logo4.svg", alt: "Media logo 4" },
  { src: "/uploads/2024/09/logo15.svg", alt: "Media logo 5" },
  { src: "/uploads/2024/09/logo6.svg", alt: "Media logo 6" },
  { src: "/uploads/2024/09/logo7.svg", alt: "Media logo 7" },
  { src: "/uploads/2024/09/logo8.svg", alt: "Media logo 8" },
  { src: "/uploads/2024/09/logo9.svg", alt: "Media logo 9" },
  { src: "/uploads/2024/09/logo10.svg", alt: "Media logo 10" },
];

/** Copy transcribed from the approved design for this section. */
const JOURNEY_STEPS: JourneyStep[] = [
  {
    title: "Listen & assess",
    text: "A thorough medical consultation to understand your concerns, anatomy and expectations.",
  },
  {
    title: "Curate a plan",
    text: "A holistic, 360° plan blending surgical and non-surgical options, nothing over-treated.",
  },
  {
    title: "Treat with precision",
    text: "Signature techniques prioritising safety, natural results and minimal downtime.",
  },
  {
    title: "Care through recovery",
    text: "Clear aftercare and attentive follow-up until you are fully healed and happy.",
  },
];

/**
 * Clinic team. Portraits are the same files the Meet the Team page uses; Dr
 * Sabrina reuses her profile portrait. Anyone without an image falls back to
 * a monogram tile, so the grid never shows a hole.
 */
const CLINIC_TEAM: TeamMember[] = [
  {
    name: "Dr Sabrina Shah-Desai",
    role: "Board Certified Cosmetic Oculoplastic Surgeon",
    credentials: ["MS", "FRCS"],
    image: "/uploads/2025/12/Dr-Sabrina2-1.png",
  },
  {
    name: "Dr Janine",
    role: "Dentist & Aesthetic Practitioner — Perfect Skin Studio",
    image: "/uploads/2026/04/DR-JANINE.webp",
  },
  {
    name: "Dr Hemmali",
    role: "Dentist & Aesthetic Practitioner — Perfect Skin Studio",
    image: "/uploads/2026/04/Dr-Hemmali.webp",
  },
  {
    name: "Irvana",
    role: "Qualified therapist — Perfect Skin Studio",
    credentials: ["Level 4 Laser"],
    image: "/uploads/2026/04/Irvana.webp",
  },
  {
    name: "Leanne",
    role: "Practice Clinic Manager",
    image: "/uploads/2025/09/Leanne-1-1.jpg",
  },
  {
    name: "Mojdeh",
    role: "Surgical Coordinator & Patient Educator",
    image: "/uploads/2025/09/Mojdeh-2025-09-17-15-54-00-1.jpg",
  },
  { name: "Mary", role: "Patient Coordinator", image: "/uploads/2024/12/Mary-1.png" },
  { name: "Lakshiya", role: "Patient Coordinator", image: "/uploads/2025/09/Luxee-1.jpg" },
  { name: "Sally", role: "Patient Coordinator", image: "/uploads/2025/09/Sally-1.jpg" },
];/**
 * Credential pull-outs for the About section. Every line is existing site
 * copy re-homed, not new claims: the first is the sentence that used to sit
 * bolded at the end of the second paragraph, the second is the recognition
 * line from the old hero badge, and the third restates the experience figure
 * from the opening paragraph.
 */
const EXPERT_CREDENTIALS = [
  "Listed on the Royal College of Surgeons of England register of Board-Certified Cosmetic Surgeons",
  "Recognised as a top practitioner for eyes for eight consecutive years, 2019–2026",
  "Over 25 years of surgical and non-surgical experience",
];

/**
 * A browser paints its own black backdrop over an empty <video>, which would
 * override the panel colour set in CSS. Handing it a poster instead — one
 * inline gradient, no request — keeps the placeholder on brand.
 */
const PLACEHOLDER_POSTER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9' preserveAspectRatio='none'%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23211E42'/%3E%3Cstop offset='1' stop-color='%2314122C'/%3E%3C/linearGradient%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E";

/**
 * The two "Watch" films. `src` and `poster` are intentionally empty until the
 * final cuts are supplied — the players render as the dark placeholder panels
 * in the approved design, and drop in without any markup change once the file
 * paths land here.
 */
const CLINIC_VIDEOS: { title: string; src?: string; poster?: string }[] = [
  { title: "Inside the Perfect Eyes clinic" },
  { title: "Patients on their experience" },
];

/** Award medal, used on the About eyebrow and the portrait's badge. */
function Medal() {
  return (
    <svg className={styles.medalIcon} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="9" r="5.25" />
      <path d="M8.5 13.4L7 22l5-2.6 5 2.6-1.5-8.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Circled tick for the credential list. */
function CheckMark() {
  return (
    <svg className={styles.checkIcon} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" />
      <path d="M8.2 12.4l2.6 2.6 5-5.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Four-point sparkle that precedes the "Watch" eyebrow. */
function Sparkle() {
  return (
    <svg className={styles.watchSparkle} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 0l1.5 5.1L15 8l-5.5 2.9L8 16l-1.5-5.1L1 8l5.5-2.9z" />
    </svg>
  );
}

/** Five-star row for the hero rating. Drawn, not an image, so it stays sharp
    and costs no request. */
function Stars() {
  return (
    <svg className={styles.stars} viewBox="0 0 90 16" aria-hidden="true">
      {[0, 18, 36, 54, 72].map((x) => (
        <path
          key={x}
          transform={`translate(${x} 0)`}
          d="M8 0.6l2.24 4.9 5.36.62-3.97 3.63 1.06 5.28L8 12.42 3.31 15.03l1.06-5.28L.4 6.12l5.36-.62z"
        />
      ))}
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className={styles.home}>
      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <HeroVideo />
        <span className={styles.heroScrim} aria-hidden="true" />

        <div className="container">
          <div className={styles.heroInner}>
            <span className={styles.heroEyebrow}>Harley Street &middot; London</span>
            <h1 id="hero-title" className={styles.heroTitle}>
              Expert in
              <br />
              Eyelid Surgery
            </h1>
            <p className={styles.heroLead}>
              Natural-looking results from London&apos;s leading Board Certified
              Oculoplastic Surgeon, using evidence-based techniques.
            </p>

            <div className={styles.heroActions}>
              <Link href="/self-test-survey" className="tp-btn tp-btn-primary">
                Take the Eyelid Surgery Test
                <span className="tp-btn-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M5 12h13M12.5 6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>

            <dl className={styles.trust}>
              <div className={styles.trustItem}>
                <dt className={styles.trustLabel}>Google rating</dt>
                <dd className={styles.trustValue}>
                  <Stars />
                  4.9 &middot; 230+ reviews
                </dd>
              </div>
              <div className={styles.trustItem}>
                <dt className={styles.trustLabel}>25+ years</dt>
                <dd className={styles.trustValue}>Surgical experience</dd>
              </div>
              <div className={styles.trustItem}>
                <dt className={styles.trustLabel}>GMC &middot; RCOphth</dt>
                <dd className={styles.trustValue}>Registered &amp; accredited</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── 2. AWARDS ─────────────────────────────────────────────────────── */}
      <AccreditedStrip />

      {/* ── 3. WATCH ──────────────────────────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.paper}`}
        aria-labelledby="watch-title"
      >
        <div className="container">
          <div className={styles.head}>
            <span className={styles.watchEyebrow}>
              <Sparkle />
              Watch
            </span>
            <h2 id="watch-title" className={`${styles.h2} ${styles.watchTitle}`}>
              Meet the clinic and hear from our patients
            </h2>
          </div>

          <div className={styles.watchGrid}>
            {CLINIC_VIDEOS.map((video) => (
              <figure key={video.title} className={styles.watchItem}>
                <video
                  className={styles.watchVideo}
                  src={video.src}
                  poster={video.poster ?? PLACEHOLDER_POSTER}
                  controls
                  playsInline
                  /* Nothing is fetched until the visitor presses play, so two
                     videos above the fold cost no bandwidth on load. */
                  preload="none"
                  aria-label={video.title}
                />
                <figcaption className="sr-only">{video.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. ABOUT ──────────────────────────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.expert}`}
        aria-labelledby="about-title"
      >
        <div className="container">
          <div className={styles.expertGrid}>
            {/* Portrait. Stretches to the row height so its top and bottom
                edges line up exactly with the column beside it. */}
            <figure className={styles.expertMedia}>
              <Image
                src="/uploads/2025/12/Dr-Sabrina2-1.png"
                alt="Dr Sabrina Shah-Desai, Consultant Oculoplastic Surgeon"
                fill
                sizes="(min-width: 1000px) 42vw, 100vw"
                className={styles.expertPortrait}
              />
              <figcaption className={styles.expertPill}>The Surgeon</figcaption>
              <div className={styles.expertBadge}>
                <span className={styles.expertBadgeIcon} aria-hidden="true">
                  <Medal />
                </span>
                <span>
                  <span className={styles.expertBadgeTitle}>Top Practitioner for Eyes</span>
                  <span className={styles.expertBadgeMeta}>
                    Eight consecutive years, 2019&ndash;2026
                  </span>
                </span>
              </div>
            </figure>

            <div className={styles.expertBody}>
              <span className={styles.expertEyebrow}>
                <Medal />
                About
              </span>
              <h2 id="about-title" className={`${styles.h2} ${styles.expertTitle}`}>
                Meet Dr Sabrina Shah-Desai
              </h2>
              <p className={styles.expertCred}>MS, FRCS (Ed) Ophth</p>

              <p className={styles.expertText}>
                Dr Sabrina Shah-Desai, MS, FRCS (Ed) Ophth is a multi-award-winning
                Oculoplastic Reconstructive Surgeon and Aesthetic Practitioner specialising
                in reconstructive, revisional, and cosmetic surgery of the eyelids, as well
                as non-surgical treatments for the eyes and face. With over 25 years of
                experience, she is globally recognised for her pioneering, minimally
                invasive techniques.
              </p>
              <p className={styles.expertText}>
                Known as the &ldquo;go-to&rdquo; surgeon for discerning patients seeking
                subtle, natural results, she is also highly sought after for revisional
                procedures by those who have undergone previous fillers or eyelid surgeries.
              </p>

              <ul className={styles.expertList}>
                {EXPERT_CREDENTIALS.map((item) => (
                  <li key={item} className={styles.expertListItem}>
                    <CheckMark />
                    {item}
                  </li>
                ))}
              </ul>

              <div className={styles.expertCta}>
                <Link href="/contact-cosmetic-eye-surgeon" className="tp-btn tp-btn-primary">
                  Book a consultation
                  <span className="tp-btn-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M5 12h13M12.5 6l6 6-6 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. TREATMENTS ─────────────────────────────────────────────────── */}
      <section
        id="treatments"
        className={`${styles.section} ${styles.treatments}`}
        aria-labelledby="treatments-title"
      >
        <div className="container">
          <div className={styles.head}>
            <span className={styles.eyebrow}>What we treat</span>
            <h2 id="treatments-title" className={styles.h2}>
              Our Specialist Treatments and Procedures
            </h2>
            <p className={styles.lead}>
              From surgical eyelid work to non-surgical skin and injectable treatments, each
              planned around your anatomy and goals.
            </p>
          </div>
        </div>

        {/* Full-bleed rail: the cards run past the container edges so the
            carousel reads as continuous rather than as a boxed row. */}
        <TreatmentsCarousel
          groups={[
            { id: "surgical", label: "Surgical", items: SURGICAL_TREATMENTS },
            { id: "non-surgical", label: "Non-Surgical", items: NONSURGICAL_TREATMENTS },
          ]}
        />
      </section>

      {/* ── 6. THE JOURNEY ───────────────────────────────────────────────── */}
      <section className={styles.journey} aria-labelledby="journey-title">
        {/* Soft brand-coloured glow behind the rail. Without something to
            refract, glass cards on a flat field read as plain panels. */}
        <span className={styles.journeyGlow} aria-hidden="true" />

        <div className="container">
          <div className={styles.journeyHead}>
            <h2 id="journey-title" className={styles.journeyTitle}>
              The Perfect360&trade; journey. A curated journey, not a single procedure
            </h2>
          </div>

          <JourneyCards steps={JOURNEY_STEPS} />

          <div className={styles.journeyCta}>
            <Link href="/contact-cosmetic-eye-surgeon" className="tp-btn tp-btn-inverse">
              Book A Compatibility Call
              <span className="tp-btn-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M5 12h13M12.5 6l6 6-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. PATIENT STORIES ────────────────────────────────────────────── */}
      <PatientStories stories={PATIENT_STORIES} />

      {/* ── 7. VIDEO TESTIMONIALS ─────────────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.paper}`}
        aria-labelledby="videos-title"
      >
        <div className="container">
          <div className={styles.head}>
            <span className={styles.eyebrow}>In their words</span>
            <h2 id="videos-title" className={styles.h2}>
              Patient Testimonials
            </h2>
            <span className={`${styles.rule} ${styles.ruleCenter}`} aria-hidden="true" />
            <div className={styles.rating}>
              <p className={styles.ratingScore}>
                <Stars />
                <span className="sr-only">Rated </span>4.9<span className="sr-only"> out of 5</span>
              </p>
              <p className={styles.ratingText}>Based on 220+ Google Reviews</p>
            </div>
          </div>

          <div className={styles.videoGrid}>
            <VideoCard
              thumbnailSrc="/uploads/2025/03/Perfect-Eyes.png"
              title="A Happy Perfect Eyes Clinic's Patient"
              videoUrl="https://www.youtube.com/watch?v=gBKI4fAK7wk"
            />
            <VideoCard
              thumbnailSrc="/uploads/2025/03/perfecteyes.png"
              title="Upper Lid Blepharoplasty"
              videoUrl="https://www.youtube.com/watch?v=f-Z-4ET4YbQ"
            />
            <VideoCard
              thumbnailSrc="/uploads/2025/03/perfecteyes-2.png"
              title="Dermal Fillers Testimonial"
              videoUrl="https://www.youtube.com/shorts/L0sNTnUmLBw"
            />
          </div>

          <p className={styles.disclaimer}>
            *Individual results vary. Testimonials reflect personal experiences following
            consultation and treatment.
          </p>
        </div>
      </section>

      {/* ── 8. AS SEEN IN ─────────────────────────────────────────────────── */}
      <section className={styles.logoStrip} aria-label="Featured in the media">
        <p className={styles.logoStripLabel}>As seen in</p>
        <AutoScrollCarousel items={MEDIA_LOGOS} speed={50} />
      </section>

      {/* ── 10. CLINIC TEAM ───────────────────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.team}`}
        aria-labelledby="team-title"
      >
        <span className={styles.teamGlow} aria-hidden="true" />

        <div className="container">
          <div className={styles.head}>
            <span className={styles.eyebrow}>Our people</span>
            <h2 id="team-title" className={styles.h2}>
              Meet The Clinic Team
            </h2>
            <p className={styles.lead}>
              Elegant &amp; discreet, the clinic ensures an environment that meets the highest
              standards of safety and hygiene and received a &ldquo;good rating&rdquo; in all 5
              key areas by the{" "}
              <a
                href="https://www.cqc.org.uk/location/1-5591490767"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.teamLink}
              >
                Care Quality Commission
              </a>{" "}
              (CQC) in 2022.
            </p>
          </div>

          <TeamCarousel members={CLINIC_TEAM} />

          <div className={styles.teamCta}>
            <Link href="/meet-team" className="tp-btn tp-btn-primary">
              Meet the Full Team
              <span className="tp-btn-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M5 12h13M12.5 6l6 6-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 12. CLOSING CTA ───────────────────────────────────────────────── */}
      <BeginJourney />

      {/* ── 13. CONTACT ───────────────────────────────────────────────────── */}
      <ContactSection />

      {/* ── 14. VAT DISCLAIMER ────────────────────────────────────────────── */}
      <div className={styles.vat}>
        <div className="container">
          <p className={styles.vatText}>
            *Treatments undertaken solely for aesthetic purposes are subject to VAT at the
            prevailing rate. Where treatment is provided for a diagnosed medical condition, VAT
            status will be discussed during consultation.
          </p>
        </div>
      </div>
    </div>
  );
}
