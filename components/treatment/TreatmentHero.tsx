import Link from "next/link";
import { TpIcon } from "./TpIcon";
import type { BreadcrumbItem } from "./types";

export function TreatmentHero({
  breadcrumbItems,
  siteUrl,
  isSurgical,
  h1,
  subtitle,
  heroImage,
  heroImageAlt,
}: {
  breadcrumbItems: BreadcrumbItem[];
  siteUrl: string;
  isSurgical: boolean;
  h1: string;
  subtitle?: string;
  heroImage?: string;
  heroImageAlt: string;
}) {
  return (
    <section className="tp-hero">
      <style>{`
        .tp-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, var(--tp-lavender-050), var(--tp-paper) 78%);
        }
        .tp-hero-glow { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(2px); }
        .tp-hero-glow-a { top: -160px; right: -120px; width: 460px; height: 460px; background: radial-gradient(circle, rgba(139,128,196,0.30), transparent 70%); }
        .tp-hero-glow-b { bottom: -180px; left: -140px; width: 380px; height: 380px; background: radial-gradient(circle, rgba(188,160,221,0.22), transparent 70%); }
        .tp-hero-inner {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 3.5rem; align-items: center;
          padding: 3.5rem 1.5rem 4.5rem;
        }
        @media (max-width: 860px) {
          .tp-hero-inner { grid-template-columns: 1fr; padding-bottom: 3rem; }
        }
        .tp-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--tp-mist); flex-wrap: wrap; margin-bottom: 20px; }
        .tp-breadcrumb a { color: var(--tp-mist); text-decoration: none; }
        .tp-breadcrumb a:hover { color: var(--tp-indigo-700); }
        .tp-h1 { font-family: var(--tp-display); font-weight: 600; font-size: clamp(2rem, 4.2vw, 3.1rem); line-height: 1.14; letter-spacing: -0.01em; color: var(--tp-ink); margin: 18px 0 20px; }
        .tp-sub { font-size: 1.1875rem; line-height: 1.6; color: var(--tp-slate); max-width: 52ch; margin: 0 0 28px; }

        .tp-hero-right { position: relative; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
        .tp-hero-frame {
          position: relative; width: 100%; aspect-ratio: 4 / 3.1; border-radius: var(--tp-radius-xl);
          background: linear-gradient(150deg, var(--tp-lavender-200), var(--tp-lavender-050));
          box-shadow: var(--tp-shadow-md); overflow: hidden;
        }
        .tp-hero-frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; padding: 1.5rem; }
        .tp-hero-badge {
          position: absolute; top: 18px; left: 18px; z-index: 2;
          padding: 7px 14px; background: rgba(255,255,255,0.75); backdrop-filter: blur(8px);
          border-radius: 999px; font-size: 11.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--tp-indigo-700);
        }
        .tp-doctor-card {
          width: 100%; display: flex; gap: 14px; align-items: flex-start;
          background: #fff; border: 1px solid var(--tp-line); border-radius: var(--tp-radius-lg);
          padding: 1.1rem 1.25rem; box-shadow: var(--tp-shadow-sm);
        }
        .tp-doctor-card .tp-dot { flex-shrink: 0; width: 40px; height: 40px; border-radius: 12px; background: var(--tp-lavender-100); color: var(--tp-indigo-700); display: flex; align-items: center; justify-content: center; }
        .tp-doctor-card h5 { font-size: 12px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--tp-indigo-700); margin: 0 0 2px; }
        .tp-doctor-card small { font-size: 12px; color: var(--tp-slate); }
        .tp-doctor-card p { font-size: 12.5px; color: var(--tp-mist); margin: 0.3rem 0 0; line-height: 1.5; }
      `}</style>

      <div className="tp-hero-glow tp-hero-glow-a" />
      <div className="tp-hero-glow tp-hero-glow-b" />
      <div className="container tp-hero-inner">
        <div>
          <nav aria-label="Breadcrumb" className="tp-breadcrumb">
            {breadcrumbItems.map((item, index) => (
              <span key={item.url} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {index > 0 && <span aria-hidden="true">/</span>}
                {index === breadcrumbItems.length - 1 ? (
                  <span style={{ color: "var(--tp-slate)" }}>{item.name}</span>
                ) : (
                  <Link href={item.url.replace(siteUrl, "") || "/"}>{item.name}</Link>
                )}
              </span>
            ))}
          </nav>

          <span className="tp-eyebrow">
            <TpIcon name="eye" size={13} />
            {isSurgical ? "Surgical · Eyes" : "Non-Surgical · Eyes"}
          </span>

          <h1 className="tp-h1">{h1}</h1>

          {subtitle && <p className="tp-sub">{subtitle}</p>}

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link href="/self-test-survey" className="tp-btn tp-btn-primary">
              Take the Free Self-Test <TpIcon name="arrow" size={17} />
            </Link>
            <Link href="/contact" className="tp-btn tp-btn-secondary">Book Consultation</Link>
          </div>
        </div>

        <div className="tp-hero-right">
          <div className="tp-hero-frame">
            <span className="tp-hero-badge">Before &amp; After</span>
            {heroImage && <img src={heroImage} alt={heroImageAlt} />}
          </div>
          <div className="tp-doctor-card">
            <span className="tp-dot"><TpIcon name="sparkle" size={19} /></span>
            <div>
              <h5>Dr. Sabrina Shah—Desai</h5>
              <small>MS, FRCS (Ed) Ophth.</small>
              <p>Recognised as a top practitioner for eyes for eight consecutive years, 2018–2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
