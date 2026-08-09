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
