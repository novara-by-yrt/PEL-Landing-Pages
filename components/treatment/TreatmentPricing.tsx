import Link from "next/link";
import { TpIcon } from "./TpIcon";
import type { PriceItem } from "./types";
import styles from "./TreatmentPricing.module.css";

const DEFAULT_LEAD = "Prices are a guide; your surgeon confirms the total during consultation.";

/** Pulls the figure out of a sentence-form price line so it can be set apart. */
function SentenceRow({ text }: { text: string }) {
  const match = text.match(/£[\d,]+/);
  if (!match) return <p className={styles.tpPriceSentence}>{text}</p>;
  const start = match.index ?? 0;
  return (
    <p className={styles.tpPriceSentence}>
      {text.slice(0, start)}
      <span className={styles.tpPriceValue}>{match[0]}</span>
      {text.slice(start + match[0].length)}
    </p>
  );
}

export function TreatmentPricing({
  pricing,
  title,
  pricingTitle,
  pricingLead,
}: {
  pricing: PriceItem[];
  title: string;
  pricingTitle?: string;
  pricingLead?: string;
}) {
  if (pricing.length === 0) return null;

  return (
    <section className={`tp-section tp-tint ${styles.tpPricing}`} aria-labelledby="pricing-title">
      <span className={styles.tpPricingGlow} aria-hidden="true" />

      <div className={`container ${styles.tpPricingGrid}`}>
        <div className="tp-head">
          <span className="tp-eyebrow">
            <TpIcon name="shield" size={13} />
            Transparent pricing
          </span>
          <h2 id="pricing-title">{pricingTitle || title} Cost in London</h2>
          <span className={styles.tpPricingRule} aria-hidden="true" />
          <p>{pricingLead || DEFAULT_LEAD}</p>
        </div>

        <div className={styles.tpPricingCard}>
          <ul className={styles.tpPriceList}>
            {pricing.map((item, i) => (
              <li key={i} className={styles.tpPriceRow}>
                {typeof item === "string" ? (
                  <SentenceRow text={item} />
                ) : (
                  <>
                    <span className={styles.tpPriceHead}>
                      <span className={styles.tpPriceName}>{item.name}</span>
                      <span className={styles.tpPriceValue}>{item.price}</span>
                    </span>
                    {item.note && <span className={styles.tpPriceNoteInline}>{item.note}</span>}
                  </>
                )}
              </li>
            ))}
          </ul>

          <p className={styles.tpPriceNote}>
            <span className={styles.tpPriceNoteIcon} aria-hidden="true">
              <TpIcon name="shield" size={15} />
            </span>
            <span>
              <strong>Important:</strong> all cosmetic procedures incur 20% VAT. Fees are estimates
              and will be confirmed after medical consultation.
            </span>
          </p>

          <Link href="/contact" className={`tp-btn tp-btn-primary tp-btn-block ${styles.tpPriceCta}`}>
            Book a medical consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
