"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./TeamCarousel.module.css";

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  /** Short post-nominals shown as chips over the portrait. */
  credentials?: string[];
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

/** "Dr Sabrina Shah-Desai" → "SS". The title is dropped so every monogram
 *  comes from the person's own name. */
function initials(name: string) {
  return name
    .replace(/^(Dr|Mr|Mrs|Ms)\s+/i, "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export default function TeamCarousel({ members }: { members: TeamMember[] }) {
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

  return (
    <div className={styles.wrap}>
      <div
        ref={railRef}
        onScroll={syncEdges}
        className={styles.viewport}
        tabIndex={0}
        role="region"
        aria-label="Clinic team"
      >
        <div className={styles.track}>
          {members.map((member) => (
            <article key={member.name} className={styles.card}>
              <div className={styles.photo}>
                <span className={styles.initials} aria-hidden="true">
                  {initials(member.name)}
                </span>
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 640px) 340px, 78vw"
                    className={styles.photoImg}
                  />
                ) : null}
                {member.credentials?.length ? (
                  <p className={styles.chips}>
                    {member.credentials.map((credential) => (
                      <span key={credential} className={styles.chip}>
                        {credential}
                      </span>
                    ))}
                  </p>
                ) : null}
              </div>

              <div className={styles.body}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.arrows}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => slide(-1)}
          disabled={atStart}
          aria-label="Previous team members"
        >
          <Chevron back />
        </button>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => slide(1)}
          disabled={atEnd}
          aria-label="Next team members"
        >
          <Chevron />
        </button>
      </div>
    </div>
  );
}
