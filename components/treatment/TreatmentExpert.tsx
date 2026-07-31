import Link from "next/link";

const AWARDS = [
  "Best Aesthetic Doctor — Safety in Beauty 2023",
  "Consultant Surgeon of the Year",
  "Best Surgical Result — Aesthetic Awards 2021",
  "Tatler Best Eye Surgeon 2019–2026",
];

export function TreatmentExpert() {
  return (
    <section className="tp-expert">
      <style>{`
        .tp-expert { padding: clamp(44px, 5.5vw, 88px) 0; background: linear-gradient(140deg, var(--tp-indigo-900), var(--tp-indigo-700)); color: #fff; position: relative; overflow: hidden; }
        .tp-expert::before { content: ''; position: absolute; top: -140px; right: -80px; width: 420px; height: 420px; border-radius: 50%; background: radial-gradient(circle, rgba(167,156,211,0.32), transparent 70%); }
        .tp-expert-inner { position: relative; display: grid; grid-template-columns: auto 1fr; gap: 3rem; align-items: center; }
        @media (max-width: 700px) { .tp-expert-inner { grid-template-columns: 1fr; } }
        .tp-expert-inner > img { width: 200px; height: 260px; object-fit: cover; border-radius: var(--tp-radius-lg); box-shadow: var(--tp-shadow-lg); }
        .tp-expert-content h2 { font-family: var(--tp-display); font-weight: 600; font-size: clamp(1.5rem, 3vw, 2rem); margin: 0 0 1rem; color: #fff; }
        .tp-expert-content p { font-size: 0.95rem; color: var(--tp-lavender-200); line-height: 1.7; margin: 0 0 1.1rem; }
        .tp-awards { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; }
        .tp-award { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.16); border-radius: 999px; padding: 0.3rem 0.8rem; font-size: 0.7rem; font-weight: 600; color: var(--tp-lavender-100); }
      `}</style>
      <div className="container tp-expert-inner">
        <img src="/uploads/2025/12/Dr-Sabrina2-1.png" alt="Dr Sabrina Shah-Desai" />
        <div className="tp-expert-content">
          <h2>Meet the Expert: Dr Sabrina Shah-Desai</h2>
          <p>Dr Sabrina Shah-Desai is the founder and Medical Director of Perfect Eyes Ltd. With over two decades of surgical and non-surgical experience, she is considered one of the safest, most experienced oculoplastic surgeons in the UK.</p>
          <p>
            Her extensive training, combined with her caring and empathetic nature, makes her a natural choice for patients seeking the very best care. Dr Sabrina appears consistently in <em>Tatler</em> magazine as one of the UK&apos;s &ldquo;Best Eye Surgeons&rdquo; and &ldquo;Top Doctors&rdquo; since 2019.
          </p>
          <Link href="/dr-sabrina-shah-desai" className="tp-btn tp-btn-inverse">Learn About Dr Sabrina</Link>
          <div className="tp-awards">
            {AWARDS.map((award) => (
              <span key={award} className="tp-award">{award}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
