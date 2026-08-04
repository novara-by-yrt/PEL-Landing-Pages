"use client";

import { useEffect, useState } from "react";
import styles from "./HeroVideo.module.css";

const MEDIA_ID = "82n4t7ug2e";
const POSTER = `https://fast.wistia.com/embed/medias/${MEDIA_ID}/swatch`;

// Direct file deliveries from Wistia's asset API (fast.wistia.net/embed/medias/{id}.json),
// not the player SDK. This loop is decorative, muted and controls-free, so none of the SDK's
// adaptive-bitrate engine, captions, chapters or analytics pings are needed — the file stays
// hosted on Wistia's CDN, we just stop asking a ~600KiB JS player to fetch it for us.
const SOURCE_MOBILE = "https://embed-ssl.wistia.com/deliveries/609d2eff00ea27c7c292b657a4b9e30880792394.bin";
const SOURCE_DESKTOP = "https://embed-ssl.wistia.com/deliveries/f23a6837b804502c76142cbf5028e0f0711ead9c.bin";

/**
 * Looping, muted background video for the hero.
 *
 * Two deliberate choices:
 *
 * 1. A native <video>, not Wistia's player SDK. Profiling showed the SDK
 *    (public API + HLS engine + captions/chapters/logo modules) costs over a
 *    second of main-thread script evaluation and several MB of transfer —
 *    all for a video with no controls, captions or analytics need. A plain
 *    <video poster> gets the same visual result with none of that: the
 *    browser decodes it natively, and nothing renders empty while it loads
 *    because the poster frame covers the gap.
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
      {motionAllowed ? (
        <video
          className={styles.player}
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        >
          <source src={SOURCE_MOBILE} type="video/mp4" media="(max-width: 899px)" />
          <source src={SOURCE_DESKTOP} type="video/mp4" />
        </video>
      ) : (
        <div className={styles.poster} style={{ backgroundImage: `url(${POSTER})` }} />
      )}
    </div>
  );
}
