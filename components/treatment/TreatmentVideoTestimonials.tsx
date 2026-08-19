import Image from "next/image";
import VideoCard from "@/components/home/VideoCard";
import type { VideoTestimonialsData } from "@/lib/mdx";
import { TpIcon } from "./TpIcon";
import styles from "./TreatmentVideoTestimonials.module.css";

/** Regulatory / review-platform trust marks shown under the video pair. */
const TRUST_BADGES = [
  { src: "/uploads/2024/09/Frame-249.png", alt: "Rated 4.8 out of 5 on Google", width: 177, height: 23 },
  { src: "/uploads/2024/09/Frame-253.png", alt: "Rated 4.9 out of 5 on RealSelf", width: 246, height: 27 },
  {
    src: "/uploads/2024/09/Frame-252.png",
    alt: "Regulated by the Care Quality Commission",
    width: 190,
    height: 31,
  },
];

export function TreatmentVideoTestimonials({ data }: { data?: VideoTestimonialsData }) {
  if (!data?.videos?.length) return null;

  return (
    <section className="tp-section" aria-labelledby="video-testimonials-title">
      <div className="container">
        <div className="tp-head tp-center">
          <span className="tp-eyebrow">
            <TpIcon name="star" size={13} />
            In their words
          </span>
          <h2 id="video-testimonials-title">{data.heading || "Patient Testimonials"}</h2>
          <span className={styles.tpVideoRule} aria-hidden="true" />
          {data.ratingBadge && (
            <Image
              src={data.ratingBadge}
              alt={data.ratingBadgeAlt || "Patient rating summary"}
              width={239}
              height={79}
              className={styles.tpRatingBadge}
            />
          )}
        </div>

        <div className={styles.tpVideoGrid}>
          {data.videos.map((video) => (
            <VideoCard
              key={video.url}
              thumbnailSrc={video.thumbnail}
              title={video.title}
              videoUrl={video.url}
            />
          ))}
        </div>

        <div className={styles.tpTrustRow}>
          {TRUST_BADGES.map((badge) => (
            <Image key={badge.src} src={badge.src} alt={badge.alt} width={badge.width} height={badge.height} />
          ))}
        </div>
      </div>
    </section>
  );
}
