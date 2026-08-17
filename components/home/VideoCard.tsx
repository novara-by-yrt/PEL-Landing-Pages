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
  const [playing, setPlaying] = useState(false);
  // Flips a frame after the iframe mounts, so the crossfade has a starting
  // value to transition from instead of the embed just appearing on top.
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  return (
    <div className={styles.card}>
      <span className={styles.thumb}>
        {playing ? (
          <iframe
            src={getEmbedUrl(videoUrl)}
            title={title}
            allow="autoplay; encrypted-media; fullscreen"
            className={`${styles.frame} ${entered ? styles.frameVisible : ""}`}
          />
        ) : null}

        {/* Stays mounted and fades out under the embed rather than
            unmounting, so the swap crossfades instead of teleporting. */}
        <button
          type="button"
          className={`${styles.thumbButton} ${playing ? styles.thumbButtonHidden : ""}`}
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          aria-hidden={playing || undefined}
          tabIndex={playing ? -1 : undefined}
        >
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
        </button>
      </span>
      {/* No visible caption under the thumbnail. `title` still describes the
          clip to anyone who cannot see it - it names the iframe and labels
          the play button - but it is no longer repeated as a line of text
          below every card. */}
    </div>
  );
}
