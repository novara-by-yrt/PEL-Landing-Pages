import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/treatment/PageHero";
import { TpIcon } from "@/components/treatment/TpIcon";
import type { BreadcrumbItem } from "@/components/treatment/types";
import styles from "./EyeCareJourney.module.css";

type Tone = "paper" | "cream" | "fog";

type SubTreatment = { title: string; body: string[] };

type Section =
  | {
      kind: "panel";
      id: string;
      tone: Tone;
      reverse?: boolean;
      eyebrow: string;
      heading: string;
      image: string;
      imageAlt: string;
      body: React.ReactNode;
    }
  | {
      kind: "step";
      id: string;
      tone: Tone;
      step: number;
      heading: string;
      intro?: string;
      cta?: { label: string; href: string };
      subTreatments?: SubTreatment[];
    };

// Ordered exactly as the previous site laid these sections out — each STEP is
// its own section interleaved with the tips/product content, not one merged
// timeline.
const SECTIONS: Section[] = [
  {
    kind: "panel",
    id: "six-tips",
    tone: "paper",
    eyebrow: "Daily Habits",
    heading: "Six Tips for a Perfect Eye Care Routine",
    image: "/uploads/2026/01/DSC00361-1.jpg",
    imageAlt: "Dr Sabrina periorbital skincare collection",
    body: (
      <>
        <ul>
          <li>Use a gentle eye cleanser</li>
          <li>Apply a hydrating eye cream</li>
          <li>Always remove makeup before bed</li>
          <li>Wear UV-protective sunglasses</li>
          <li>Stay hydrated and sleep well</li>
          <li>Avoid rubbing your eyes</li>
        </ul>
      </>
    ),
  },
  {
    kind: "step",
    id: "step-1",
    tone: "cream",
    step: 1,
    heading: "Skincare — The Foundation of Eye Health",
    intro:
      "Think of skincare as your eye area's daily nutrition—it's the starting point of a lifelong relationship with how your eyes look and feel. Whether you're 25 and preventing your first fine lines or 55 and focused on restoring radiance, it begins here. Start by choosing a gentle cleanser that's safe to use around the eyes—look for one that removes makeup while also hydrating and soothing your skin. A lightweight, calming cleanser with skin-loving ingredients like aloe vera leaves your eye area soft, clean, and ready for the next steps in your routine.",
  },
  {
    kind: "panel",
    id: "makeup-tip",
    tone: "fog",
    reverse: true,
    eyebrow: "Pro Tip",
    heading: "Pro Tip for Makeup Wearers",
    image: "/uploads/2026/01/Dr-Sabrina-Render-New-7-1.jpg",
    imageAlt: "Dr Sabrina in clinic",
    body: (
      <>
        <p>
          Use a small amount of your gentle cleanser and lather it lightly around damp eyes. Then,
          place warm, damp cotton pads over your closed eyes. Let them sit for a couple of seconds
          before gently wiping them away. This method helps lift away makeup without irritating
          your skin—and it&rsquo;s a game changer if you wear long-lasting eye products.
        </p>
        <p>
          Daily care not only helps prevent early signs of ageing but also keeps your eye area
          balanced and resilient. But skincare isn&rsquo;t just about what you apply—it&rsquo;s
          also about how you live.
        </p>
        <h4>Eye-healthy habits to fold into your everyday routine</h4>
        <ul>
          <li>Nourish from within</li>
          <li>Shield against sun damage</li>
          <li>Ease digital strain</li>
          <li>Stay moisturised</li>
          <li>Don&rsquo;t skip hygiene</li>
          <li>Rest your eyes</li>
          <li>Quit smoking</li>
          <li>Control your health</li>
        </ul>
      </>
    ),
  },
  {
    kind: "panel",
    id: "skincare-collection",
    tone: "paper",
    eyebrow: "The Dr Sabrina Range",
    heading: "Dr Sabrina’s Award-Winning Eye Skincare Collection",
    image: "/uploads/2025/10/askques-img-1-1-2.jpg",
    imageAlt: "Dr Sabrina with the periorbital skincare range",
    body: (
      <>
        <p>
          Formulated by Dr Sabrina herself and backed by independent clinical studies, the range
          brings the same precision she applies in theatre to a daily periorbital skincare ritual.
        </p>
        <p>
          <a href="https://drsabrina.com/collections/all" target="_blank" rel="noopener noreferrer">
            Shop Dr Sabrina&rsquo;s eye care products
          </a>
        </p>
        <h4>Perfect 360 Eye Illuminate</h4>
        <p>
          Begin and end your day with the Perfect 360 Eye Illuminate, a scientifically formulated
          eye serum that targets fine lines, wrinkles, dark circles, puffiness and thinning
          &ldquo;crepey&rdquo; skin with a triple-action approach: restructuring skin, reinforcing
          its barrier, and brightening from within. Its hero, the Kiara Molecule&trade;, combines
          seven actives working in harmony to fade dark spots, smooth creases, and boost
          elasticity.
        </p>
        <p>
          In an independent Complife study, over two-thirds of users saw visible improvements in
          just six weeks, with smoother, brighter, and firmer skin.
        </p>
      </>
    ),
  },
  {
    kind: "panel",
    id: "relax-refresh-duo",
    tone: "cream",
    reverse: true,
    eyebrow: "The Dr Sabrina Range",
    heading: "The Relax & Refresh Duo",
    image: "/uploads/2026/01/dr-sabrina.jpg",
    imageAlt: "Dr Sabrina Relax and Refresh eye care duo",
    body: (
      <>
        <p>
          Start and end your day and restore comfort and clarity to your eye area with The Relax
          &amp; Refresh Duo, a gentle two-step ritual featuring the Dr Sabrina&trade; Hydrating Eye
          Cleanser and the Dr Sabrina&trade; Relax &amp; Refresh Eye Mask. The oil-to-foam cleanser
          melts away makeup, SPF and impurities without stripping, while the peel-off mask
          nourishes and smooths with peptides, multi-molecular hyaluronic acids, and a soothing
          botanical complex.
        </p>
        <p>
          Use the Hydrating Eye Cleanser daily, morning and night. Follow with the Relax &amp;
          Refresh Eye Mask two to three times a week. Dermatologist and ophthalmologist-evaluated,
          the duo helps reduce puffiness, soften fine lines, and restore hydration.
        </p>
      </>
    ),
  },
  {
    kind: "panel",
    id: "led-mask",
    tone: "fog",
    eyebrow: "The Dr Sabrina Range",
    heading: "Eye Regenerate LED Mask",
    image: "/uploads/2025/06/Frame-301.jpg",
    imageAlt: "Dr Sabrina Eye Regenerate LED Mask",
    body: (
      <>
        <p>
          Elevate your evening ritual with the Eye Regenerate LED Mask, a revolutionary device
          that brings spa-grade light therapy to your home — runner-up for Best LED Tool at the
          Get The Gloss Beauty Awards 2024. It uses red and near-infrared wavelengths to flood your
          skin with collagen-boosting, cell-repairing light. In just four weeks of use, 95% of
          users reported visibly brighter, plumper skin, and 82% saw reduced pigmentation and age
          spots.
        </p>
        <p>
          To use, cleanse your face, apply the hydrocolloid patch, and secure the LED mask for a
          10-minute session. Follow with the Perfect 360 Eye Illuminate serum to lock in benefits.
        </p>
      </>
    ),
  },
  {
    kind: "step",
    id: "step-2",
    tone: "paper",
    step: 2,
    heading: "Non-Surgical Treatments — When Skincare Isn't Enough",
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
          "Minimal downtime, but high-impact tightening—especially powerful for those seeing early signs of skin laxity.",
        ],
      },
      {
        title: "Sofwave",
        body: [
          "This non-invasive ultrasound treatment targets the deeper layers of the skin to stimulate collagen without damaging the surface. Perfect for: lifting brows, under-eye tightening, subtle firming.",
          "Often called the “lunchtime lift”—painless, quick, and with zero recovery time.",
        ],
      },
      {
        title: "Polynucleotides",
        body: [
          "Next-generation biostimulators derived from purified DNA fragments that encourage deep cellular repair, hydration, and collagen production—ideal for fragile, crepey under-eye skin.",
          "A natural yet science-led solution that strengthens the skin's foundation over time, without adding volume.",
        ],
      },
      {
        title: "Emface Eyes",
        body: [
          "Combines synchronised radiofrequency and HIFES™ to tone the delicate muscles around the eyes while tightening the overlying skin—no needles, no downtime.",
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
    heading: "Surgical Treatments — Precision for Long-Lasting Transformation",
    cta: { label: "Learn About Eye Surgery Options", href: "/#treatments" },
    subTreatments: [
      {
        title: "Upper and Lower Eyelid Surgery (Blepharoplasty)",
        body: [
          "Perfect for: hooded eyelids, under-eye bags, loose skin or fat bulges. Dr Sabrina uses her advanced “invisible zip stitch” technique to remove excess skin and fat, refresh the contours around the eyes, and create a lighter, more rested appearance—often with no visible scars.",
        ],
      },
      {
        title: "Ptosis Surgery (“Scarless” Correction)",
        body: [
          "Perfect for: droopy upper eyelids caused by weakened eyelid muscles. A refined, minimally invasive technique restores function and symmetry—with “scarless” correction performed from the inside of the eyelid, leaving no external trace.",
        ],
      },
      {
        title: "Brow Lift",
        body: [
          "Perfect for: low or sagging brows, tired or closed-off eye appearance. A subtle lift to the brow can dramatically open up the upper face, reduce forehead creases, and enhance the shape of the eyes—without an “over-pulled” look.",
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
          "Perfect for: puffy, swollen areas on the upper cheeks or below the eyes, often mistaken for eye bags. A multi-layered approach targets the true cause of puffiness—fluid retention, fat, or muscle laxity.",
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
          "Perfect for: unsatisfactory results from previous procedures. If you've had eyelid surgery elsewhere and are unhappy with the results—asymmetry, scarring, or unnatural outcomes—Dr Sabrina offers expert revision procedures designed to restore natural balance.",
        ],
      },
    ],
  },
  {
    kind: "step",
    id: "step-4",
    tone: "fog",
    step: 4,
    heading: "Back to Skincare — Maintaining Your Results",
    intro:
      "Incorporate The Relax & Refresh Duo into your daily routine to gently cleanse, deeply hydrate, and calm the eye area while supporting long-term skin comfort and resilience. The Eye Regenerate LED Mask enhances post-treatment recovery by stimulating cellular repair. Whether you've embraced treatments or surgery, skincare remains the heartbeat of your eye care journey.",
  },
];

