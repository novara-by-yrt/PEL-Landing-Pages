import Link from "next/link";
import { TpIcon } from "./TpIcon";

export function TreatmentCTA() {
  return (
    <section className="tp-section">
      <style>{`
        .tp-cta-band {
          background: linear-gradient(140deg, var(--tp-indigo-900), var(--tp-indigo-600));
          border-radius: var(--tp-radius-xl); padding: clamp(2.25rem, 5vw, 4.5rem);
          display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 3rem; align-items: center;
          box-shadow: var(--tp-shadow-lg); position: relative; overflow: hidden;
        }
        @media (max-width: 860px) { .tp-cta-band { grid-template-columns: 1fr; } }
        .tp-cta-glow { position: absolute; top: -140px; right: -80px; width: 420px; height: 420px; border-radius: 50%; background: radial-gradient(circle, rgba(167,156,211,0.35), transparent 70%); }
        .tp-cta-band h2 { font-family: var(--tp-display); font-weight: 600; font-size: clamp(1.6rem, 3.4vw, 2.25rem); color: #fff; margin: 0 0 1.1rem; line-height: 1.2; }
        .tp-cta-band p { font-size: 1.0625rem; color: var(--tp-lavender-200); max-width: 460px; margin: 0 0 1.8rem; line-height: 1.6; }
        .tp-cta-info { position: relative; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.14); border-radius: var(--tp-radius-lg); padding: 1.6rem; }
        .tp-cta-info-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--tp-lavender-400); margin-bottom: 14px; }
        .tp-cta-info-row { display: flex; align-items: center; gap: 9px; font-size: 0.875rem; color: #fff; padding: 8px 0; }
      `}</style>
      <div className="container">
        <div className="tp-cta-band">
          <div className="tp-cta-glow" />
          <div style={{ position: "relative" }}>
            <h2>Book Your Consultation Today</h2>
            <p>Get personalised advice and expert care from our top medical professionals at 9 Harley Street, London.</p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/contact" className="tp-btn tp-btn-inverse">Book a Consultation <TpIcon name="arrow" size={17} /></Link>
              <a href="tel:+442074864886" className="tp-btn" style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}>
                <TpIcon name="phone" size={16} />020 7486 4886
              </a>
            </div>
          </div>
          <div className="tp-cta-info">
            <div className="tp-cta-info-label">Visit us</div>
            <div className="tp-cta-info-row"><TpIcon name="pin" size={15} />9 Harley Street, London</div>
            <div className="tp-cta-info-row"><TpIcon name="clock" size={15} />Mon–Fri, 9:30am–6pm</div>
          </div>
        </div>
      </div>
    </section>
  );
}
