import Link from "next/link";
import ContactSection from "@/components/home/ContactSection";
import { PageHero } from "@/components/treatment/PageHero";
import { TpIcon } from "@/components/treatment/TpIcon";
import { TreatmentCTA } from "@/components/treatment/TreatmentCTA";
import type { BreadcrumbItem } from "@/components/treatment/types";
import { TeamGrid, type Member } from "./TeamGrid";
import styles from "./TeamRoster.module.css";

const PRACTITIONERS: Member[] = [
  {
    id: "sabrina",
    name: "Dr Sabrina Shah-Desai",
    role: "Board Certified Cosmetic Oculoplastic Surgeon",
    /* The same portrait the home page's team carousel and About section use,
       so she looks consistent everywhere she appears. */
    image: "/dr-sabrina-profile.png",
    bio: "Dr Sabrina Shah-Desai, MS, FRCS (Ed) Ophth, is a multi-award-winning Oculoplastic Reconstructive Surgeon and Aesthetic Practitioner specialising in reconstructive, revisional and cosmetic surgery of the eyelids, alongside non-surgical treatments for the eyes and face. With over 25 years of experience, she is globally recognised for her pioneering, minimally invasive techniques and is known as the “go-to” surgeon for discerning patients seeking subtle, natural results.",
    tags: [
      "MS, FRCS (Ed) Ophth",
      "Board-Certified Cosmetic Surgeon, RCS England",
      "Top practitioner for eyes, 2019–2026",
      "Upper & lower lid blepharoplasty",
      "Revision eyelid surgery",
      "Ptosis & thyroid eye surgery",
      "Advanced periocular rejuvenation",
    ],
    fact: null,
    bookable: true,
    quote:
      "My philosophy has always been the same — listen first, plan carefully, treat with precision, and never do more than is needed. The best result is the one that looks entirely like you.",
  },
  {
    id: "janine",
    name: "Dr Janine",
    role: "Dentist & Aesthetic Practitioner",
    image: "/dr-janine.png",
    bio: "Dr Janine Rothburn is an advanced Aesthetic Practitioner and Dental Surgeon, practising aesthetics since 2018 and part of the Harley Street team since 2021. She takes a holistic and artistic approach, focusing on natural, balanced results that enhance facial harmony while maintaining subtlety and precision in every treatment.",
    tags: [
      "Advanced facial assessment & injectables",
      "Facial ultrasonography & vascular mapping",
      "Harley Academy mentor since 2020",
      "Perioral rejuvenation",
      "Wrinkle-relaxing & dermal fillers",
      "Biostimulators & polynucleotides",
      "Sofwave ultrasound lifting & tightening",
    ],
    fact: null,
    bookable: true,
    quote:
      "Aesthetics should never announce itself. I plan every treatment around facial harmony, so the result reads as balance rather than intervention.",
  },
  {
    id: "hemmali",
    name: "Dr Hemmali",
    role: "Dentist & Aesthetic Practitioner",
    image: "/dr-hemmali.png",
    bio: "Dr Hemmali Patel is a qualified dental professional and aesthetic practitioner, focused on delivering natural and well-balanced non-surgical results. She adopts a personalised approach, ensuring each treatment enhances facial features while maintaining harmony and subtle, refined outcomes.",
    tags: [
      "Strong understanding of facial anatomy",
      "Advanced training in facial aesthetics",
      "Wrinkle-relaxing injections",
      "Dermal fillers for contouring & sculpting",
      "Chin, cheek & lip enhancement",
      "Skin rejuvenation treatments",
      "Natural, subtle aesthetic outcomes",
    ],
    fact: null,
    bookable: true,
    quote:
      "A thorough understanding of anatomy is what makes a subtle result possible. I treat conservatively and let the face lead.",
  },
  {
    id: "irvana",
    name: "Irvana",
    role: "Level 4 Laser-Qualified Beauty Therapist",
    image: "/irvana.png",
    bio: "A dynamic, high-performing Level 4 laser-qualified beauty therapist with 17 years of experience in luxury department stores and boutique beauty clinics. Having previously worked with some of the industry's leading skincare brands, Irvana joined the team in 2024, bringing a friendly, proactive and hands-on approach with the latest treatments and innovative techniques.",
    tags: [
      "Skin care consultations",
      "Micro-needling",
      "Morpheus8 RF micro-needling",
      "TIXEL",
      "Sofwave ultrasound",
      "UltraClear laser",
      "LPG endermologie",
    ],
    fact: "Loves to travel, exercise and enjoy trying different cuisines.",
    bookable: false,
    quote:
      "Great skin is built, not bought. I would rather set the right routine and pace the treatments than chase a quick fix.",
  },
];

