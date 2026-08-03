import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AutoScrollCarousel from "@/components/home/AutoScrollCarousel";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import VideoCard from "@/components/home/VideoCard";
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

const AWARD_LOGOS = [
  { src: "/uploads/2024/09/11.png", alt: "Award logo 1" },
  { src: "/uploads/2024/09/22.png", alt: "Award logo 2" },
  { src: "/uploads/2024/09/31.png", alt: "Award logo 3" },
  { src: "/uploads/2024/09/41.png", alt: "Award logo 4" },
  { src: "/uploads/2024/09/51.png", alt: "Award logo 5" },
  { src: "/uploads/2024/09/61.png", alt: "South African Society for Dermatologic Surgery" },
  { src: "/uploads/2024/09/71.png", alt: "BOPSS British Oculoplastic Surgery Society" },
];

const SURGICAL_TREATMENTS = [
  {
    image: "/uploads/2018/10/Eye-Lid-Lifts-Upper-Lid-Blepharoplasty-london.jpg",
    title: "Upper Lid Blepharoplasty",
    href: "/surgical/eyelid-surgery/upper-eyelid-blepharoplasty-uk",
  },
  {
    image: "/uploads/2018/10/Eye-Bag-Surgery-Lower-Lid-Blepharoplasty-london.jpg",
    title: "Eye Bag Surgery",
    href: "/surgical/eyelid-surgery/eye-bag-removal-blepharoplasty-uk",
  },
  {
    image: "/uploads/2018/10/eyeboost.jpg",
    title: "Festoons & Malar Bags",
    href: "/surgical/festoons-malar-bags-treatment-uk",
  },
  {
    image: "/uploads/2018/11/Ptosis-surgery-uk.jpg",
    title: "Ptosis Surgery",
    href: "/surgical/eyelid-surgery/droppy-eye-ptosis-surgery-uk",
  },
  {
    image: "/uploads/2018/10/Double-eyelid-surgery-london.jpg",
    title: "Double Eyelid Surgery",
    href: "/surgical/eyelid-surgery/double-eyelids-asian-blepharoplasty-uk",
  },
  {
    image: "/uploads/2024/09/hyaluronidase-dissolving.jpg",
    title: "Hyaluronidase Dissolving",
    href: "/eyelid-swelling-migrated-fillers-hyaluronidase-dissolving",
  },
  {
    image: "/uploads/2024/07/eyelid-lump.jpg",
    title: "Eyelid Lump & Bump Removal",
    href: "/surgical/eyelid-surgery/lump-on-eyelid-bumps-treatment-uk",
  },
  {
    image: "/uploads/2025/03/revision-surgeyr-1-min.jpg",
    title: "Revision Blepharoplasty",
    href: "/surgical/eyelid-surgery/revision-blepharoplasty-uk",
  },
  {
    image: "/uploads/2025/03/browlift-min.jpg",
    title: "Brow Lift",
    href: "/surgical/browlift-treatment-uk",
  },
];

