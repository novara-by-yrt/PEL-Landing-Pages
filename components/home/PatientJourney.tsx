import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";
import styles from "./PatientJourney.module.css";

/**
 * The Perfect360™ patient journey, following the clinic's Patient Journey
 * sheet: one shared consultation with Dr Shah-Desai, which then branches into
 * a surgical and a non-surgical pathway.
 *
 * A server component — the whole thing is static, so none of it needs to
 * reach the browser as JavaScript.
 */

type Step = {
  /** Icon name from TpIcon. */
  icon: string;
  title: string;
  detail?: string[];
};

/** The five things the first consultation covers. */
const CONSULTATION = [
  "Comprehensive facial and periocular assessment",
  "Medical history & photography",
  "Diagnosis",
  "Personalised treatment recommendations",
  "Written consultation letter with treatment plan",
];

const SURGICAL: Step[] = [
  {
    icon: "clipboard",
    title: "Second consultation",
    detail: ["Final treatment planning", "Consent"],
  },
  { icon: "pulse", title: "Surgery" },
  {
    icon: "calendar",
    title: "6–7 day follow-up",
    detail: ["Wound assessment", "Suture removal"],
  },
  {
    icon: "calendar",
    title: "12–16 week follow-up",
    detail: ["Healing assessment", "Clinical photography", "Outcome review"],
  },
  {
    icon: "sparkle",
    title: "Non-surgical maintenance treatments",
    detail: [
      "Skin health optimisation",
      "Energy-based treatments",
      "Injectables",
      "Regenerative treatments",
      "Medical skincare",
    ],
  },
];

const NON_SURGICAL: Step[] = [
  {
    icon: "star",
    title: "Complimentary eye, face & skin consultation",
    detail: [
      "With our team of doctors and advanced therapists",
      "Selected & mentored by Dr Sabrina Shah-Desai",
    ],
  },
  {
    icon: "clipboard",
    title: "Personalised treatment plan",
    detail: ["Tailored to your skin goals and lifestyle"],
  },
  { icon: "calendar", title: "Ongoing maintenance appointments" },
];

/** The five disciplines the non-surgical pathway draws on. */
const FOCUS = [
  { icon: "pulse", label: "Regenerative medicine" },
  { icon: "sparkle", label: "Laser treatments" },
  { icon: "plus", label: "Injectables" },
  { icon: "shield", label: "Skin health maintenance" },
  { icon: "check", label: "Medical skincare" },
];

function Pathway({
  title,
  eyebrow,
  steps,
  numbered,
  children,
}: {
  title: string;
  eyebrow: string;
  steps: Step[];
  numbered?: boolean;
  children?: React.ReactNode;
}) {
  const id = title.toLowerCase().replace(/[^a-z]+/g, "-");

  return (
    <article className={styles.pathway} aria-labelledby={id}>
      <header className={styles.pathwayHead}>
        <span className={styles.pathwayEyebrow}>{eyebrow}</span>
        <h3 id={id} className={styles.pathwayTitle}>
          {title}
        </h3>
      </header>

      <ol className={styles.steps}>
        {steps.map((step, i) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.stepMarker} aria-hidden="true">
              {numbered ? (
                <span className={styles.stepNumber}>{i + 1}</span>
              ) : (
                <TpIcon name={step.icon} size={17} />
              )}
            </span>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>{step.title}</p>
              {step.detail ? (
                <ul className={styles.stepDetail}>
                  {step.detail.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      {children}
    </article>
  );
}

export default function PatientJourney() {
  return (
    <section className={styles.journey} aria-labelledby="journey-title">
      {/* Two soft brand blobs. They are what the glass panels' backdrop-filter
          has to refract — on a flat field the glass reads as a plain panel. */}
      <span className={styles.glow} aria-hidden="true" />

      <div className="container">
        <div className={styles.head}>
          <span className={styles.eyebrow}>Patient journey</span>
          <h2 id="journey-title" className={styles.title}>
            The Perfect360&trade; journey. A curated journey, not a single procedure
          </h2>
          <p className={styles.lead}>
            The Perfect360&trade; experience for eye, face and skin health.
          </p>
        </div>

        {/* Shared first step — both pathways begin here. */}
        <div className={styles.consult}>
          <div className={styles.consultHead}>
            <span className={styles.consultIcon} aria-hidden="true">
              <TpIcon name="eye" size={20} />
            </span>
            <div>
              <p className={styles.consultLabel}>Consultation with</p>
              <p className={styles.consultName}>Dr Sabrina Shah-Desai MS FRCS</p>
            </div>
          </div>

          <ul className={styles.consultList}>
            {CONSULTATION.map((item) => (
              <li key={item} className={styles.consultItem}>
                <TpIcon name="check" size={15} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Marks where the single consultation splits into the two pathways. */}
        <div className={styles.branch} aria-hidden="true">
          <span className={styles.branchStem} />
          <span className={styles.branchDot} />
        </div>

        <div className={styles.pathways}>
          <Pathway
            eyebrow="Pathway one"
            title="Surgical Pathway"
            steps={SURGICAL}
            numbered
          />

          <Pathway eyebrow="Pathway two" title="Non-Surgical Pathway" steps={NON_SURGICAL}>
            <div className={styles.focus}>
              <p className={styles.focusCore}>
                <span>Eyes</span>
                <span aria-hidden="true">&middot;</span>
                <span>Face</span>
                <span aria-hidden="true">&middot;</span>
                <span>Skin</span>
              </p>
              <ul className={styles.focusList}>
                {FOCUS.map((item) => (
                  <li key={item.label} className={styles.focusItem}>
                    <TpIcon name={item.icon} size={15} />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </Pathway>
        </div>

        <div className={styles.cta}>
          <Link href="/contact-cosmetic-eye-surgeon" className="tp-btn tp-btn-inverse">
            Book A Compatibility Call
            <span className="tp-btn-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 12h13M12.5 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
