"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { TpIcon } from "./TpIcon";
import type { FaqItem } from "@/lib/mdx";
import styles from "./TreatmentFAQ.module.css";

/**
 * Same accordion as components/home/HomeFaq.tsx — one panel open at a time,
 * animated with the `grid-template-rows: 0fr → 1fr` technique, side accent
 * line, plus/minus toggle. Kept as a separate component (rather than reusing
 * HomeFaq directly) because treatment pages need the per-title eyebrow, the
 * closing "ask a question" CTA, and HTML-formatted answers (existing FAQ
 * copy uses `<br/>`/`<strong>`), none of which the home page's FAQ carries.
 */
export function TreatmentFAQ({ faq, title }: { faq?: FaqItem[]; title: string }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  if (!faq || faq.length === 0) return null;

  return (
    <section className="tp-section tp-fog">
      <div className={`container ${styles.tpFaqGrid}`}>
        <div className={`tp-head ${styles.tpFaqIntro}`}>
          <span className="tp-eyebrow">
            <TpIcon name="quote" size={13} />
            Patient Questions About {title}
          </span>
          <h2>Frequently Asked Questions</h2>
          <span className={styles.tpFaqRule} aria-hidden="true" />
          {/* The heading column was otherwise empty beside a tall accordion. */}
          <p className={styles.tpFaqLead}>
            The questions patients ask most often, answered by the clinic. If yours
            isn&rsquo;t here, ask us directly - we would be delighted to help.
          </p>
        </div>
        <div>
          <ul className={styles.tpFaqList}>
            {faq.map((item, i) => {
              const open = i === openIndex;
              const panelId = `${baseId}-panel-${i}`;
              const buttonId = `${baseId}-button-${i}`;

              return (
                <li key={item.question} className={`${styles.tpFaqItem} ${open ? styles.tpFaqItemOpen : ""}`}>
                  <span className={styles.tpFaqLine} aria-hidden="true" />
                  <h3 className={styles.tpFaqQHeading}>
                    <button
                      type="button"
                      id={buttonId}
                      className={styles.tpFaqQ}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? -1 : i)}
                    >
                      <span>{item.question}</span>
                      <span className={styles.tpFaqToggle} aria-hidden="true">
                        <svg viewBox="0 0 24 24" className={styles.tpFaqToggleIcon}>
                          <path d="M5 12h14" strokeLinecap="round" />
                          <path d="M12 5v14" strokeLinecap="round" className={styles.tpFaqToggleBar} />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.tpFaqAnswerWrap}>
                    <div className={styles.tpFaqAnswerInner}>
                      <div className={styles.tpFaqA} dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={styles.tpFaqAsk}>
            <p>Call or email us today, we would be delighted to answer your questions.</p>
            <Link href="/contact" className="tp-btn tp-btn-primary">
              Ask a Question or Book an Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
