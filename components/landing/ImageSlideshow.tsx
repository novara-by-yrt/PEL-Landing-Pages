"use client";

import { useCallback, useEffect, useState } from "react";
import SafeImage from "@/components/shared/SafeImage";
import styles from "./ImageSlideshow.module.css";

/**
 * A crossfading slideshow that fills the frame it is given.
 *
 * It draws no box of its own: the caller supplies a positioned, clipped
 * element (the hero's square frame, the portrait's 3:4 frame) and this fills
 * it absolutely. That is what lets one component serve two places on the
 * Sofwave page whose frames are different shapes and are sized by different
 * rules, without either of them having to know about the other.
 *
 * The controls sit in one pill at the top right. Both frames on this page
 * carry something at one end already: the hero's caption band at the head,
 * over a photograph with "Before" and "After" burned into its foot, and the
 * portrait's name plate at the foot. The corner is the one place a control
 * cluster lands clear in both.
 *
 * Autoplay stops while the pointer is over the slideshow or focus is inside
 * it, and never starts under prefers-reduced-motion, where the crossfade is
 * dropped too. With two slides a reader who never touches the controls still
 * sees both; a reader who does is not fighting a timer.
 */

export type SlideshowSlide = {
  src: string;
  alt: string;
  /** Rendered over this slide's picture. A name plate, a label, nothing. */
  overlay?: React.ReactNode;
};

function Chevron({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={back ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ImageSlideshow({
  slides,
  sizes,
  label,
  priority = false,
  autoPlayMs = 5500,
}: {
  slides: SlideshowSlide[];
  /** Layout width at each breakpoint, passed straight to the optimiser. */
  sizes: string;
  /** What this set of pictures is, for assistive technology. */
  label: string;
  /** Preload the first slide. The hero's, and nothing else on the page. */
  priority?: boolean;
  /** 0 turns autoplay off. */
  autoPlayMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = slides.length;

  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  );

  useEffect(() => {
    if (count < 2 || paused || autoPlayMs <= 0) return;
    /* Read at the time the timer would start rather than through a listener:
       a visitor who turns motion off mid-visit is rare, and a visitor who has
       it off from the start is the case that matters. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), autoPlayMs);
    return () => window.clearInterval(timer);
  }, [count, paused, autoPlayMs]);

  if (count === 0) return null;

  return (
    <div
      className={styles.root}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.src}
            className={`${styles.slide}${active ? ` ${styles.slideActive}` : ""}`}
            /* Nothing inside a slide is focusable, so hiding the inactive
               ones from assistive technology cannot strand a focus stop. */
            aria-hidden={!active}
          >
            <SafeImage
              src={slide.src}
              alt={slide.alt}
              sizes={sizes}
              priority={priority && i === 0}
            />
            {slide.overlay}
          </div>
        );
      })}

      {count > 1 && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => step(-1)}
            aria-label={`Previous image, ${label}`}
          >
            <Chevron back />
          </button>

          <div className={styles.dots}>
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                className={`${styles.dot}${i === index ? ` ${styles.dotActive}` : ""}`}
                aria-label={`Show image ${i + 1} of ${count}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.arrow}
            onClick={() => step(1)}
            aria-label={`Next image, ${label}`}
          >
            <Chevron />
          </button>
        </div>
      )}
    </div>
  );
}
