import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/home/ContactSection";
import HomeFaq, { type HomeFaqItem } from "@/components/home/HomeFaq";
import PatientStories from "@/components/home/PatientStories";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import BeginJourney from "@/components/shared/BeginJourney";
import GoogleMark from "@/components/shared/GoogleMark";
import MeetDrSabrina from "@/components/shared/MeetDrSabrina";
import Reveal from "@/components/shared/Reveal";
import { TpIcon } from "@/components/treatment/TpIcon";
import { CLINIC } from "@/lib/clinic";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import styles from "./page.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export const metadata: Metadata = {
  title: "International Patients - Travelling to London for Treatment",
  description:
    "Patients fly in from over 60 countries for eyelid and periocular surgery with Dr Sabrina Shah-Desai on Harley Street. How to plan the trip and stay.",
  alternates: { canonical: `${SITE_URL}/international-patients` },
  openGraph: {
    url: `${SITE_URL}/international-patients`,
    type: "website",
    title: "International Patients - Travelling to London for Treatment",
    description:
      "How patients travelling from abroad plan treatment with Dr Sabrina Shah-Desai at 121 Harley Street, London.",
    images: [DEFAULT_OG_IMAGE],
  },
};

/* Every claim below is drawn from something the site already states elsewhere
   - the surgeon profile, the Perfect360 patient journey sheet, the contact
   page and the clinic record in lib/clinic.ts - and rewritten rather than
   copied. Nothing here promises a service the site does not document: no
   visa letters, no transfers, no accommodation, no remote consulting. */

const REASONS = [
  {
    icon: "eye",
    title: "A narrow specialism, not a general one",
    body: "Dr Shah-Desai is an oculoplastic reconstructive surgeon - her work is confined to the eyelids and the area around the eyes, rather than spread across the whole body. Patients travel precisely because that focus is hard to find close to home.",
  },
  {
    icon: "shield",
    title: "Credentials that travel well",
    body: "MS, FRCS (Ed) Ophth, and listed on the Royal College of Surgeons of England register of board-certified cosmetic surgeons - a public record anyone can check from anywhere before booking a flight.",
  },
  {
    icon: "star",
    title: "Recognised eight years running",
    body: "Named a top practitioner for eyes for eight consecutive years, from 2019 to 2026, alongside more than twenty-five years of surgical and non-surgical practice.",
  },
  {
    icon: "clipboard",
    title: "A second opinion worth the flight",
    body: "A large share of the overseas caseload is revision work - correcting earlier eyelid surgery, or dissolving and repairing migrated filler placed elsewhere. Second opinions are seen at a separate consultation rate.",
  },
];

/* The surgical pathway from the clinic's Perfect360 journey sheet, retold from
   the point of view of somebody booking flights around it. */
const ITINERARY = [
  {
    icon: "phone",
    step: "Before you fly",
    title: "Get in touch and agree dates",
    body: "Enquiries come in by telephone or email and are answered by the team between 9:30am and 6:00pm London time, Monday to Friday. Appointments are arranged from there.",
  },
  {
    icon: "clipboard",
    step: "Visit one",
    title: "Your first consultation",
    body: "An appointment at 121 Harley Street covering assessment, diagnosis and a plan. You leave with a written consultation letter setting out what has been recommended and why.",
  },
  {
    icon: "calendar",
    step: "Visit two",
    title: "Planning and consent",
    body: "Where surgery is the agreed route, a second appointment finalises the plan and takes consent. How this sits alongside your travel dates is worked out with the team, case by case.",
  },
  {
    icon: "pulse",
    step: "The procedure",
    title: "Surgery, as a day case",
    body: "The eyelid procedures described across this site are carried out as day cases, so there is no overnight hospital stay to build into your itinerary. Your own procedure is confirmed at consultation.",
  },
  {
    icon: "clock",
    step: "Six to seven days later",
    title: "The review that sets your return date",
    body: "Your wounds are checked and any sutures removed roughly a week after surgery. This appointment is the one to plan your stay around - book your flight home for after it, not before.",
  },
  {
    icon: "compass",
    step: "Three to four months later",
    title: "The healing review",
    body: "A further review between twelve and sixteen weeks looks at how everything has settled, with clinical photography and a proper look at the outcome. Timing is agreed with the team around your travel.",
  },
];

/* Verbatim in substance, reworded in expression, from the consultation list on
   the Perfect360 patient journey. */
const CONSULTATION_COVERS = [
  "A full assessment of the face and the area around the eyes",
  "Your medical history, and clinical photography for the record",
  "A diagnosis - named, and explained in plain terms",
  "Recommendations shaped around what you have come for",
  "A written letter afterwards, setting out the agreed plan",
];

const NOTES: HomeFaqItem[] = [
  {
    question: "How long should I plan to be in London?",
    answer:
      "Long enough to reach the six-to-seven-day review after surgery, since that is when wounds are checked and sutures come out. The exact length depends on the procedure and is confirmed at your consultation - please do not book non-refundable travel before then.",
  },
  {
    question: "Can the whole thing be done in a single trip?",
    answer:
      "Often, but not always. The surgical route includes a separate planning-and-consent appointment before the operation itself, and whether that can sit in the same visit depends on the procedure and on your own circumstances. It is one of the first things the team will talk through with you.",
  },
  {
    question: "Are consultations free?",
    answer:
      "No. Dr Shah-Desai does not offer free consultations, and the fee is the same whether you have flown in or walked round the corner. The current rates are set out above.",
  },
  {
    question: "What happens once I have flown home?",
    answer:
      "The twelve-to-sixteen-week review remains part of the plan, and arrangements for it are agreed with the team rather than left to chance. If you are one of our private patients and need urgent advice out of hours, you will already have the emergency number from your correspondence.",
  },
];

