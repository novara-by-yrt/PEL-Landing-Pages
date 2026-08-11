import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/treatment/PageHero";
import { TpIcon } from "@/components/treatment/TpIcon";
import type { BreadcrumbItem } from "@/components/treatment/types";
import styles from "./EyeCareJourney.module.css";

type Tone = "paper" | "cream" | "fog";

/* Structured blocks that sit under a panel's prose. The page used to run long
   product paragraphs and bare bullet lists; the facts inside them — tips,
   habits, trial results, product names — are lists, so they are modelled as
   data and rendered as scannable cards. */
type Aside =
  | { kind: "steps"; label: string; items: string[] }
  | { kind: "chips"; label: string; items: string[] }
  | { kind: "facts"; label: string; items: { value: string; text: string }[] }
  | { kind: "cards"; label: string; items: { title: string; text: string }[] }
  | { kind: "link"; text: string; href: string; external?: boolean }
  | { kind: "note"; icon: string; text: React.ReactNode };

type SubTreatment = { title: string; body: string[] };

type Section =
  | {
      kind: "panel";
      id: string;
      tone: Tone;
      reverse?: boolean;
      eyebrow: string;
      /* Split in two so the tail of every heading carries the brand accent,
         the way the home page's display type does. */
      heading: { lead: string; accent: string };
      image: string;
      imageAlt: string;
      /* Where the desktop crop anchors. Desktop sizes the figure from the text
         column beside it, so the photo has to be cropped to fill; portraits
         want "center top", wider shots want "center". Phones ignore this —
         they letterbox the whole frame instead. */
      imagePosition?: string;
      caption: { title: string; meta: string };
      body?: React.ReactNode;
      asides: Aside[];
    }
  | {
      kind: "step";
      id: string;
      tone: Tone;
      step: number;
      heading: { lead: string; accent: string };
      intro?: string;
      callout?: string;
      cta?: { label: string; href: string };
      subTreatments?: SubTreatment[];
    };

/* Wayfinding for a page that is otherwise a very long scroll. */
const ROADMAP = [
  { step: "01", title: "Skincare", text: "The foundation of eye health", href: "#step-1" },
  {
    step: "02",
    title: "Non-Surgical",
    text: "When skincare isn’t enough",
    href: "#step-2",
  },
  {
    step: "03",
    title: "Surgical",
    text: "Precision for long-lasting transformation",
    href: "#step-3",
  },
  { step: "04", title: "Maintenance", text: "Back to skincare, keeping your results", href: "#step-4" },
];

/* The three properties the opening paragraph attributes to periorbital skin. */
const EYE_TRAITS = [
  { icon: "sparkle", title: "Thinner and more delicate" },
  { icon: "pulse", title: "Fewer oil glands" },
  { icon: "eye", title: "Almost nonstop micro-movement" },
];

