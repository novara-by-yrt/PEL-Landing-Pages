import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/home/ContactSection";
import JourneyCards, { type JourneyStep } from "@/components/home/JourneyCards";
import PatientStories from "@/components/home/PatientStories";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import BeginJourney from "@/components/shared/BeginJourney";
import { TpIcon } from "@/components/treatment/TpIcon";
import { PATIENT_STORIES } from "@/lib/reviews";
import styles from "./SurgeonProfile.module.css";

/* Every string below is Dr Sabrina's existing page copy, restructured out of
   one long column of prose into sections. Nothing is invented: the awards,
   fellowships, memberships and dates all come from the original page. */

const STATS = [
  { value: "25+", label: "Years of surgical and non-surgical experience" },
  { value: "6×", label: "Tatler Top Doctors Guide, 2019–2026" },
  { value: "4", label: "Sub-speciality fellowships completed in the UK" },
  { value: "RCS", label: "England register of Board-Certified Cosmetic Surgeons" },
];

const SPECIALISMS = [
  {
    title: "Eyelid lift surgery",
    text: "Upper-lid blepharoplasty to remove the redundant skin that hoods the eye.",
    href: "/surgical/eyelid-surgery/upper-eyelid-blepharoplasty-uk",
    icon: "eye",
  },
  {
    title: "Scar-less eye bag removal",
    text: "Lower-lid blepharoplasty addressing under-eye bags and puffiness.",
    href: "/surgical/eyelid-surgery/eye-bag-removal-blepharoplasty-uk",
    icon: "eye",
  },
  {
    title: "Droopy eyelid correction",
    text: "Ptosis surgery to reopen an eye whose lifting muscle has weakened.",
    href: "/surgical/eyelid-surgery/droppy-eye-ptosis-surgery-uk",
    icon: "eye",
  },
  {
    title: "Direct brow lifts",
    text: "Repositioning a heavy or descended brow to open the upper eye area.",
    href: "/surgical/browlift-treatment-uk",
    icon: "sparkle",
  },
  {
    title: "Revision & complications",
    text: "Sought after by peers to manage surgical and filler-related adverse events, including sight loss.",
    href: "/surgical/eyelid-surgery/revision-blepharoplasty-uk",
    icon: "shield",
  },
  {
    title: "Eyelid mal-positions",
    text: "Ectropion, entropion, thyroid eyelid retraction, facial palsy, dry and watery eyes, lumps and eyelid cancer.",
    href: "/condition/droopy-ptosis-eye",
    icon: "pulse",
  },
];

const PERFECT_360: JourneyStep[] = [
  {
    title: "Read the anatomy",
    text: "Every plan starts from individual facial anatomy rather than a standard procedure list.",
  },
  {
    title: "Listen to expectations",
    text: "Treatment is crafted to restore and respect unique features, not to replace them.",
  },
  {
    title: "Blend the modalities",
    text: "Personalised care combined with innovative, evidence-based surgical and non-surgical treatment.",
  },
  {
    title: "Deliver natural results",
    text: "Results that are both natural and remarkable — “be your own kind of beautiful”.",
  },
];

const AWARDS = [
  { name: "Best Aesthetic Doctor", body: "Safety in Beauty Diamond Award", year: "2023" },
  { name: "Consultant Surgeon of the Year — Highly Commended", body: "Aesthetic Awards", year: "2022" },
  { name: "Consultant Surgeon of the Year", body: "Aesthetic Awards", year: "2021" },
  { name: "Best Surgical Result", body: "Aesthetic Awards", year: "2021" },
  { name: "Medical Aesthetic Practitioner — Highly Commended", body: "MyFaceMyBody", year: "2019" },
  { name: "Global 100 most influential aesthetic practitioners", body: "MyFaceMyBody", year: "2019" },
];

