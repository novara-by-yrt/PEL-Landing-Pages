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
      {/* Duration is the only dynamic part, so it rides in as a custom property
          and the animation itself stays in the cached stylesheet. */}
      <div
        className="logo-scroll-track"
        style={{ "--logo-scroll-speed": `${speed}s` } as React.CSSProperties}
      >
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
