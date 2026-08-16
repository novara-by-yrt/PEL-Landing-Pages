import Link from "next/link";
import Image from "next/image";
import styles from "./TreatmentExpert.module.css";

/* The register listing leads, because it is the one an assessor can verify
   rather than an award. Treatment pages carried the awards and the FRCS but
   not this, while the condition pages did — the SEO plan asks for the
   credentials to read the same on every page, so it is added here rather
   than the list being trimmed anywhere else. */
const AWARDS = [
  "Royal College of Surgeons of England — register of Board-Certified Cosmetic Surgeons",
  "Best Aesthetic Doctor — Safety in Beauty 2023",
  "Consultant Surgeon of the Year",
  "Best Surgical Result — Aesthetic Awards 2021",
  "Tatler Best Eye Surgeon 2019–2026",
];

export function TreatmentExpert() {
  return (
    <section className={styles.tpExpert}>
      <div className={`container ${styles.tpExpertInner}`}>
        <Image src="/uploads/2025/12/Dr-Sabrina2-1.png" alt="Dr Sabrina Shah-Desai" width={200} height={260} sizes="200px" loading="lazy" />
        <div className={styles.tpExpertContent}>
          <h2>Meet the Expert: Dr Sabrina Shah-Desai</h2>
          <span className={styles.tpExpertRule} aria-hidden="true" />
          <p>Dr Sabrina Shah-Desai is the founder and Medical Director of Perfect Eyes Ltd. With over two decades of surgical and non-surgical experience, she is considered one of the safest, most experienced oculoplastic surgeons in the UK.</p>
          <p>
            Her extensive training, combined with her caring and empathetic nature, makes her a natural choice for patients seeking the very best care. Dr Sabrina appears consistently in <em>Tatler</em> magazine as one of the UK&apos;s &ldquo;Best Eye Surgeons&rdquo; and &ldquo;Top Doctors&rdquo; since 2019.
          </p>
          <Link href="/dr-sabrina-shah-desai" className={`tp-btn tp-btn-inverse ${styles.tpExpertCta}`}>Learn About Dr Sabrina</Link>
          <div className={styles.tpAwards}>
            {AWARDS.map((award) => (
              <span key={award} className={styles.tpAward}>{award}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
