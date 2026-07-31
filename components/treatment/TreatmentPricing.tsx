import Link from "next/link";
import { TpIcon } from "./TpIcon";

export function TreatmentPricing({ pricing, title }: { pricing: string[]; title: string }) {
  if (pricing.length === 0) return null;

  return (
    <section className="tp-section tp-tint">
      <style>{`
        .tp-pricing-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 3rem; align-items: center; }
        @media (max-width: 860px) { .tp-pricing-grid { grid-template-columns: 1fr; } }
        .tp-pricing-card { background: #fff; border: 1px solid var(--tp-line); border-radius: var(--tp-radius-xl); padding: clamp(1.5rem, 3vw, 2.5rem); box-shadow: var(--tp-shadow-sm); }
        .tp-price-row { padding: 1rem 0; border-bottom: 1px solid var(--tp-hairline); }
        .tp-price-row:last-of-type { border-bottom: none; }
        .tp-price-row p { margin: 0; font-size: 0.9375rem; color: var(--tp-ink); line-height: 1.6; }
        .tp-price-value { font-family: var(--tp-display); font-weight: 600; color: var(--tp-indigo-700); }
        .tp-price-note { margin-top: 1.5rem; font-size: 0.8125rem; color: var(--tp-mist); font-style: italic; }
      `}</style>
      <div className="container tp-pricing-grid">
        <div className="tp-head">
          <span className="tp-eyebrow"><TpIcon name="shield" size={13} />Transparent pricing</span>
          <h2>{title} Cost in London</h2>
          <p>Prices are a guide; your surgeon confirms the total during consultation.</p>
        </div>
        <div className="tp-pricing-card">
          {pricing.map((price, i) => {
            const priceMatch = price.match(/£[\d,]+/);
            return (
              <div key={i} className="tp-price-row">
                <p>
                  {priceMatch ? (
                    <>
                      {price.slice(0, priceMatch.index)}
                      <span className="tp-price-value">{priceMatch[0]}</span>
                      {price.slice((priceMatch.index ?? 0) + priceMatch[0].length)}
                    </>
                  ) : (
                    price
                  )}
                </p>
              </div>
            );
          })}
          <p className="tp-price-note">Important: all cosmetic procedures incur 20% VAT. Fees are estimates and will be confirmed after medical consultation.</p>
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
