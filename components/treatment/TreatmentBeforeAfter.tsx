"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TpIcon } from "./TpIcon";
import type { GalleryItem } from "@/lib/mdx";
import styles from "./TreatmentBeforeAfter.module.css";

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

/** Same rail-scrolling carousel as the home page's TeamCarousel, re-skinned
 *  for a photo-only card since there's no name/role to show underneath. */
export function TreatmentBeforeAfter({
  gallery,
  title,
  isSurgical,
}: {
  gallery?: GalleryItem[];
  title: string;
  isSurgical: boolean;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

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
    const stride = card ? card.offsetWidth + 24 : 340;
    el.scrollBy({ left: direction * stride, behavior: "smooth" });
  }, []);

  if (!gallery || gallery.length === 0) return null;

  // Several treatment titles already end in "Surgery" (e.g. "Ptosis
  // Surgery", "Eyelid Lift Surgery") — only append it for the rest, so
  // surgical treatments never read "Surgery Surgery".
  const needsSurgerySuffix = isSurgical && !/surgery$/i.test(title.trim());

  return (
    <section className="tp-section" id="before-after">
      <div className="container">
        <div className="tp-head tp-center">
          <span className="tp-eyebrow">
            <TpIcon name="sparkle" size={13} />
            Real Patient Results
          </span>
          <h2>{title} Before and After</h2>
          <p>
            See the {title}
            {needsSurgerySuffix ? " Surgery" : ""} before and after results below, achieved by
            Dr Sabrina.
          </p>
        </div>

        <div className={styles.wrap}>
          <div
            ref={railRef}
            onScroll={syncEdges}
            className={styles.viewport}
            tabIndex={0}
            role="region"
            aria-label={`${title} before and after photos`}
          >
            <div className={styles.track}>
              {gallery.map((item, i) => (
                <figure key={`${item.image}-${i}`} className={styles.card}>
                  <div className={styles.photo}>
                    <Image
                      src={item.image}
                      alt={item.alt || `${title} before and after — case ${i + 1}`}
                      fill
                      sizes="(min-width: 640px) 340px, 78vw"
                      className={styles.photoImg}
                      loading={i < 2 ? "eager" : "lazy"}
                    />
                  </div>
                </figure>
              ))}
            </div>
          </div>

          <div className={styles.arrows}>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowPrev}`}
              onClick={() => slide(-1)}
              disabled={atStart}
              aria-label={`Previous ${title} photos`}
            >
              <Chevron back />
            </button>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowNext}`}
              onClick={() => slide(1)}
              disabled={atEnd}
              aria-label={`Next ${title} photos`}
            >
              <Chevron />
            </button>
          </div>
        </div>

        <p className={styles.disclaimer}>
          Disclaimer: Your results may vary. Any specific claims or duration of results vary for
          each patient and are not guaranteed.
        </p>
      </div>
    </section>
  );
}
