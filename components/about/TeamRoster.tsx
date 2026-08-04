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

const SUPPORT: Member[] = [
  {
    id: "leanne",
    name: "Leanne",
    role: "Practice Clinic Manager",
    image: "/uploads/2025/09/Leanne-1-1.jpg",
    bio: "Leanne joined the team in May 2025 as our Practice Clinic Manager, where she ensures every patient's journey is smooth, supportive, and well-informed. With over 20 years of experience in the beauty industry, Leanne brings a wealth of knowledge and a deep commitment to delivering an exceptional patient experience. Her warm, bubbly nature and professional approach help every patient feel welcomed and cared for — from their first visit to their final follow-up.",
    tags: [],
    fact: "Leanne loves running and is always planning her next meal out.",
    bookable: false,
  },
  {
    id: "mojdeh",
    name: "Mojdeh",
    role: "Surgical Coordinator & Patient Educator",
    image: "/uploads/2025/09/Mojdeh-2025-09-17-15-54-00-1.jpg",
    bio: "Mojdeh joined our team in October 2024 as our Surgical Coordinator and Patient Educator. With a background in Biomedical Sciences and over a decade in patient-centred roles, she guides patients through their surgical journeys — ensuring seamless experiences from initial consultation to post-operative care. Known for her professionalism and warm, approachable demeanour, Mojdeh is dedicated to addressing questions and making patients feel comfortable and confident at every stage.",
    tags: [],
    fact: "Mojdeh loves exercising and planning her next travel escape.",
    bookable: false,
  },
  {
    id: "lakshya",
    name: "Lakshya",
    role: "Patient Coordinator",
    image: "/uploads/2025/09/Luxee-1.jpg",
    bio: "Lakshya rejoined the Perfect Eyes team as our Patient Coordinator after a fulfilling career in Early Years Education. With a degree in the field and a genuine passion for supporting others, she brings a warm, nurturing approach to patient care. Driven by a deep interest in aesthetics, Lakshya finds it incredibly rewarding to be part of each patient's transformative journey with Dr Sabrina — from the first inquiry right through to post-treatment support.",
    tags: [],
    fact: "Latest hobbies include travelling with her husband and experimenting with new recipes in the kitchen.",
    bookable: false,
  },
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

      <section className={`${styles.section} ${styles.fog}`}>
        <div className="container">
          <div className={styles.head}>
            <span className={styles.eyebrow}>
              <TpIcon name="shield" size={13} />
              Clinical Administrative &amp; Support Staff
            </span>
            <h2 className={styles.heading}>Here for You, Every Step of the Way</h2>
            <p className={styles.lead}>
              The dedicated team ensuring every patient journey is seamless, informed and truly
              exceptional from first contact to final follow-up.
            </p>
          </div>
          <TeamGrid members={SUPPORT} />
        </div>
      </section>

      <TreatmentCTA />
    </div>
  );
}
