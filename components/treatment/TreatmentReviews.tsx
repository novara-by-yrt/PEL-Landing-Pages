import { TpIcon } from "./TpIcon";
import type { ReviewItem } from "./types";
import styles from "./TreatmentReviews.module.css";

export function TreatmentReviews({ reviews }: { reviews?: ReviewItem[] }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="tp-section">
      <div className="container">
        <div className="tp-head tp-center">
          <span className="tp-eyebrow">
            <TpIcon name="star" size={13} />
            Verified patient reviews
          </span>
          <h2>Patient Reviews</h2>
          <span className={styles.tpReviewsRule} aria-hidden="true" />
        </div>
        <div className={styles.tpReviewsGrid}>
          {reviews.map((review, i) => (
            <div key={i} className={styles.tpReviewCard}>
              <span className={styles.tpReviewQuoteIcon} aria-hidden="true">
                <TpIcon name="quote" size={20} />
              </span>
              <p>&ldquo;{review.quote}&rdquo;</p>
              <a href={review.href} target="_blank" rel="noopener noreferrer nofollow">
                Read more on RealSelf
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
