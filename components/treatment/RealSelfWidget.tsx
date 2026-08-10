import { TpIcon } from "./TpIcon";
import styles from "./RealSelfWidget.module.css";

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
      <div className="container">
        <div className={styles.tpRsHeader}>
          <div>
            <span className="tp-eyebrow"><TpIcon name="shield" size={13} />Verified on RealSelf</span>
            <h2 style={{ fontFamily: "var(--tp-display)", fontWeight: 600, fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)", margin: "10px 0 0", color: "var(--tp-ink)" }}>
              Sabrina Shah-Desai, MS, FRCS
            </h2>
          </div>
          <a href={`${PROFILE_URL}#reviews`} target="_blank" rel="noopener noreferrer nofollow" className={styles.tpRsRating}>
            <span className={styles.tpRsStars}>
              {Array.from({ length: 5 }).map((_, i) => <TpIcon key={i} name="star" size={16} filled />)}
            </span>
            <span className={styles.tpRsRatingText}>4.9 from 218 reviews</span>
          </a>
        </div>

        <div className={styles.tpRsCols}>
          <div>
            <div className={styles.tpRsColTitle}>Recent reviews</div>
            <div className={styles.tpRsList}>
              {REVIEWS.map((r) => (
                <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer nofollow" className={styles.tpRsCard}>
                  <h4>{r.title}</h4>
                  <p>{r.snippet}</p>
                </a>
              ))}
            </div>
            <a href={`${PROFILE_URL}#reviews`} target="_blank" rel="noopener noreferrer nofollow" className={styles.tpRsMore}>
              Read all RealSelf reviews
            </a>
          </div>
          <div>
            <div className={styles.tpRsColTitle}>Q&amp;A with Dr Sabrina</div>
            <div className={styles.tpRsList}>
              {ANSWERS.map((a) => (
                <a key={a.href} href={a.href} target="_blank" rel="noopener noreferrer nofollow" className={styles.tpRsCard}>
                  <h4>{a.title}</h4>
                  <p>{a.snippet}</p>
                </a>
              ))}
            </div>
            <a href={`${PROFILE_URL}#qa`} target="_blank" rel="noopener noreferrer nofollow" className={styles.tpRsMore}>
              View all answers
            </a>
          </div>
        </div>

        <p className={styles.tpRsDisclaimer}>Disclaimer: reviews shown here are curated from RealSelf. Results and patient experience may vary.</p>
      </div>
    </section>
  );
}
