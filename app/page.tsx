import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import AutoScrollCarousel from "@/components/home/AutoScrollCarousel";
import ContactSection from "@/components/home/ContactSection";
import HeroVideo from "@/components/home/HeroVideo";
import type { BeforeAfterSlide } from "@/components/home/BeforeAfterCarousel";
import type { HomeFaqItem } from "@/components/home/HomeFaq";
import type { TeamMember } from "@/components/home/TeamCarousel";
import type { Treatment } from "@/components/home/TreatmentsCarousel";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import GoogleMark from "@/components/shared/GoogleMark";
import MeetDrSabrina from "@/components/shared/MeetDrSabrina";
import BeginJourney from "@/components/shared/BeginJourney";
import Reveal from "@/components/shared/Reveal";
import { PATIENT_STORIES } from "@/lib/reviews";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import styles from "./page.module.css";

/* Everything below the hero is off-screen on load, so its JS doesn't need to
   be in the bundle blocking first paint — dynamic() splits each into its own
   chunk, fetched in parallel with (not ahead of) the hero. SSR stays on
   (no `ssr: false`), so there's no content/SEO regression, just a smaller
   critical-path bundle. */
const TreatmentsCarousel = dynamic(() => import("@/components/home/TreatmentsCarousel"));
const PatientStories = dynamic(() => import("@/components/home/PatientStories"));
const PatientJourney = dynamic(() => import("@/components/home/PatientJourney"));
const VideoCard = dynamic(() => import("@/components/home/VideoCard"));
const BeforeAfterCarousel = dynamic(() => import("@/components/home/BeforeAfterCarousel"));
const TeamCarousel = dynamic(() => import("@/components/home/TeamCarousel"));
const HomeFaq = dynamic(() => import("@/components/home/HomeFaq"));

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export const metadata: Metadata = {
  title: "Perfect Eyes Clinic | London's Leading Cosmetic Eye Surgeon",
  description:
    "Rejuvenate your eyes with blepharoplasty, fillers, and laser treatments by Dr Sabrina Shah-Desai, a leading cosmetic eye surgeon in London.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    url: SITE_URL,
    type: "website",
    title: "London's Leading Cosmetic Eye Surgeon - Perfect Eyes Clinic",
    description:
      "Rejuvenate your eyes with blepharoplasty, fillers, and laser treatments by Dr. Sabrina Shah-Desai, leading cosmetic eye surgeon in London.",
    images: [DEFAULT_OG_IMAGE],
  },
};

/**
 * Award badges, read off the artwork itself so each alt text states the award
 * it actually depicts. All seven correspond to awards already listed in
 * Dr Sabrina's profile copy.
 */
/* width/height below are the badges' displayed size (AutoScrollCarousel.module.css
   .badge caps height at 132px, width auto), not the source images' raw pixel
   dimensions — next/image sizes its generated srcset off these, so passing the
   1080x1080 source size here was making it ship the full-size original. */
const AWARD_BADGES = [
  {
    src: "/Award4.jpg", width: 132, height: 132,
    alt: "Aesthetics Awards Winner 2021: Consultant Surgeon of the Year",
  },
  { src: "/Award3.png", width: 112, height: 132, alt: "Safety in Beauty Diamond Awards 2023: Winner" },
  {
    src: "/Award2.png", width: 112, height: 132,
    alt: "Safety in Beauty Diamond Awards 2016: Highly Commended for Dedication & Excellence",
  },
  { src: "/Award5.jpg", width: 132, height: 132, alt: "My Face My Body Awards 2019: Highly Commended" },
  {
    src: "/Award1.jpg", width: 132, height: 132,
    alt: "Aesthetics Awards 2019: Highly Commended, Sinclair Pharma Award for Best Independent Training Provider",
  },
  { src: "/Award7.jpg", width: 132, height: 132, alt: "My Face My Body Ultimate 100, 2019" },
  { src: "/Award6.jpg", width: 132, height: 132, alt: "Aesthetics Awards: Highly Commended 2022" },
];

