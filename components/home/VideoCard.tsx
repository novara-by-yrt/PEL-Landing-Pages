"use client";

import { useState } from "react";
import Image from "next/image";

interface VideoCardProps {
  thumbnailSrc: string;
  title: string;
  videoUrl: string;
}

export default function VideoCard({ thumbnailSrc, title, videoUrl }: VideoCardProps) {
  const [open, setOpen] = useState(false);

  const getEmbedUrl = (url: string) => {
    const youtubeRegex =
      /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
  };

  return (
    <>
      <div
        style={{
          background: "var(--clr-bg-subtle)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform var(--duration) var(--ease-out), box-shadow var(--duration) var(--ease-out)",
        }}
        onClick={() => setOpen(true)}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-lg)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        <div style={{ position: "relative", aspectRatio: "16/9" }}>
          <Image
            src={thumbnailSrc}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "hsl(220 25% 12% / 0.3)",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "9999px",
                background: "hsl(0 0% 100% / 0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px hsl(220 25% 12% / 0.3)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="var(--clr-primary)"
                style={{ width: "22px", height: "22px", marginLeft: "3px" }}
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        <p
          style={{
            padding: "0.875rem 1rem",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
            color: "var(--clr-text)",
            textAlign: "center",
          }}
        >
          {title}
        </p>
      </div>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "hsl(220 25% 12% / 0.85)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              position: "relative",
              width: "min(900px, 100%)",
              aspectRatio: "16/9",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close video"
              style={{
                position: "absolute",
                top: "-2.5rem",
                right: 0,
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "1.5rem",
                cursor: "pointer",
                padding: "0.25rem",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
            <iframe
              src={getEmbedUrl(videoUrl)}
              title={title}
              allow="autoplay; encrypted-media; fullscreen"
              style={{ width: "100%", height: "100%", border: "none", borderRadius: "var(--radius-lg)" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
