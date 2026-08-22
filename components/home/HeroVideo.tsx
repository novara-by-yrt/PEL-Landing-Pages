"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import styles from "./HeroVideo.module.css";

const MEDIA_ID = "7jmeer6jnr";
const SWATCH = `https://fast.wistia.com/embed/medias/${MEDIA_ID}/swatch`;

/**
 * Every attribute the player is configured with, applied by hand rather than
 * written as JSX props — see the effect below for why that matters.
 */
const PLAYER_ATTRIBUTES: Record<string, string> = {
  "media-id": MEDIA_ID,
  aspect: "1.7777777777777777",
  autoplay: "true",
  muted: "true",
  "silent-autoplay": "allow",
  /** Restarts the video when it ends. */
  "end-video-behavior": "loop",
  /* The player suspends a *muted* video whenever it is scrolled out of the
     viewport and resumes it on the way back in — that is what its default of
     "auto" means, and this video is muted. Sensible for a video someone chose
     to watch, wrong for decorative wallpaper, so it is switched off here. */
  "play-suspended-off-screen": "false",
  "controls-visible-on-load": "false",
  "big-play-button": "false",
  "play-bar-control": "false",
  "volume-control": "false",
  "fullscreen-control": "false",
  "settings-control": "false",
  playsinline: "true",
};

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
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionAllowed(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /* The player element is built by hand instead of being written as JSX.
     React would otherwise decide, per prop, whether to write a DOM attribute
     or assign a property — and for a custom element it assigns the property
     whenever one exists. Which of the two it picks here depends on whether
     wistia-player has been registered yet, and that differs between the two
     ways of arriving at "/":

       • landing on "/" directly, player.js is still in flight, so there is
         no autoplay property to assign and React writes autoplay="true";
       • arriving from another page, the class was registered on an earlier
         visit, so React assigns the *string* "true" to the property — and
         the player's setter takes `boolean`, bails on anything else, and
         never reflects it back to an attribute.

     The element then connects with no autoplay attribute at all, reads the
     default of false, and sits on its first frame: the video that only plays
     if you reload. Measured against the real player, the whole attribute set
     (autoplay, muted, the rest) was missing on that second path.

     Creating the element, setting every attribute, and only then putting it
     in the document sidesteps the guesswork entirely and matches the order
     the player expects — it reads its attributes in connectedCallback, so
     they have to be there before it is appended, which also rules out
     setting them from a ref callback or a later effect. */
  useEffect(() => {
    if (!motionAllowed) return;
    const stage = stageRef.current;
    if (!stage) return;

    const player = document.createElement("wistia-player") as HTMLElement & {
      play?: () => void;
      paused?: boolean;
    };
    for (const [name, value] of Object.entries(PLAYER_ATTRIBUTES)) {
      player.setAttribute(name, value);
    }
    player.className = styles.player;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;
    const MAX_ATTEMPTS = 10;
    const RETRY_DELAY_MS = 500;

    const isPlaying = () => player.paused === false;

    /* Belt and braces on top of autoplay. "api-ready" is the event the player
       fires once it has fetched its media and built its public API, which is
       the first moment a play() call can be honoured; the bounded retry
       behind it covers an instance that was already ready before the listener
       was attached. Each attempt is a no-op once the video is genuinely
       playing, and the loop stops as soon as it is, or after ~5s. */
    const attemptPlay = () => {
      if (cancelled || isPlaying()) return;
      if (timer) clearTimeout(timer);
      try {
        player.play?.();
      } catch {
        // Autoplay refused outright (e.g. iOS Low Power Mode): the poster
        // swatch underneath stays visible, which is the intended fallback.
      }
      attempts += 1;
      if (!cancelled && !isPlaying() && attempts < MAX_ATTEMPTS) {
        timer = setTimeout(attemptPlay, RETRY_DELAY_MS);
      }
    };

    player.addEventListener("api-ready", attemptPlay);
    stage.appendChild(player);
    attemptPlay();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      player.removeEventListener("api-ready", attemptPlay);
      player.remove();
    };
  }, [motionAllowed]);

  return (
    <div className={styles.stage} ref={stageRef} aria-hidden="true">
      <div className={styles.poster} style={{ backgroundImage: `url(${SWATCH})` }} />

      {motionAllowed && (
        <>
          <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
          <Script
            src={`https://fast.wistia.com/embed/${MEDIA_ID}.js`}
            type="module"
            strategy="afterInteractive"
          />
        </>
      )}
    </div>
  );
}
