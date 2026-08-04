import { PageHero } from "@/components/treatment/PageHero";
import { TpIcon } from "@/components/treatment/TpIcon";
import { TreatmentCTA } from "@/components/treatment/TreatmentCTA";
import type { BreadcrumbItem } from "@/components/treatment/types";
import { TeamGrid, type Member } from "./TeamGrid";
import styles from "./TeamRoster.module.css";

const PRACTITIONERS: Member[] = [
  {
    id: "janine",
    name: "Dr Janine",
    role: "Dentist & Aesthetic Practitioner",
    image: "/uploads/2026/04/DR-JANINE.webp",
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
  },
  {
    id: "hemmali",
    name: "Dr Hemmali",
    role: "Dentist & Aesthetic Practitioner",
    image: "/uploads/2026/04/Dr-Hemmali.webp",
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
  },
  {
    id: "irvana",
    name: "Irvana",
    role: "Level 4 Laser-Qualified Beauty Therapist",
    image: "/uploads/2026/04/Irvana.webp",
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
      />

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

      <TreatmentCTA />
    </div>
  );
}
