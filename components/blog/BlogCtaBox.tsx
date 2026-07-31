import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";

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
    <div className="blog-cta-box">
      <style>{`
        .blog-cta-box {
          display: grid; grid-template-columns: 200px 1fr; gap: 1.75rem; align-items: center;
          background: var(--tp-lavender-050); border: 1px solid var(--tp-line);
          border-radius: var(--tp-radius-xl); padding: 1.75rem; margin: 2.5rem 0;
        }
        @media (max-width: 560px) { .blog-cta-box { grid-template-columns: 1fr; } }
        .blog-cta-img { border-radius: var(--tp-radius-lg); overflow: hidden; aspect-ratio: 1; box-shadow: var(--tp-shadow-sm); }
        .blog-cta-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .blog-cta-box h4 { font-family: var(--tp-display); font-weight: 600; font-size: 1.25rem; color: var(--tp-ink); margin: 0 0 0.9rem; }
        .blog-cta-box ul { list-style: none; margin: 0 0 1.25rem; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; }
        .blog-cta-box li { display: flex; align-items: flex-start; gap: 9px; font-size: 0.9rem; color: var(--tp-slate); line-height: 1.5; }
        .blog-cta-box li svg { flex-shrink: 0; margin-top: 2px; color: var(--tp-indigo-700); }
      `}</style>
      <div className="blog-cta-img">
        <img src={image} alt="" />
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
