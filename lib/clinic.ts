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
 *   then: 121 Harley Street, London, W1G 6AX · +44 7476 544881 · info@perfecteyesltd.com
 *   now: phone updated to 020 7183 5121, matching the number live on
 *        perfecteyesltd.com today (the old mobile number is still the one
 *        published in that site's JSON-LD, so it may be stale there too);
 *        email consolidated to enquiries@ — info@, manager@ and secretary@
 *        were all previously published in different places.
 *
 * Confirm these are current before this goes live — a wrong number on a
 * clinic site sends patients nowhere.
 *
 * "Perfect Eyes Clinic" is the public trading name used here and everywhere
 * else on the site. The registered company name at Companies House is still
 * "Perfect Eyes Ltd" (companyNumber below) — UK company law requires that
 * suffix on the legal name — so it stays hardcoded, not sourced from here, in
 * the few places that make a legal/regulatory statement about the entity:
 * the footer's copyright/registration line (components/layout/Footer.tsx),
 * the privacy notices' Data Controller statements, and the T&Cs' entity
 * clauses.
 */
export const CLINIC = {
  name: "Perfect Eyes Clinic",
  phoneDisplay: "020 7183 5121",
  phoneHref: "tel:+442071835121",
  email: "enquiries@perfecteyesltd.com",
  addressShort: "121 Harley Street, London",
  address: "Perfect Eyes Clinic, 121 Harley Street, London, W1G 6AX",
  companyNumber: "10036376",
  hours: [
    { day: "Mon to Fri", time: "9:30am to 6:00pm" },
    { day: "Sat & Sun", time: "Closed" },
  ],
} as const;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  CLINIC.address,
)}`;

/**
 * Consultation fees — published on the contact page and the closing "Begin
 * your journey" CTA panel. Single source of truth for the same reason as
 * CLINIC above: two hard-coded copies of a price list will eventually say
 * two different things.
 *
 * `with` is who the fee is for time with — the first three rows read as
 * generic consultation types with nothing to say they are specifically with
 * Dr Sabrina, and the fourth (Perfect Skin Studio) is with her team rather
 * than her personally, which the label alone doesn't distinguish either.
 */
export const CONSULTATION_FEES = [
  { label: "New Consultation", price: "£300", with: "Dr Sabrina Shah-Desai" },
  { label: "Revision / 2nd Opinion", price: "£400", with: "Dr Sabrina Shah-Desai" },
  { label: "Follow-up / Review", price: "From £200", with: "Dr Sabrina Shah-Desai" },
  { label: "Perfect Skin Studio consultation", price: "£100", with: "Dr Sabrina's team" },
] as const;

/**
 * Social accounts. The designs also show Facebook and YouTube pills, but no
 * URLs for those accounts exist anywhere in the repository — add them here and
 * they appear in both the footer and the contact panel.
 */
export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/drsabrinashahdesaiofficial/" },
  { label: "X / Twitter", href: "https://twitter.com/perfecteyesltd" },
] as const;
