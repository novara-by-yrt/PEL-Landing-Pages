import AutoScrollCarousel from "@/components/home/AutoScrollCarousel";
import styles from "./AccreditedStrip.module.css";

type Logo = { src: string; alt: string; width?: number; height?: number; tile?: boolean };

const AWARD_LOGOS: Logo[] = [
  /* The supplied masthead is white-on-black, so on this light strip it reads
     as a solid black tile rather than a bare wordmark - `.tile` rounds its
     corners so that lands as a deliberate badge. Its true 1467x551
     dimensions let the marquee scale it on height without distorting the
     letterforms. */
  { src: "/tatler-logo.png", alt: "Tatler", width: 1467, height: 551, tile: true },
  { src: "/uploads/2024/09/11.png", alt: "Award logo 1" },
  { src: "/uploads/2024/09/22.png", alt: "Award logo 2" },
  { src: "/uploads/2024/09/31.png", alt: "Award logo 3" },
  { src: "/uploads/2024/09/41.png", alt: "Award logo 4" },
  { src: "/uploads/2024/09/51.png", alt: "Award logo 5" },
  { src: "/uploads/2024/09/61.png", alt: "South African Society for Dermatologic Surgery" },
  { src: "/uploads/2024/09/71.png", alt: "BOPSS British Oculoplastic Surgery Society" },
];

/**
 * The "Accredited & recognised by" marquee, shared across pages.
 *
 * `logos` and `label` are overridable so the condition-page template can pass
 * its own, more specific alt text (naming each college by name) instead of
 * the home page's award list — everything else about the strip, including
 * the frame around it, stays identical everywhere it appears.
 */
export default function AccreditedStrip({
  logos = AWARD_LOGOS,
  label = "Accredited & recognised by",
}: {
  logos?: Logo[];
  label?: string;
}) {
  return (
    <section className={styles.strip} aria-label="Accreditations and recognition">
      <p className={styles.label}>{label}</p>
      <AutoScrollCarousel items={logos} speed={35} />
    </section>
  );
}
