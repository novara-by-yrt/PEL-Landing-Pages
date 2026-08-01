import Link from "next/link";
import { TpIcon } from "./TpIcon";
import styles from "./TreatmentPricing.module.css";

export function TreatmentPricing({ pricing, title }: { pricing: string[]; title: string }) {
  if (pricing.length === 0) return null;

  return (
    <section className="tp-section tp-tint">
      <div className={`container ${styles.tpPricingGrid}`}>
        <div className="tp-head">
          <span className="tp-eyebrow"><TpIcon name="shield" size={13} />Transparent pricing</span>
          <h2>{title} Cost in London</h2>
          <p>Prices are a guide; your surgeon confirms the total during consultation.</p>
        </div>
        <div className={styles.tpPricingCard}>
          {pricing.map((price, i) => {
            const priceMatch = price.match(/£[\d,]+/);
            return (
              <div key={i} className={styles.tpPriceRow}>
                <p>
                  {priceMatch ? (
                    <>
                      {price.slice(0, priceMatch.index)}
                      <span className={styles.tpPriceValue}>{priceMatch[0]}</span>
                      {price.slice((priceMatch.index ?? 0) + priceMatch[0].length)}
                    </>
                  ) : (
                    price
                  )}
                </p>
              </div>
            );
          })}
          <p className={styles.tpPriceNote}>Important: all cosmetic procedures incur 20% VAT. Fees are estimates and will be confirmed after medical consultation.</p>
          <div style={{ marginTop: "1.5rem" }}>
            <Link href="/contact" className="tp-btn tp-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Book a medical consultation <TpIcon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