const TRAINING = [
  {
    year: "1994",
    title: "Bombay University, Sir JJ Group of Hospitals",
    text: "Graduated before travelling to the UK to complete four sub-speciality fellowships.",
  },
  {
    year: "1996–1997",
    title: "Cornea & Oculoplastics — The Queen Victoria Hospital, East Grinstead",
    text: "Developed extensive expertise in periocular trauma, chemical burns and ocular surface disease.",
  },
  {
    year: "1998",
    title: "Joint oculoplastic fellowship — Salisbury & Southampton Eye Units",
    text: "",
  },
  {
    year: "2000–2001",
    title: "Adnexal fellowship — Moorfields Eye Hospital",
    text: "",
  },
  {
    year: "2003–2010",
    title: "Associate Specialist, Adnexal unit — Moorfields Eye Hospital",
    text: "Seven years in the adnexal unit, followed by a consultant post at BHRUT hospitals from 2010 to 2015.",
  },
  {
    year: "2009",
    title: "Craniofacial secondment — Chelsea & Westminster Hospital",
    text: "Specialised in plastic surgery techniques relating to the eye and the face.",
  },
  {
    year: "2012",
    title: "Clinical Excellence Award",
    text: "Awarded by her NHS Trust for contributions to improving patient care.",
  },
  {
    year: "2013",
    title: "Local MOHS Micrographic Cancer Service, Essex",
    text: "Set up so NHS patients had local access to NICE-recommended treatment for eyelid skin cancers.",
  },
];

const MEMBERSHIPS = [
  "British Oculoplastic Surgery Society (BOPSS)",
  "The Royal College of Surgeons (Ed)",
  "The Royal College of Ophthalmologists",
  "BAPRAS — inter-speciality member",
  "APRASSA — honorary member",
  "South African Society of Dermatological Surgery",
  "CMAC specialist advisory board",
  "IMCAS complication management group",
];

