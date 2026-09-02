import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";
import styles from "./BlogCtaBox.module.css";
import SafeImage from "@/components/shared/SafeImage";

interface BlogCtaBoxProps {
  image?: string;
  title?: string;
  points?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function BlogCtaBox({
  image = "/uploads/2024/09/Picture2-2.jpg",
  title = "Trust your eyes to the experts",
  points = [
    "Consult with our doctor-led team for expert, personalised care",
    "A Care Quality Commission (CQC) rated clinic for your peace of mind",
    "Achieve a naturally refreshed look with over 25 years of expertise",
  ],
  ctaLabel = "Book a Consultation",
  ctaHref = "/contact",
}: BlogCtaBoxProps) {
  return (
    /* <aside>, not <div>, and the title is a styled <p> rather than a heading:
       this box is a promotion dropped between two article sections, so putting
       an <h4> in it both skipped a level (the surrounding copy runs h2/h3) and
       announced a section of the article that does not exist. */
    <aside className={styles.blogCtaBox} aria-label="Book a consultation">
      <div className={styles.blogCtaImg}>
        <SafeImage src={image} alt="" sizes="(max-width: 700px) 40vw, 220px" />
      </div>
      <div>
        <p className={styles.blogCtaTitle}>{title}</p>
        <ul>
          {points.map((point) => (
            <li key={point}>
              <TpIcon name="check" size={16} />
              {point}
            </li>
          ))}
        </ul>
        <Link href={ctaHref} className="tp-btn tp-btn-primary">{ctaLabel}</Link>
      </div>
    </aside>
  );
}
