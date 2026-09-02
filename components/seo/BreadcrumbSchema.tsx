import { buildBreadcrumbSchema, type BreadcrumbItem } from "@/lib/schema";

/**
 * Emits BreadcrumbList JSON-LD for a page.
 *
 * The MDX-driven routes build this inline, but the hand-written landing pages
 * each assemble their own JSX, so this keeps the markup identical across them
 * instead of seven near-copies that drift apart.
 */
export default function BreadcrumbSchema({
  items,
  url,
}: {
  items: BreadcrumbItem[];
  url: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildBreadcrumbSchema(items, url)),
      }}
    />
  );
}