const NONSURGICAL_TREATMENTS = [
  {
    image: "/uploads/2018/10/Silhoutte-Soft-treatment-london.jpg",
    title: "Endolift®",
    href: "/non-surgical/endolift-for-malar-bags-uk",
  },
  {
    image: "/uploads/2025/03/Morpheus-min.jpg",
    title: "Morpheus8",
    href: "/non-surgical/morpheus8-treatment-uk",
  },
  {
    image: "/uploads/2024/09/supeor-sulcus.jpg",
    title: "Superior Sulcus Filler",
    href: "/non-surgical-injectables-medical-aesthetic",
  },
  {
    image: "/uploads/2018/10/tear-trough-treatment-london.jpg",
    title: "Tear Trough Fillers",
    href: "/non-surgical/tear-trough-fillers-uk",
  },
  {
    image: "/uploads/2018/10/Ultherapy-london.jpg",
    title: "Ellansé",
    href: "/ellanse",
  },
  {
    image: "/uploads/2024/09/ultraclear-laser.jpg",
    title: "UltraClear Laser",
    href: "/non-surgical/ultraclear-laser-treatment-uk",
  },
  {
    image: "/uploads/2018/11/Non-surgical-facelift-fillers-london.jpg",
    title: "Non-Surgical Facial Contouring",
    href: "/non-surgical-facial-contouring",
  },
  {
    image: "/uploads/2017/08/Sofwave.jpg",
    title: "Sofwave™",
    href: "/non-surgical/sofwave-treatment-uk",
  },
  {
    image: "/uploads/2025/06/Plasma-Pen.jpg",
    title: "Plexr / Plasma Pen",
    href: "/plexr-plasma-pen",
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

const CONSULTATION_STEPS = [
  {
    icon: "/uploads/2024/09/1bx.svg",
    text: "Discover what treatment is right for your concern and needs.",
  },
  {
    icon: "/uploads/2024/09/2bx.svg",
    text: "Use our simple booking form to confirm your consultation or request a FREE call back.",
  },
  {
    icon: "/uploads/2024/09/3bc.svg",
    text: "Look forward to coming in for your bespoke appointment.",
  },
];

const AESTHETICS_TEAM = [
  {
    name: "Dr Sabrina Shah-Desai",
    title: "MS, FRCS, Board Certified Cosmetic Oculoplastic Surgeon",
  },
  { name: "Dr Janine", title: "Dentist & Aesthetic Practitioner — Perfect Skin Studio" },
  { name: "Dr Hemmali", title: "Dentist & Aesthetic Practitioner — Perfect Skin Studio" },
  { name: "Irvana", title: "Level 4 LASER qualified therapist — Perfect Skin Studio" },
];

const ADMIN_TEAM = [
  { name: "Leanne", title: "Practice Clinic Manager" },
  { name: "Mojdeh", title: "Surgical Coordinator & Patient Educator" },
  { name: "Mary", title: "Patient Coordinator" },
  { name: "Lakshiya", title: "Patient Coordinator" },
  { name: "Sally", title: "Patient Coordinator" },
];

const ACCREDITATIONS = [
  { src: "/uploads/2024/09/grating.svg", alt: "Google Rating" },
  { src: "/uploads/2024/09/realrating.svg", alt: "RealSelf Rating" },
  { src: "/uploads/2024/09/carequlaity.svg", alt: "Care Quality Commission" },
];

/** Shared chevron used on every treatment card. */
function CardArrow() {
  return (
    <svg className={styles.cardArrow} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TreatmentGrid({
  items,
}: {
  items: { image: string; title: string; href: string }[];
}) {
  return (
    <div className={styles.grid}>
      {items.map((t) => (
        <Link key={t.href} href={t.href} className={styles.card}>
          <div className={styles.cardMedia}>
            <Image
              src={t.image}
              alt={t.title}
              fill
              sizes="(min-width: 1000px) 33vw, (min-width: 560px) 50vw, 100vw"
            />
            <span className={styles.cardScrim} aria-hidden="true" />
          </div>
          <p className={styles.cardTitle}>
            {t.title}
            <CardArrow />
          </p>
        </Link>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className={styles.home}>
      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-title">
        {/* The hero backdrop is the LCP element, so it is preloaded from the
            document head. `priority` is deprecated as of Next 16 — `preload`
            is the replacement that says what it actually does. */}
        <Image
          src="/uploads/2025/10/234-1.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className={styles.heroImage}
        />
        <span className={styles.heroOverlay} aria-hidden="true" />

        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={`${styles.eyebrow} ${styles.heroEyebrow}`}>
                Oculoplastic &amp; Aesthetic Surgery — London
              </span>
              <h1 id="hero-title" className={styles.heroTitle}>
                Our expertise is in Clinically led assessment and treatment of eyelid and
                peri-ocular conditions, focused on function, comfort, and anatomical balance.
              </h1>
              <p className={styles.heroLead}>
                Care is delivered using contemporary minimally invasive surgical and
                non-surgical techniques.
              </p>
              <div className={styles.heroActions}>
                <Link href="/self-test-survey" className="tp-btn tp-btn-primary tp-btn-lg">
                  Take the Eyelid Surgery Test
                </Link>
              </div>
            </div>

            <div className={styles.heroFigure}>
              <Image
                src="/uploads/2026/06/Group-12.svg"
                alt="Dr Sabrina Shah-Desai"
                width={420}
                height={480}
                loading="eager"
                className={styles.heroPortrait}
              />
              <div className={styles.heroBadge}>
                <p className={styles.heroBadgeName}>DR. SABRINA SHAH&mdash;DESAI</p>
                <small className={styles.heroBadgeCred}>MS, FRCS (Ed) Ophth.</small>
                <p className={styles.heroBadgeText}>
                  Has been consistently recognised as a top practitioner for eyes for eight
                  consecutive years, from 2019 to 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. AWARDS ─────────────────────────────────────────────────────── */}
      <section
        className={`${styles.logoStrip} ${styles.logoStripTop}`}
        aria-label="Awards and memberships"
      >
        <p className={styles.logoStripLabel}>Awards &amp; professional memberships</p>
        <AutoScrollCarousel items={AWARD_LOGOS} speed={35} />
      </section>

      {/* ── 3. ABOUT ──────────────────────────────────────────────────────── */}
      <section className={styles.about} aria-labelledby="about-title">
        <div className={styles.aboutMedia}>
          <Image
            src="/uploads/2024/09/drsabrina-hm-bg.jpg"
            alt=""
            fill
            sizes="(min-width: 900px) 50vw, 100vw"
          />
          <span className={styles.aboutMediaOverlay} aria-hidden="true" />
          <a
            href="https://www.youtube.com/watch?v=5Z-PVTuIR6c"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch Dr Sabrina's introduction video on YouTube"
            className={styles.playButton}
          >
            <svg className={styles.playIcon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </a>
        </div>

        <div className={styles.aboutText}>
          <span className={styles.eyebrow}>About</span>
          <h2 id="about-title" className={styles.h2}>
            Meet Dr Sabrina Shah-Desai
          </h2>
          <p className={styles.aboutCred}>MS, FRCS (Ed) Ophth</p>
          <span className={styles.rule} aria-hidden="true" />
          <p>
            Dr Sabrina Shah-Desai, MS, FRCS (Ed) Ophth is a multi-award-winning Oculoplastic
            Reconstructive Surgeon and Aesthetic Practitioner specialising in reconstructive,
            revisional, and cosmetic surgery of the eyelids, as well as non-surgical treatments
            for the eyes and face. With over 25 years of experience, she is globally recognised
            for her pioneering, minimally invasive techniques.
          </p>
          <p>
            Known as the &ldquo;go-to&rdquo; surgeon for discerning patients seeking subtle,
            natural results, she is also highly sought after for revisional procedures by those
            who have undergone previous fillers or eyelid surgeries.{" "}
            <strong>
              Dr Shah-Desai is now listed on the Royal College of Surgeons of England register
              of Board-Certified Cosmetic Surgeons.
            </strong>
          </p>
        </div>
      </section>

      {/* ── 4. TREATMENTS ─────────────────────────────────────────────────── */}
      <section
        id="treatments"
        className={`${styles.section} ${styles.paper}`}
        aria-labelledby="treatments-title"
      >
        <div className="container">
          <div className={styles.head}>
            <span className={styles.eyebrow}>What we treat</span>
            <h2 id="treatments-title" className={styles.h2}>
              Our Specialist Treatments and Procedures
            </h2>
            <span className={`${styles.rule} ${styles.ruleCenter}`} aria-hidden="true" />
          </div>

          <div className={styles.treatmentsBlock}>
            <div className={styles.treatmentsBlockHead}>
              <h3 className={styles.h3}>Surgical Treatments</h3>
            </div>
            <TreatmentGrid items={SURGICAL_TREATMENTS} />
          </div>

          <div className={styles.treatmentsBlock}>
            <div className={styles.treatmentsBlockHead}>
              <h3 className={styles.h3}>Non-Surgical Treatments</h3>
            </div>
            <TreatmentGrid items={NONSURGICAL_TREATMENTS} />
          </div>
        </div>
      </section>

      {/* ── 5. CONSULTATION STEPS ─────────────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.fog}`}
        aria-labelledby="consultation-title"
      >
        <div className="container">
          <div className={styles.head}>
            <span className={styles.eyebrow}>Three simple steps</span>
            <h2 id="consultation-title" className={styles.h2}>
              Book Your Consultation Today
            </h2>
            <span className={`${styles.rule} ${styles.ruleCenter}`} aria-hidden="true" />
          </div>

          <ol className={styles.steps}>
            {CONSULTATION_STEPS.map((step, i) => (
              <li key={step.text} className={styles.step}>
                <Image
                  src={step.icon}
                  alt=""
                  width={64}
                  height={64}
                  className={styles.stepIcon}
                  aria-hidden="true"
                />
                <span className={styles.stepBody}>
                  <span className={styles.stepNumber}>Step {i + 1}</span>
                  <span className={styles.stepText}>{step.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <p className={styles.stepsNote}>
            A consultation allows us to assess your concerns, discuss suitable options,
            expected recovery, and answer any questions, so you can make an informed decision.
          </p>

          <div className={styles.stepsCta}>
            <Link
              href="/contact-cosmetic-eye-surgeon"
              className="tp-btn tp-btn-primary tp-btn-lg"
            >
              Book A Compatibility Call
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ───────────────────────────────────────────────── */}
      <section className={styles.testimonials} aria-label="Patient testimonials">
        <Image
          src="/uploads/2024/09/testimonial-bg.jpg"
          alt=""
          fill
          sizes="100vw"
        />
        <span className={styles.testimonialsOverlay} aria-hidden="true" />
        <div className="container">
          <div className={styles.testimonialsGrid}>
            <TestimonialsSlider />
          </div>
        </div>
      </section>

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
              <Image
                src="/uploads/2024/09/rating49.svg"
                alt="Rated 4.9 out of 5"
                width={160}
                height={32}
                className={styles.ratingImage}
              />
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

      {/* ── 8. ACCREDITATIONS ─────────────────────────────────────────────── */}
      <section
        className={`${styles.sectionSm} ${styles.fog}`}
        aria-label="Ratings and accreditations"
      >
        <div className="container">
          <div className={styles.badges}>
            {ACCREDITATIONS.map((badge) => (
              <Image
                key={badge.src}
                src={badge.src}
                alt={badge.alt}
                width={140}
                height={70}
                className={styles.badge}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. AS SEEN IN ─────────────────────────────────────────────────── */}
      <section className={styles.logoStrip} aria-label="Featured in the media">
        <p className={styles.logoStripLabel}>As seen in</p>
        <AutoScrollCarousel items={MEDIA_LOGOS} speed={50} />
      </section>

      {/* ── 10. CLINIC TEAM ───────────────────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.team}`}
        aria-labelledby="team-title"
      >
        <div className="container">
          <div className={styles.split}>
            <div className={styles.splitMedia}>
              <Image
                src="/uploads/2025/09/Homepage_Picture-1.jpg"
                alt="The Perfect Eyes Clinic"
                fill
                sizes="(min-width: 1000px) 50vw, 100vw"
              />
            </div>

            <div>
              <span className={styles.eyebrow}>Our people</span>
              <h2 id="team-title" className={styles.h2}>
                Meet The Clinic Team
              </h2>
              <p className={styles.lead}>
                Elegant &amp; discreet, the clinic ensures an environment that meets the
                highest standards of safety and hygiene and received a &ldquo;good
                rating&rdquo; in all 5 key areas by the{" "}
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

              <div className={styles.teamCols}>
                <div>
                  <h3 className={styles.teamColTitle}>Medical Aesthetics Team</h3>
                  <ul className={styles.teamList}>
                    {AESTHETICS_TEAM.map((m) => (
                      <li key={m.name}>
                        <span className={styles.teamName}>{m.name}</span>
                        <span className={styles.teamRole}>{m.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className={styles.teamColTitle}>Administrative Team</h3>
                  <ul className={styles.teamList}>
                    {ADMIN_TEAM.map((m) => (
                      <li key={m.name}>
                        <span className={styles.teamName}>{m.name}</span>
                        <span className={styles.teamRole}>{m.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.teamCta}>
                <Link href="/meet-team" className="tp-btn tp-btn-secondary">
                  Meet the Full Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. INSTAGRAM ─────────────────────────────────────────────────── */}
      <section
        className={`${styles.sectionSm} ${styles.tint} ${styles.instagram}`}
        aria-label="Instagram"
      >
        <div className="container">
          <p className={styles.instagramText}>
            Follow us on <strong>Instagram</strong>{" "}
            <a
              href="https://www.instagram.com/drsabrinashahdesaiofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instagramHandle}
            >
              @drsabrinashahdesaiofficial
            </a>{" "}
            to stay updated
          </p>
        </div>
      </section>

      {/* ── 12. CLOSING CTA ───────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.paper}`} aria-labelledby="cta-title">
        <div className="container">
          <div className={styles.split}>
            <div className={styles.splitMedia}>
              <Image
                src="/uploads/2024/09/askques-img.jpg"
                alt="Book your consultation at Perfect Eyes"
                fill
                sizes="(min-width: 1000px) 50vw, 100vw"
              />
            </div>

            <div>
              <span className={styles.eyebrow}>Get in touch</span>
              <h2 id="cta-title" className={styles.h2}>
                Ask Us A Question Or Book An Appointment
              </h2>
              <p className={styles.lead}>
                Call or email us today, we would be delighted to answer your questions.
              </p>
              <div className={styles.ctaActions}>
                <Link
                  href="/contact-cosmetic-eye-surgeon"
                  className="tp-btn tp-btn-primary tp-btn-lg"
                >
                  Book A Compatibility Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. VAT DISCLAIMER ────────────────────────────────────────────── */}
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
