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

export interface TreatmentMeta {
  heroImage: string;
  heroBg: string;
  heroBadge?: string;
  h1: string;
  subtitle: string;
  type: string;
  glance: GlanceItem[];
  advantages: AdvantageItem[];
  pricing: string[];
  similarTreatments: SimilarTreatmentItem[];
  reviews?: ReviewItem[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}