const ROUTINE = [
  {
    name: "Perfect 360 Eye Illuminate Serum",
    detail: "Use morning and evening to maintain hydration and brightness, supporting skin recovery after treatments or surgery.",
  },
  {
    name: "Eye Regenerate LED Mask",
    detail: "Incorporate 3–5 times weekly to enhance cellular repair and prolong the benefits of professional procedures.",
  },
  {
    name: "Eye Protect SPF30 Cream",
    detail: "Apply daily to protect against UV damage, a critical step in preventing future ageing.",
  },
];

function PanelSection({ section }: { section: Extract<Section, { kind: "panel" }> }) {
  return (
    <section id={section.id} className={`${styles.section} ${styles[section.tone]}`}>
      <div className="container">
        <div className={`${styles.grid} ${section.reverse ? styles.reverse : ""}`}>
          <div className={styles.prose}>
            <span className={styles.eyebrow}>
              <TpIcon name="sparkle" size={13} />
              {section.eyebrow}
            </span>
            <h2 className={styles.heading}>{section.heading}</h2>
            {section.body}
          </div>
          <figure className={styles.figure}>
            <Image
              src={section.image}
              alt={section.imageAlt}
              fill
              sizes="(max-width: 860px) 100vw, 45vw"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

function StepSection({ section }: { section: Extract<Section, { kind: "step" }> }) {
  return (
    <section id={section.id} className={`${styles.section} ${styles[section.tone]}`}>
      <div className="container">
        <div className={styles.stepBadge}>
          <span className={styles.stepBadgeNum} aria-hidden="true">
            {section.step}
          </span>
          <span className={styles.eyebrow}>Step {section.step}</span>
        </div>
        <h2 className={styles.heading}>{section.heading}</h2>
        {section.intro && <p className={styles.stepIntro}>{section.intro}</p>}
        {section.cta && (
          <Link href={section.cta.href} className={`tp-btn tp-btn-secondary ${styles.stepCta}`}>
            {section.cta.label}
            <TpIcon name="arrow" size={16} />
          </Link>
        )}
        {section.subTreatments && (
          <div className={styles.subGrid}>
            {section.subTreatments.map((sub) => (
              <div key={sub.title} className={styles.subCard}>
                <h3 className={styles.subTitle}>{sub.title}</h3>
                {sub.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
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
    <div className="tp">
      <PageHero
        breadcrumbItems={breadcrumbItems}
        siteUrl={siteUrl}
        eyebrow="The Perfect360™ Experience"
        h1="The Journey of Eye Care: A Lifelong Commitment to Your Vision"
        lead="A guided pathway for eye, face and skin health — from everyday skincare through to surgery and the long-term care that keeps your results looking their best."
      />

      {/* Opening statement */}
      <section className={`${styles.section} ${styles.paper}`}>
        <div className="container">
          <div className={styles.intro}>
            <p>
              Our eyes are more than a feature&mdash;they&rsquo;re our storytellers. They smile
              before our lips do, tear up when words fall short, and reflect joy, exhaustion,
              wisdom, and wonder.
            </p>
            <p>
              The skin around your eyes is different&mdash;thinner, more delicate, and far more
              vulnerable than the rest of your face. With fewer oil glands and almost nonstop
              micro-movement, it&rsquo;s often the first to show signs of fatigue, dryness, or
              ageing. Your eyes are your signature, and they deserve care that&rsquo;s as unique
              and attentive as they are.
            </p>
            <p>
              Dr Sabrina&rsquo;s approach is rooted in her unparalleled knowledge of peri-orbital
              anatomy. Her 360-degree philosophy addresses both aesthetic and functional concerns,
              ensuring your eyes not only look vibrant but also feel healthy&mdash;whether
              you&rsquo;re preventing early signs of ageing or seeking transformative solutions.
            </p>
          </div>
        </div>
      </section>

      {SECTIONS.map((section) =>
        section.kind === "panel" ? (
          <PanelSection key={section.id} section={section} />
        ) : (
          <StepSection key={section.id} section={section} />
        )
      )}

      {/* Post-treatment routine */}
      <section className={`${styles.section} ${styles.paper}`}>
        <div className="container">
          <div className={`${styles.head} ${styles.headCenter}`}>
            <span className={styles.eyebrow}>
              <TpIcon name="shield" size={13} />
              After Care
            </span>
            <h2 className={styles.heading}>Post-Treatment Skincare Routine</h2>
          </div>
          <ul className={styles.routineList}>
            {ROUTINE.map((item) => (
              <li key={item.name} className={styles.routineItem}>
                <span className={styles.routineDot} aria-hidden="true" />
                <p>
                  <strong>{item.name}:</strong> {item.detail}
                </p>
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

      {/* The one dark/photographic band on the page — the closing statement */}
      <section className={styles.manifesto}>
        <div className={styles.manifestoBg}>
          <Image
            src="/uploads/2025/06/Frame-217.jpg"
            alt=""
            fill
            sizes="100vw"
            loading="lazy"
          />
        </div>
        <div className={styles.manifestoScrim} />
        <div className="container">
          <div className={styles.manifestoInner}>
            <span className={styles.eyebrow}>
              <TpIcon name="sparkle" size={13} />
              Your Bespoke Blueprint
            </span>
            <h2 className={styles.heading}>Dr Sabrina&rsquo;s 360-Degree Approach</h2>
            <p className={styles.manifestoText}>
              No two eyes tell the same story, and Dr Sabrina&rsquo;s bespoke approach ensures
              your care plan is a masterpiece tailored to you. As a doctor-led practitioner, she
              upholds the highest standards of medical excellence, safety, and personalised care.
            </p>
            <p className={styles.manifestoText}>
              During your consultation, Dr Sabrina assesses your concerns, lifestyle, and goals,
              weaving together skincare, treatments, and surgery as needed&mdash;ensuring results
              that feel authentically you.
            </p>
            <div className={styles.manifestoCta}>
              <Link href="/contact" className="tp-btn tp-btn-inverse">
                Book your consultation
                <TpIcon name="arrow" size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
