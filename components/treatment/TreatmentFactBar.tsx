import { TpIcon, glanceIconKey } from "./TpIcon";
import type { GlanceItem } from "./types";

export function TreatmentFactBar({ glance, title }: { glance: GlanceItem[]; title: string }) {
  if (glance.length === 0) return null;

  return (
    <section className="tp-factbar">
      <style>{`
        .tp-factbar { border-top: 1px solid var(--tp-hairline); border-bottom: 1px solid var(--tp-hairline); background: var(--tp-paper); padding: 2.5rem 0; }
        .tp-factbar-head { text-align: center; margin-bottom: 2rem; }
        .tp-factbar-head h2 { font-family: var(--tp-display); font-weight: 600; font-size: clamp(1.4rem, 2.8vw, 1.9rem); color: var(--tp-ink); margin: 10px 0 0; }
        .tp-factbar-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem; }
        .tp-fact { display: flex; gap: 12px; align-items: center; }
        .tp-fact-icon { flex-shrink: 0; width: 42px; height: 42px; border-radius: var(--tp-radius-md); background: var(--tp-lavender-050); color: var(--tp-indigo-700); display: flex; align-items: center; justify-content: center; }
        .tp-fact-label { display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--tp-mist); }
        .tp-fact-value { display: block; font-family: var(--tp-display); font-size: 1.0625rem; font-weight: 600; color: var(--tp-ink); line-height: 1.3; margin-top: 2px; }
      `}</style>
      <div className="container">
        <div className="tp-factbar-head">
          <span className="tp-eyebrow"><TpIcon name="clock" size={13} />Treatment overview</span>
          <h2>{title} at a Glance</h2>
        </div>
        <div className="tp-factbar-grid">
          {glance.map((item) => (
            <div key={item.label} className="tp-fact">
              <span className="tp-fact-icon"><TpIcon name={glanceIconKey(item.label)} size={20} /></span>
              <span>
                <span className="tp-fact-label">{item.label}</span>
                <span className="tp-fact-value">{item.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
