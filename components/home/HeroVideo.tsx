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
     autoplay attempt that the browser declines at that instant is not
     retried by the player itself — so a muted background clip can silently
     sit on its first frame. Guarded on reduced motion so it can't override
     choice 2 above.

     `customElements.whenDefined` only proves the wistia-player *class* is
     registered — on the first visit that coincides with the player instance
     actually being ready, because defining the class and the browser
     fetching/decoding the video happen around the same time. On a client-side
     navigation back to "/" later in the session the class is already
     defined, so this promise resolves on the next tick — before the fresh
     instance has necessarily finished its own internal setup (fetching the
     manifest, wiring the source). A single play() attempt at that instant can
     silently do nothing, with nothing to retry it. So this retries on a short
     timer instead of firing once: each attempt is a no-op once the video is
     genuinely playing (per the same reasoning as the single-shot version),
     and it stops as soon as playback is confirmed or after ~5s. */
  useEffect(() => {
    if (!motionAllowed) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;
    const MAX_ATTEMPTS = 10;
    const RETRY_DELAY_MS = 500;

    const isPlaying = () => {
      const player = playerRef.current as (HTMLElement & { paused?: boolean }) | null;
      return player?.paused === false;
    };

    const attemptPlay = () => {
      if (cancelled || isPlaying()) return;
      try {
        playerRef.current?.play?.();
      } catch {
        // Autoplay refused outright (e.g. iOS Low Power Mode): retrying won't
        // help, but there is no harm in the next scheduled attempt trying anyway.
      }
      attempts += 1;
      if (!cancelled && !isPlaying() && attempts < MAX_ATTEMPTS) {
        timer = setTimeout(attemptPlay, RETRY_DELAY_MS);
      }
    };

    customElements
      .whenDefined("wistia-player")
      .then(() => {
        if (cancelled) return;
        attemptPlay();
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
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
