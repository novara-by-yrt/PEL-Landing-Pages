import { TpIcon } from "./TpIcon";
import type { ReviewItem } from "./types";

export function TreatmentReviews({ reviews }: { reviews?: ReviewItem[] }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="tp-section">
      <style>{`
        .tp-reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.75rem; margin-top: 3rem; }
        .tp-review-card { background: #fff; border: 1px solid var(--tp-line); border-radius: var(--tp-radius-lg); padding: 1.75rem; box-shadow: var(--tp-shadow-xs); display: flex; flex-direction: column; gap: 1rem; }
        .tp-review-quote-icon { color: var(--tp-lavender-300); }
        .tp-review-card p { margin: 0; font-size: 0.9375rem; line-height: 1.65; color: var(--tp-slate); flex: 1; }
        .tp-review-card a { align-self: flex-start; font-size: 0.8125rem; font-weight: 600; color: var(--tp-indigo-700); text-decoration: none; }
        .tp-review-card a:hover { color: var(--tp-indigo-600); }
      `}</style>
      <div className="container">
        <div className="tp-head tp-center">
          <span className="tp-eyebrow"><TpIcon name="star" size={13} />Verified patient reviews</span>
          <h2>Patient Reviews</h2>
        </div>
        <div className="tp-reviews-grid">
          {reviews.map((review, i) => (
            <div key={i} className="tp-review-card">
              <span className="tp-review-quote-icon"><TpIcon name="quote" size={28} /></span>
              <p>&ldquo;{review.quote}&rdquo;</p>
              <a href={review.href} target="_blank" rel="noopener noreferrer nofollow">Read more on RealSelf →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
