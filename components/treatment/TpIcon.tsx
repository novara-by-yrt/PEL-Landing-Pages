import type { CSSProperties } from "react";

// Minimal hand-drawn line-icon set (1.6px stroke) shared across treatment page sections.
const TP_ICON_PATHS: Record<string, string> = {
  clock: "M12 7v5l3.2 1.9M20.5 12a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0z",
  car: "M4 16.5V12l1.8-4.5A2 2 0 0 1 7.7 6h8.6a2 2 0 0 1 1.9 1.5L20 12v4.5M4 16.5h16M4 16.5a1.6 1.6 0 0 0 1.6 1.6h.3A1.6 1.6 0 0 0 7.5 16.5M16.5 16.5a1.6 1.6 0 0 0 1.6 1.6h.3a1.6 1.6 0 0 0 1.6-1.6M4 13h16",
  shield: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z",
  building: "M6 21V4h8v17M6 21h14M6 21H3M9 8h1.6M9 11.5h1.6M9 15h1.6M14 21v-4h3v4",
  calendar: "M7 3v3M17 3v3M4 8h16M5 5.5h14V20H5zM8 12.5h3v3H8z",
  pulse: "M3 12h4l2.2 6L12.5 5l2 7H21",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",
  clipboard: "M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1zM7 6h10v14H7zM9.5 13l1.8 1.8L14.5 11",
  pin: "M12 21s6.5-5.9 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.1 6.5 11 6.5 11zM12 12.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2z",
  eye: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  compass: "M12 21.5a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19zM15.5 8.5l-2 5.5-5.5 2 2-5.5 5.5-2z",
  arrow: "M4 12h16M13.5 6l6 6-6 6",
  chevron: "M8.5 5l7 7-7 7",
  quote: "M6.5 7h3.6v5.4a3.6 3.6 0 0 1-3.6 3.6M13.9 7h3.6v5.4a3.6 3.6 0 0 1-3.6 3.6",
  phone: "M20.7 16.6v2.7a1.8 1.8 0 0 1-2 1.8 17.9 17.9 0 0 1-7.8-2.8 17.6 17.6 0 0 1-5.4-5.4A17.9 17.9 0 0 1 2.7 5.1 1.8 1.8 0 0 1 4.4 3.3h2.7a1.8 1.8 0 0 1 1.8 1.5c.1.8.4 1.7.7 2.4a1.8 1.8 0 0 1-.4 1.9L8 10.4a14.4 14.4 0 0 0 5.4 5.4l1.3-1.2a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.6 2.4.7a1.8 1.8 0 0 1 1.7 1.7z",
  check: "M4.5 12.5l4.7 4.7L19.5 6.9",
  star: "M12 3.3l2.5 5.3 5.7.8-4.1 4.1 1 5.7-5.1-2.8-5.1 2.8 1-5.7-4.1-4.1 5.7-.8L12 3.3z",
  mail: "M4 6h16v12H4zM4 6.5l8 6.5 8-6.5",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  search: "M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM20.5 20.5L16 16",
};

// Maps at-a-glance labels (from treatment-meta.json) to an icon key above.
const GLANCE_ICON_KEYS: Record<string, string> = {
  Duration: "clock",
  Time: "clock",
  Driving: "car",
  Anaesthesia: "shield",
  Anesthesia: "shield",
  "Hospital Stay": "building",
  "Hospital stay": "building",
  "Down time": "calendar",
  Downtime: "calendar",
  Exercise: "pulse",
  Excercise: "pulse",
  Recovery: "pulse",
  "Final results": "sparkle",
  Results: "sparkle",
  "Pre admission tests": "clipboard",
  Addresses: "pin",
};

export function glanceIconKey(label: string): string {
  return GLANCE_ICON_KEYS[label] ?? "clock";
}

export function TpIcon({
  name,
  size = 20,
  stroke = 1.6,
  filled = false,
  style,
}: {
  name: string;
  size?: number;
  stroke?: number;
  filled?: boolean;
  style?: CSSProperties;
}) {
  const d = TP_ICON_PATHS[name] || TP_ICON_PATHS.clock;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0, ...style }}
    >
      <path d={d} />
    </svg>
  );
}
