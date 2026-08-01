import Link from "next/link";
import { TpIcon } from "./TpIcon";

export function PageHero({
  breadcrumbItems,
  siteUrl,
  eyebrow,
  h1,
  lead,
  heroImage,
  heroImageAlt,
  heroBadge,
}: {
  breadcrumbItems: { name: string; url: string }[];
  siteUrl: string;
  eyebrow?: string;
  h1: string;
  lead?: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroBadge?: string;
}) {
  const hasImage = Boolean(heroImage);

  return (
    <section className="tp-page-hero">
      <style>{`
        .tp-page-hero {
          position: relative; overflow: hidden; color: #fff;
          background:
            linear-gradient(160deg, rgba(18,16,54,0.92), rgba(69,61,155,0.85)),
            url('/uploads/2024/07/blog-bg.jpg') center / cover no-repeat;
          padding: clamp(3.5rem, 7vw, 5.5rem) 1.5rem 3rem;
        }
        .tp-page-hero-glow { position: absolute; top: -180px; right: -100px; width: 520px; height: 340px; border-radius: 50%; background: radial-gradient(circle, rgba(188,160,221,0.32), transparent 70%); pointer-events: none; }
        .tp-page-hero-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; }
        .tp-page-hero-inner.has-image { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 3rem; align-items: center; }
        @media (max-width: 860px) { .tp-page-hero-inner.has-image { grid-template-columns: 1fr; } }
        .tp-page-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 24px; flex-wrap: wrap; }
        .tp-page-breadcrumb a { color: rgba(255,255,255,0.75); text-decoration: none; }
        .tp-page-breadcrumb a:hover { color: #fff; }
        .tp-page-hero h1 { font-family: var(--tp-display); font-weight: 600; font-size: clamp(2.1rem, 5vw, 3.25rem); line-height: 1.15; color: #fff; margin: 16px 0 0; max-width: 26ch; }
        .tp-page-lead { font-size: 1.0625rem; color: rgba(255,255,255,0.82); max-width: 62ch; margin: 1.1rem 0 0; line-height: 1.6; }
        .tp-page-hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 28px; }

        .tp-page-hero-frame {
          position: relative; width: 100%; aspect-ratio: 4 / 3.2; border-radius: var(--tp-radius-xl);
          background: linear-gradient(150deg, var(--tp-lavender-200), var(--tp-lavender-050));
          box-shadow: var(--tp-shadow-lg); overflow: hidden;
        }
        .tp-page-hero-frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .tp-page-hero-badge {
          position: absolute; top: 18px; left: 18px; z-index: 2;
          padding: 7px 14px; background: rgba(255,255,255,0.85); backdrop-filter: blur(8px);
          border-radius: 999px; font-size: 11.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--tp-indigo-700);
        }
      `}</style>

      <div className="tp-page-hero-glow" />
      <div className={`tp-page-hero-inner${hasImage ? " has-image" : ""}`}>
        <div>
          <nav aria-label="Breadcrumb" className="tp-page-breadcrumb">
            {breadcrumbItems.map((item, index) => (
              <span key={`${item.url}-${index}`} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {index > 0 && <span aria-hidden="true">/</span>}
                {index === breadcrumbItems.length - 1 || !item.url ? (
                  <span style={{ color: "rgba(255,255,255,0.9)" }}>{item.name}</span>
                ) : (
                  <Link href={item.url.replace(siteUrl, "") || "/"}>{item.name}</Link>
                )}
              </span>
            ))}
          </nav>

          {eyebrow && (
            <span className="tp-eyebrow">
              <TpIcon name="sparkle" size={13} />
              {eyebrow}
            </span>
          )}

          <h1>{h1}</h1>

          {lead && <p className="tp-page-lead">{lead}</p>}

          {hasImage && (
            <div className="tp-page-hero-ctas">
              <Link href="/self-test-survey" className="tp-btn tp-btn-inverse">
                Take the Eyelid Surgery Test <TpIcon name="arrow" size={17} />
              </Link>
              <Link href="/contact" className="tp-btn" style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>
                Book a Consultation
              </Link>
            </div>
          )}
        </div>

        {hasImage && (
          <div className="tp-page-hero-frame">
            {heroBadge && <span className="tp-page-hero-badge">{heroBadge}</span>}
            <img src={heroImage} alt={heroImageAlt || h1} />
          </div>
        )}
      </div>
    </section>
  );
}
