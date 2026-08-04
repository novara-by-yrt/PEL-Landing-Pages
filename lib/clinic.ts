/**
 * Clinic contact details — single source of truth.
 *
 * The footer and the home page contact panel both read from here, so the site
 * can never publish two different phone numbers. Change a value once and it
 * updates everywhere.
 *
 * ⚠️ These were taken from the approved footer and contact-panel designs. The
 * values previously hard-coded in the footer were different:
 *
 *   was: 9 Harley Street, London, W1G 9QY · 020 7486 4886 · perfecteyesltd@gmail.com
 *   now: 121 Harley Street, London, W1G 6AX · +44 7476 544881 · info@perfecteyesltd.com
 *
 * Confirm these are current before this goes live — a wrong number on a
 * clinic site sends patients nowhere.
 */
export const CLINIC = {
  name: "Perfect Eyes Ltd",
  phoneDisplay: "+44 7476 544881",
  phoneHref: "tel:+447476544881",
  email: "info@perfecteyesltd.com",
  addressShort: "121 Harley Street, London",
  address: "Perfect Eyes Ltd, 121 Harley Street, London, W1G 6AX",
  companyNumber: "10036376",
  hours: [
    { day: "Mon – Fri", time: "9:30am – 6:00pm" },
    { day: "Sat & Sun", time: "Closed" },
  ],
} as const;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  CLINIC.address,
)}`;

/**
 * Social accounts. The designs also show Facebook and YouTube pills, but no
 * URLs for those accounts exist anywhere in the repository — add them here and
 * they appear in both the footer and the contact panel.
 */
export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/drsabrinashahdesaiofficial/" },
  { label: "X / Twitter", href: "https://twitter.com/perfecteyesltd" },
] as const;
