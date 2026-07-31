"use client";

import Image from "next/image";

interface CarouselItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface AutoScrollCarouselProps {
  items: CarouselItem[];
  speed?: number;
}

export default function AutoScrollCarousel({ items, speed = 40 }: AutoScrollCarouselProps) {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <style>{`
        @keyframes scroll-logos {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-scroll-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: scroll-logos ${speed}s linear infinite;
        }
        .logo-scroll-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="logo-scroll-track">
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 auto",
              padding: "0 2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width || 120}
              height={item.height || 60}
              style={{ objectFit: "contain", maxHeight: "60px", width: "auto" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