const SUPPORT_STAFF: Member[] = [
  {
    id: "mary",
    name: "Mary",
    role: "Patient Services Coordinator",
    image: "/uploads/2024/12/Mary-1.png",
    bio: "Mary joined our team in July 2024 as our Patient Services Coordinator. She enjoys speaking with new and existing patients, helping to arrange appointments, and addressing any requests they may have. She manages Dr Sabrina's, Dr Janine's and Dr Michelle's consultation and treatment diaries, and is committed to ensuring every patient feels welcome and taken care of from the moment they reach out.",
    tags: [],
    fact: "Bali is her favourite travel spot.",
    bookable: false,
  },
  {
    id: "sally",
    name: "Sally",
    role: "Aesthetic Therapist & Patient Coordinator",
    image: "/uploads/2025/09/Sally-1.jpg",
    bio: "Sally is a trained aesthetic therapist and NEBDN-registered dental nurse, specialising in advanced skincare. As a patient coordinator, she is dedicated to providing a seamless and welcoming experience, ensuring every patient feels comfortable and cared for throughout their journey. Her warm, bubbly personality and passion for patient care makes her a trusted and reassuring presence at every visit.",
    tags: [],
    fact: null,
    bookable: false,
  },
];

export function TeamRoster({
  breadcrumbItems,
  siteUrl,
}: {
  breadcrumbItems: BreadcrumbItem[];
  siteUrl: string;
}) {
  return (
    <div className="tp">
      <PageHero
        breadcrumbItems={breadcrumbItems}
        siteUrl={siteUrl}
        eyebrow="Perfect Eyes Ltd & Perfect Skin Studio"
        h1="Meet the Team"
        lead="Our exceptional practitioners and dedicated support staff work together to deliver outstanding aesthetic outcomes and an unparalleled patient experience."
      >
        {/* The first way to book was 1,303px down, just past the fold. */}
        <div className={styles.heroCtas}>
          <Link href="/contact-cosmetic-eye-surgeon" className="tp-btn tp-btn-inverse">
            Book a Consultation
          </Link>
        </div>
      </PageHero>

      <section className={`${styles.section} ${styles.paper}`}>
        <div className="container">
          <div className={styles.head}>
            <span className={styles.eyebrow}>
              <TpIcon name="sparkle" size={13} />
              Clinical Team &amp; Practitioners
            </span>
            <h2 className={styles.heading}>Expert Aesthetic Practitioners</h2>
            <p className={styles.lead}>
              Focused on delivering natural, balanced and refined results for every patient.
            </p>
          </div>
          <TeamGrid members={PRACTITIONERS} />
        </div>
      </section>

      {/* The one dark band on the page. */}
      <section className={styles.band}>
        <div className="container">
          <div className={styles.bandInner}>
            <h2 className={styles.bandHeading}>
              A dedicated team committed to your care and wellbeing
            </h2>
            <p className={styles.bandText}>
              Behind every exceptional patient experience is a team that goes beyond clinical
              expertise — coordinating, educating and supporting every step of your journey at
              Perfect Eyes Ltd.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.paper}`}>
        <div className="container">
          <div className={styles.head}>
            <span className={styles.eyebrow}>
              <TpIcon name="shield" size={13} />
              Clinical Administrative &amp; Support Staff
            </span>
            <h2 className={styles.heading}>Supporting Every Step of Your Journey</h2>
            <p className={styles.lead}>
              The dedicated team ensuring every patient journey is seamless, informed and truly
              exceptional from first contact to final follow-up.
            </p>
          </div>
          <TeamGrid members={SUPPORT_STAFF} />
        </div>
      </section>

      <TreatmentCTA />
      <ContactSection />
    </div>
  );
}
