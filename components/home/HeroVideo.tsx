"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import styles from "./HeroVideo.module.css";

const MEDIA_ID = "aab9b1a82e";
const SWATCH = `https://fast.wistia.com/embed/medias/${MEDIA_ID}/swatch`;

/**
 * Looping, muted background video for the hero — expected to be already
 * playing by the time a visitor sees the page, not something that starts
 * seconds later.
 *
 * Two deliberate choices:
 *
 * 1. The Wistia scripts load with `afterInteractive`: right after hydration,
 *    not gated on the browser going idle. `lazyOnload` was tried here first
 *    and rolled back — on a page also running GTM, Clarity and the Meta
 *    Pixel, idle time can be seconds away or later, which reads as "the
 *    video doesn't play" to anyone landing on the page in that window. Same
 *    tier as those analytics scripts, not before them: <Tracking /> renders
 *    higher in the tree (root layout, ahead of page content), so it reaches
 *    Next.js's script queue first without this needing its own later stage.
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
          <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
          <Script
            src={`https://fast.wistia.com/embed/${MEDIA_ID}.js`}
            type="module"
            strategy="afterInteractive"
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
