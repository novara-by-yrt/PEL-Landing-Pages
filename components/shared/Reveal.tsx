"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Reveal.module.css";

/**
 * Fades a section up into place the first time it scrolls into view.
 *
 * Client-only because it needs IntersectionObserver, but every section it
 * wraps is still server-rendered — this just adds the reveal class once the
 * browser confirms the section is on screen. Fires once; a marketing page
 * re-animating on every scroll-by fights its own reader.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in ms, for a group of Reveals entering together. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Read once, during render rather than in an effect: reduced-motion
  // preference doesn't change mid-session, and this keeps the effect below
  // to a single, always-async setState call (inside the observer callback).
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "-80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ""} ${className}`}
      style={delay ? ({ transitionDelay: `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
