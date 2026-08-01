import Link from "next/link";
import { TpIcon } from "./TpIcon";
import type { FaqItem } from "@/lib/mdx";

export function TreatmentFAQ({ faq, title }: { faq?: FaqItem[]; title: string }) {
  if (!faq || faq.length === 0) return null;

  return (
    <section className="tp-section tp-fog">
      <style>{`
        .tp-faq-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 4rem; }
        @media (max-width: 860px) { .tp-faq-grid { grid-template-columns: 1fr; gap: 2rem; } }
        .tp-faq-list { display: flex; flex-direction: column; }
        .tp-faq-item { border-bottom: 1px solid var(--tp-hairline); }
        .tp-faq-item:first-child { border-top: 1px solid var(--tp-hairline); }
        .tp-faq-q { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.25rem 0; cursor: pointer; list-style: none; font-family: var(--tp-display); font-weight: 600; font-size: 1.05rem; color: var(--tp-ink); }
        .tp-faq-q::-webkit-details-marker { display: none; }
        .tp-faq-chev { flex-shrink: 0; color: var(--tp-indigo-700); transition: transform 220ms var(--tp-ease); }
        .tp-faq-item[open] .tp-faq-chev { transform: rotate(90deg); }
        .tp-faq-a { padding: 0 0 1.5rem; font-size: 0.9375rem; color: var(--tp-slate); line-height: 1.7; }
        .tp-faq-a p { margin: 0 0 0.75rem; }
        .tp-faq-a p:last-child { margin-bottom: 0; }
        .tp-faq-a ul, .tp-faq-a ol { margin: 0 0 0.75rem; padding-left: 1.25rem; }
        .tp-faq-a ul { list-style: disc; }
        .tp-faq-a ol { list-style: decimal; }
        .tp-faq-a li { margin-bottom: 0.35rem; }
        .tp-faq-ask { margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid var(--tp-hairline); display: flex; flex-direction: column; align-items: flex-start; gap: 1rem; }
        .tp-faq-ask p { margin: 0; font-size: 0.9375rem; color: var(--tp-slate); }
      `}</style>
      <div className="container tp-faq-grid">
        <div className="tp-head">
          <span className="tp-eyebrow"><TpIcon name="quote" size={13} />Patient Questions About {title}</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div>
          <div className="tp-faq-list">
            {faq.map((item, i) => (
              <details key={i} className="tp-faq-item">
                <summary className="tp-faq-q">
                  {item.question}
                  <span className="tp-faq-chev" aria-hidden="true"><TpIcon name="chevron" size={16} /></span>
                </summary>
                <div className="tp-faq-a" dangerouslySetInnerHTML={{ __html: item.answer }} />
              </details>
            ))}
          </div>
          <div className="tp-faq-ask">
            <p>Call or email us today, we would be delighted to answer your questions.</p>
            <Link href="/contact" className="tp-btn tp-btn-primary">
              Ask a Question or Book an Appointment <TpIcon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
