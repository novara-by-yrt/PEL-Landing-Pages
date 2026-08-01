import { TpIcon } from "./TpIcon";
import type { SimilarTreatmentItem } from "./types";

interface SpotlightItem extends SimilarTreatmentItem {
  priceFrom?: string;
  facts?: { label: string; value: string }[];
}

export function TreatmentSpotlight({
  items,
  eyebrow = "Treatment options",
  heading = "Recommended treatment",
}: {
  items: SpotlightItem[];
  eyebrow?: string;
  heading?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="tp-section tp-fog">
      <style>{`
        .tp-spotlight-list { display: flex; flex-direction: column; gap: 1.75rem; margin-top: 2.75rem; }
        .tp-spotlight {
          display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 0;
          background: #fff; border: 1px solid var(--tp-line); border-radius: var(--tp-radius-xl);
          overflow: hidden; box-shadow: var(--tp-shadow-sm);
          transition: transform 260ms var(--tp-ease), box-shadow 260ms var(--tp-ease);
        }
        .tp-spotlight:hover { transform: translateY(-3px); box-shadow: var(--tp-shadow-md); }
        @media (max-width: 780px) { .tp-spotlight { grid-template-columns: 1fr; } }
        .tp-spotlight-media { position: relative; min-height: 280px; overflow: hidden; background: var(--tp-lavender-050); }
        .tp-spotlight-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .tp-spotlight-body { padding: clamp(1.75rem, 3vw, 2.75rem); display: flex; flex-direction: column; }
        .tp-spotlight-tag {
          align-self: flex-start; display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 12px; border-radius: 999px; background: var(--tp-lavender-100); color: var(--tp-indigo-700);
          font-size: 11.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1rem;
        }
        .tp-spotlight-body h3 { font-family: var(--tp-display); font-weight: 600; font-size: clamp(1.35rem, 2.2vw, 1.65rem); color: var(--tp-ink); margin: 0 0 0.85rem; line-height: 1.25; }
        .tp-spotlight-body p { font-size: 0.9375rem; color: var(--tp-slate); line-height: 1.65; margin: 0 0 1.5rem; }
        .tp-spotlight-facts { display: flex; flex-wrap: wrap; gap: 1.5rem; padding: 1.25rem 0; margin-bottom: 1.5rem; border-top: 1px solid var(--tp-hairline); border-bottom: 1px solid var(--tp-hairline); }
        .tp-spotlight-fact-label { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--tp-mist); margin-bottom: 3px; }
        .tp-spotlight-fact-value { font-family: var(--tp-display); font-size: 1.05rem; font-weight: 600; color: var(--tp-ink); }
        .tp-spotlight-footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-top: auto; }
        .tp-spotlight-price { display: flex; flex-direction: column; }
        .tp-spotlight-price-label { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--tp-mist); }
        .tp-spotlight-price-value { font-family: var(--tp-display); font-size: 1.4rem; font-weight: 600; color: var(--tp-indigo-700); }
      `}</style>
      <div className="container">
        <div className="tp-head">
          <span className="tp-eyebrow"><TpIcon name="compass" size={13} />{eyebrow}</span>
          <h2>{heading}</h2>
        </div>

        <div className="tp-spotlight-list">
          {items.map((t) => (
            <div key={t.title} className="tp-spotlight">
              <div className="tp-spotlight-media">
                <img src={t.image} alt={t.title} />
              </div>
              <div className="tp-spotlight-body">
                <span className="tp-spotlight-tag"><TpIcon name="shield" size={13} />Recommended Procedure</span>
                <h3>{t.title}</h3>
                {t.description && <p>{t.description}</p>}

                {t.facts && t.facts.length > 0 && (
                  <div className="tp-spotlight-facts">
                    {t.facts.map((f) => (
                      <div key={f.label}>
                        <div className="tp-spotlight-fact-label">{f.label}</div>
                        <div className="tp-spotlight-fact-value">{f.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="tp-spotlight-footer">
                  {t.priceFrom && (
                    <div className="tp-spotlight-price">
                      <span className="tp-spotlight-price-label">Guide price</span>
                      <span className="tp-spotlight-price-value">{t.priceFrom}</span>
                    </div>
                  )}
                  {t.href && (
                    <a href={t.href} className="tp-btn tp-btn-primary">
                      View Treatment Details <TpIcon name="arrow" size={17} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
