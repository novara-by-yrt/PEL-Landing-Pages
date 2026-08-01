import { TpIcon } from "./TpIcon";
import type { SimilarTreatmentItem } from "./types";

export function TreatmentSimilar({
  items,
  eyebrow = "You may also consider",
  heading = "Similar Treatments",
}: {
  items: SimilarTreatmentItem[];
  eyebrow?: string;
  heading?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="tp-section">
      <style>{`
        .tp-similar-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; margin-top: 2.5rem; }
        .tp-similar-card { border-radius: var(--tp-radius-lg); overflow: hidden; background: #fff; border: 1px solid var(--tp-line); box-shadow: var(--tp-shadow-xs); text-decoration: none; color: inherit; display: block; transition: transform 240ms var(--tp-ease), box-shadow 240ms var(--tp-ease); }
        .tp-similar-card:hover { transform: translateY(-4px); box-shadow: var(--tp-shadow-md); }
        .tp-similar-img { aspect-ratio: 4/3; position: relative; overflow: hidden; background: var(--tp-lavender-050); }
        .tp-similar-img img { width: 100%; height: 100%; object-fit: cover; }
        .tp-similar-body { padding: 1rem 1.1rem; }
        .tp-similar-title { font-size: 0.9375rem; font-weight: 600; color: var(--tp-ink); }
        .tp-similar-desc { font-size: 0.8125rem; color: var(--tp-slate); margin-top: 4px; line-height: 1.5; }
      `}</style>
      <div className="container">
        <div className="tp-head">
          <span className="tp-eyebrow"><TpIcon name="compass" size={13} />{eyebrow}</span>
          <h2>{heading}</h2>
        </div>
        <div className="tp-similar-grid">
          {items.map((t) => {
            const card = (
              <>
                <div className="tp-similar-img">
                  <img src={t.image} alt={t.title} />
                </div>
                <div className="tp-similar-body">
                  <div className="tp-similar-title">{t.title}</div>
                  {t.description && <div className="tp-similar-desc">{t.description}</div>}
                </div>
              </>
            );
            return t.href ? (
              <a key={t.title} href={t.href} className="tp-similar-card">{card}</a>
            ) : (
              <div key={t.title} className="tp-similar-card">{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
