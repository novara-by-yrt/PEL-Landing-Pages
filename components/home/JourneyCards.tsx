"use client";

import { useCallback, useRef, type PointerEvent } from "react";
import styles from "./JourneyCards.module.css";

export interface JourneyStep {
  title: string;
  text: string;
}

/** Degrees of tilt at the card's edge. Past ~10 it stops reading as depth
 *  and starts reading as a glitch. */
const MAX_TILT = 8;

export default function JourneyCards({ steps }: { steps: JourneyStep[] }) {
  const frameRef = useRef(0);

  const handleMove = useCallback((event: PointerEvent<HTMLLIElement>) => {
    // Coarse pointers never hover, and the CSS ignores these values there
    // anyway — skip the work rather than measuring on every touch drag.
    if (event.pointerType !== "mouse") return;

    const card = event.currentTarget;
    const { clientX, clientY } = event;

    // One write per frame: pointermove can fire far more often than the
    // display refreshes, and each write invalidates style.
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--ry", `${(x * MAX_TILT * 2).toFixed(2)}deg`);
      card.style.setProperty("--rx", `${(-y * MAX_TILT * 2).toFixed(2)}deg`);
      card.style.setProperty("--gx", `${(x * 100 + 50).toFixed(1)}%`);
      card.style.setProperty("--gy", `${(y * 100 + 50).toFixed(1)}%`);
    });
  }, []);

  const handleLeave = useCallback((event: PointerEvent<HTMLLIElement>) => {
    cancelAnimationFrame(frameRef.current);
    const card = event.currentTarget;
    card.style.removeProperty("--rx");
    card.style.removeProperty("--ry");
    card.style.removeProperty("--gx");
    card.style.removeProperty("--gy");
  }, []);

  return (
    <ol className={styles.grid}>
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={styles.card}
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
        >
          <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.text}>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
