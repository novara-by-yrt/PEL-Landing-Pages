"use client";

import { useState } from "react";
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
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={styles.card}>
        <span className={styles.thumb}>
          <iframe
            src={getEmbedUrl(videoUrl)}
            title={title}
            allow="autoplay; encrypted-media; fullscreen"
            className={styles.frame}
          />
        </span>
        <span className={styles.title}>{title}</span>
      </div>
    );
  }

  return (
    // A real <button>, so the card is reachable by keyboard and announced
    // as activatable — the previous onClick-on-a-div was neither. Hover and
    // lift are pure CSS rather than inline style mutations from JS.
    <button
      type="button"
      className={styles.card}
      onClick={() => setPlaying(true)}
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
  );
}
