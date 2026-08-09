"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";
import styles from "./PatientJourney.module.css";

/**
 * The Perfect360™ patient journey, following the clinic's Patient Journey
 * sheet: one shared consultation with Dr Shah-Desai, which then branches into
 * a surgical and a non-surgical pathway.
 *
 * The two pathways are a tab set — picking one reveals its steps. Built on
 * the WAI-ARIA tabs pattern rather than plain buttons, so the arrow keys move
 * between pathways, Home/End jump to the ends, and each panel is announced as
 * belonging to the pathway that opened it.
 */

type Step = {
  /** Icon name from TpIcon. */
  icon: string;
  title: string;
  detail?: string[];
};

type Pathway = {
  id: string;
  title: string;
  icon: string;
  steps: Step[];
  /** Shown under the steps — only the non-surgical pathway has these. */
  focus?: { icon: string; label: string }[];
};

/** The five things the first consultation covers. */
const CONSULTATION = [
  "Comprehensive facial and periocular assessment",
  "Medical history & photography",
  "Diagnosis",
  "Personalised treatment recommendations",
  "Written consultation letter with treatment plan",
];

const PATHWAYS: Pathway[] = [
  {
    id: "surgical",
    title: "Surgical Pathway",
    icon: "pulse",
    steps: [
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
    ],
  },
  {
    id: "non-surgical",
    title: "Non-Surgical Pathway",
    icon: "sparkle",
    steps: [
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
    ],
    focus: [
      { icon: "pulse", label: "Regenerative medicine" },
      { icon: "sparkle", label: "Laser treatments" },
      { icon: "plus", label: "Injectables" },
      { icon: "shield", label: "Skin health maintenance" },
      { icon: "check", label: "Medical skincare" },
    ],
  },
];

export default function PatientJourney() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = (i: number) => `${baseId}-panel-${i}`;

  /* Arrow keys move between pathways; Home/End jump to the ends. Moving focus
     also selects, which is the expected behaviour for tabs whose panels are
     already in the document. */
  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const last = PATHWAYS.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = active === 0 ? last : active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

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

        <p className={styles.pick} id={`${baseId}-pick`}>
          Choose a pathway.
        </p>

        <div
          className={styles.tabs}
          role="tablist"
          aria-labelledby={`${baseId}-pick`}
        >
          {PATHWAYS.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={tabId(i)}
                aria-selected={selected}
                aria-controls={panelId(i)}
                tabIndex={selected ? 0 : -1}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
              >
                <span className={styles.tabIcon} aria-hidden="true">
                  <TpIcon name={item.icon} size={19} />
                </span>
                <span className={styles.tabText}>
                  <span className={styles.tabTitle}>{item.title}</span>
                </span>
                <span className={styles.tabMark} aria-hidden="true">
                  <TpIcon name="check" size={15} />
                </span>
              </button>
            );
          })}
        </div>

        {PATHWAYS.map((item, i) => (
          <div
            key={item.id}
            role="tabpanel"
            id={panelId(i)}
            aria-labelledby={tabId(i)}
            hidden={i !== active}
            tabIndex={0}
            className={styles.panel}
          >
            {i === active ? (
              <div className={styles.panelInner}>
                <ol className={styles.steps}>
                  {item.steps.map((step, stepIndex) => (
                    <li key={step.title} className={styles.step}>
                      <span className={styles.stepMarker} aria-hidden="true">
                        <span className={styles.stepNumber}>{stepIndex + 1}</span>
                      </span>
                      <div className={styles.stepBody}>
                        <p className={styles.stepTitle}>
                          <TpIcon name={step.icon} size={16} />
                          {step.title}
                        </p>
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

                {item.focus ? (
                  <div className={styles.focus}>
                    <p className={styles.focusCore}>
                      <span>Eyes</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>Face</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>Skin</span>
                    </p>
                    <ul className={styles.focusList}>
                      {item.focus.map((entry) => (
                        <li key={entry.label} className={styles.focusItem}>
                          <TpIcon name={entry.icon} size={15} />
                          {entry.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ))}

        <div className={styles.cta}>
          <Link href="/contact-cosmetic-eye-surgeon" className="tp-btn tp-btn-inverse">
            Book a Consultation
            <span className="tp-btn-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 12h13M12.5 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* The pathway names, so the section still reads completely without
          JavaScript and for crawlers that do not run it. */}
      <noscript>
        <div className="container">
          {PATHWAYS.map((item) => (
            <div key={item.id} className={styles.panelInner}>
              <h3 className={styles.tabTitle}>{item.title}</h3>
              <ol className={styles.steps}>
                {item.steps.map((step, stepIndex) => (
                  <li key={step.title} className={styles.step}>
                    <span className={styles.stepMarker} aria-hidden="true">
                      <span className={styles.stepNumber}>{stepIndex + 1}</span>
                    </span>
                    <div className={styles.stepBody}>
                      <p className={styles.stepTitle}>{step.title}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </noscript>
    </section>
  );
}
