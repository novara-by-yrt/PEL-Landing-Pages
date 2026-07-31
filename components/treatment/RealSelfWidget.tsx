import { TpIcon } from "./TpIcon";

// Static snapshot of the doctor's public RealSelf trust widget — same on every
// treatment page (rating + a couple of highlighted reviews/answers), so it's
// hardcoded here once rather than threaded through per-page treatment data.
const PROFILE_URL = "https://www.realself.com/dr/sabrina-shah-desai-london-united-kingdom";

const REVIEWS = [
  {
    title: "Thrilled with Ptosis Repair Results",
    snippet: "I highly recommend Dr. Sabrina and trust her completely! The results from my ptosis repair are perfect. Dr. Sabrina and her team were a pleasure to work…",
    href: "https://www.realself.com/review/ptosis-surgery-thrilled-ptosis-repair-results",
  },
  {
    title: "Lower Blepharoplasty for Festoons 2 Weeks Ago",
    snippet: "I have had festoons since I was a child- I have literally tried every non surgical treatment available to remove them. I finally took the plunge and booked…",
    href: "https://www.realself.com/review/eyelid-surgery-blepharoplasty-festoons-weeks",
  },
];

const ANSWERS = [
  {
    title: "Does ptosis also cause face asymmetry? (Photo)",
    snippet: "I would recommend you have a review with an experienced oculoplastic surgeon to assess the ptosis, evaluate the squint and eyeball (globe) position. If the…",
    href: "https://www.realself.com/question/big-indian-ny-ptosis-caused-face-asymetry",
  },
  {
    title: "Considering Plexr (plasma) for upper bleph that went wrong. Do you recommend this treatment? (Photo)",
    snippet: "Hello, from your picture it is difficult to assess what bothers you more - the mild ptosis, excess upper lid skin fold, or hollow upper eyelids after your…",
    href: "https://www.realself.com/question/california-ca-plexr-plasma-upper-blep-wrong",
  },
  {
    title: "Do I need eyelid surgery or Plexr? (Photo)",
    snippet: "Plexr is very good for tightening excess eyelid skin to give a visible upper eyelid platform. Generally patients with thin crepey skin get good results with…",
    href: "https://www.realself.com/question/houston-tx-eyelid-surgery-plexr",
  },
];

export function RealSelfWidget() {
  return (
    <section className="tp-section tp-fog">
      <style>{`
        .tp-rs-header { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 2rem; }
        .tp-rs-rating { display: flex; align-items: center; gap: 10px; }
        .tp-rs-stars { display: flex; gap: 2px; color: var(--tp-gold); }
        .tp-rs-rating-text { font-family: var(--tp-display); font-size: 1.1rem; font-weight: 600; color: var(--tp-ink); }
        .tp-rs-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        @media (max-width: 860px) { .tp-rs-cols { grid-template-columns: 1fr; } }
        .tp-rs-list { display: flex; flex-direction: column; gap: 1rem; }
        .tp-rs-card { background: #fff; border: 1px solid var(--tp-line); border-radius: var(--tp-radius-md); padding: 1.25rem 1.4rem; box-shadow: var(--tp-shadow-xs); text-decoration: none; display: block; }
        .tp-rs-card h4 { margin: 0 0 6px; font-family: var(--tp-display); font-size: 1rem; font-weight: 600; color: var(--tp-ink); }
        .tp-rs-card p { margin: 0; font-size: 0.875rem; color: var(--tp-slate); line-height: 1.55; }
        .tp-rs-col-title { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--tp-lavender-500); margin-bottom: 1rem; }
        .tp-rs-more { display: inline-flex; align-items: center; gap: 6px; margin-top: 1.1rem; font-size: 0.8125rem; font-weight: 600; color: var(--tp-indigo-700); text-decoration: none; }
        .tp-rs-disclaimer { margin-top: 2rem; font-size: 0.75rem; color: var(--tp-mist); font-style: italic; }
      `}</style>
      <div className="container">
        <div className="tp-rs-header">
          <div>
            <span className="tp-eyebrow"><TpIcon name="shield" size={13} />Verified on RealSelf</span>
            <h2 style={{ fontFamily: "var(--tp-display)", fontWeight: 600, fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)", margin: "10px 0 0", color: "var(--tp-ink)" }}>
              Sabrina Shah-Desai, MS, FRCS
            </h2>
          </div>
          <a href={`${PROFILE_URL}#reviews`} target="_blank" rel="noopener noreferrer nofollow" className="tp-rs-rating">
            <span className="tp-rs-stars">
              {Array.from({ length: 5 }).map((_, i) => <TpIcon key={i} name="star" size={16} filled />)}
            </span>
            <span className="tp-rs-rating-text">4.9 from 218 reviews</span>
          </a>
        </div>

        <div className="tp-rs-cols">
          <div>
            <div className="tp-rs-col-title">Recent reviews</div>
            <div className="tp-rs-list">
              {REVIEWS.map((r) => (
                <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer nofollow" className="tp-rs-card">
                  <h4>{r.title}</h4>
                  <p>{r.snippet}</p>
                </a>
              ))}
            </div>
            <a href={`${PROFILE_URL}#reviews`} target="_blank" rel="noopener noreferrer nofollow" className="tp-rs-more">
              Read all RealSelf reviews <TpIcon name="arrow" size={15} />
            </a>
          </div>
          <div>
            <div className="tp-rs-col-title">Q&amp;A with Dr Sabrina</div>
            <div className="tp-rs-list">
              {ANSWERS.map((a) => (
                <a key={a.href} href={a.href} target="_blank" rel="noopener noreferrer nofollow" className="tp-rs-card">
                  <h4>{a.title}</h4>
                  <p>{a.snippet}</p>
                </a>
              ))}
            </div>
            <a href={`${PROFILE_URL}#qa`} target="_blank" rel="noopener noreferrer nofollow" className="tp-rs-more">
              View all answers <TpIcon name="arrow" size={15} />
            </a>
          </div>
        </div>

        <p className="tp-rs-disclaimer">Disclaimer: reviews shown here are curated from RealSelf. Results and patient experience may vary.</p>
      </div>
    </section>
  );
}
