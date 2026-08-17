"use client";

import { useCallback, useRef } from "react";
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
              Tab — otherwise every review would be announced twice. */}
          {[0, 1].flatMap((pass) =>
            stories.map((story) => {
            const clone = pass === 1;
            const index = `${pass}-${story.author}`;
            const hasFoot = Boolean(story.treatment || story.source || (story.url && story.source));

            return (
              <figure
                key={index}
                className={styles.card}
                aria-hidden={clone || undefined}
              >
                {/* A figcaption may be the figure's first child as well as its
                    last, so the attribution can lead the card and still be the
                    quote's caption rather than loose text beside it. */}
                <figcaption className={styles.cardTop}>
                  <span className={styles.identity}>
                    <span className={styles.author}>{story.author}</span>
                    <span className={styles.rating}>
                      <GoogleMark className={styles.googleMark} />
                      <Stars />
                      <span className="sr-only">Rated 5 out of 5 on Google</span>
                    </span>
                  </span>
                  {story.source ? (
                    <span className={styles.sourceBadge} aria-hidden="true">
                      {story.source.charAt(0)}
                    </span>
                  ) : null}
                </figcaption>

                {/* The full review, scrolled rather than truncated. Every card
                    is the same depth whatever the length of the quote, so the
                    rail stays level and no card grows under the reader when a
                    control is pressed.

                    tabIndex makes the box reachable by keyboard, which is what
                    lets a keyboard user scroll it at all — but not inside a
                    clone, where a focus stop would land someone in a copy that
                    is hidden from assistive tech. */}
                <div className={styles.quoteWrap}>
                  <blockquote
                    id={`story-${index}`}
                    className={styles.quote}
                    tabIndex={clone ? -1 : 0}
                  >
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                </div>

                {hasFoot ? (
                  <div className={styles.foot}>
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
                        tabIndex={clone ? -1 : undefined}
                      >
                        Read on {story.source}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </figure>
            );
            }),
          )}
        </div>
      </div>
    </section>
  );
}
