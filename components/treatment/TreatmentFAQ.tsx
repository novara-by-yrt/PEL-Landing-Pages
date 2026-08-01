import Link from "next/link";
import { TpIcon } from "./TpIcon";
import type { FaqItem } from "@/lib/mdx";
import styles from "./TreatmentFAQ.module.css";

export function TreatmentFAQ({ faq, title }: { faq?: FaqItem[]; title: string }) {
  if (!faq || faq.length === 0) return null;

  return (
    <section className="tp-section tp-fog">
      <div className={`container ${styles.tpFaqGrid}`}>
        <div className="tp-head">
          <span className="tp-eyebrow"><TpIcon name="quote" size={13} />Patient Questions About {title}</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div>
          <div className={styles.tpFaqList}>
            {faq.map((item, i) => (
              <details key={i} className={styles.tpFaqItem}>
                <summary className={styles.tpFaqQ}>
                  {item.question}
                  <span className={styles.tpFaqChev} aria-hidden="true"><TpIcon name="chevron" size={16} /></span>
                </summary>
                <div className={styles.tpFaqA} dangerouslySetInnerHTML={{ __html: item.answer }} />
              </details>
            ))}
          </div>
          <div className={styles.tpFaqAsk}>
            <p>Call or email us today, we would be delighted to answer your questions.</p>
            <Link href="/contact" className="tp-btn tp-btn-primary">
              Ask a Question or Book an Appointment <TpIcon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
