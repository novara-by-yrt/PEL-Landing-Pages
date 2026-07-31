"use client";

import { TpIcon } from "@/components/treatment/TpIcon";

export function BlogShareIcons({ url, title }: { url: string; title: string }) {
  const open = (href: string) => window.open(href, "_blank", "noopener,noreferrer,width=600,height=500");

  return (
    <div className="blog-share">
      <style>{`
        .blog-share { display: flex; gap: 8px; }
        .blog-share button {
          display: inline-flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08); color: #fff; cursor: pointer;
          transition: background 160ms var(--tp-ease), transform 160ms var(--tp-ease);
        }
        .blog-share button:hover { background: rgba(255,255,255,0.18); transform: translateY(-2px); }
      `}</style>
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
