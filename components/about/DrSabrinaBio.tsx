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

/* Structured blocks that sit under a panel's prose.
   The bio used to be five columns of unbroken paragraphs; the facts inside
   them — awards, conditions, procedures, advisory roles — are lists, so they
   are modelled as data and rendered as scannable cards rather than sentences. */
type Aside =
  | { kind: "awards"; label: string; items: { year: string; text: string }[] }
  | { kind: "facts"; label: string; items: { value: string; text: string }[] }
  | { kind: "cards"; label: string; items: { title: string; text: string }[] }
  | { kind: "chips"; label: string; items: string[] }
  | { kind: "links"; label: string; items: { text: string; href: string }[] }
  | { kind: "ticks"; label: string; items: string[] }
  | { kind: "note"; text: React.ReactNode };

type Panel = {
  id: string;
  tone: "paper" | "cream";
  eyebrow: string;
  /* Split in two so the tail of every panel heading carries the brand accent,
     the way the home page's display type does. */
  heading: { lead: string; accent: string };
  image: string;
  imageAlt: string;
  caption: { title: string; meta: string };
  intro: React.ReactNode;
  asides: Aside[];
};

const PANELS: Panel[] = [
  {
    id: "the-surgeon",
    tone: "paper",
    eyebrow: "The Surgeon",
    heading: { lead: "A trusted name in ", accent: "eye & face surgery." },
    image: "/uploads/2025/09/Sabrina-1.jpg",
    imageAlt: "Dr Sabrina Shah-Desai",
    caption: { title: "Dr Sabrina Shah-Desai", meta: "MS, FRCS (Ed) Ophth" },
    intro: (
      <>
        <p>
          With over two decades of surgical and non-surgical experience, Dr Sabrina Shah-Desai is
          considered one of the safest, most experienced eye and face rejuvenation experts
          practising in the UK. Her extensive training, combined with a caring and empathetic
          nature, makes her a natural choice for patients seeking the very best treatments.
        </p>
        <p>
          She is listed on the{" "}
          <strong>
            Royal College of Surgeons of England register of Board-Certified Cosmetic Surgeons
          </strong>{" "}
          &mdash; recognition of her expertise, her commitment to high standards, and the trust she
          has earned from both peers and patients in the aesthetic industry.
        </p>
      </>
    ),
    asides: [
      {
        kind: "awards",
        label: "Awards & recognition",
        items: [
          {
            year: "2019–2026",
            text: "Tatler Top Doctors Guide — leading expert in eye treatments, six consecutive years",
          },
          {
            year: "2023",
            text: "“Best Aesthetic Doctor” — Safety in Beauty Diamond Award",
          },
          {
            year: "2022",
            text: "“Consultant Surgeon of the Year: Highly Commended” — Aesthetic Awards",
          },
          {
            year: "2021",
            text: "“Consultant Surgeon of the Year” and “Best Surgical Result” — Aesthetic Awards",
          },
          {
            year: "2019",
            text: "“Medical Aesthetic Practitioner: Highly Commended” — MyFaceMyBody",
          },
          {
            year: "2019",
            text: "Voted one of the Global 100 most influential aesthetic practitioners — MyFaceMyBody",
          },
        ],
      },
    ],
  },
  {
    id: "oculoplastic-surgeon",
    tone: "cream",
    eyebrow: "Specialism",
    heading: { lead: "Oculoplastic surgeon and ", accent: "aesthetic practitioner." },
    image: "/uploads/2018/12/sabrina-surgery.jpg",
    imageAlt: "Dr Sabrina Shah-Desai operating in theatre",
    caption: { title: "In theatre", meta: "Restorative & cosmetic eyelid surgery" },
    intro: (
      <>
        <p>
          As an Ophthalmologist and Oculoplastic surgeon, Dr Sabrina offers restorative and
          rejuvenating eyelid surgery for common eyelid mal-positions, applying her extensive facial
          anatomy knowledge and meticulous approach to advanced surgical and non-surgical treatment
          alike &mdash; the latter using injectables and energy-based devices.
        </p>
        <p>
          She is highly sought after for revisional procedures by those who have undergone previous
          fillers or eyelid surgeries.
        </p>
      </>
    ),
    asides: [
      {
        kind: "chips",
        label: "Conditions treated",
        items: [
          "Ptosis",
          "Ectropion",
          "Entropion",
          "Thyroid eyelid retraction",
          "Facial palsy",
          "Dry & watery eyes",
          "Eyelid lumps",
          "Eyelid cancer",
        ],
      },
      {
        kind: "links",
        label: "Specialist procedures",
        items: [
          {
            text: "Eyelid lift surgery (blepharoplasty)",
            href: "/surgical/eyelid-surgery/upper-eyelid-blepharoplasty-uk",
          },
          {
            text: "Scar-less eye bag removal",
            href: "/surgical/eyelid-surgery/eye-bag-removal-blepharoplasty-uk",
          },
          {
            text: "Droopy eyelid correction (ptosis)",
            href: "/surgical/eyelid-surgery/droppy-eye-ptosis-surgery-uk",
          },
          { text: "Direct brow lift", href: "/surgical/browlift-treatment-uk" },
          {
            text: "Revision blepharoplasty",
            href: "/surgical/eyelid-surgery/revision-blepharoplasty-uk",
          },
        ],
      },
    ],
  },
  {
    id: "the-educator",
    tone: "paper",
    eyebrow: "The Educator",
    heading: { lead: "Training ", accent: "the next generation." },
    image: "/uploads/2024/10/10960313_742562962530682_7651293812099969740_o.jpg",
    imageAlt: "Dr Sabrina Shah-Desai teaching in a clinical training setting",
    caption: { title: "Oculo-Facial Aesthetic Academy", meta: "Founded 2016" },
    intro: (
      <>
        <p>
          Passionate about education and safe aesthetic treatments, she founded the{" "}
          <a href="https://facialaesthetictraining.com/" target="_blank" rel="noopener noreferrer">
            Oculo-Facial Aesthetic Academy (OFAA)
          </a>{" "}
          in 2016 to improve training standards in Aesthetic Medicine, where she conducts Cadaveric
          Anatomy and Aesthetic Ultrasonography courses.
        </p>
        <p>
          She helps train budding Oculoplastic surgeons with her UK colleagues at the Manchester
          Oculoplastic Dissection Course and the Coventry Ophthalmic Surgery Cadaver course. A Key
          Opinion Leader for the aesthetic industry, she travels the world as an invited speaker,
          and has authored book chapters and scientific papers published in{" "}
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
    asides: [
      {
        kind: "facts",
        label: "Teaching milestones",
        items: [
          { value: "2016", text: "Founded the Oculo-Facial Aesthetic Academy (OFAA)" },
          {
            value: "2019",
            text: "Highly Commended, Best Independent Aesthetic Training Provider — Sinclair Pharma Aesthetic Award",
          },
          {
            value: "2019",
            text: "Best Independent Training Provider, Safety in Beauty Diamond Awards, for her virtual reality anatomy app",
          },
          {
            value: "2019–22",
            text: "Teaching Professor of Anatomy (facial aesthetics), University of Camerino, Italy",
          },
        ],
      },
    ],
  },
  {
    id: "complications-expert",
    tone: "cream",
    eyebrow: "Safe Practice",
    heading: { lead: "Complications and ", accent: "revision surgery." },
    image: "/uploads/2023/01/International-Recognition.jpg",
    imageAlt: "Dr Sabrina Shah-Desai in theatre, in surgical cap",
    caption: { title: "Referred by her peers", meta: "Filler & surgical complications" },
    intro: (
      <>
        <p>
          Dr Shah-Desai is exceptionally sought-after for her work in complications and revision
          surgery. She is frequently referred to by her peers to manage surgical and filler related
          adverse events, including sight loss.
        </p>
        <p>
          She uses ultrasound to scan the face and dissolve hyaluronic acid filler, and works
          closely with an international group of complication management experts.
        </p>
      </>
    ),
    asides: [
      {
        kind: "ticks",
        label: "Advisory roles",
        items: [
          "CMAC specialist advisory board — UK expert in managing dermal filler complications",
          "IMCAS Academy complication management group — appointed expert",
        ],
      },
      {
        kind: "note",
        text: (
          <>
            <strong>Best Oral Presentation, BOPSS 2010</strong> — for a scientific paper
            describing her innovative technique of restorative eyelid lowering surgery for thyroid
            eye disease.
          </>
        ),
      },
    ],
  },
  {
    id: "the-scientist",
    tone: "paper",
    eyebrow: "The Scientist",
    heading: { lead: "Science-backed skincare for ", accent: "the eye area." },
    image: "/uploads/2026/02/OJV3052_new-1-1.jpg",
    imageAlt: "Dr Sabrina Shah-Desai with the Dr Sabrina skincare range",
    caption: { title: "Dr Sabrina skincare", meta: "Launched 2022" },
    intro: (
      <>
        <p>
          Leveraging her wealth of experience and knowledge over 25 years, Dr Sabrina created the Dr
          Sabrina skincare line, with a vision to provide seamless science-backed solutions for the
          delicate periorbital area around the eyes.
        </p>
        <p>
          Her products address dark circles, puffiness, fine lines and wrinkles, and are formulated
          with clinically proven ingredients backed by independent studies. In 2023 she launched her
          sister clinic{" "}
          <a href="https://perfectskinstudio.co.uk/" target="_blank" rel="noopener noreferrer">
            Perfect Skin Studio
          </a>{" "}
          to provide medical aesthetic treatments that restore skin health.
        </p>
      </>
    ),
    asides: [
      {
        kind: "cards",
        label: "From the range",
        items: [
          {
            title: "Perfect 360 Eye Illuminate",
            text: "Built around her revolutionary patent-pending “Kiara Molecule”.",
          },
          {
            title: "Dark Circle Corrector System",
            text: "The Kiara Molecule is the key component here too.",
          },
          {
            title: "Eye Regenerate LED mask",
            text: "Uses the photons of light to alter biological activity and rejuvenate the skin.",
          },
        ],
      },
    ],
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

/* Lifted out of the specialism panel's closing paragraph, where six society
   names ran together as one unreadable sentence. */
const MEMBERSHIPS: string[] = [
  "British Oculoplastic Surgery Society (BOPSS)",
  "The Royal College of Surgeons (Ed)",
  "The Royal College of Ophthalmologists",
  "British Association of Plastic Reconstructive and Aesthetic Surgeons (BAPRAS) — inter-specialty member",
  "Association of Plastic and Reconstructive Surgeons of Southern Africa (APRASSA) — honorary member",
  "South African Society of Dermatological Surgery (SASDS) — honorary member",
];

/* Credibility figures, all drawn from the copy in PANELS and TRAINING above. */
const STATS = [
  { value: "25+", label: "Years of surgical and non-surgical experience" },
  { value: "6×", label: "Tatler Top Doctors Guide, 2019–2026" },
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
    text: "Results that are both natural and remarkable — “be your own kind of beautiful”.",
  },
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M12.5 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AsideBlock({ aside }: { aside: Aside }) {
  if (aside.kind === "note") {
    return (
      <p className={styles.note}>
        <span className={styles.noteIcon} aria-hidden="true">
          <TpIcon name="star" size={16} />
        </span>
        <span>{aside.text}</span>
      </p>
    );
  }

  return (
    <div className={styles.aside}>
      <h3 className={styles.asideLabel}>{aside.label}</h3>

      {aside.kind === "awards" && (
        <ul className={styles.awards}>
          {aside.items.map((item) => (
            <li key={item.text} className={styles.award}>
              <span className={styles.awardYear}>{item.year}</span>
              <span className={styles.awardText}>{item.text}</span>
            </li>
          ))}
        </ul>
      )}

      {aside.kind === "facts" && (
        <ul className={styles.facts}>
          {aside.items.map((item) => (
            <li key={item.text} className={styles.fact}>
              <span className={styles.factValue}>{item.value}</span>
              <span className={styles.factText}>{item.text}</span>
            </li>
          ))}
        </ul>
      )}

      {aside.kind === "cards" && (
        <ul className={styles.miniCards}>
          {aside.items.map((item) => (
            <li key={item.title} className={styles.miniCard}>
              <span className={styles.miniCardIcon} aria-hidden="true">
                <TpIcon name="sparkle" size={16} />
              </span>
              <span>
                <span className={styles.miniCardTitle}>{item.title}</span>
                <span className={styles.miniCardText}>{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {aside.kind === "chips" && (
        <ul className={styles.chips}>
          {aside.items.map((item) => (
            <li key={item} className={styles.chip}>
              {item}
            </li>
          ))}
        </ul>
      )}

      {aside.kind === "links" && (
        <ul className={styles.links}>
          {aside.items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.linkCard}>
                <span>{item.text}</span>
                <span className={styles.linkArrow} aria-hidden="true">
                  <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {aside.kind === "ticks" && (
        <ul className={styles.ticks}>
          {aside.items.map((item) => (
            <li key={item} className={styles.tick}>
              <span className={styles.tickIcon} aria-hidden="true">
                <TpIcon name="check" size={13} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
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
            <div className={styles.heroBody}>
              <span className={styles.eyebrow}>Surgeon, Educator &amp; Scientist</span>
              <h1 id="bio-title" className={styles.heroTitle}>
                Dr Sabrina Shah-Desai
              </h1>
              <p className={styles.heroCred}>MS, FRCS (Ed) Ophth.</p>
              <span className={styles.rule} aria-hidden="true" />
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
                  <span className={styles.heroBadgeMeta}>Eight consecutive years, 2019&ndash;2026</span>
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
                  sizes="(min-width: 1000px) 46vw, 100vw"
                  className={styles.figureImg}
                />
                <span className={styles.figureScrim} aria-hidden="true" />
                <figcaption className={styles.figureCaption}>
                  <span className={styles.figureCaptionTitle}>{panel.caption.title}</span>
                  <span className={styles.figureCaptionMeta}>{panel.caption.meta}</span>
                </figcaption>
              </figure>

              <div className={styles.prose}>
                <span className={styles.eyebrow}>{panel.eyebrow}</span>
                <h2 id={`${panel.id}-heading`} className={styles.h2}>
                  {panel.heading.lead}
                  <span className={styles.h2Accent}>{panel.heading.accent}</span>
                </h2>
                <span className={styles.rule} aria-hidden="true" />
                <div className={styles.proseBody}>{panel.intro}</div>
                {panel.asides.map((aside, i) => (
                  <AsideBlock key={i} aside={aside} />
                ))}
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
            <span className={`${styles.eyebrow} ${styles.eyebrowLight}`}>Her Approach</span>
            <h2 id="approach-title" className={styles.journeyTitle}>
              Revealing timeless beauty: Dr Sabrina&rsquo;s Perfect 360&trade; approach
            </h2>
            <p className={styles.journeyLead}>
              A curated experience built on the belief that treatment should restore and
              respect unique facial features &mdash; a holistic, 360-degree approach drawing on
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
              Global training and <span className={styles.h2Accent}>experience</span>
            </h2>
            <span className={`${styles.rule} ${styles.ruleCenter}`} aria-hidden="true" />
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

          <div className={styles.memberships}>
            <h3 className={styles.membershipsLabel}>Professional memberships</h3>
            <ul className={styles.membershipList}>
              {MEMBERSHIPS.map((item) => (
                <li key={item} className={styles.membership}>
                  <span className={styles.tickIcon} aria-hidden="true">
                    <TpIcon name="check" size={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Rated five stars ─────────────────────────────────────────────── */}
      <PatientStories stories={PATIENT_STORIES} />

      {faq?.length ? <TreatmentFAQ faq={faq} title="Dr Sabrina Shah-Desai" /> : null}

      {/* ── Begin your Perfect Eyes and Skin journey ─────────────────────── */}
      <BeginJourney />

      {/* ── Contact our clinic ───────────────────────────────────────────── */}
      <ContactSection />
    </div>
  );
}
