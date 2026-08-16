export interface GlanceItem {
  label: string;
  value: string;
}

export interface AdvantageItem {
  title: string;
  description: string;
  icon?: string;
}

export interface SimilarTreatmentItem {
  title: string;
  image: string;
  description?: string;
  href?: string;
}

/**
 * No longer rendered. The treatment template used to show these RealSelf
 * quotes in a "Patient Reviews" grid; it now shows the site-wide reviews rail
 * instead, so every page quotes the same patients. The shape and the data in
 * content/treatment-meta.json are kept so nothing is lost and the JSON still
 * typechecks — delete both together if the quotes are not wanted back.
 */
export interface ReviewItem {
  quote: string;
  href: string;
}

/**
 * A price line. The original shape was a single sentence per line, which the
 * card had to regex for a "£" to pick the figure out of. The object form names
 * the procedure, the figure and what the figure covers separately, so the row
 * can set them apart typographically. Both forms are supported — most
 * treatments still use the sentence.
 */
export type PriceItem =
  | string
  | {
      name: string;
      price: string;
      /** What the figure covers, e.g. "inclusive of hospital charge". */
      note?: string;
    };

export interface TreatmentMeta {
  heroImage: string;
  heroBg: string;
  heroBadge?: string;
  heroBgOpacity?: number;
  h1: string;
  subtitle: string;
  type: string;
  glance: GlanceItem[];
  advantages: AdvantageItem[];
  /** Overrides "Advantages of {title} Treatment" — for titles that already end in "Treatment". */
  advantagesHeading?: string;
  pricing: PriceItem[];
  /** Overrides the treatment title in the "… Cost in London" heading. */
  pricingTitle?: string;
  /** Overrides the standard line under that heading. */
  pricingLead?: string;
  similarTreatments: SimilarTreatmentItem[];
  reviews?: ReviewItem[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}
