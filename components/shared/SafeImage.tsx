"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./SafeImage.module.css";

/**
 * An optimised image that degrades to a brand placeholder instead of a broken
 * icon.
 *
 * Two jobs, and the second is why this exists as a component at all.
 *
 * Optimisation: these sources are `/uploads/*` paths, which next.config
 * rewrites to the WordPress origin. A plain <img> there downloads the
 * original at full size in its original format — a card 380px wide pulling a
 * multi-megabyte JPEG. Going through next/image routes the same URL through
 * the optimiser, which resizes to the layout and re-encodes to AVIF; on the
 * repository's own photographs that is a 569KB source delivered as 11KB.
 *
 * Resilience: some of those files are not on the origin. There is no way to
 * know which at build time, so the failure is caught where it happens — the
 * browser's error event — and swapped for a tinted panel carrying the
 * clinic's eye mark. The caller reserves the box, so nothing moves.
 */
export default function SafeImage({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  /** Layout width at each breakpoint, so the optimiser ships the right size. */
  sizes: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={styles.fallback} role="img" aria-label={alt}>
        <svg viewBox="0 0 48 28" aria-hidden="true" className={styles.mark}>
          <path
            d="M1.5 14S9 2 24 2s22.5 12 22.5 12S39 26 24 26 1.5 14 1.5 14Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="14" r="6" fill="currentColor" />
        </svg>
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={styles.img}
      onError={() => setFailed(true)}
    />
  );
}
