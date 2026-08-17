"use client";

import { useId, useState } from "react";
import { TpIcon } from "@/components/treatment/TpIcon";
import styles from "./HomeFaq.module.css";

export type HomeFaqItem = { question: string; answer: string };

/**
 * Home-page FAQ accordion.
 *
 * One panel is open at a time (the first by default), matching the design.
 * The open panel grows an accent line down its leading edge — see the
 * `.line` rule, which is the "side line" animation.
 *
 * This is a client component because the answer height is animated with the
 * `grid-template-rows: 0fr → 1fr` technique, which needs the closed panel to
 * stay in the DOM. A `<details>` element hides its content outright when
 * closed, so it cannot transition.
 */
export default function HomeFaq({
  items,
  eyebrow = "Good to know",
  title = "Your questions, answered",
  lead = "Still unsure? Our team is glad to talk you through anything before you book.",
  /* Treatment FAQ questions and answers arrive as HTML from MDX (entities
     included); the home page's are plain text. Both render through the same
     panel. */
  contentIsHtml = false,
  footer,
  /* Home and treatment pages put the intro copy in its own sticky column
     beside the panels. Blog posts already have a title, intro paragraph and
     CTA sidebar of their own, so a second intro column there is redundant —
     this keeps the panels but drops them to one full-width column instead. */
  fullWidth = false,
}: {
  items: HomeFaqItem[];
  eyebrow?: string;
  title?: string;
  lead?: string;
  contentIsHtml?: boolean;
  footer?: React.ReactNode;
  fullWidth?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  if (items.length === 0) return null;

  return (
    <section className={styles.faq} aria-labelledby={`${baseId}-title`}>
      <div className="container">
        <div className={`${styles.grid} ${fullWidth ? styles.gridFullWidth : ""}`}>
          <div className={styles.intro}>
            <span className={styles.eyebrow}>
              <TpIcon name="shield" size={13} />
              {eyebrow}
            </span>
            <h2 id={`${baseId}-title`} className={styles.title}>
              {title}
            </h2>
            <p className={styles.lead}>{lead}</p>
            {footer && <div className={styles.footer}>{footer}</div>}
          </div>

          <ul className={styles.list}>
            {items.map((item, i) => {
              const open = i === openIndex;
              const panelId = `${baseId}-panel-${i}`;
              const buttonId = `${baseId}-button-${i}`;

              return (
                <li
                  key={item.question}
                  className={`${styles.item} ${open ? styles.itemOpen : ""}`}
                >
                  <span className={styles.line} aria-hidden="true" />
                  <h3 className={styles.questionHeading}>
                    <button
                      type="button"
                      id={buttonId}
                      className={styles.question}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? -1 : i)}
                    >
                      {contentIsHtml ? (
                        <span dangerouslySetInnerHTML={{ __html: item.question }} />
                      ) : (
                        <span>{item.question}</span>
                      )}
                      <span className={styles.toggle} aria-hidden="true">
                        <svg viewBox="0 0 24 24" className={styles.toggleIcon}>
                          <path d="M5 12h14" strokeLinecap="round" />
                          <path d="M12 5v14" strokeLinecap="round" className={styles.toggleBar} />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={styles.answerWrap}
                  >
                    <div className={styles.answerInner}>
                      {contentIsHtml ? (
                        <div
                          className={styles.answer}
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        />
                      ) : (
                        <p className={styles.answer}>{item.answer}</p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
