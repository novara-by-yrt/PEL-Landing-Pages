"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import styles from "./HeroVideo.module.css";

const MEDIA_ID = "7jmeer6jnr";
const SWATCH = `https://fast.wistia.com/embed/medias/${MEDIA_ID}/swatch`;

/* Distinguishes one mount's copy of the media module from the next. See the
   effect that injects it for why each mount needs its own URL. */
let mediaScriptSequence = 0;

/**
 * Looping, muted background video for the hero — expected to be already
 * playing by the time a visitor sees the page, not something that starts
 * seconds later.
 *
 * Two deliberate choices:
 *
 * 1. player.js loads with `afterInteractive`: right after hydration, not
 *    gated on the browser going idle. `lazyOnload` was tried here first
 *    and rolled back — on a page also running GTM, Clarity and the Meta
 *    Pixel, idle time can be seconds away or later, which reads as "the
 *    video doesn't play" to anyone landing on the page in that window. Same
 *    tier as those analytics scripts, not before them: <Tracking /> renders
 *    higher in the tree (root layout, ahead of page content), so it reaches
 *    Next.js's script queue first without this needing its own later stage.
 *    The other half of the embed snippet, the per-media module, is injected
 *    by hand instead — see the effect below for why.
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

  /* Wistia's per-media module — the half of the embed snippet that carries
     this clip's data and brings a matching <wistia-player> to life. It is
     injected by hand, once per mount, rather than through <Script>, because
     two separate layers of caching otherwise make it run only once for the
     lifetime of the tab:

       • next/script keeps a module-level LoadCache of every src it has
         loaded and returns early for a repeat, so no second tag is ever
         appended;
       • an ES module is keyed by URL in the module registry, so even an
         identical tag appended by hand would not re-execute.

     Landing on "/" directly therefore works — everything runs for the first
     time — while arriving from another page leaves the freshly mounted
     player with nothing to initialise it, sitting on its poster frame. That
     is the "video is stuck until I refresh" report. The query string gives
     each mount a URL the registry has not seen, which is what makes the
     module run again; the tag is removed on unmount so repeat visits do not
     pile them up.

     player.js, the other half of the snippet, is deliberately left on
     <Script> below: it defines the custom element once and re-running it
     would only risk a duplicate customElements.define(). */
  useEffect(() => {
    if (!motionAllowed) return;

    const script = document.createElement("script");
    script.type = "module";
    script.async = true;
    script.src = `https://fast.wistia.com/embed/${MEDIA_ID}.js?remount=${++mediaScriptSequence}`;
    document.body.appendChild(script);

    return () => script.remove();
  }, [motionAllowed]);

  /* Belt and braces on top of autoplay="true". The attribute is what should
     start playback, but it is evaluated when the element upgrades, and an
     autoplay attempt that the browser declines at that instant is not
     retried by the player itself — so a muted background clip can silently
     sit on its first frame. Guarded on reduced motion so it can't override
     choice 2 above.

     `customElements.whenDefined` only proves the wistia-player *class* is
     registered, not that this particular instance has finished its own setup
     — and on a client-side navigation the class is already defined, so it
     resolves on the next tick, potentially well before the player is ready
     to accept a play(). Hence a short retry rather than a single attempt:
     each one is a no-op once the video is genuinely playing, and it stops as
     soon as playback is confirmed or after ~5s. */
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
