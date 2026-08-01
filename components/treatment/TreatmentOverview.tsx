import { TpIcon } from "./TpIcon";

export function TreatmentOverview({
  eyebrow = "Overview",
  heading,
  paragraphs,
  image,
  imageBadge,
}: {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  image?: string;
  imageBadge?: string;
}) {
  if (paragraphs.length === 0) return null;

  const hasImage = Boolean(image);

  return (
    <section className="tp-section">
      <style>{`
        .tp-overview-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 4rem; align-items: center; }
        .tp-overview-grid.no-image { grid-template-columns: 1fr; max-width: 780px; margin: 0 auto; }
        @media (max-width: 860px) { .tp-overview-grid { grid-template-columns: 1fr; } }
        .tp-overview-text p { font-size: 1.0625rem; line-height: 1.72; color: var(--tp-slate); margin: 1.1rem 0 0; }
        .tp-overview-text p:first-of-type { margin-top: 1.4rem; }
        .tp-overview-frame {
          position: relative; width: 100%; aspect-ratio: 4 / 3.2; border-radius: var(--tp-radius-xl);
          background: linear-gradient(150deg, var(--tp-lavender-200), var(--tp-lavender-050));
          box-shadow: var(--tp-shadow-md); overflow: hidden;
        }
        .tp-overview-frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .tp-overview-badge {
          position: absolute; top: 18px; left: 18px; z-index: 2;
          padding: 7px 14px; background: rgba(255,255,255,0.85); backdrop-filter: blur(8px);
          border-radius: 999px; font-size: 11.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--tp-indigo-700);
        }
      `}</style>
      <div className={`container tp-overview-grid${hasImage ? "" : " no-image"}`}>
        <div>
          <span className="tp-eyebrow"><TpIcon name="clipboard" size={13} />{eyebrow}</span>
          <h2 style={{ fontFamily: "var(--tp-display)", fontWeight: 600, fontSize: "clamp(1.6rem, 3.2vw, 2.35rem)", lineHeight: 1.18, letterSpacing: "-0.01em", color: "var(--tp-ink)", margin: "14px 0 0" }}>
            {heading}
          </h2>
          <div className="tp-overview-text">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {hasImage && (
          <div className="tp-overview-frame">
            {imageBadge && <span className="tp-overview-badge">{imageBadge}</span>}
            <img src={image} alt={heading} />
          </div>
        )}
      </div>
    </section>
  );
}
