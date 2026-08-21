"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import styles from "./HeroVideo.module.css";

const MEDIA_ID = "7jmeer6jnr";
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
  const playerRef = useRef<HTMLElement & { play?: () => void }>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionAllowed(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /* Belt and braces on top of autoplay="true". The attribute is what should
     start playback, but it is evaluated when the element upgrades, and an
     autoplay attempt that the browser declines at that instant is not retried
     — so a muted background clip can silently sit on its first frame. Calling
     play() once the element is actually defined costs nothing when autoplay
     already worked (it's a no-op on an playing video) and recovers the case
     where it didn't. Guarded on reduced motion so it can't override choice 2
     above. */
  useEffect(() => {
    if (!motionAllowed) return;
    let cancelled = false;

    customElements
      .whenDefined("wistia-player")
      .then(() => {
        if (cancelled) return;
        try {
          playerRef.current?.play?.();
        } catch {
          // Autoplay refused outright (e.g. iOS Low Power Mode): the poster
          // swatch underneath stays visible, which is the intended fallback.
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [motionAllowed]);

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
            ref={playerRef}
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