const LEADERSHIP = [
  {
    title: "Oculo-Facial Aesthetic Academy",
    text: "Founded OFAA in 2016 to improve training standards in aesthetic medicine. In 2019 it won a Highly Commended Aesthetic Award for Best Independent Aesthetic Training Provider, and Best Independent Training Provider at the Safety in Beauty Diamond Awards for its virtual-reality anatomy app.",
    href: "https://facialaesthetictraining.com/",
    icon: "clipboard",
  },
  {
    title: "Teaching & cadaveric courses",
    text: "Runs cadaveric anatomy and aesthetic ultrasonography courses, and trains oculoplastic surgeons at the Manchester Oculoplastic Dissection Course and the Coventry Ophthalmic Surgery Cadaver course.",
    icon: "building",
  },
  {
    title: "Professor of Anatomy",
    text: "Appointed teaching Professor of Anatomy (facial aesthetics) at the University of Camerino, Italy, 2019–2022.",
    icon: "star",
  },
  {
    title: "Published research",
    text: "Author of book chapters and scientific papers published in peer-reviewed medical journals and textbooks.",
    href: "https://pubmed.ncbi.nlm.nih.gov/?term=shah-desai",
    icon: "clipboard",
  },
  {
    title: "Dr Sabrina skincare",
    text: "Products addressing dark circles, puffiness, fine lines and wrinkles, formulated with clinically proven ingredients and backed by independent studies. The patent-pending “Kiara Molecule” is the key component in the Perfect 360 Eye Illuminate and Dark Circle Corrector System.",
    icon: "sparkle",
  },
  {
    title: "Perfect Skin Studio",
    text: "Launched in 2023 as a sister clinic providing medical aesthetic treatments to restore skin health.",
    href: "https://perfectskinstudio.co.uk/",
    icon: "compass",
  },
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M12.5 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SurgeonProfile() {
  return (
    <div className={styles.page}>
      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="surgeon-title">
        <span className={styles.heroGlow} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
              <span className={styles.eyebrow}>Oculoplastic Surgeon &middot; London</span>
              <h1 id="surgeon-title" className={styles.heroTitle}>
                Dr Sabrina Shah-Desai
              </h1>
              <p className={styles.heroCred}>MS, FRCS (Ed) Ophth</p>
              <p className={styles.heroLead}>
                With over two decades of surgical and non-surgical experience, Dr Sabrina
                Shah-Desai is currently considered to be one of the safest, most experienced
                eye and face rejuvenation experts practising in the UK.
              </p>

              <div className={styles.heroActions}>
                <Link
                  href="/contact-cosmetic-eye-surgeon"
                  className="tp-btn tp-btn-primary"
                >
                  Book a Consultation
                  <span className="tp-btn-arrow" aria-hidden="true">
                    <Arrow />
                  </span>
                </Link>
                <Link href="/before-after" className="tp-btn tp-btn-secondary">
                  See Before &amp; After
                </Link>
              </div>
            </div>

            {/* Placeholder-friendly: the tile carries its own gradient, so the
                figure reads as finished even before the portrait loads. */}
            <figure className={styles.heroFigure}>
              <Image
                src="/uploads/2025/12/Dr-Sabrina2-1.png"
                alt="Dr Sabrina Shah-Desai, Consultant Oculoplastic Surgeon"
                fill
                sizes="(min-width: 900px) 42vw, 100vw"
                priority={false}
                loading="eager"
              />
              <figcaption className={styles.heroBadge}>
                <span className={styles.heroBadgeIcon} aria-hidden="true">
                  <TpIcon name="shield" size={18} />
                </span>
                <span>
                  <span className={styles.heroBadgeTitle}>Board-Certified</span>
                  <span className={styles.heroBadgeMeta}>
                    RCS England register of Cosmetic Surgeons
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>

          <ul className={styles.stats}>
            {STATS.map((stat) => (
              <li key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 2. ACCREDITED BY ──────────────────────────────────────────────── */}
      <AccreditedStrip />

      {/* ── 3. NARRATIVE ──────────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.paper}`} aria-labelledby="about-title">
        <div className="container">
          <div className={styles.narrative}>
            <div>
              <span className={styles.eyebrow}>About</span>
              <h2 id="about-title" className={styles.h2}>
                Recognised by peers, trusted by patients
              </h2>
              <div className={styles.prose} style={{ marginTop: 24 }}>
                <p>
                  She is now{" "}
                  <strong>
                    listed on the Royal College of Surgeons of England register of
                    Board-Certified Cosmetic Surgeons.
                  </strong>{" "}
                  This recognition highlights her remarkable proficiency and expertise,
                  strong commitment to high standards, and the trust she has earned from both
                  peers and patients in the aesthetic industry.
                </p>
                <p>
                  Her extensive training, in combination with her caring and empathetic
                  nature, make her a natural choice for patients seeking the very best
                  treatments.
                </p>
                <p>
                  As an Ophthalmologist and Oculoplastic surgeon, Dr Sabrina offers
                  restorative and rejuvenating eyelid surgery for common eyelid mal-positions
                  like ptosis, ectropion, entropion, thyroid eyelid retraction, facial palsy,
                  dry and watery eyes, eyelid lumps and eyelid cancer.
                </p>
                <p>
                  She applies her extensive facial anatomy knowledge and meticulous approach
                  to deliver advanced surgical and non-surgical treatments, using injectables
                  and energy-based devices, and is highly sought after for revisional
                  procedures by those who have undergone previous fillers or eyelid surgeries.
                </p>
              </div>
            </div>

            <blockquote className={styles.pullQuote}>
              <p className={styles.pullQuoteText}>
                &ldquo;Be your own kind of beautiful.&rdquo;
              </p>
              <span className={styles.pullQuoteBy}>Dr Sabrina Shah-Desai</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── 4. SPECIALISMS ────────────────────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.tint}`}
        aria-labelledby="specialisms-title"
      >
        <div className="container">
          <div className={styles.head}>
            <span className={styles.eyebrow}>Areas of practice</span>
            <h2 id="specialisms-title" className={styles.h2}>
              What Dr Sabrina specialises in
            </h2>
          </div>

          <ul className={styles.cards}>
            {SPECIALISMS.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className={styles.card}>
                  <span className={styles.cardIcon} aria-hidden="true">
                    <TpIcon name={item.icon} size={20} />
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.text}</p>
                  <span className={styles.cardMore}>
                    Explore
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 5. PERFECT 360 ────────────────────────────────────────────────── */}
      <section className={styles.journey} aria-labelledby="approach-title">
        <div className={styles.journeyBand}>
          <span className={styles.journeyGlow} aria-hidden="true" />
          <div className="container">
            <div className={styles.journeyHead}>
              <h2 id="approach-title" className={styles.journeyTitle}>
                Revealing timeless beauty: Dr Sabrina&rsquo;s Perfect 360&trade; approach
              </h2>
              <p className={styles.journeyLead}>
                A curated experience built on the belief that treatment should restore and
                respect unique facial features — a holistic, 360-degree approach drawing on
                anatomy, expectations and her intuitive &ldquo;third eye&rdquo;.
              </p>
            </div>
            <JourneyCards steps={PERFECT_360} />
          </div>
        </div>
      </section>

      {/* ── 6. AWARDS ─────────────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.paper}`} aria-labelledby="awards-title">
        <div className="container">
          <div className={styles.head}>
            <span className={styles.eyebrow}>Recognition</span>
            <h2 id="awards-title" className={styles.h2}>
              Awards &amp; industry recognition
            </h2>
            <p className={styles.lead}>
              Consistently recognised in the Tatler Top Doctors Guide as a leading expert in
              eye treatments for six consecutive years, from 2019 to 2026.
            </p>
          </div>

          <ul className={styles.awards}>
            {AWARDS.map((award) => (
              <li key={`${award.name}-${award.year}`} className={styles.award}>
                <span className={styles.awardIcon} aria-hidden="true">
                  <TpIcon name="star" size={18} />
                </span>
                <span>
                  <span className={styles.awardName}>{award.name}</span>
                  <span className={styles.awardBody}>{award.body}</span>
                </span>
                <span className={styles.awardYear}>{award.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 7. TRAINING ───────────────────────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.tint}`}
        aria-labelledby="training-title"
      >
        <div className="container">
          <div className={styles.narrative}>
            <div>
              <span className={styles.eyebrow}>Training</span>
              <h2 id="training-title" className={styles.h2}>
                Global training and experience
              </h2>
              <p className={styles.lead} style={{ marginBottom: 32 }}>
                Four sub-speciality fellowships across the UK&rsquo;s leading eye units,
                following medical training in Bombay.
              </p>

              <ol className={styles.timeline}>
                {TRAINING.map((item) => (
                  <li key={item.year + item.title} className={styles.milestone}>
                    <span className={styles.milestoneYear}>{item.year}</span>
                    <h3 className={styles.milestoneTitle}>{item.title}</h3>
                    {item.text ? <p className={styles.milestoneText}>{item.text}</p> : null}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className={styles.cardTitle} style={{ marginBottom: 16 }}>
                Memberships
              </h3>
              <ul className={styles.chips}>
                {MEMBERSHIPS.map((membership) => (
                  <li key={membership} className={styles.chip}>
                    {membership}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. EDUCATION & LEADERSHIP ─────────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.paper}`}
        aria-labelledby="leadership-title"
      >
        <div className="container">
          <div className={styles.head}>
            <span className={styles.eyebrow}>Education &amp; thought leadership</span>
            <h2 id="leadership-title" className={styles.h2}>
              Teaching the next generation of surgeons
            </h2>
            <p className={styles.lead}>
              A Key Opinion Leader for the aesthetic industry and an invited speaker at
              international conferences, travelling to educate surgeons and practitioners in
              minimally invasive techniques.
            </p>
          </div>

          <ul className={styles.cards}>
            {LEADERSHIP.map((item) => {
              const inner = (
                <>
                  <span className={styles.cardIcon} aria-hidden="true">
                    <TpIcon name={item.icon} size={20} />
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.text}</p>
                  {item.href ? (
                    <span className={styles.cardMore}>
                      Visit
                      <Arrow />
                    </span>
                  ) : null}
                </>
              );
              return (
                <li key={item.title}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.card}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={styles.card}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── 9. PATIENT STORIES ────────────────────────────────────────────── */}
      <PatientStories stories={PATIENT_STORIES} />

      {/* ── 10. BEGIN YOUR JOURNEY ────────────────────────────────────────── */}
      <BeginJourney />

      {/* ── 11. CONTACT ───────────────────────────────────────────────────── */}
      <ContactSection />
    </div>
  );
}
