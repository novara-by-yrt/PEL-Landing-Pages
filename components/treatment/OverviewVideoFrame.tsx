"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./TreatmentOverview.module.css";

const YOUTUBE_ID = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;

function getEmbedUrl(url: string) {
  const match = url.match(YOUTUBE_ID);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
}

/** The overview image frame, but clickable: swaps its still to a playing iframe. */
export function OverviewVideoFrame({
  image,
  video,
  heading,
  imageBadge,
}: {
  image: string;
  video: string;
  heading: string;
  imageBadge?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={styles.tpOverviewFrame}>
        <iframe
          src={getEmbedUrl(video)}
          title={heading}
          allow="autoplay; encrypted-media; fullscreen"
          className={styles.tpOverviewFrameEmbed}
        />
      </div>
    );
  }

  return (
    <div className={styles.tpOverviewFrame}>
      {imageBadge && <span className={styles.tpOverviewBadge}>{imageBadge}</span>}
      <button
        type="button"
        className={styles.tpOverviewPlayBtn}
        onClick={() => setPlaying(true)}
        aria-label={`Play video: ${heading}`}
      >
        <Image src={image} alt={heading} fill sizes="(max-width: 860px) 100vw, 45vw" />
        <span className={styles.tpOverviewScrim}>
          <span className={styles.tpOverviewPlay}>
            <svg className={styles.tpOverviewPlayIcon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </button>
    </div>
  );
}