// Ordered exactly as the previous site laid these sections out — each STEP is
// its own section interleaved with the tips/product content, not one merged
// timeline.
const SECTIONS: Section[] = [
  {
    kind: "panel",
    id: "six-tips",
    tone: "paper",
    eyebrow: "Daily Habits",
    heading: { lead: "Six tips for a ", accent: "perfect eye care routine." },
    image: "/uploads/2026/01/DSC00361-1.jpg",
    imageAlt: "Dr Sabrina periorbital skincare collection",
    caption: { title: "The daily ritual", meta: "Six habits, every day" },
    asides: [
      {
        kind: "steps",
        label: "The routine",
        items: [
          "Use a gentle eye cleanser",
          "Apply a hydrating eye cream",
          "Always remove makeup before bed",
          "Wear UV-protective sunglasses",
          "Stay hydrated and sleep well",
          "Avoid rubbing your eyes",
        ],
      },
    ],
  },
  {
    kind: "step",
    id: "step-1",
    tone: "cream",
    step: 1,
    heading: { lead: "Skincare: ", accent: "the foundation of eye health." },
    intro:
      "Think of skincare as your eye area’s daily nutrition, the starting point of a lifelong relationship with how your eyes look and feel. Whether you’re 25 and preventing your first fine lines or 55 and focused on restoring radiance, it begins here.",
    callout:
      "Start by choosing a gentle cleanser that’s safe to use around the eyes, one that removes makeup while also hydrating and soothing. A lightweight, calming cleanser with skin-loving ingredients like aloe vera leaves your eye area soft, clean, and ready for the next steps.",
  },
  {
    kind: "panel",
    id: "makeup-tip",
    tone: "fog",
    reverse: true,
    eyebrow: "Pro Tip",
    heading: { lead: "A pro tip for ", accent: "makeup wearers." },
    image: "/uploads/2026/01/Dr-Sabrina-Render-New-7-1.jpg",
    imageAlt: "Dr Sabrina in clinic",
    /* A wider in-clinic shot: anchoring the crop to the top cut the subject
       out of the desktop frame entirely. */
    imagePosition: "center",
    caption: { title: "Removing long-wear makeup", meta: "Without irritating the skin" },
    body: (
      <>
        <p>
          Use a small amount of your gentle cleanser and lather it lightly around damp eyes. Then
          place warm, damp cotton pads over your closed eyes and let them sit for a couple of
          seconds before gently wiping them away. This lifts away makeup without irritating your
          skin, and it is a game changer if you wear long-lasting eye products.
        </p>
        <p>
          Daily care not only helps prevent early signs of ageing but keeps your eye area balanced
          and resilient. But skincare isn&rsquo;t just about what you apply; it&rsquo;s also
          about how you live.
        </p>
      </>
    ),
    asides: [
      {
        kind: "chips",
        label: "Eye-healthy habits to fold into your everyday routine",
        items: [
          "Nourish from within",
          "Shield against sun damage",
          "Ease digital strain",
          "Stay moisturised",
          "Don’t skip hygiene",
          "Rest your eyes",
          "Quit smoking",
          "Control your health",
        ],
      },
    ],
  },
  {
    kind: "panel",
    id: "skincare-collection",
    tone: "paper",
    eyebrow: "The Dr Sabrina Range",
    heading: { lead: "An award-winning ", accent: "eye skincare collection." },
    image: "/uploads/2025/09/Sabrina-1.jpg",
    imageAlt: "Dr Sabrina Shah-Desai",
    caption: { title: "Perfect 360 Eye Illuminate", meta: "Powered by the Kiara Molecule™" },
    body: (
      <p>
        Formulated by Dr Sabrina herself and backed by independent clinical studies, the range
        brings the same precision she applies in theatre to a daily periorbital skincare ritual.
      </p>
    ),
    /* One labelled block, then a note and the shop link, rather than three
       separate labelled blocks each with its own divider and gutter. */
    asides: [
      {
        kind: "cards",
        label: "Perfect 360 Eye Illuminate",
        items: [
          {
            title: "A triple-action serum",
            text: "Targets fine lines, dark circles, puffiness and thinning “crepey” skin by restructuring skin, reinforcing its barrier and brightening from within.",
          },
          {
            title: "The Kiara Molecule™",
            text: "Seven actives working in harmony to fade dark spots, smooth creases and boost elasticity.",
          },
        ],
      },
      {
        kind: "note",
        icon: "star",
        text: (
          <>
            <strong>Six weeks:</strong> in an independent Complife study, over two-thirds of users
            saw visible improvements, with smoother, brighter and firmer skin.
          </>
        ),
      },
      {
        kind: "link",
        text: "Shop Dr Sabrina’s eye care products",
        href: "https://drsabrina.com/collections/all",
        external: true,
      },
    ],
  },
  {
    kind: "panel",
    id: "relax-refresh-duo",
    tone: "cream",
    reverse: true,
    eyebrow: "The Dr Sabrina Range",
    heading: { lead: "The Relax & ", accent: "Refresh Duo." },
    image: "/uploads/2026/01/dr-sabrina.jpg",
    imageAlt: "Dr Sabrina Relax and Refresh eye care duo",
    caption: { title: "A two-step ritual", meta: "Morning and night" },
    body: (
      <p>
        Start and end your day and restore comfort and clarity to your eye area with a gentle
        two-step ritual. Dermatologist and ophthalmologist-evaluated, the duo helps reduce
        puffiness, soften fine lines, and restore hydration.
      </p>
    ),
    asides: [
      {
        kind: "cards",
        label: "What’s in the duo",
        items: [
          {
            title: "Hydrating Eye Cleanser",
            text: "An oil-to-foam cleanser that melts away makeup, SPF and impurities without stripping. Use daily, morning and night.",
          },
          {
            title: "Relax & Refresh Eye Mask",
            text: "A peel-off mask that nourishes and smooths with peptides, multi-molecular hyaluronic acids and a soothing botanical complex. Use two to three times a week.",
          },
        ],
      },
    ],
  },
  {
    kind: "panel",
    id: "led-mask",
    tone: "fog",
    eyebrow: "The Dr Sabrina Range",
    heading: { lead: "Eye Regenerate ", accent: "LED Mask." },
    image: "/uploads/2025/06/Frame-301.jpg",
    imageAlt: "Dr Sabrina Eye Regenerate LED Mask",
    caption: { title: "Spa-grade light therapy", meta: "A 10-minute evening session" },
    body: (
      <p>
        Elevate your evening ritual with a device that brings spa-grade light therapy home, using
        red and near-infrared wavelengths to flood your skin with collagen-boosting, cell-repairing
        light. Cleanse your face, apply the hydrocolloid patch, and secure the mask for ten
        minutes, then follow with the Perfect 360 Eye Illuminate serum to lock in benefits.
      </p>
    ),
    asides: [
      {
        kind: "facts",
        label: "After four weeks of use",
        items: [
          { value: "95%", text: "of users reported visibly brighter, plumper skin." },
          { value: "82%", text: "saw reduced pigmentation and age spots." },
        ],
      },
      {
        kind: "note",
        icon: "star",
        text: (
          <>
            <strong>Runner-up, Best LED Tool</strong> at the Get The Gloss Beauty Awards 2024.
          </>
        ),
      },
    ],
  },
  {
    kind: "step",
    id: "step-2",
    tone: "paper",
    step: 2,
    heading: { lead: "Non-surgical treatments: ", accent: "when skincare isn’t enough." },
    intro:
      "As we age or face specific concerns like deep tear troughs or persistent puffiness, skincare alone may not suffice. Non-surgical treatments offer a minimally invasive way to enhance your appearance with little to no downtime, performed in a CQC-regulated environment for maximum safety and efficacy.",
    cta: { label: "Explore Non-Surgical Treatments", href: "/#treatments" },
    subTreatments: [
      {
        title: "Tear Trough Fillers",
        body: [
          "This gentle dermal filler treatment restores lost volume in the under-eye area, helping to smooth out hollows, brighten dark circles, and reduce shadows. Perfect for: sunken under-eyes, dark hollows, tired-looking eyes.",
          "Why it works: filler subtly lifts the area beneath the eye, instantly reducing tiredness and enhancing light reflection, often with visible results right after treatment.",
        ],
      },
      {
        title: "Morpheus8",
        body: [
          "Combines microneedling with radiofrequency energy to tighten and remodel skin from within, softening crepey skin and improving overall texture around the eyes.",
          "Minimal downtime, but high-impact tightening, especially powerful for those seeing early signs of skin laxity.",
        ],
      },
      {
        title: "Sofwave",
        body: [
          "This non-invasive ultrasound treatment targets the deeper layers of the skin to stimulate collagen without damaging the surface. Perfect for: lifting brows, under-eye tightening, subtle firming.",
          "Often called the “lunchtime lift”: painless, quick, and with zero recovery time.",
        ],
      },
      {
        title: "Polynucleotides",
        body: [
          "Next-generation biostimulators derived from purified DNA fragments that encourage deep cellular repair, hydration, and collagen production, ideal for fragile, crepey under-eye skin.",
          "A natural yet science-led solution that strengthens the skin's foundation over time, without adding volume.",
        ],
      },
      {
        title: "Emface Eyes",
        body: [
          "Combines synchronised radiofrequency and HIFES™ to tone the delicate muscles around the eyes while tightening the overlying skin, with no needles and no downtime.",
          "Think of it as a facial workout that delivers visibly lifted, more open eyes, often after just a few sessions.",
        ],
      },
    ],
  },
  {
    kind: "step",
    id: "step-3",
    tone: "cream",
    step: 3,
    heading: { lead: "Surgical treatments: ", accent: "precision for lasting change." },
    cta: { label: "Learn About Eye Surgery Options", href: "/#treatments" },
    subTreatments: [
      {
        title: "Upper and Lower Eyelid Surgery (Blepharoplasty)",
        body: [
          "Perfect for: hooded eyelids, under-eye bags, loose skin or fat bulges. Dr Sabrina uses her advanced “invisible zip stitch” technique to remove excess skin and fat, refresh the contours around the eyes, and create a lighter, more rested appearance, often with no visible scars.",
        ],
      },
      {
        title: "Ptosis Surgery (“Scarless” Correction)",
        body: [
          "Perfect for: droopy upper eyelids caused by weakened eyelid muscles. A refined, minimally invasive technique restores function and symmetry, with “scarless” correction performed from the inside of the eyelid, leaving no external trace.",
        ],
      },
      {
        title: "Brow Lift",
        body: [
          "Perfect for: low or sagging brows, tired or closed-off eye appearance. A subtle lift to the brow can dramatically open up the upper face, reduce forehead creases, and enhance the shape of the eyes, without an “over-pulled” look.",
        ],
      },
      {
        title: "Asian Blepharoplasty (Double Eyelid Surgery)",
        body: [
          "Perfect for: monolids or low eyelid creases, seeking definition while respecting ethnic identity. Dr Sabrina creates natural-looking double eyelids that respect the patient's unique anatomy and cultural features.",
        ],
      },
      {
        title: "Festoon & Malar Bag Treatment",
        body: [
          "Perfect for: puffy, swollen areas on the upper cheeks or below the eyes, often mistaken for eye bags. A multi-layered approach targets the true cause of puffiness, whether fluid retention, fat, or muscle laxity.",
        ],
      },
      {
        title: "Chalazion Removal",
        body: [
          "Chalazions are small, often painless cysts on the eyelid caused by blocked glands. When they don't respond to conservative treatment, minor surgery offers quick and effective removal with minimal downtime.",
        ],
      },
      {
        title: "Revision Surgery",
        body: [
          "Perfect for: unsatisfactory results from previous procedures. If you've had eyelid surgery elsewhere and are unhappy with the results (asymmetry, scarring, or unnatural outcomes), Dr Sabrina offers expert revision procedures designed to restore natural balance.",
        ],
      },
    ],
  },
  {
    kind: "step",
    id: "step-4",
    tone: "fog",
    step: 4,
    heading: { lead: "Back to skincare: ", accent: "maintaining your results." },
    intro:
      "Incorporate The Relax & Refresh Duo into your daily routine to gently cleanse, deeply hydrate, and calm the eye area while supporting long-term skin comfort and resilience. The Eye Regenerate LED Mask enhances post-treatment recovery by stimulating cellular repair.",
    callout:
      "Whether you’ve embraced treatments or surgery, skincare remains the heartbeat of your eye care journey.",
  },
];

