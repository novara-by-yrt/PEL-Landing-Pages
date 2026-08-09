import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AutoScrollCarousel from "@/components/home/AutoScrollCarousel";
import ContactSection from "@/components/home/ContactSection";
import HeroVideo from "@/components/home/HeroVideo";
import HomeFaq, { type HomeFaqItem } from "@/components/home/HomeFaq";
import PatientJourney from "@/components/home/PatientJourney";
import PatientStories from "@/components/home/PatientStories";
import TeamCarousel, { type TeamMember } from "@/components/home/TeamCarousel";
import TreatmentsCarousel, { type Treatment } from "@/components/home/TreatmentsCarousel";
import VideoCard from "@/components/home/VideoCard";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import MeetDrSabrina from "@/components/shared/MeetDrSabrina";
import GoogleMark from "@/components/shared/GoogleMark";
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

/**
 * Award badges, read off the artwork itself so each alt text states the award
 * it actually depicts. All seven correspond to awards already listed in
 * Dr Sabrina's profile copy.
 */
const AWARD_BADGES = [
  {
    src: "/Award4.jpg", width: 1080, height: 1080,
    alt: "Aesthetics Awards Winner 2021 — Consultant Surgeon of the Year",
  },
  { src: "/Award3.png", width: 450, height: 532, alt: "Safety in Beauty Diamond Awards 2023 — Winner" },
  {
    src: "/Award2.png", width: 500, height: 591,
    alt: "Safety in Beauty Diamond Awards 2016 — Highly Commended for Dedication & Excellence",
  },
  { src: "/Award5.jpg", width: 1080, height: 1080, alt: "My Face My Body Awards 2019 — Highly Commended" },
  {
    src: "/Award1.jpg", width: 1080, height: 1080,
    alt: "Aesthetics Awards 2019 — Highly Commended, Sinclair Pharma Award for Best Independent Training Provider",
  },
  { src: "/Award7.jpg", width: 1080, height: 1080, alt: "My Face My Body Ultimate 100, 2019" },
  { src: "/Award6.jpg", width: 1080, height: 1080, alt: "Aesthetics Awards — Highly Commended 2022" },
];

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



/**
 * Home-page FAQ. Fees and clinical claims here are supplied copy — keep them
 * in step with the treatment pages if either side changes.
 */
const HOME_FAQ: HomeFaqItem[] = [
  {
    question: "What is the recovery time after eyelid surgery?",
    answer:
      "Initial recovery generally takes about one week. Stitches are removed after 7-10 days and most patients resume desk-based activity soon after. Mild bruising and swelling may persist for two to three weeks.",
  },
  {
    question: "Will my surgical scars be visible?",
    answer:
      "Incisions are hidden within the eyelid’s natural crease and usually fade over several months. Visible scarring is uncommon, and Dr Shah-Desai uses a signature “Zip Stitch” technique to minimise it.",
  },
  {
    question: "How much does upper eyelid surgery cost?",
    answer:
      "A unilateral upper eyelid lift starts from £5,000 and bilateral from £6,000, inclusive of hospital charge and local anaesthetic. All cosmetic procedures incur 20% VAT. Fees are confirmed after your consultation.",
  },
  {
    question: "Do you offer free consultations?",
    answer:
      "The fees include a complimentary in-depth non-surgical consultation by Dr Shah-Desai’s team of doctors in Perfect Skin Studio and a skin health consultation by the senior therapist.",
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
    /* The same portrait the About section uses, so she looks consistent
       across the page. */
    image: "/Dr.%20Sabrina%20Profile.png",
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
];/**
 * Credential pull-outs for the About section. Every line is existing site
 * copy re-homed, not new claims: the first is the sentence that used to sit
 * bolded at the end of the second paragraph, the second is the recognition
 * line from the old hero badge, and the third restates the experience figure
 * from the opening paragraph.
 */
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
              Experts in
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
              <Link href="/contact-cosmetic-eye-surgeon" className="tp-btn tp-btn-secondary">
                Book a Consultation
              </Link>
            </div>

            <dl className={styles.trust}>
              <div className={`${styles.trustItem} ${styles.trustItemRating}`}>
                <dt className="sr-only">Google rating</dt>
                <dd className={styles.googleCard}>
                  <GoogleMark className={styles.googleMark} />
                  <span className={styles.googleScore}>4.9</span>
                  <span className={styles.googleDetail}>
                    <Stars />
                    <span className={styles.googleCount}>
                      <span className="sr-only">Rated 4.9 out of 5 from </span>
                      230+ Google reviews
                    </span>
                  </span>
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
              <div className={`${styles.trustItem} ${styles.trustItemPress}`}>
                <dt className={styles.trustLabel}>As featured in</dt>
                <dd className={styles.trustValue}>
                  {/* Black wordmark: the hero scrim keeps this corner light. */}
                  <Image
                    src="/Tatler-black.png"
                    alt="Tatler"
                    width={288}
                    height={80}
                    className={styles.pressLogo}
                  />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── 2. AWARDS & RECOGNITION ───────────────────────────────────────── */}
      <section
        className={`${styles.logoStrip} ${styles.logoStripTop} ${styles.awardStrip}`}
        aria-label="Awards and recognition"
      >
        <p className={styles.logoStripLabel}>Awards &amp; Recognition</p>
        {/* Travels the opposite way to the accreditation strip below it, so
            the two rows read as a pair rather than one long band. */}
        <AutoScrollCarousel items={AWARD_BADGES} speed={45} reverse size="badge" />
      </section>

      {/* ── 3. ACCREDITED BY ──────────────────────────────────────────────── */}
      <AccreditedStrip />

      {/* ── 4. ABOUT ──────────────────────────────────────────────────────── */}
      <MeetDrSabrina />

      {/* ── 5. TREATMENTS ─────────────────────────────────────────────────── */}
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

      {/* ── 6. PATIENT STORIES ────────────────────────────────────────────── */}
      <PatientStories stories={PATIENT_STORIES} />

      {/* ── 7. THE JOURNEY ───────────────────────────────────────────────── */}
      <PatientJourney />

      {/* ── 8. VIDEO TESTIMONIALS ─────────────────────────────────────────── */}
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
        </div>
      </section>

      {/* ── 11. CLOSING CTA ───────────────────────────────────────────────── */}
      <BeginJourney />

      {/* ── 12. FAQ ───────────────────────────────────────────────────────── */}
      <HomeFaq items={HOME_FAQ} />

      {/* ── 13. CONTACT ───────────────────────────────────────────────────── */}
      <ContactSection />

      {/* ── 14. VAT DISCLAIMER ────────────────────────────────────────────── */}
      <div className={styles.vat}>
        <div className="container">
          <p className={styles.vatText}>
            Treatments undertaken solely for aesthetic purposes are subject to VAT at the
            prevailing rate. Where treatment is provided for a diagnosed medical condition, VAT
            status will be discussed during consultation.
          </p>
        </div>
      </div>
    </div>
  );
}
