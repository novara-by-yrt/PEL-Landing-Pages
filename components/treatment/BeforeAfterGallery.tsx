"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { TpIcon } from "./TpIcon";
import type { GalleryItem } from "@/lib/mdx";
import styles from "./BeforeAfterGallery.module.css";

export function BeforeAfterGallery({
  gallery,
  heading,
  description,
  title,
  showHead = true,
}: {
  gallery?: GalleryItem[];
  heading?: string;
  description?: string;
  title: string;
  /**
   * The heading block above the thumbnails. On a treatment page it introduces
   * one section among many and earns its place; on /before-after/[slug] the
   * whole page is the gallery, so it only restates the hero directly above it
   * ("Blepharoplasty Before and After" / "Blepharoplasty Before & After
   * Gallery"). Pass false there — the section is labelled for screen readers
   * either way.
   */
  showHead?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const count = gallery?.length ?? 0;
  const isOpen = openIndex !== null;

  /* The lightbox is portalled to <body>. Without it the overlay is trapped in
     whatever stacking context this section's ancestors create, so a fixed
     header or another section with its own z-index can paint over it no
     matter how high the overlay's own z-index goes.
     Read once during render rather than in an effect: the portal only ever
     renders after a click, so the server's null and the client's body element
     never disagree at hydration. */
  const [portalHost] = useState<HTMLElement | null>(() =>
    typeof document === "undefined" ? null : document.body,
  );

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) => setOpenIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count]
  );

  // Escape to close, arrows to navigate, and lock background scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, step]);

  // Move focus into the dialog on open, and back to the triggering thumbnail on close.
  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
    } else if (lastFocused.current) {
      lastFocused.current.focus();
      lastFocused.current = null;
    }
  }, [isOpen]);

  if (!gallery || gallery.length === 0) return null;

  const current = openIndex !== null ? gallery[openIndex] : null;

  return (
    <>
      <section
        className="tp-section"
        /* Without the visible heading the section would have no accessible name,
           so it takes one directly. */
        aria-label={showHead ? undefined : `${title} before and after gallery`}
      >
        <div className="container">
          {showHead && (
            <div className={`tp-head ${styles.tpBagalHead}`}>
              <span className="tp-eyebrow">
                <TpIcon name="sparkle" size={13} />
                Real Patient Results
              </span>
              <h2>{heading || `${title} Before & After Gallery`}</h2>
              {description && <p>{description}</p>}
              <span className={styles.tpBagalCount}>
                <TpIcon name="eye" size={14} />
                {count} {count === 1 ? "case" : "cases"}
              </span>
            </div>
          )}

          <div className={styles.tpBagalGrid}>
            {gallery.map((item, i) => (
              <button
                key={`${item.image}-${i}`}
                type="button"
                className={styles.tpBagalItem}
                onClick={(e) => {
                  lastFocused.current = e.currentTarget;
                  setOpenIndex(i);
                }}
                aria-label={`Enlarge ${title} before and after, case ${i + 1} of ${count}`}
              >
                <span className={styles.tpBagalZoom} aria-hidden="true">
                  <TpIcon name="search" size={16} />
                </span>
                <Image
                  src={item.image}
                  alt={item.alt || `${title} before and after - case ${i + 1}`}
                  width={item.width ?? 1280}
                  height={item.height ?? 1280}
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  loading={i < 2 ? "eager" : "lazy"}
                  priority={i === 0}
                />
              </button>
            ))}
          </div>

          <p className={styles.tpBagalNote}>
            Individual results vary. All photographs are of real patients treated by Dr Sabrina Shah-Desai
            and are published with consent.
          </p>
        </div>
      </section>

      {current && openIndex !== null && portalHost && createPortal(
        <div
          className={styles.tpLb}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} before and after, case ${openIndex + 1} of ${count}`}
          onClick={close}
        >
          <button ref={closeRef} type="button" className={`${styles.tpLbBtn} ${styles.tpLbClose}`} onClick={close} aria-label="Close image viewer">
            <TpIcon name="close" size={20} />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                className={`${styles.tpLbBtn} ${styles.tpLbPrev}`}
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                aria-label="Previous image"
              >
                <TpIcon name="chevron" size={20} />
              </button>
              <button
                type="button"
                className={`${styles.tpLbBtn} ${styles.tpLbNext}`}
                onClick={(e) => { e.stopPropagation(); step(1); }}
                aria-label="Next image"
              >
                <TpIcon name="chevron" size={20} />
              </button>
            </>
          )}

          <figure className={styles.tpLbFigure} onClick={(e) => e.stopPropagation()}>
            <Image
              src={current.image}
              alt={current.alt || `${title} before and after - case ${openIndex + 1}`}
              width={current.width ?? 1280}
              height={current.height ?? 1280}
              sizes="100vw"
              priority
            />
            <figcaption className={styles.tpLbCap}>
              {title} - case {openIndex + 1} of {count}
            </figcaption>
          </figure>
        </div>,
        portalHost
      )}
    </>
  );
}
