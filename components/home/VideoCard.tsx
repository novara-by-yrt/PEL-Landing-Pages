"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./VideoCard.module.css";

interface VideoCardProps {
  thumbnailSrc: string;
  title: string;
  videoUrl: string;
}

const YOUTUBE_ID = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;

function getEmbedUrl(url: string) {
  const match = url.match(YOUTUBE_ID);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
}

export default function VideoCard({ thumbnailSrc, title, videoUrl }: VideoCardProps) {
  const [open, setOpen] = useState(false);

  // Escape closes the lightbox, and the page behind it stays put instead of
  // scrolling under the overlay.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      {/* A real <button>, so the card is reachable by keyboard and announced
          as activatable — the previous onClick-on-a-div was neither. Hover and
          lift are pure CSS rather than inline style mutations from JS. */}
      <button
        type="button"
        className={styles.card}
        onClick={() => setOpen(true)}
        aria-label={`Play video: ${title}`}
      >
        <span className={styles.thumb}>
          <Image
            src={thumbnailSrc}
            alt=""
            fill
            sizes="(min-width: 1000px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          <span className={styles.scrim}>
            <span className={styles.play}>
              <svg className={styles.playIcon} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </span>
        <span className={styles.title}>{title}</span>
      </button>

      {open && (
        <div
          className={styles.backdrop}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
        >
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className={styles.close}
              autoFocus
            >
              <svg className={styles.closeIcon} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
            <iframe
              src={getEmbedUrl(videoUrl)}
              title={title}
              allow="autoplay; encrypted-media; fullscreen"
              className={styles.frame}
            />
          </div>
        </div>
      )}
    </>
  );
}
