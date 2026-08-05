import AutoScrollCarousel from "@/components/home/AutoScrollCarousel";
import styles from "./AccreditedStrip.module.css";

const AWARD_LOGOS = [
  /* The black wordmark, not the white one: this strip sits on --tp-paper, so
     the white artwork would be invisible. Its true 288x80 dimensions let the
     marquee scale it on height without distorting the letterforms. */
  { src: "/Tatler-black.png", alt: "Tatler", width: 288, height: 80 },
  { src: "/uploads/2024/09/11.png", alt: "Award logo 1" },
  { src: "/uploads/2024/09/22.png", alt: "Award logo 2" },
  { src: "/uploads/2024/09/31.png", alt: "Award logo 3" },
  { src: "/uploads/2024/09/41.png", alt: "Award logo 4" },
  { src: "/uploads/2024/09/51.png", alt: "Award logo 5" },
  { src: "/uploads/2024/09/61.png", alt: "South African Society for Dermatologic Surgery" },
  { src: "/uploads/2024/09/71.png", alt: "BOPSS British Oculoplastic Surgery Society" },
];

/** The "Accredited & recognised by" marquee, shared across pages. */
export default function AccreditedStrip() {
  return (
    <section className={styles.strip} aria-label="Accreditations and recognition">
      <p className={styles.label}>Accredited &amp; recognised by</p>
      <AutoScrollCarousel items={AWARD_LOGOS} speed={35} />
    </section>
  );
}
