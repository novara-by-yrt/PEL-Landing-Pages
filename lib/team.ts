/**
 * The clinic roster — one source of truth for everyone who appears as a
 * person on the site.
 *
 * This lives here rather than beside either component because two surfaces
 * render the same four people from it: the /team page's card grid
 * (components/about/TeamGrid) and the home page's "Meet The Clinic Team"
 * carousel (components/home/TeamCarousel). Both open the same bio modal, so
 * both need the same bios, credentials and pull-quotes; keeping two copies
 * would eventually publish two different biographies for the same person.
 *
 * Data only, no JSX, so a server component can import it as freely as a
 * client one.
 */
export type Member = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  tags: string[];
  fact: string | null;
  bookable: boolean;
  /** Optional pull-quote shown in the profile's header band. */
  quote?: string;
  /**
   * Where this member's card leads. Someone with a profile page of their own
   * goes there; everyone else opens the bio modal, which is the only place
   * their full biography exists as a page-like view.
   */
  profileHref?: string;
};

export const TEAM_MEMBERS: Member[] = [
  {
    id: "sabrina",
    name: "Dr Sabrina Shah-Desai",
    role: "Board Certified Cosmetic Oculoplastic Surgeon",
    /* She is the one member with a profile page of her own, so her card goes
       there rather than opening the bio modal the others use. */
    profileHref: "/dr-sabrina-shah-desai",
    /* The same portrait the home page's team carousel and About section use,
       so she looks consistent everywhere she appears. */
    image: "/dr-sabrina-profile.png",
    bio: "Dr Sabrina Shah-Desai, MS, FRCS (Ed) Ophth, is a multi-award-winning Oculoplastic Reconstructive Surgeon and Aesthetic Practitioner specialising in reconstructive, revisional and cosmetic surgery of the eyelids, alongside non-surgical treatments for the eyes and face. With 25 years of surgical and 17 years of non-surgical experience, she is globally recognised for her pioneering, minimally invasive techniques and is known as the “go-to” surgeon for discerning patients seeking subtle, natural results.",
    tags: [
      "MS, FRCS (Ed) Ophth",
      "Board-Certified Cosmetic Surgeon, RCS England",
      "Top practitioner for eyes, 2019-2026",
      "Upper & lower lid blepharoplasty",
      "Revision eyelid surgery",
      "Ptosis & thyroid eye surgery",
      "Advanced periocular rejuvenation",
    ],
    fact: null,
    bookable: true,
    quote:
      "My philosophy has always been the same - listen first, plan carefully, treat with precision, and never do more than is needed. The best result is the one that looks entirely like you.",
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
