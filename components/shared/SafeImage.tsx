"use client";

import { useState } from "react";
import styles from "./SafeImage.module.css";

/**
 * An <img> that degrades to a brand placeholder instead of a broken icon.
 *
 * Most editorial images on this site are `/uploads/*`, which next.config
 * rewrites to the WordPress origin rather than serving from the repository.
 * A handful of those files are not on that origin — the blog cards for posts
 * with 2026 upload paths are the visible case — and a plain <img> answers a
 * 404 with the browser's broken-image glyph and the alt text spilling across
 * the card.
 *
 * There is no way to know from the server which remote files exist, so this
 * handles the failure where it actually happens: the browser's own error
 * event. On failure the image is replaced by a tinted panel carrying the
 * clinic's eye mark, so the card keeps its shape and reads as deliberate.
 *
 * The container is expected to size the box (the callers all set an
 * aspect-ratio), so swapping in the placeholder shifts nothing.
 */
export default function SafeImage({
  src,
  alt,
  className,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
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
    /* These sources are proxied to an external origin at the edge, so the
       optimiser cannot resolve them and a plain <img> is what works here. */
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
