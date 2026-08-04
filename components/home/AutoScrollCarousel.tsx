import Image from "next/image";
import styles from "./AutoScrollCarousel.module.css";

interface CarouselItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface AutoScrollCarouselProps {
  items: CarouselItem[];
  speed?: number;
  /** Travel right-to-left instead of left-to-right. */
  reverse?: boolean;
  /** Taller frame for award badges, which carry their own whitespace. */
  size?: "logo" | "badge";
}

/**
 * Pure-CSS logo marquee.
 *
 * This is a server component on purpose: it holds no state and no handlers,
 * so keeping it off the client boundary means neither the component nor React
 * hydration work for it ships to the browser. The only dynamic value is the
 * duration, which rides in as a custom property so the keyframes stay in the
 * cached stylesheet.
 */
export default function AutoScrollCarousel({
  items,
  speed = 40,
  reverse = false,
  size = "logo",
}: AutoScrollCarouselProps) {
  const doubled = [...items, ...items];

  return (
    <div className={styles.viewport}>
      <div
        className={`logo-scroll-track${reverse ? " is-reverse" : ""}`}
        style={{ "--logo-scroll-speed": `${speed}s` } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className={`${styles.item} ${size === "badge" ? styles.itemBadge : ""}`}
            aria-hidden={i >= items.length}
          >
            <Image
              src={item.src}
              alt={i >= items.length ? "" : item.alt}
              width={item.width || 120}
              height={item.height || 60}
              className={`${styles.logo} ${size === "badge" ? styles.badge : ""}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
