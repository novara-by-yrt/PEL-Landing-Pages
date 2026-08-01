"use client";

import { TpIcon } from "@/components/treatment/TpIcon";
import styles from "./BlogShareIcons.module.css";

export function BlogShareIcons({ url, title }: { url: string; title: string }) {
  const open = (href: string) => window.open(href, "_blank", "noopener,noreferrer,width=600,height=500");

  return (
    <div className={styles.blogShare}>
      <button
        type="button"
        aria-label="Share on Facebook"
        onClick={() => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)}
      >
        f
      </button>
      <button
        type="button"
        aria-label="Share on X"
        onClick={() => open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`)}
      >
        𝕏
      </button>
      <button
        type="button"
        aria-label="Share by email"
        onClick={() => { window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`; }}
      >
        <TpIcon name="mail" size={16} />
      </button>
    </div>
  );
}