const SURGICAL_TREATMENTS: Treatment[] = [
  {
    image: "/uploads/2018/10/Eye-Lid-Lifts-Upper-Lid-Blepharoplasty-london.jpg",
    title: "Upper Lid Blepharoplasty",
    href: "/surgical/eyelid-surgery/upper-eyelid-blepharoplasty-uk",
    blurb: "Removes the redundant upper-lid skin that hoods the eye, restoring the lid's natural contour.",
  },
  {
    image: "/uploads/2018/10/Eye-Bag-Surgery-Lower-Lid-Blepharoplasty-london.jpg",
    title: "Eye Bag Surgery",
    href: "/surgical/eyelid-surgery/eye-bag-removal-blepharoplasty-uk",
    blurb: "Lower-lid surgery addressing under-eye bags, puffiness and the shadow they cast.",
  },
  {
    image: "/uploads/2025/03/browlift-min.jpg",
    title: "Brow Lift",
    href: "/surgical/browlift-treatment-uk",
    blurb: "Repositions a heavy or descended brow to open up the upper eye area.",
  },
  {
    image: "/uploads/2018/10/eyeboost.jpg",
    title: "Festoons & Malar Bags",
    href: "/surgical/festoons-malar-bags-treatment-uk",
    blurb: "Treatment for fluid-filled festoons and malar bags across the lower lid and upper cheek.",
  },
  {
    image: "/uploads/2018/11/Ptosis-surgery-uk.jpg",
    title: "Ptosis Surgery",
    href: "/surgical/eyelid-surgery/droppy-eye-ptosis-surgery-uk",
    blurb: "Tightens the muscle that lifts a drooping upper eyelid, reopening the eye.",
  },
  {
    image: "/uploads/2018/10/Double-eyelid-surgery-london.jpg",
    title: "Double Eyelid Surgery",
    href: "/surgical/eyelid-surgery/double-eyelids-asian-blepharoplasty-uk",
    blurb: "Creates or refines an upper-lid crease, planned around Asian eyelid anatomy.",
  },
  {
    image: "/uploads/2024/07/eyelid-lump.jpg",
    title: "Eyelid Lump & Bump Removal",
    href: "/surgical/eyelid-surgery/lump-on-eyelid-bumps-treatment-uk",
    blurb: "Assessment and removal of cysts, chalazia and other lesions on the eyelid.",
  },
  {
    image: "/uploads/2025/03/revision-surgeyr-1-min.jpg",
    title: "Revision Blepharoplasty",
    href: "/surgical/eyelid-surgery/revision-blepharoplasty-uk",
    blurb: "Corrective work after previous eyelid surgery or filler complications.",
  }
];

const NONSURGICAL_TREATMENTS: Treatment[] = [
  {
    image: "/uploads/2018/10/Silhoutte-Soft-treatment-london.jpg",
    title: "Endolift®",
    href: "/non-surgical/endolift-for-malar-bags-uk",
    blurb: "Laser-assisted tightening of the lower lid and malar area, without incisions.",
  },
  {
    image: "/uploads/2025/03/Morpheus-min.jpg",
    title: "Morpheus8",
    href: "/non-surgical/morpheus8-treatment-uk",
    blurb: "Radiofrequency microneedling that remodels and firms facial skin.",
  },
  {
    image: "/uploads/2018/10/tear-trough-treatment-london.jpg",
    title: "Tear Trough Fillers",
    href: "/non-surgical/tear-trough-fillers-uk",
    blurb: "Softens under-eye hollows with precisely placed hyaluronic acid.",
  },
  {
    image: "/uploads/2024/09/supeor-sulcus.jpg",
    title: "Superior Sulcus Filler",
    href: "/non-surgical-injectables-medical-aesthetic/superior-sulcus-filler",
    blurb: "Restores volume to a hollowed upper-lid sulcus above the eye.",
  },
  {
    image: "/uploads/2024/09/ultraclear-laser.jpg",
    title: "UltraClear Laser",
    href: "/non-surgical/ultraclear-laser-treatment-uk",
    blurb: "Cold-fibre laser resurfacing that targets texture, tone and fine lines.",
  },
  {
    image: "/uploads/2017/08/Sofwave.jpg",
    title: "Sofwave™",
    href: "/non-surgical/sofwave-treatment-uk",
    blurb: "Ultrasound energy that lifts and tightens skin across the brow and face.",
  },
  {
    image: "/uploads/2018/10/Ultherapy-london.jpg",
    title: "Biostimulation",
    href: "/ellanse",
    blurb: "A collagen-stimulating filler used to rebuild facial volume and contour.",
  },
  {
    image: "/uploads/2024/09/hyaluronidase-dissolving.jpg",
    title: "Hyaluronidase Dissolving",
    href: "/eyelid-swelling-migrated-fillers-hyaluronidase-dissolving",
    blurb: "Dissolves migrated or unwanted hyaluronic acid filler around the eyes and midface.",
  },
  {
    image: "/uploads/2018/11/Non-surgical-facelift-fillers-london.jpg",
    title: "Non-Surgical Facial Contouring",
    href: "/non-surgical-facial-contouring",
    blurb: "Injectable contouring to rebalance facial proportions without surgery.",
  },
  {
    image: "/uploads/2025/06/Plasma-Pen.jpg",
    title: "Plexr / Plasma Pen",
    href: "/plexr-plasma-pen",
    blurb: "Plasma treatment for eyelid skin laxity as an alternative to surgery.",
  }
];



