import Image from "next/image";
import Link from "next/link";
import styles from "./MeetDrSabrina.module.css";

/**
 * "Meet Dr Sabrina Shah-Desai" — the portrait-beside-credentials panel.
 *
 * Lifted out of the home page so the treatment pages can show the same
 * section rather than their own thinner variant. The grid stretches both
 * cells to the same row height and the portrait fills its cell, so the
 * image's top and bottom edges line up exactly with the column beside it at
 * every width.
 *
 * `title` is overridable because the treatment pages keep their own wording;
 * everything else is shared.
 */

const EXPERT_CREDENTIALS = [
  "Listed on the Royal College of Surgeons of England register of Board-Certified Cosmetic Surgeons",
  "Recognised as a top practitioner for eyes for eight consecutive years, 2019-2026",
  "Over 25 years of surgical and non-surgical experience",
];

/** Award medal, used on the eyebrow and the portrait's badge. */
function Medal() {
  return (
    <svg className={styles.medalIcon} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="9" r="5.25" />
      <path d="M8.5 13.4L7 22l5-2.6 5 2.6-1.5-8.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Circled tick for the credential list. */
function CheckMark() {
  return (
    <svg className={styles.checkIcon} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" />
      <path d="M8.2 12.4l2.6 2.6 5-5.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MeetDrSabrina({
  id = "about",
  title = "Meet Dr Sabrina Shah-Desai",
}: {
  id?: string;
  title?: string;
}) {
  const titleId = `${id}-title`;

  return (
    <section id={id} className={styles.expert} aria-labelledby={titleId}>
      <div className="container">
        <div className={styles.expertGrid}>
          {/* Portrait. Stretches to the row height so its top and bottom
              edges line up exactly with the column beside it. */}
          <figure className={styles.expertMedia}>
            <Image
              src="/dr-sabrina-profile.png"
              alt="Dr Sabrina Shah-Desai, Consultant Oculoplastic Surgeon"
              fill
              sizes="(min-width: 1000px) 42vw, 100vw"
              className={styles.expertPortrait}
            />
            <div className={styles.expertBadge}>
              <span className={styles.expertBadgeIcon} aria-hidden="true">
                <Medal />
              </span>
              <span>
                <span className={styles.expertBadgeTitle}>Top Practitioner for Eyes</span>
                <span className={styles.expertBadgeMeta}>
                  Eight consecutive years, 2019-2026
                </span>
              </span>
            </div>
          </figure>

          <div className={styles.expertBody}>
            <span className={styles.expertEyebrow}>
              <Medal />
              About
            </span>
            <h2 id={titleId} className={styles.expertTitle}>
              {title}
            </h2>
            <p className={styles.expertCred}>MS, FRCS (Ed) Ophth</p>

            <p className={styles.expertText}>
              Dr Sabrina Shah-Desai, MS, FRCS (Ed) Ophth is a multi-award-winning
              Oculoplastic Reconstructive Surgeon and Aesthetic Practitioner specialising
              in reconstructive, revisional, and cosmetic surgery of the eyelids, as well
              as non-surgical treatments for the eyes and face. With over 25 years of
              experience, she is globally recognised for her pioneering, minimally
              invasive techniques.
            </p>
            <p className={styles.expertText}>
              Known as the &ldquo;go-to&rdquo; surgeon for discerning patients seeking
              subtle, natural results, she is also highly sought after for revisional
              procedures by those who have undergone previous fillers or eyelid surgeries.
            </p>

            <ul className={styles.expertList}>
              {EXPERT_CREDENTIALS.map((item) => (
                <li key={item} className={styles.expertListItem}>
                  <CheckMark />
                  {item}
                </li>
              ))}
            </ul>

            <div className={styles.expertCta}>
              <Link href="/contact-cosmetic-eye-surgeon" className="tp-btn tp-btn-primary">
                Book a consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
