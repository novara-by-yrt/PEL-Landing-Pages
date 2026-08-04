"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GoogleMark from "@/components/shared/GoogleMark";
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

/** Quotes longer than this get a Read more / Read less toggle. All four of
 *  the current reviews are well past it; shorter ones added later will not
 *  show a control that does nothing. */
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

export default function PatientStories({ stories }: { stories: PatientStory[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Arrows reflect where the rail actually is, so neither one sits live at a
  // limit it cannot move past.
  const syncEdges = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    syncEdges();
    window.addEventListener("resize", syncEdges);
    return () => window.removeEventListener("resize", syncEdges);
  }, [syncEdges]);

  const slide = useCallback((direction: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(`.${styles.card}`);
    const gap = 24;
    const stride = card ? card.offsetWidth + gap : 400;
    el.scrollBy({ left: direction * stride, behavior: "smooth" });
  }, []);

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
            disabled={atStart}
            aria-label="Previous patient stories"
          >
            <Chevron back />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => slide(1)}
            disabled={atEnd}
            aria-label="Next patient stories"
          >
            <Chevron />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        onScroll={syncEdges}
        className={styles.viewport}
        tabIndex={0}
        role="region"
        aria-label="Patient reviews"
      >
        <div className={styles.track}>
          {stories.map((story, index) => {
            const isLong = story.quote.length > CLAMP_THRESHOLD;
            const isOpen = Boolean(expanded[index]);

            return (
              <figure key={story.author} className={styles.card}>
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
                    onClick={() =>
                      setExpanded((prev) => ({ ...prev, [index]: !prev[index] }))
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
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M8 16L16 8M9.5 8H16v6.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  ) : null}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