/**
 * Ten cases pulled from the three eyelid-surgery galleries, weighted towards
 * full-face frames rather than eye close-ups so a card still reads as a
 * person at a third of the rail's width. Ordered so the first screenful on
 * desktop shows one of each treatment, and each card links through to the
 * gallery it came from.
 */
/* Listed one by one rather than derived from a set-and-index pair, because
   these files are named for what the case is rather than by a number in a
   series. No overlayLabels on any of them: every one of these composites has
   "Before" and "After" printed into the artwork already, so drawing the
   markup labels as well would show the words twice. */
const BEFORE_AFTER_SLIDES: BeforeAfterSlide[] = (
  [
    ["Upper Blepharoplasty", "ba-4-mths-after-upper-lid-bleph-2", "upper-blepharoplasty"],
    /* Both lids, not just the lower one - the case is a scarless lower lid
       blepharoplasty combined with a bilateral upper lid blepharoplasty, which
       is what the photograph shows. */
    ["Upper and Lower Eyelid Blepharoplasty", "ba-scarless-lower-lid-bleph-and-bil-ul-bleph-ba", "lower-blepharoplasty-eyebag-removal"],
    ["Ptosis Surgery", "ba-ptosis-ba-3", "ptosis-surgery"],
    ["Upper Blepharoplasty", "ba-4-mths-after-upper-lid-bleph-3", "upper-blepharoplasty"],
    ["Extended Lower Eyelid Blepharoplasty", "ba-extended-lower-lid-bleph-2", "lower-blepharoplasty-eyebag-removal"],
    ["Ptosis Surgery", "ba-3-mths-upper-lid-bleph-and-right-eyelid-ptosis-2", "ptosis-surgery"],
    ["Upper Blepharoplasty", "ba-3-mths-after-bilateral-upper-lid-bleph", "upper-blepharoplasty"],
    ["Lower Blepharoplasty", "ba-scarless-transconjunctival-lower-lid-bleph-ba-3", "lower-blepharoplasty-eyebag-removal"],
    ["Upper Eyelid Blepharoplasty & Ptosis Surgery", "ba-3-mths-upper-lid-bleph-and-right-eyelid-ptosis", "ptosis-surgery"],
    ["Lower Blepharoplasty", "ba-extended-lower-lid-bleph-3", "lower-blepharoplasty-eyebag-removal"],
  ] as const
).map(([treatment, file, gallery]) => ({
  treatment,
  image: `/${file}.png`,
  alt: `${treatment} before and after, a patient of Dr Sabrina Shah-Desai`,
  href: `/before-after/${gallery}`,
}));

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
    image: "/dr-sabrina-profile.png",
  },
  {
    name: "Dr Janine",
    role: "Dentist & Aesthetic Practitioner, Perfect Skin Studio",
    image: "/dr-janine.png",
  },
  {
    name: "Dr Hemmali",
    role: "Dentist & Aesthetic Practitioner, Perfect Skin Studio",
    image: "/dr-hemmali.png",
  },
  {
    name: "Irvana",
    role: "Qualified therapist, Perfect Skin Studio",
    credentials: ["Level 4 Laser"],
    image: "/irvana.png",
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
function Stars({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 90 16" aria-hidden="true">
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

/* Global patient network artwork. The alt text carries the three figures the
   graphic states, because they are the only content in it a screen reader
   would otherwise miss entirely. */
const REACH_ALT =
  "World map of Perfect Eyes patients: 60+ countries, 1,000+ international patients, a global patient network.";

const REACH_SIZES = "(min-width: 1280px) 1232px, 92vw";

const {
  props: { srcSet: reachWideSrcSet, sizes: reachWideSizes },
} = getImageProps({
  alt: REACH_ALT,
  src: "/Trusted by patients worldwide desktop new.png",
  width: 1672,
  height: 941,
  sizes: REACH_SIZES,
});
const reachWide = { srcSet: reachWideSrcSet, sizes: reachWideSizes };

/* The phone crop is the <img> fallback. Its width and height attributes are
   dropped deliberately: the two crops have different aspect ratios, and those
   attributes would pin the tall one's ratio to the wide <source> as well,
   squashing it on desktop. The ratio is reserved in CSS instead, at the same
   700px breakpoint, so there is still no layout shift. */
const { props: reachNarrowProps } = getImageProps({
  alt: REACH_ALT,
  src: "/Trusted by patients worldwide mobile new.png",
  width: 852,
  height: 1570,
  sizes: REACH_SIZES,
});
const reachNarrow = {
  src: reachNarrowProps.src,
  srcSet: reachNarrowProps.srcSet,
  sizes: reachNarrowProps.sizes,
  loading: reachNarrowProps.loading,
  decoding: reachNarrowProps.decoding,
};

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
              </Link>
              <Link href="/contact-cosmetic-eye-surgeon" className="tp-btn tp-btn-secondary">
                Book a Consultation
              </Link>
            </div>

            {/* The Tatler lockup and three text signals beside it: the Google
                rating, the years of experience, and the registrations. Only
                the lockup is artwork - the rating is a line of text carrying
                the G mark and stars inline, not a card of its own. */}
            <div className={styles.credentials}>
              <figure className={styles.press}>
                <Image
                  src="/as-seen-in-tatler.png"
                  alt="As seen in Tatler, Beauty &amp; Cosmetic Surgery Guide, 2019-2026"
                  /* The source's own proportions. The drawn height is set in
                     CSS off the lockup's smallest line, so sizes states the
                     widest that height can produce and next/image ships a
                     badge-sized file rather than the 1536px original. */
                  width={1536}
                  height={1024}
                  sizes="168px"
                  className={styles.pressLogo}
                />
              </figure>

              <dl className={styles.trust}>
                <div className={styles.trustItem}>
                  <dt className="sr-only">Google rating</dt>
                  <dd className={styles.trustValue}>
                    <GoogleMark className={styles.googleMark} />
                    <span className={styles.trustStrong}>4.8</span>
                    <Stars className={styles.stars} />
                    <span className={styles.trustMeta}>
                      <span className="sr-only">Rated 4.8 out of 5 from </span>
                      240+ Google reviews
                    </span>
                  </dd>
                </div>
                <div className={styles.trustItem}>
                  <dt className="sr-only">Surgical experience</dt>
                  <dd className={styles.trustValue}>
                    <span className={styles.trustStrong}>25+ years</span>
                    <span className={styles.trustMeta}>surgical experience</span>
                  </dd>
                </div>
                <div className={styles.trustItem}>
                  <dt className="sr-only">Registration</dt>
                  <dd className={styles.trustValue}>
                    <span className={styles.trustStrong}>GMC &middot; RCOphth &middot; CQC</span>
                    <span className={styles.trustMeta}>registered &amp; accredited</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. AWARDS & RECOGNITION ───────────────────────────────────────── */}
      <Reveal>
        <section
          className={`${styles.logoStrip} ${styles.logoStripTop} ${styles.awardStrip}`}
          aria-label="Awards and recognition"
        >
          <p className={styles.logoStripLabel}>Awards &amp; Recognition</p>
          {/* Travels the opposite way to the accreditation strip below it, so
              the two rows read as a pair rather than one long band. */}
          <AutoScrollCarousel items={AWARD_BADGES} speed={45} reverse size="badge" />
        </section>
      </Reveal>

      {/* ── 3. ACCREDITED BY ──────────────────────────────────────────────── */}
      <Reveal>
        <AccreditedStrip />
      </Reveal>

      {/* ── 4. ABOUT ──────────────────────────────────────────────────────── */}
      <Reveal>
        <MeetDrSabrina />
      </Reveal>

      {/* ── 5. TREATMENTS ─────────────────────────────────────────────────── */}
      <section
        id="treatments"
        className={`${styles.section} ${styles.treatments}`}
        aria-labelledby="treatments-title"
      >
        <Reveal>
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
        </Reveal>

        {/* Full-bleed rail: the cards run past the container edges so the
            carousel reads as continuous rather than as a boxed row. Left out
            of the reveal above - it drives its own drift as soon as it
            mounts, and fading a moving rail in double-animates it. */}
        <TreatmentsCarousel
          groups={[
            { id: "surgical", label: "Surgical", items: SURGICAL_TREATMENTS },
            { id: "non-surgical", label: "Non-Surgical", items: NONSURGICAL_TREATMENTS },
          ]}
        />
      </section>

      {/* ── 6. PATIENT STORIES ────────────────────────────────────────────── */}
      <Reveal>
        <PatientStories stories={PATIENT_STORIES} />
      </Reveal>

      {/* ── 7. THE JOURNEY ───────────────────────────────────────────────── */}
      <Reveal>
        <PatientJourney />
      </Reveal>

      {/* ── 8. VIDEO TESTIMONIALS ─────────────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.tint}`}
        aria-labelledby="videos-title"
      >
        <div className="container">
          <Reveal>
            <div className={styles.head}>
              <span className={styles.eyebrow}>In their words</span>
              <h2 id="videos-title" className={styles.h2}>
                Patient Testimonials
              </h2>
              <span className={`${styles.rule} ${styles.ruleCenter}`} aria-hidden="true" />
            </div>
          </Reveal>

          <div className={styles.videoGrid}>
            {/* A small stagger, not one each - three cards seen once per
                visit, not a list scrolled past all day. */}
            <Reveal delay={0}>
              <VideoCard
                thumbnailSrc="/uploads/2025/03/Perfect-Eyes.png"
                title="A Perfect Eyes Clinic's Patient"
                videoUrl="https://www.youtube.com/watch?v=gBKI4fAK7wk"
              />
            </Reveal>
            <Reveal delay={80}>
              <VideoCard
                thumbnailSrc="/uploads/2025/03/perfecteyes.png"
                title="Upper Lid Blepharoplasty"
                videoUrl="https://www.youtube.com/watch?v=f-Z-4ET4YbQ"
              />
            </Reveal>
            <Reveal delay={160}>
              <VideoCard
                thumbnailSrc="/uploads/2025/03/perfecteyes-2.png"
                title="Dermal Fillers Testimonial"
                videoUrl="https://www.youtube.com/shorts/L0sNTnUmLBw"
              />
            </Reveal>
          </div>

          <p className={styles.disclaimer}>
            *Individual results vary. Testimonials reflect personal experiences following
            consultation and treatment.
          </p>
        </div>
      </section>

      {/* ── 9. BEFORE AND AFTER GALLERY ───────────────────────────────────── */}
      <section className={styles.section} aria-labelledby="results-title">
        <Reveal>
          <div className="container">
            <div className={styles.head}>
              <span className={styles.eyebrow}>Real results</span>
              <h2 id="results-title" className={styles.h2}>
                Before and After Gallery
              </h2>
              <p className={styles.lead}>
                A selection of eyelid surgery results by Dr Sabrina Shah-Desai. Individual
                results vary; every case shown is a patient who consented to their photographs
                being published.
              </p>
            </div>

            <BeforeAfterCarousel slides={BEFORE_AFTER_SLIDES} />
          </div>
        </Reveal>
      </section>

      {/* ── 10. GLOBAL PATIENT NETWORK ────────────────────────────────────── */}
      <section
        className={styles.section}
        aria-labelledby="reach-title"
      >
        <div className="container">
          <Reveal>
            <div className={styles.head}>
              <h2 id="reach-title" className={styles.h2}>
                Trusted by patients worldwide
              </h2>
              <span className={`${styles.rule} ${styles.ruleCenter}`} aria-hidden="true" />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <figure className={styles.reachFigure}>
              {/* The map itself is the link. Its alt text describes the
                  artwork rather than the destination, so the link carries its
                  own aria-label instead of being announced as "60+ countries…" */}
              <Link
                href="/international-patients"
                className={styles.reachFrame}
                aria-label="International patients: travelling to London for treatment"
              >
                {/* Two crops of the same artwork - a wide map for tablet and
                    desktop, a tall one for phones. Swapped with <picture>
                    rather than two <Image>s toggled by CSS: display:none does
                    not stop an <img> downloading, so the CSS route would cost
                    every visitor both files. getImageProps still gives each
                    source the optimiser's srcset. */}
                <picture>
                  <source media="(min-width: 700px)" srcSet={reachWide.srcSet} sizes={reachWide.sizes} />
                  <img {...reachNarrow} alt={REACH_ALT} className={styles.reachImg} />
                </picture>
              </Link>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── 11. CLINIC TEAM ───────────────────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.team}`}
        aria-labelledby="team-title"
      >
        <span className={styles.teamGlow} aria-hidden="true" />

        <Reveal>
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
        </Reveal>
      </section>

      {/* ── 12. CLOSING CTA ───────────────────────────────────────────────── */}
      <Reveal>
        <BeginJourney />
      </Reveal>

      {/* ── 13. FAQ ───────────────────────────────────────────────────────── */}
      <Reveal>
        <HomeFaq items={HOME_FAQ} />
      </Reveal>

      {/* ── 14. CONTACT ───────────────────────────────────────────────────── */}
      <Reveal>
        <ContactSection />
      </Reveal>

      {/* ── 15. VAT DISCLAIMER ────────────────────────────────────────────── */}
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