const ROUTINE = [
  {
    icon: "sparkle",
    name: "Perfect 360 Eye Illuminate Serum",
    cadence: "Morning and evening",
    detail:
      "Maintains hydration and brightness, supporting skin recovery after treatments or surgery.",
  },
  {
    icon: "pulse",
    name: "Eye Regenerate LED Mask",
    cadence: "3-5 times weekly",
    detail: "Enhances cellular repair and prolongs the benefits of professional procedures.",
  },
  {
    icon: "shield",
    name: "Eye Protect SPF30 Cream",
    cadence: "Daily",
    detail: "Protects against UV damage, a critical step in preventing future ageing.",
  },
];

function AsideBlock({ aside }: { aside: Aside }) {
  if (aside.kind === "note") {
    return (
      <p className={styles.note}>
        <span className={styles.noteIcon} aria-hidden="true">
          <TpIcon name={aside.icon} size={16} />
        </span>
        <span>{aside.text}</span>
      </p>
    );
  }

  if (aside.kind === "link") {
    const inner = <span>{aside.text}</span>;
    return (
      <div className={styles.asidePlain}>
        {aside.external ? (
          <a
            href={aside.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkCard}
          >
            {inner}
          </a>
        ) : (
          <Link href={aside.href} className={styles.linkCard}>
            {inner}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className={styles.aside}>
      <h3 className={styles.asideLabel}>{aside.label}</h3>

      {aside.kind === "steps" && (
        <ol className={styles.tips}>
          {aside.items.map((item, i) => (
            <li key={item} className={styles.tip}>
              <span className={styles.tipNum} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.tipText}>{item}</span>
            </li>
          ))}
        </ol>
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
    </div>
  );
}

function PanelSection({ section }: { section: Extract<Section, { kind: "panel" }> }) {
  return (
    <section
      id={section.id}
      className={`${styles.section} ${styles[section.tone]}`}
      aria-labelledby={`${section.id}-heading`}
    >
      <div className="container">
        <div className={`${styles.grid} ${section.reverse ? styles.reverse : ""}`}>
          <div className={styles.prose}>
            <span className={styles.eyebrow}>
              <TpIcon name="sparkle" size={13} />
              {section.eyebrow}
            </span>
            <h2 id={`${section.id}-heading`} className={styles.heading}>
              {section.heading.lead}
              <span className={styles.headingAccent}>{section.heading.accent}</span>
            </h2>
            <span className={styles.rule} aria-hidden="true" />
            {section.body && <div className={styles.proseBody}>{section.body}</div>}
            {section.asides.map((aside, i) => (
              <AsideBlock key={i} aside={aside} />
            ))}
          </div>

          <figure
            className={styles.figure}
            style={
              section.imagePosition
                ? ({ "--figure-position": section.imagePosition } as React.CSSProperties)
                : undefined
            }
          >
            <Image
              src={section.image}
              alt={section.imageAlt}
              fill
              sizes="(min-width: 1000px) 46vw, 100vw"
              loading="lazy"
              className={styles.figureImg}
            />
            <span className={styles.figureScrim} aria-hidden="true" />
            <figcaption className={styles.figureCaption}>
              <span className={styles.figureCaptionTitle}>{section.caption.title}</span>
              <span className={styles.figureCaptionMeta}>{section.caption.meta}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function StepSection({ section }: { section: Extract<Section, { kind: "step" }> }) {
  return (
    <section
      id={section.id}
      className={`${styles.section} ${styles.stepSection} ${styles[section.tone]}`}
      aria-labelledby={`${section.id}-heading`}
    >
      {/* Oversized ghost numeral, the way the home page's journey cards carry
          their step number. Decorative — the real label is in .stepBadge. */}
      <span className={styles.stepGhost} aria-hidden="true">
        {String(section.step).padStart(2, "0")}
      </span>

      <div className="container">
        <div className={styles.stepHead}>
          <span className={styles.stepBadge}>
            <span className={styles.stepBadgeNum} aria-hidden="true">
              {section.step}
            </span>
            Step {section.step} of 4
          </span>
          <h2 id={`${section.id}-heading`} className={styles.heading}>
            {section.heading.lead}
            <span className={styles.headingAccent}>{section.heading.accent}</span>
          </h2>
          <span className={styles.rule} aria-hidden="true" />
          {section.intro && <p className={styles.stepIntro}>{section.intro}</p>}
          {section.callout && (
            <p className={styles.callout}>
              <span className={styles.noteIcon} aria-hidden="true">
                <TpIcon name="sparkle" size={16} />
              </span>
              <span>{section.callout}</span>
            </p>
          )}
          {section.cta && (
            <Link href={section.cta.href} className={`tp-btn tp-btn-secondary ${styles.stepCta}`}>
              {section.cta.label}
            </Link>
          )}
        </div>

        {section.subTreatments && (
          <ul className={styles.subGrid}>
            {section.subTreatments.map((sub, i) => (
              <li key={sub.title} className={styles.subCard}>
                <span className={styles.subIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.subTitle}>{sub.title}</h3>
                {sub.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function EyeCareJourney({
  breadcrumbItems,
  siteUrl,
}: {
  breadcrumbItems: BreadcrumbItem[];
  siteUrl: string;
}) {
  return (
    <div className={`tp ${styles.page}`}>
      <PageHero
        breadcrumbItems={breadcrumbItems}
        siteUrl={siteUrl}
        eyebrow="The Perfect360™ Experience"
        h1="The Journey of Eye Care: A Lifelong Commitment to Your Vision"
        lead="A guided pathway for eye, face and skin health, from everyday skincare through to surgery and the long-term care that keeps your results looking their best."
      />

      {/* ── Opening statement and roadmap ───────────────────────────────── */}
      <section className={`${styles.section} ${styles.paper}`} aria-labelledby="intro-heading">
        <div className="container">
          <div className={`${styles.head} ${styles.headCenter}`}>
            <span className={styles.eyebrow}>
              <TpIcon name="sparkle" size={13} />
              Where It Begins
            </span>
            <h2 id="intro-heading" className={styles.heading}>
              Your eyes are <span className={styles.headingAccent}>your signature.</span>
            </h2>
            <span className={`${styles.rule} ${styles.ruleCenter}`} aria-hidden="true" />
            <p className={styles.introLead}>
              Our eyes are our storytellers. Rooted in her unparalleled knowledge of
              peri-orbital anatomy, Dr Sabrina&rsquo;s 360-degree philosophy addresses both
              aesthetic and functional concerns, so your eyes not only look vibrant but also
              feel healthy.
            </p>
          </div>

          {/* One divided panel rather than three loose boxes: the three traits
              are facets of a single claim, and the shared frame says so. */}
          <div className={styles.traitPanel}>
            <ul className={styles.traits}>
              {EYE_TRAITS.map((trait) => (
                <li key={trait.title} className={styles.trait}>
                  <span className={styles.traitIcon} aria-hidden="true">
                    <TpIcon name={trait.icon} size={20} />
                  </span>
                  <span className={styles.traitTitle}>{trait.title}</span>
                </li>
              ))}
            </ul>
            <p className={styles.traitsNote}>
              The skin around your eyes is different from the rest of your face, which is
              why it&rsquo;s often the first to show signs of fatigue, dryness, or ageing.
            </p>
          </div>
        </div>
      </section>

      {/* ── The four steps ──────────────────────────────────────────────── */}
      <section className={styles.roadmap} aria-labelledby="roadmap-heading">
        <span className={styles.roadmapGlow} aria-hidden="true" />
        <div className="container">
          <div className={styles.roadmapHead}>
            <span className={`${styles.eyebrow} ${styles.eyebrowLight}`}>
              <TpIcon name="compass" size={13} />
              The Pathway
            </span>
            <h2 id="roadmap-heading" className={styles.roadmapTitle}>
              Four steps, one lifelong journey
            </h2>
            <p className={styles.roadmapLead}>
              Every plan is built from these four stages, in whatever combination your eyes
              actually need.
            </p>
          </div>

          <ol className={styles.roadmapGrid}>
            {ROADMAP.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.roadmapCard}>
                  <span className={styles.roadmapNum}>{item.step}</span>
                  <span className={styles.roadmapCardTitle}>{item.title}</span>
                  <span className={styles.roadmapCardText}>{item.text}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {SECTIONS.map((section) =>
        section.kind === "panel" ? (
          <PanelSection key={section.id} section={section} />
        ) : (
          <StepSection key={section.id} section={section} />
        )
      )}

      {/* ── Post-treatment routine ──────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.paper}`} aria-labelledby="routine-heading">
        <div className="container">
          <div className={`${styles.head} ${styles.headCenter}`}>
            <span className={styles.eyebrow}>
              <TpIcon name="shield" size={13} />
              After Care
            </span>
            <h2 id="routine-heading" className={styles.heading}>
              Post-treatment <span className={styles.headingAccent}>skincare routine.</span>
            </h2>
            <span className={`${styles.rule} ${styles.ruleCenter}`} aria-hidden="true" />
          </div>

          <ul className={styles.routineGrid}>
            {ROUTINE.map((item) => (
              <li key={item.name} className={styles.routineCard}>
                <span className={styles.routineIcon} aria-hidden="true">
                  <TpIcon name={item.icon} size={20} />
                </span>
                <span className={styles.routineCadence}>{item.cadence}</span>
                <h3 className={styles.routineName}>{item.name}</h3>
                <p className={styles.routineDetail}>{item.detail}</p>
              </li>
            ))}
          </ul>

          <p className={styles.routineNote}>
            Skincare preserves your investment in treatments and surgery, ensuring lasting
            results. It&rsquo;s a daily act of self-care that keeps your eyes radiant through
            every life stage.
          </p>
        </div>
      </section>

      {/* ── The one photographic dark band — the closing statement ──────── */}
      <section className={styles.manifesto} aria-labelledby="manifesto-heading">
        <div className={styles.manifestoBg}>
          <Image src="/uploads/2025/06/Frame-217.jpg" alt="" fill sizes="100vw" loading="lazy" />
        </div>
        <div className={styles.manifestoScrim} />
        <div className="container">
          <div className={styles.manifestoInner}>
            <span className={`${styles.eyebrow} ${styles.eyebrowLight}`}>
              <TpIcon name="sparkle" size={13} />
              Your Bespoke Blueprint
            </span>
            <h2 id="manifesto-heading" className={styles.manifestoTitle}>
              Dr Sabrina&rsquo;s 360-degree approach
            </h2>
            <span className={`${styles.rule} ${styles.ruleCenter} ${styles.ruleLight}`} aria-hidden="true" />
            <p className={styles.manifestoText}>
              No two eyes tell the same story, and Dr Sabrina&rsquo;s bespoke approach ensures
              your care plan is a masterpiece tailored to you. As a doctor-led practitioner, she
              upholds the highest standards of medical excellence, safety, and personalised care.
            </p>
            <p className={styles.manifestoText}>
              During your consultation, Dr Sabrina assesses your concerns, lifestyle, and goals,
              weaving together skincare, treatments, and surgery as needed, ensuring results
              that feel authentically you.
            </p>
            <div className={styles.manifestoCta}>
              <Link href="/contact" className="tp-btn tp-btn-inverse">
                Book your consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
