"use client";

import { useCallback, useRef, useState } from "react";
import GoogleMark from "@/components/shared/GoogleMark";
/* The shared set is the default, so a page can render <PatientStories /> and
   is guaranteed the same reviews as every other page. reviews.ts only takes
   the PatientStory *type* from here, and type imports are erased, so this
   pairing costs nothing at runtime. */
import { PATIENT_STORIES } from "@/lib/reviews";
import styles from "./PatientStories.module.css";

export interface PatientStory {
  quote: string;
  author: string;
  /** Optional: treatment and review platform, e.g. "Upper Blepharoplasty". */
  treatment?: string;
  /** Optional: platform name shown in the corner badge and the footer link. */
  source?: string;
  /** Optional: direct link to the review on that platform. */
  url?: string;
}

/** Quotes longer than this get a Read more / Read less toggle. Most of the
 *  current reviews are past it; shorter ones will not show a control that
 *  does nothing. */
const CLAMP_THRESHOLD = 260;

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

function Stars() {
  return (
    <svg className={styles.stars} viewBox="0 0 90 16" aria-hidden="true">
      {[0, 18, 36, 54, 72].map((x) => (
        <path
          key={x}
          transform={`translate(${x} 0)`}
          d="M8 0.6l2.24 4.9 5.36.62-3.97 3.63 1.06 5.28L8 12.42 3.31 15.03l1.06-5.28L.4 6.12l5.36-.62z"
        />
      ))}
    </svg>
  );
}

/** Default set, so every page shows the same reviews without re-importing. */
export default function PatientStories({
  stories = PATIENT_STORIES,
}: {
  stories?: PatientStory[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  /* Keyed by author rather than index: the rail renders the list twice for
     the loop, and a review and its clone are the same review — expanding one
     should expand the other, so neither copy contradicts itself mid-scroll. */
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  /* While a programmatic hop-and-scroll is in flight, normalising would undo
     the hop the moment it happened — the same stand-down the treatments rail
     uses for its arrow nudges. */
  const settleUntil = useRef(0);

  /* Endless rail. The track holds two passes of the list, so one full pass is
     always queued off the right edge; once the scroll position runs past that
     first pass it is rolled back by exactly one pass. The pixels there are
     identical, so the roll-back is invisible and the rail has no end. */
  const normalize = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const pass = el.scrollWidth / 2;
    if (pass <= 0) return;
    if (el.scrollLeft >= pass) el.scrollLeft -= pass;
  }, []);

  const onScroll = useCallback(() => {
    if (performance.now() < settleUntil.current) return;
    normalize();
  }, [normalize]);

  /** One card plus the track's real gap — read, not assumed, since the gap is
      a clamp() that resolves differently on a phone than on a desktop. */
  const strideOf = (el: HTMLDivElement) => {
    const card = el.querySelector<HTMLElement>(`.${styles.card}`);
    if (!card) return 400;
    const track = card.parentElement;
    const gap = track ? parseFloat(getComputedStyle(track).columnGap) || 0 : 0;
    return card.offsetWidth + gap;
  };

  const slide = useCallback(
    (direction: 1 | -1) => {
      const el = railRef.current;
      if (!el) return;
      const pass = el.scrollWidth / 2;
      const stride = strideOf(el);

      /* Going back from the very start would hit the hard edge at 0 and stop.
         Hop forward one identical pass first, then scroll back from there —
         same pixels on screen, but now there is room to move. The stand-down
         keeps normalize() from cancelling the hop mid-flight. */
      if (direction === -1 && el.scrollLeft < stride) {
        settleUntil.current = performance.now() + 900;
        el.scrollLeft += pass;
      }

      el.scrollBy({ left: direction * stride, behavior: "smooth" });

      window.setTimeout(() => {
        settleUntil.current = 0;
        normalize();
      }, 900);
    },
    [normalize],
  );

  return (
    <section className={styles.section} aria-labelledby="stories-title">
      <span className={styles.glow} aria-hidden="true" />

      <div className="container">
        <div className={styles.head}>
          <span className={styles.eyebrow}>
            <svg className={styles.sparkle} viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 0l1.5 5.1L15 8l-5.5 2.9L8 16l-1.5-5.1L1 8l5.5-2.9z" />
            </svg>
            Patient stories
          </span>
          <h2 id="stories-title" className={styles.title}>
            Rated five stars by patients across the globe
          </h2>
          <p className={styles.lead}>Rated 4.9 from 230+ Google reviews.</p>
        </div>

        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => slide(-1)}
            aria-label="Previous patient stories"
          >
            <Chevron back />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => slide(1)}
            aria-label="Next patient stories"
          >
            <Chevron />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        onScroll={onScroll}
        className={styles.viewport}
        tabIndex={0}
        role="region"
        aria-label="Patient reviews"
      >
        <div className={styles.track}>
          {/* Two passes of the same list. The second exists only so the loop
              has no seam, so it is hidden from screen readers and skipped by
              Tab — otherwise every review would be announced twice. It stays
              clickable, though: a clone is on screen whenever the rail sits
              near the seam, and a dead Read more button there would just look
              broken. */}
          {[0, 1].flatMap((pass) =>
            stories.map((story) => {
            const clone = pass === 1;
            const index = `${pass}-${story.author}`;
            const isLong = story.quote.length > CLAMP_THRESHOLD;
            const isOpen = Boolean(expanded[story.author]);

            return (
              <figure
                key={index}
                className={styles.card}
                aria-hidden={clone || undefined}
              >
                <div className={styles.cardTop}>
                  <span className={styles.rating}>
                    <GoogleMark className={styles.googleMark} />
                    <Stars />
                  </span>
                  <span className="sr-only">Rated 5 out of 5 on Google</span>
                  {story.source ? (
                    <span className={styles.sourceBadge} aria-hidden="true">
                      {story.source.charAt(0)}
                    </span>
                  ) : null}
                </div>

                <blockquote
                  id={`story-${index}`}
                  className={`${styles.quote} ${
                    isLong && !isOpen ? styles.quoteClamped : ""
                  }`}
                >
                  &ldquo;{story.quote}&rdquo;
                </blockquote>

                {isLong ? (
                  <button
                    type="button"
                    className={styles.toggle}
                    aria-expanded={isOpen}
                    aria-controls={`story-${index}`}
                    /* Inside an aria-hidden clone, so keep it out of the tab
                       order — a focusable control there would be a trap. */
                    tabIndex={clone ? -1 : undefined}
                    onClick={() =>
                      setExpanded((prev) => ({
                        ...prev,
                        [story.author]: !prev[story.author],
                      }))
                    }
                  >
                    {isOpen ? "Read less" : "Read more"}
                  </button>
                ) : null}

                <figcaption className={styles.foot}>
                  <span className={styles.author}>{story.author}</span>
                  {story.treatment || story.source ? (
                    <span className={styles.meta}>
                      {[story.treatment, story.source].filter(Boolean).join(" · ")}
                    </span>
                  ) : null}
                  {story.url && story.source ? (
                    <a
                      href={story.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.readOn}
                    >
                      Read on {story.source}
                    </a>
                  ) : null}
                </figcaption>
              </figure>
            );
            }),
          )}
        </div>
      </div>
    </section>
  );
}
