import { TpIcon } from "./TpIcon";
import type { AdvantageItem } from "./types";

export function TreatmentAdvantages({ advantages, title }: { advantages: AdvantageItem[]; title: string }) {
  if (advantages.length === 0) return null;

  return (
    <section className="tp-section tp-fog">
      <style>{`
        .tp-benefits-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 2.25rem; margin-top: 3rem; }
        .tp-benefit { display: flex; flex-direction: column; gap: 12px; }
        .tp-benefit-icon { width: 48px; height: 48px; border-radius: var(--tp-radius-md); background: var(--tp-lavender-100); color: var(--tp-indigo-700); display: flex; align-items: center; justify-content: center; }
        .tp-benefit h3 { font-family: var(--tp-display); font-size: 1.2rem; font-weight: 600; color: var(--tp-ink); margin: 2px 0 0; }
        .tp-benefit p { font-size: 0.9375rem; color: var(--tp-slate); line-height: 1.6; margin: 0; }
      `}</style>
      <div className="container">
        <div className="tp-head tp-center">
          <span className="tp-eyebrow"><TpIcon name="sparkle" size={13} />Why choose this treatment</span>
          <h2>Advantages of {title} Treatment</h2>
        </div>
        <div className="tp-benefits-grid">
          {advantages.map((adv) => (
            <div key={adv.title} className="tp-benefit">
              <span className="tp-benefit-icon"><TpIcon name="check" size={21} /></span>
              <h3>{adv.title}</h3>
              {adv.description && <p>{adv.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
