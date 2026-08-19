"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./TreatmentsCarousel.module.css";

export interface Treatment {
  image: string;
  title: string;
  href: string;
  blurb: string;
}

export interface TreatmentGroup {
  id: string;
  label: string;
  items: Treatment[];
}

/** Pixels per second. Slow enough to read a card as it passes. */
const DRIFT_SPEED = 22;

function Arrow({ back = false }: { back?: boolean }) {
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

function Card({ item, clone }: { item: Treatment; clone?: boolean }) {
  return (
    <Link
      href={item.href}
      className={styles.card}
      /* The duplicated half exists only so the loop has no seam. Hiding it
         keeps the rail from announcing and tabbing through every treatment
         twice. */
      aria-hidden={clone || undefined}
      tabIndex={clone ? -1 : undefined}
    >
      <div className={styles.media}>
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 420px) 300px, 74vw"
          loading="lazy"
        />
        <span className={styles.mediaScrim} aria-hidden="true" />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.blurb}>{item.blurb}</p>
        <span className={styles.explore}>Learn more</span>
      </div>
    </Link>
  );
}

export default function TreatmentsCarousel({ groups }: { groups: TreatmentGroup[] }) {
  const [active, setActive] = useState(groups[0].id);
  const viewportRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  /* Timestamp until which the drift stands down so a smooth arrow scroll can
     finish. Without it the loop rewrites scrollLeft every frame and the
     native animation never gets anywhere. */
  const nudgeUntilRef = useRef(0);

  // Continuous right-to-left drift. Position is tracked in a local so the
  // sub-pixel-per-frame step is not lost to rounding, and the loop wraps at
  // the midpoint of the duplicated track so the seam is never visible.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last = performance.now();
    let offscreen = false;

    // Position is accumulated here rather than read back from the element
    // each frame. At this speed a frame advances ~0.35px, and the browser
    // snaps scrollLeft to whole pixels — reading it back would floor every
    // step to zero and the rail would never move.
    let position = el.scrollLeft;

    /* How far the rail travels before it is showing the duplicate half.
       Measured between a card and its own clone rather than taken as half the
       scroll width: the track's trailing gap and padding count towards
       scrollWidth but do not repeat, so half of it overshoots the seam by 8px
       on a phone and 28px on a desktop - a visible jump every time the loop
       came round. */
    const measureWrap = () => {
      const first = el.querySelector<HTMLElement>("a");
      const clone = el.querySelector<HTMLElement>('a[aria-hidden="true"]');
      return first && clone ? clone.offsetLeft - first.offsetLeft : el.scrollWidth / 2;
    };
    let wrap = measureWrap();
    const onResize = () => {
      wrap = measureWrap();
    };
    window.addEventListener("resize", onResize);

    /* If anything else moves the rail — a swipe, the arrows, a keypress —
       adopt that position instead of yanking it back, and keep it inside the
       first half of the track.

       The drift wraps at the midpoint, but only from inside its own frame
       loop. A touch scroll never went through it, so a swipe carried straight
       past the midpoint into the duplicated half: every treatment shown a
       second time, then a dead end at the last clone. That is invisible on a
       desktop, where the arrows step one card at a time and the drift wraps
       first, and unmissable on a phone, where swiping is how the rail is
       used. Wrapping here covers every way the rail can move.

       Subtracting the half lands on pixel-identical content, so the
       correction cannot be seen; `wrapping` stops the scrollLeft write from
       re-entering through the event it fires. */
    let wrapping = false;
    const onScroll = () => {
      if (wrapping) return;
      if (wrap > 0 && el.scrollLeft >= wrap) {
        wrapping = true;
        el.scrollLeft -= wrap;
        wrapping = false;
      }
      if (Math.abs(el.scrollLeft - position) > 2) position = el.scrollLeft;
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    // Don't burn frames animating a rail nobody is looking at.
    const observer = new IntersectionObserver(
      ([entry]) => {
        offscreen = !entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(el);

    const step = (now: number) => {
      const delta = Math.min(now - last, 100);
      last = now;
      if (!pausedRef.current && !offscreen && now >= nudgeUntilRef.current) {
        position += (DRIFT_SPEED * delta) / 1000;
        if (wrap > 0 && position >= wrap) position -= wrap;
        el.scrollLeft = position;
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [active]);

  // A new category starts from the beginning of its own rail.
  useEffect(() => {
    if (viewportRef.current) viewportRef.current.scrollLeft = 0;
  }, [active]);

  const nudge = useCallback((direction: 1 | -1) => {
    const el = viewportRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(`.${styles.card}`);
    const stride = card ? card.offsetWidth + 24 : 300;
    nudgeUntilRef.current = performance.now() + 700;
    el.scrollBy({ left: direction * stride, behavior: "smooth" });
  }, []);

  const group = groups.find((g) => g.id === active) ?? groups[0];

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.tabs} role="tablist" aria-label="Treatment categories">
          {groups.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              id={`tab-${g.id}`}
              aria-selected={g.id === active}
              aria-controls={`panel-${g.id}`}
              className={styles.tab}
              onClick={() => setActive(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => nudge(-1)}
            aria-label="Previous treatments"
          >
            <Arrow back />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => nudge(1)}
            aria-label="Next treatments"
          >
            <Arrow />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        id={`panel-${group.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${group.id}`}
        tabIndex={0}
        className={styles.viewport}
        /* Hold still while someone is reading, pointing at, or tabbing
           through the rail. */
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onFocusCapture={() => (pausedRef.current = true)}
        onBlurCapture={() => (pausedRef.current = false)}
        onPointerDown={() => (pausedRef.current = true)}
        onPointerUp={() => (pausedRef.current = false)}
      >
        <div className={styles.track}>
          {group.items.map((item) => (
            <Card key={item.href} item={item} />
          ))}
          {group.items.map((item) => (
            <Card key={`clone-${item.href}`} item={item} clone />
          ))}
        </div>
      </div>
    </>
  );
}
