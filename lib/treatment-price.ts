import type { GlanceItem, PriceItem } from "@/components/treatment/types";

/* Any "£1,800" / "£ 1800" figure. Deliberately not anchored: a price line is
   a sentence as often as it is a figure ("Chalazion Removal - Starting from
   £700 per chalazion removal"). */
const FIGURE = /£\s?(\d[\d,]*)/g;

function figuresIn(item: PriceItem): number[] {
  /* For the object form, read the price and nothing else. Its `note` carries
     figures that are not the price of the procedure — eye bag removal's note
     says "additional £2,000 for 2 laser treatments", which would otherwise
     undercut its own £11,000 and advertise the page as starting at £2,000. */
  const text = typeof item === "string" ? item : item.price;
  return [...text.matchAll(FIGURE)].map((m) => Number(m[1].replace(/,/g, "")));
}

/**
 * The lowest figure a treatment's price list quotes, as "From £1,800".
 *
 * Derived from the pricing section rather than stored alongside it, so the
 * headline figure cannot drift from the menu it is drawn from — change a
 * price and the hero and the At a Glance row follow.
 *
 * Null when the treatment quotes no figure at all: the ones priced only at
 * consultation ("Confirmed at consultation", "there is no set price") say so
 * in their own words further down the page, and inventing a "from" for them
 * would be worse than saying nothing.
 */
export function startingPrice(pricing?: PriceItem[]): string | null {
  const figures = (pricing ?? []).flatMap(figuresIn);
  if (figures.length === 0) return null;
  return `From £${Math.min(...figures).toLocaleString("en-GB")}`;
}

/** Labels the price row replaces, lowercased. "Excercise" is how ten of the
 *  treatments spell it in content/treatment-meta.json. */
const REPLACES = new Set(["exercise", "excercise", "cost"]);

/**
 * The At a Glance facts with the starting price among them.
 *
 * It takes the place of the "Exercise" row — a fact that said "Immediately"
 * on nearly every treatment that had it, where the price is the one thing a
 * visitor scans this panel for — or of an existing "Cost" row, keeping that
 * row's position. A treatment with neither gets the price first, since that
 * is where it is looked for.
 *
 * A treatment with no facts at all keeps none: TreatmentGlance renders
 * nothing for an empty list, and a panel holding a single price row is not
 * an "At a Glance".
 */
export function glanceWithPrice(glance: GlanceItem[] = [], pricing?: PriceItem[]): GlanceItem[] {
  const price = startingPrice(pricing);
  if (!price || glance.length === 0) return glance;

  const row: GlanceItem = { label: "Price", value: price };
  const at = glance.findIndex((item) => REPLACES.has(item.label.trim().toLowerCase()));
  if (at === -1) return [row, ...glance];
  return glance.map((item, i) => (i === at ? row : item));
}
