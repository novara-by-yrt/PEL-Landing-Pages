import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/home/ContactSection";
import JourneyCards, { type JourneyStep } from "@/components/home/JourneyCards";
import PatientStories from "@/components/home/PatientStories";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import BeginJourney from "@/components/shared/BeginJourney";
import { TpIcon } from "@/components/treatment/TpIcon";
import { TreatmentFAQ } from "@/components/treatment/TreatmentFAQ";
import type { BreadcrumbItem } from "@/components/treatment/types";
import type { FaqItem } from "@/lib/mdx";
import { PATIENT_STORIES } from "@/lib/reviews";
import styles from "./DrSabrinaBio.module.css";

type Panel = {
  id: string;
  tone: "paper" | "cream" | "fog";
  reverse?: boolean;
  eyebrow: string;
  heading: string;
  image: string;
  imageAlt: string;
  body: React.ReactNode;
};

const PANELS: Panel[] = [
  {
    id: "the-surgeon",
    tone: "paper",
    eyebrow: "The Surgeon",
    heading: "A Trusted Name in Eye & Face Surgery",
    image: "/uploads/2025/09/Sabrina-1.jpg",
    imageAlt: "Dr Sabrina Shah-Desai",
    body: (
      <>
        <p>
          With over two decades of surgical and non-surgical experience, Dr Sabrina Shah-Desai is
          currently considered to be one of the safest, most experienced eye and face rejuvenation
          experts practising in the UK.
        </p>
        <p>
          She is now listed on the{" "}
          <strong>Royal College of Surgeons of England register of Board-Certified Cosmetic Surgeons</strong>.
          This recognition highlights her remarkable proficiency &amp; expertise, strong commitment to
          high standards, and the trust she has earned from both peers and patients in the aesthetic
          industry.
        </p>
        <p>
          Her extensive training, in combination with her caring and empathetic nature, make her a
          natural choice for patients seeking the very best treatments.
        </p>
        <p>
          For this reason, Dr Sabrina has been consistently recognised in the Tatler Top Doctors
          Guide as a leading expert in eye treatments for six consecutive years, from 2019 to 2026.
          She is the recipient of several prestigious awards, including:
        </p>
        <ul>
          <li>&ldquo;Best Aesthetic Doctor&rdquo; &ndash; Safety in Beauty Diamond Award 2023</li>
          <li>&ldquo;Consultant Surgeon of the Year: Highly Commended&rdquo; &ndash; Aesthetic Awards 2022</li>
          <li>&ldquo;Consultant Surgeon of the Year&rdquo; &ndash; Aesthetic Awards 2021</li>
          <li>&ldquo;Best Surgical Result&rdquo; &ndash; Aesthetic Awards 2021</li>
          <li>&ldquo;Medical Aesthetic Practitioner: Highly Commended&rdquo; &ndash; MyFaceMyBody 2019</li>
          <li>Voted one of the Global 100 most influential aesthetic practitioners &ndash; MyFaceMyBody 2019</li>
        </ul>
      </>
    ),
  },
  {
    id: "oculoplastic-surgeon",
    tone: "cream",
    reverse: true,
    eyebrow: "Specialism",
    heading: "Oculoplastic Surgeon & Aesthetic Practitioner",
    image: "/uploads/2018/12/sabrina-surgery.jpg",
    imageAlt: "Dr Sabrina Shah-Desai operating in theatre",
    body: (
      <>
        <p>
          As an Ophthalmologist and Oculoplastic surgeon, Dr Sabrina offers restorative and
          rejuvenating eyelid surgery for common eyelid mal-positions like ptosis, ectropion,
          entropion, thyroid eyelid retraction, facial palsy, dry and watery eyes, eyelid lumps and
          eyelid cancer.
        </p>
        <p>
          She specialises in{" "}
          <Link href="/surgical/eyelid-surgery/upper-eyelid-blepharoplasty-uk">
            eyelid lift surgery (blepharoplasty)
          </Link>
          , scar-less{" "}
          <Link href="/surgical/eyelid-surgery/eye-bag-removal-blepharoplasty-uk">
            eye bag removal (lower lid blepharoplasty)
          </Link>
          ,{" "}
          <Link href="/surgical/eyelid-surgery/droppy-eye-ptosis-surgery-uk">
            droopy eyelid correction (ptosis)
          </Link>{" "}
          and direct brow lifts.
        </p>
        <p>
          She applies her extensive facial anatomy knowledge and meticulous approach to deliver
          advanced surgical and non-surgical treatments (using injectables and energy-based devices).
        </p>
        <p>
          She is highly sought after for revisional procedures by those who have undergone previous
          fillers or eyelid surgeries.
        </p>
        <p>
          Dr Sabrina Shah-Desai is a member of the British Oculo Plastic Surgery Society (BOPSS), The
          Royal College of Surgeons (Ed), The Royal College of Ophthalmologists, Inter specialty
          member of British Association of Plastic Reconstructive and Aesthetic Surgeons (BAPRAS),
          honorary member of The Association of Plastic and Reconstructive Surgeons of Southern
          Africa (APRASSA) &amp; South African Society of Dermatological Surgery (SASDS).
        </p>
      </>
    ),
  },
  {
    id: "the-educator",
    tone: "paper",
    eyebrow: "The Educator",
    heading: "Training the Next Generation",
    image: "/uploads/2024/10/10960313_742562962530682_7651293812099969740_o.jpg",
    imageAlt: "Dr Sabrina Shah-Desai teaching in a clinical training setting",
    body: (
      <>
        <p>
          Passionate about education and safe aesthetic treatments, she founded the{" "}
          <a href="https://facialaesthetictraining.com/" target="_blank" rel="noopener noreferrer">
            Oculo-Facial Aesthetic Academy (OFAA)
          </a>{" "}
          in 2016, to improve training standards in Aesthetic Medicine.
        </p>
        <p>
          She conducts Cadaveric Anatomy and Aesthetic Ultrasonography courses, and in 2019 her
          training company, OFAA, received The Sinclair Pharma Highly Commended Aesthetic Award for
          Best Independent Aesthetic Training Provider, and also won &ldquo;Best Independent Training
          Provider&rdquo; at the Safety in Beauty Diamond Awards for her virtual reality anatomy app.
        </p>
        <p>
          She helps train budding Oculoplastic surgeons with her UK colleagues at the Manchester
          Oculoplastic Dissection Course and the Coventry Ophthalmic Surgery Cadaver course.
        </p>
        <p>
          She was appointed a teaching Professor of Anatomy (facial aesthetics) at the University of
          Camerino, Italy from 2019&ndash;2022.
        </p>
        <p>
          She is a Key Opinion Leader for the Aesthetic Industry &amp; an invited speaker at
          international conferences, and travels the world educating surgeons &amp; aesthetic
          practitioners in her innovative, minimally invasive and state of the art techniques.
        </p>
        <p>
          She has authored book chapters and many scientific papers, and her research is published
          in{" "}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/?term=shah-desai"
            target="_blank"
            rel="noopener noreferrer"
          >
            peer reviewed medical journals and textbooks
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "complications-expert",
    tone: "cream",
    reverse: true,
    eyebrow: "Safe Practice",
    heading: "Complications Expert",
    image: "/uploads/2023/01/International-Recognition.jpg",
    imageAlt: "Dr Sabrina Shah-Desai in theatre, in surgical cap",
    body: (
      <>
        <p>
          Dr Shah-Desai is exceptionally sought-after for her work in complications and Revision
          Surgery. She is frequently referred to by her peers to manage surgical and filler related
          adverse events, including sight loss.
        </p>
        <p>
          She uses ultrasound to scan the face and dissolve hyaluronic acid filler, and works closely
          with an international group of complication management experts. She is on the CMAC
          specialist advisory board in her capacity as a UK expert in managing dermal filler
          complications, and serves as an expert for the IMCAS academy complication management group.
        </p>
        <p>
          In 2010, Dr Sabrina won the Best Oral Presentation at BOPSS (British Oculoplastic Surgery
          Society) for a scientific paper describing her innovative technique of restorative eyelid
          lowering surgery for thyroid eye disease.
        </p>
      </>
    ),
  },
  {
    id: "the-scientist",
    tone: "paper",
    eyebrow: "The Scientist",
    heading: "In 2022, Dr Sabrina Launched Her Periorbital Skincare",
    image: "/uploads/2026/02/OJV3052_new-1-1.jpg",
    imageAlt: "Dr Sabrina Shah-Desai with the Dr Sabrina skincare range",
    body: (
      <>
        <p>
          Her vision is to provide seamless science-backed solutions for the delicate periorbital
          area around the eyes. Leveraging her wealth of experience and knowledge over 25 years, she
          created the Dr Sabrina skincare line.
        </p>
        <p>
          Her products address dark circles, puffiness, fine lines and wrinkles, and are formulated
          with clinically proven ingredients and backed by independent studies. Her revolutionary
          patent-pending &ldquo;Kiara Molecule&rdquo; is the key component in the Perfect 360 Eye
          Illuminate and the Dark Circle Corrector System.
        </p>
        <p>
          Her &ldquo;Eye Regenerate LED mask&rdquo; uses the photons of light to alter biological
          activity and rejuvenate the skin. In 2023, she launched her sister clinic{" "}
          <a href="https://perfectskinstudio.co.uk/" target="_blank" rel="noopener noreferrer">
            Perfect Skin Studio
          </a>{" "}
          to provide medical aesthetic treatments to restore skin health.
        </p>
      </>
    ),
  },
];

const TRAINING: { meta: string; title: string; text: string }[] = [
  {
    meta: "1994",
    title: "Sir JJ Group of Hospitals, Bombay University",
    text: "Undertook her training at the prestigious Sir JJ Group of Hospitals at Bombay University, graduating in 1994, before travelling to the UK to complete four sub-speciality fellowships.",
  },
  {
    meta: "1996–1998",
    title: "Queen Victoria Hospital, East Grinstead",
    text: "Fellowship in Cornea & Oculoplastics, developing extensive expertise in managing periocular trauma, chemical burns and ocular surface disease, followed by a joint oculoplastic fellowship at Salisbury & Southampton Eye Units (1998).",
  },
  {
    meta: "2000–2009",
    title: "Moorfields Eye Hospital & Chelsea and Westminster",
    text: "Adnexal fellowship at the prestigious Moorfields Eye Hospital (2000–2001), and a secondment fellowship at the multidisciplinary craniofacial unit at Chelsea & Westminster Hospital (2009), specialising in plastic surgery techniques relating to the eye and the face.",
  },
  {
    meta: "2003–2015",
    title: "Moorfields Eye Hospital & BHRUT Hospitals",
    text: "Worked as an Associate Specialist in the Adnexal unit at Moorfields Eye Hospital for a period of 7 years, then as a Consultant at BHRUT hospitals from 2010 to 2015.",
  },
  {
    meta: "2012",
    title: "Clinical Excellence Award",
    text: "Received a Clinical Excellence Award by her NHS Trust for her contributions to improving patient care.",
  },
  {
    meta: "2013",
    title: "MOHS Micrographic Cancer Service, Essex",
    text: "Set up a local MOHS Micrographic Cancer Service in Essex, to ensure NHS patients had local access to NICE-recommended treatment for eyelid skin cancers.",
  },
];


/* Credibility figures, all drawn from the copy in PANELS and TRAINING above. */
const STATS = [
  { value: "25+", label: "Years of surgical and non-surgical experience" },
  { value: "6\u00d7", label: "Tatler Top Doctors Guide, 2019\u20132026" },
  { value: "4", label: "Sub-speciality fellowships completed in the UK" },
  { value: "RCS", label: "England register of Board-Certified Cosmetic Surgeons" },
];

/* The Perfect 360 philosophy, broken out of one dense paragraph into the
   four beats it already describes. */
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
    text: "Results that are both natural and remarkable \u2014 \u201cbe your own kind of beautiful\u201d.",
  },
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M12.5 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DrSabrinaBio({
  breadcrumbItems,
  siteUrl,
  faq,
}: {
  breadcrumbItems: BreadcrumbItem[];
  siteUrl: string;
  faq?: FaqItem[];
}) {
  void breadcrumbItems;
  void siteUrl;

  return (
    <div className={styles.page}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="bio-title">
        <span className={styles.heroGlow} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
              <span className={styles.eyebrow}>Surgeon, Educator &amp; Scientist</span>
              <h1 id="bio-title" className={styles.heroTitle}>
                Dr Sabrina Shah-Desai
              </h1>
              <p className={styles.heroCred}>MS, FRCS (Ed) Ophth.</p>
              <p className={styles.heroLead}>
                Multi-award-winning Oculoplastic Reconstructive Surgeon and Aesthetic
                Practitioner, and one of the safest, most experienced eye and face
                rejuvenation experts practising in the UK.
              </p>
              <div className={styles.heroActions}>
                <Link href="/contact-cosmetic-eye-surgeon" className="tp-btn tp-btn-primary">
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

            <figure className={styles.heroFigure}>
              <Image
                src="/uploads/2024/10/A59Z5738ggcopy-1.jpg"
                alt="Dr Sabrina Shah-Desai, Consultant Oculoplastic Surgeon, in her clinic"
                fill
                sizes="(min-width: 900px) 44vw, 100vw"
                loading="eager"
                className={styles.heroImg}
              />
              <figcaption className={styles.heroBadge}>
                <span className={styles.heroBadgeIcon} aria-hidden="true">
                  <TpIcon name="shield" size={18} />
                </span>
                <span>
                  <span className={styles.heroBadgeTitle}>Top practitioner for eyes</span>
                  <span className={styles.heroBadgeMeta}>Eight consecutive years, 2019\u20132026</span>
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

      {/* ── Accredited & recognised by ───────────────────────────────────── */}
      <AccreditedStrip />

      {/* ── Alternating narrative panels ─────────────────────────────────── */}
      {PANELS.map((panel, index) => (
        <section
          key={panel.id}
          id={panel.id}
          className={`${styles.section} ${styles[panel.tone]}`}
          aria-labelledby={`${panel.id}-heading`}
        >
          <div className="container">
            <div className={`${styles.split} ${index % 2 === 1 ? styles.reverse : ""}`}>
              <figure className={styles.figure}>
                <Image
                  src={panel.image}
                  alt={panel.imageAlt}
                  fill
                  sizes="(min-width: 900px) 46vw, 100vw"
                  className={styles.figureImg}
                />
              </figure>

              <div className={styles.prose}>
                <span className={styles.eyebrow}>{panel.eyebrow}</span>
                <h2 id={`${panel.id}-heading`} className={styles.h2}>
                  {panel.heading}
                </h2>
                <div className={styles.proseBody}>{panel.body}</div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Perfect 360 ──────────────────────────────────────────────────── */}
      <section className={styles.journey} aria-labelledby="approach-title">
        <span className={styles.journeyGlow} aria-hidden="true" />
        <div className="container">
          <div className={styles.journeyHead}>
            <h2 id="approach-title" className={styles.journeyTitle}>
              Revealing timeless beauty: Dr Sabrina&rsquo;s Perfect 360&trade; approach
            </h2>
            <p className={styles.journeyLead}>
              A curated experience built on the belief that treatment should restore and
              respect unique facial features \u2014 a holistic, 360-degree approach drawing on
              anatomy, expectations and her intuitive &ldquo;third eye&rdquo;.
            </p>
          </div>
          <JourneyCards steps={PERFECT_360} />
        </div>
      </section>

      {/* ── Training timeline ────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.tint}`} aria-labelledby="training-title">
        <div className="container">
          <div className={styles.head}>
            <span className={styles.eyebrow}>Training</span>
            <h2 id="training-title" className={styles.h2}>
              Global training and experience
            </h2>
            <p className={styles.lead}>
              Four sub-speciality fellowships across the UK&rsquo;s leading eye units,
              following medical training in Bombay.
            </p>
          </div>

          <ol className={styles.timeline}>
            {TRAINING.map((item) => (
              <li key={item.title} className={styles.milestone}>
                <span className={styles.milestoneYear}>{item.meta}</span>
                <h3 className={styles.milestoneTitle}>{item.title}</h3>
                <p className={styles.milestoneText}>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Rated five stars ─────────────────────────────────────────────── */}
      <PatientStories stories={PATIENT_STORIES} />

      {faq?.length ? <TreatmentFAQ faq={faq} title="Dr Sabrina Shah-Desai" /> : null}

      {/* ── Begin your Perfect Eyes journey ──────────────────────────────── */}
      <BeginJourney />

      {/* ── Contact our clinic ───────────────────────────────────────────── */}
      <ContactSection />
    </div>
  );
}
