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
    <div className={styles.blogCtaBox}>
      <div className={styles.blogCtaImg}>
        <SafeImage src={image} alt="" />
      </div>
      <div>
        <h4>{title}</h4>
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
    </div>
  );
}
