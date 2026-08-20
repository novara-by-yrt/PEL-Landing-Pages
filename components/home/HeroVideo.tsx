"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import styles from "./HeroVideo.module.css";

const MEDIA_ID = "aab9b1a82e";
const SWATCH = `https://fast.wistia.com/embed/medias/${MEDIA_ID}/swatch`;

/**
 * Looping, muted background video for the hero.
 *
 * Two deliberate choices:
 *
 * 1. The Wistia scripts load with `lazyOnload`, during browser idle time —
 *    after the analytics scripts in <Tracking /> (GTM, Clarity, Meta Pixel,
 *    all `afterInteractive`) have already had the main thread. The hero's
 *    LCP element is the headline, and a decorative video has no business
 *    competing with analytics, or with the headline, for bandwidth — the
 *    swatch frame covers the gap, so nothing renders empty in the meantime.
 *
 * 2. The player only mounts when the visitor has not asked for reduced
 *    motion. Hiding an autoplaying video in CSS still downloads and decodes
 *    it; not rendering it means the request is never made, and the still
 *    frame is what they get instead.
 */
export default function HeroVideo() {
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionAllowed(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.poster} style={{ backgroundImage: `url(${SWATCH})` }} />

      {motionAllowed && (
        <>
          <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
          <Script
            src={`https://fast.wistia.com/embed/${MEDIA_ID}.js`}
            type="module"
            strategy="lazyOnload"
          />
          <wistia-player
            className={styles.player}
            media-id={MEDIA_ID}
            aspect="1.7777777777777777"
            autoplay="true"
            muted="true"
            silent-autoplay="allow"
            end-video-behavior="loop"
            controls-visible-on-load="false"
            big-play-button="false"
            playbar="false"
            volume-control="false"
            fullscreen-button="false"
            settings-control="false"
            playsinline="true"
          />
        </>
      )}
    </div>
  );
}
