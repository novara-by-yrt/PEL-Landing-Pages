"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./BeforeAfterCarousel.module.css";

export interface BeforeAfterSlide {
  /** Shown under the photo — the treatment this result came from. */
  treatment: string;
  image: string;
  alt: string;
  /** The gallery this case belongs to, so a card is a way in rather than a dead end. */
  href: string;
}

function Chevron({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={back ? "M19 12H5M11.5 6l-6 6 6 6" : "M5 12h14M12.5 6l6 6-6 6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Results rail, built on the same scroll-snap mechanics as the team carousel:
 * a native overflow container rather than a JS-driven slider, so it keeps
 * touch momentum, keyboard scrolling and the browser's own accessibility
 * behaviour for free.
 *
 * Slides-per-view lives in CSS (one on a phone, three from 1000px) so the
 * breakpoint is stated once, and is read back here as a custom property
 * rather than re-derived from measurements — the arrows and dots then page by
 * exactly the number of cards on screen at any width.
 *
 * Paging is continuous: Next on the last page returns to the first and Prev on
 * the first goes to the last, so the rail never dead-ends. Neither arrow is
 * ever disabled.
 */
export default function BeforeAfterCarousel({ slides }: { slides: BeforeAfterSlide[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  /** Card-to-card distance, which is also the scroll offset of each snap point. */
  const metrics = (el: HTMLElement) => {
    const perView =
      Number.parseInt(getComputedStyle(el).getPropertyValue("--per-view"), 10) || 1;
    const card = el.querySelector<HTMLElement>(`.${styles.card}`);
    const track = el.querySelector<HTMLElement>(`.${styles.track}`);
    /* Read the gap off the track's resolved column-gap, not the --gap custom
       property: an unregistered property hands back the literal clamp() text,
       which is not a number. */
    const gap = track ? Number.parseFloat(getComputedStyle(track).columnGap) || 0 : 0;
    return { perView, stride: card ? card.offsetWidth + gap : el.clientWidth };
  };

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const { perView, stride } = metrics(el);
    const count = Math.max(1, Math.ceil(slides.length / perView));
    const first = Math.round(el.scrollLeft / stride);
    setPages(count);
    /* The rail runs out of scroll before the last page's first card can reach
       the left edge, so the final window is its own page rather than a
       fraction of the one before it. */
    setPage(
      first >= slides.length - perView
        ? count - 1
        : Math.min(count - 1, Math.floor(first / perView))
    );
  }, [slides.length]);

  useEffect(() => {
    sync();
    const el = railRef.current;
    if (!el) return;
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  const goTo = useCallback(
    (target: number) => {
      const el = railRef.current;
      if (!el) return;
      const { perView, stride } = metrics(el);
      /* Wraps rather than clamps, so the rail keeps going in both directions
         instead of dead-ending on the last card. */
      const wrapped = ((target % pages) + pages) % pages;
      el.scrollTo({ left: wrapped * perView * stride, behavior: "smooth" });
    },
    [pages]
  );

  return (
    <div className={styles.wrap}>
      {/* The rail and its arrows share a box that excludes the dots, so the
          desktop arrows centre on the cards rather than on cards-plus-dots. */}
      <div className={styles.rail}>
        <div
          ref={railRef}
          onScroll={sync}
          className={styles.viewport}
          tabIndex={0}
          role="region"
          aria-label="Before and after results"
        >
          <div className={styles.track}>
            {slides.map((slide) => (
              <article key={slide.image} className={styles.card}>
                <Link href={slide.href} className={styles.link}>
                  <div className={styles.photo}>
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      sizes="(min-width: 1000px) 33vw, 92vw"
                      className={styles.photoImg}
                    />
                  </div>

                  <div className={styles.body}>
                    <h3 className={styles.name}>{slide.treatment}</h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.arrows}>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={() => goTo(page - 1)}
            aria-label="Previous results"
          >
            <Chevron back />
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={() => goTo(page + 1)}
            aria-label="Next results"
          >
            <Chevron />
          </button>
        </div>
      </div>

      {pages > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Results pages">
          {Array.from({ length: pages }, (_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === page}
              aria-label={`Go to results ${index + 1} of ${pages}`}
              className={`${styles.dot} ${index === page ? styles.dotActive : ""}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
