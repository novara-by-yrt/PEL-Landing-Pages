import type { DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * `<wistia-player>` is a custom element defined at runtime by Wistia's
 * player.js, so TypeScript has no knowledge of it. This declares the subset
 * of its attributes the site actually uses.
 *
 * Attribute names are kebab-case because they are real DOM attributes, not
 * React props — React passes unknown lowercase attributes through untouched.
 */
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "wistia-player": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "media-id": string;
        aspect?: string;
        autoplay?: string;
        muted?: string;
        /** Lets the player start muted without a user gesture. */
        "silent-autoplay"?: string;
        /** "loop" restarts the video when it ends. */
        "end-video-behavior"?: string;
        "controls-visible-on-load"?: string;
        "big-play-button"?: string;
        playbar?: string;
        "volume-control"?: string;
        "fullscreen-button"?: string;
        "settings-control"?: string;
        playsinline?: string;
      };
    }
  }
}

export {};