export default function InternationalPatientsPage() {
  return (
    <div className={styles.page}>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="intl-title">
        <span className={styles.heroGlow} aria-hidden="true" />

        <div className="container">
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">International patients</span>
          </nav>

          <span className={styles.eyebrow}>Patients who travel to us</span>
          <h1 id="intl-title" className={styles.heroTitle}>
            Flying in for treatment with Dr Sabrina
          </h1>
          <p className={styles.heroLead}>
            People come to Harley Street from every continent for eyelid and periocular
            surgery - some for a first procedure, many more to have earlier work put right.
            This page explains how a trip is put together and what to plan around.
          </p>

          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt className={styles.statLabel}>Countries</dt>
              <dd className={styles.statValue}>60+</dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statLabel}>International patients</dt>
              <dd className={styles.statValue}>1,000+</dd>
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

          <div className={styles.heroActions}>
            {/* Inverse and outline-light, not the light-background pair - the
                hero is a dark band, so the indigo primary would sink into it. */}
            <Link href="/contact-cosmetic-eye-surgeon" className="tp-btn tp-btn-inverse">
              Book a Consultation
            </Link>
            <a href={`mailto:${CLINIC.email}`} className="tp-btn tp-btn-outline-light">
              Email the team
            </a>
          </div>
        </div>
      </section>

      <Reveal>
        <AccreditedStrip />
      </Reveal>

      {/* ── Why patients travel ────────────────────────────────────────── */}
      <section className={styles.section} aria-labelledby="why-title">
        <div className="container">
          <Reveal>
            <div className={styles.head}>
              <span className={styles.sectionEyebrow}>Why the journey</span>
              <h2 id="why-title" className={styles.h2}>
                What people are getting on a plane for
              </h2>
              <span className={styles.rule} aria-hidden="true" />
            </div>
          </Reveal>

          <ul className={styles.cardGrid}>
            {REASONS.map((reason, index) => (
              <li key={reason.title} className={styles.cardItem}>
                <Reveal delay={index * 70}>
                  <article className={styles.card}>
                    <span className={styles.cardIcon} aria-hidden="true">
                      <TpIcon name={reason.icon} size={20} />
                    </span>
                    <h3 className={styles.cardTitle}>{reason.title}</h3>
                    <p className={styles.cardText}>{reason.body}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Itinerary ──────────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.tint}`} aria-labelledby="plan-title">
        <div className="container">
          <Reveal>
            <div className={styles.head}>
              <span className={styles.sectionEyebrow}>Planning the trip</span>
              <h2 id="plan-title" className={styles.h2}>
                From first email to final review
              </h2>
              <p className={styles.lead}>
                The clinic&apos;s surgical pathway, laid out in the order you would meet it
                with a suitcase in hand.
              </p>
              <span className={styles.rule} aria-hidden="true" />
            </div>
          </Reveal>

          <ol className={styles.timeline}>
            {ITINERARY.map((item, index) => (
              <li key={item.title} className={styles.timelineItem}>
                <Reveal delay={index * 60}>
                  <div className={styles.timelineCard}>
                    <span className={styles.timelineIcon} aria-hidden="true">
                      <TpIcon name={item.icon} size={18} />
                    </span>
                    <p className={styles.timelineStep}>{item.step}</p>
                    <h3 className={styles.timelineTitle}>{item.title}</h3>
                    <p className={styles.cardText}>{item.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Consultation contents + practicalities ─────────────────────── */}
      <section className={styles.section} aria-labelledby="covers-title">
        <div className="container">
          <Reveal>
            <div className={styles.head}>
              <span className={styles.sectionEyebrow}>Your first appointment</span>
              <h2 id="covers-title" className={styles.h2}>
                What the consultation covers
              </h2>
              <p className={styles.lead}>
                One appointment, and you leave with a diagnosis, a plan and it all in
                writing - not a brochure and a follow-up call.
              </p>
              <span className={styles.rule} aria-hidden="true" />
            </div>
          </Reveal>

          {/* The fees-and-contact card that used to sit beside this list is
              gone: BeginJourney already prints the same fee table lower down,
              and ContactSection the same address, phone, email and hours below
              that. With the column freed, the five items run as a stepped
              rail - one row across on a wide screen, one column with the rail
              turned vertical below 1000px. */}
          <Reveal delay={70}>
            <div className={styles.coversPanel}>
              <ol className={styles.checkList}>
                {CONSULTATION_COVERS.map((item, index) => (
                  <li key={item} className={styles.checkItem}>
                    {/* Decoration: the list is a real <ol>, so the number is
                        already conveyed without being read out twice. */}
                    <span className={styles.checkMarker} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className={styles.checkText}>{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal>
        <MeetDrSabrina
          id="surgeon"
          title="The surgeon you are travelling to see"
        />
      </Reveal>

      {/* ── Planning notes ───────────────────────────────────────────────
          The home page's own FAQ component, not a copy of its look. It
          already takes the eyebrow, title, lead and a footer slot, so this
          section is identical to the home page's by construction and stays
          that way if that design ever changes. */}
      <Reveal>
        <HomeFaq
          items={NOTES}
          eyebrow="Before you book"
          title="Questions people ask from abroad"
          lead="The four that come up in almost every enquiry from overseas. Anything they do not answer, ask us directly - we would rather you asked before booking a flight than after."
          footer={
            <a href={`mailto:${CLINIC.email}`} className="tp-btn tp-btn-secondary">
              Email the team
            </a>
          }
        />
      </Reveal>

      <PatientStories />
      <BeginJourney />
      <ContactSection />
    </div>
  );
}
