"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TpIcon } from "./TpIcon";
import type { GalleryItem } from "@/lib/mdx";

export function BeforeAfterGallery({
  gallery,
  heading,
  description,
  title,
}: {
  gallery?: GalleryItem[];
  heading?: string;
  description?: string;
  title: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const count = gallery?.length ?? 0;
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) => setOpenIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count]
  );

  // Escape to close, arrows to navigate, and lock background scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, step]);

  // Move focus into the dialog on open, and back to the triggering thumbnail on close.
  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
    } else if (lastFocused.current) {
      lastFocused.current.focus();
      lastFocused.current = null;
    }
  }, [isOpen]);

  if (!gallery || gallery.length === 0) return null;

  const current = openIndex !== null ? gallery[openIndex] : null;

  return (
    <section className="tp-section">
      <style>{`
        .tp-bagal-head { max-width: 780px; }
        .tp-bagal-head p { font-size: 0.9375rem; color: var(--tp-slate); line-height: 1.7; margin: 1rem 0 0; }
        .tp-bagal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.75rem; margin-top: 2.75rem; }
        @media (max-width: 700px) { .tp-bagal-grid { grid-template-columns: 1fr; gap: 1.25rem; } }
        .tp-bagal-item {
          display: block; position: relative; padding: 0; width: 100%;
          border-radius: var(--tp-radius-lg); overflow: hidden; cursor: zoom-in;
          background: var(--tp-fog); border: 1px solid var(--tp-line); box-shadow: var(--tp-shadow-xs);
          transition: transform 240ms var(--tp-ease), box-shadow 240ms var(--tp-ease);
        }
        .tp-bagal-item:hover { transform: translateY(-4px); box-shadow: var(--tp-shadow-md); }
        .tp-bagal-item:focus-visible { outline: 3px solid var(--tp-indigo-700); outline-offset: 3px; }
        .tp-bagal-item img { display: block; width: 100%; height: auto; }
        .tp-bagal-zoom {
          position: absolute; right: 12px; bottom: 12px; z-index: 1;
          display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%;
          background: rgba(255,255,255,0.9); color: var(--tp-indigo-700);
          opacity: 0; transform: translateY(4px); transition: opacity 200ms var(--tp-ease), transform 200ms var(--tp-ease);
        }
        .tp-bagal-item:hover .tp-bagal-zoom,
        .tp-bagal-item:focus-visible .tp-bagal-zoom { opacity: 1; transform: translateY(0); }
        .tp-bagal-count { display: inline-flex; align-items: center; gap: 0.45rem; margin-top: 1rem; font-size: 0.8125rem; font-weight: 600; color: var(--tp-indigo-700); }
        .tp-bagal-note { margin-top: 2.25rem; font-size: 0.8125rem; color: var(--tp-slate); line-height: 1.6; font-style: italic; }

        .tp-lb {
          position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center;
          background: rgba(10,8,32,0.95); backdrop-filter: blur(6px); padding: clamp(1rem, 4vw, 3rem);
          animation: tp-lb-in 180ms var(--tp-ease);
        }
        @keyframes tp-lb-in { from { opacity: 0; } to { opacity: 1; } }
        .tp-lb-figure { position: relative; margin: 0; width: min(1100px, 92vw); }
        /* Scale to fit the available box in both axes — up or down — without ever cropping. */
        .tp-lb-figure img {
          display: block; margin: 0 auto;
          width: 100%; height: auto;
          max-height: calc(100vh - 11rem);
          object-fit: contain;
          border-radius: var(--tp-radius-lg);
        }
        .tp-lb-cap { color: rgba(255,255,255,0.82); font-size: 0.8125rem; text-align: center; margin-top: 0.9rem; }
        .tp-lb-btn {
          position: absolute; display: grid; place-items: center; width: 46px; height: 46px;
          border: 1px solid rgba(255,255,255,0.28); border-radius: 50%;
          background: rgba(255,255,255,0.12); color: #fff; cursor: pointer;
          transition: background 200ms var(--tp-ease), transform 200ms var(--tp-ease);
        }
        .tp-lb-btn:hover { background: rgba(255,255,255,0.24); }
        .tp-lb-btn:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
        .tp-lb-close { top: clamp(0.75rem, 3vw, 1.5rem); right: clamp(0.75rem, 3vw, 1.5rem); position: fixed; }
        .tp-lb-prev { left: clamp(0.5rem, 3vw, 1.75rem); top: 50%; transform: translateY(-50%); position: fixed; }
        .tp-lb-next { right: clamp(0.5rem, 3vw, 1.75rem); top: 50%; transform: translateY(-50%); position: fixed; }
        .tp-lb-prev svg { transform: rotate(180deg); }
        @media (max-width: 600px) {
          .tp-lb-prev, .tp-lb-next { top: auto; bottom: 1rem; transform: none; }
          .tp-lb-figure img { max-height: calc(100vh - 14rem); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tp-lb { animation: none; }
          .tp-bagal-item, .tp-bagal-zoom, .tp-lb-btn { transition: none; }
          .tp-bagal-item:hover { transform: none; }
        }
      `}</style>

      <div className="container">
        <div className="tp-head tp-bagal-head">
          <span className="tp-eyebrow">
            <TpIcon name="sparkle" size={13} />
            Real Patient Results
          </span>
          <h2>{heading || `${title} Before & After Gallery`}</h2>
          {description && <p>{description}</p>}
          <span className="tp-bagal-count">
            <TpIcon name="eye" size={14} />
            {count} {count === 1 ? "case" : "cases"}
          </span>
        </div>

        <div className="tp-bagal-grid">
          {gallery.map((item, i) => (
            <button
              key={`${item.image}-${i}`}
              type="button"
              className="tp-bagal-item"
              onClick={(e) => {
                lastFocused.current = e.currentTarget;
                setOpenIndex(i);
              }}
              aria-label={`Enlarge ${title} before and after, case ${i + 1} of ${count}`}
            >
              <span className="tp-bagal-zoom" aria-hidden="true">
                <TpIcon name="search" size={16} />
              </span>
              <Image
                src={item.image}
                alt={item.alt || `${title} before and after — case ${i + 1}`}
                width={item.width ?? 1280}
                height={item.height ?? 1280}
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                loading={i < 2 ? "eager" : "lazy"}
                priority={i === 0}
              />
            </button>
          ))}
        </div>

        <p className="tp-bagal-note">
          Individual results vary. All photographs are of real patients treated by Dr Sabrina Shah-Desai
          and are published with consent.
        </p>
      </div>

      {current && openIndex !== null && (
        <div
          className="tp-lb"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} before and after, case ${openIndex + 1} of ${count}`}
          onClick={close}
        >
          <button ref={closeRef} type="button" className="tp-lb-btn tp-lb-close" onClick={close} aria-label="Close image viewer">
            <TpIcon name="close" size={20} />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                className="tp-lb-btn tp-lb-prev"
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                aria-label="Previous image"
              >
                <TpIcon name="chevron" size={20} />
              </button>
              <button
                type="button"
                className="tp-lb-btn tp-lb-next"
                onClick={(e) => { e.stopPropagation(); step(1); }}
                aria-label="Next image"
              >
                <TpIcon name="chevron" size={20} />
              </button>
            </>
          )}

          <figure className="tp-lb-figure" onClick={(e) => e.stopPropagation()}>
            <Image
              src={current.image}
              alt={current.alt || `${title} before and after — case ${openIndex + 1}`}
              width={current.width ?? 1280}
              height={current.height ?? 1280}
              sizes="100vw"
              priority
            />
            <figcaption className="tp-lb-cap">
              {title} — case {openIndex + 1} of {count}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
