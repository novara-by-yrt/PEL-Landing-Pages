/**
 * How the before/after case studies split into the categories the site
 * presents them under. The Results nav panel and the Results index page both
 * read from here, so the two can never disagree.
 *
 * Slugs correspond to files in content/before-after/.
 */
export type ResultCategory = {
  id: string;
  label: string;
  blurb: string;
  slugs: string[];
};

export const RESULT_CATEGORIES: ResultCategory[] = [
  {
    id: "surgical",
    label: "Surgical",
    blurb: "Eyelid and brow surgery performed by Dr Shah-Desai.",
    slugs: [
      "upper-blepharoplasty",
      "lower-blepharoplasty-eyebag-removal",
      "ptosis-surgery",
      "asian-blepharoplasty",
      "revision-blepharoplasty",
      "blepharoplasty",
    ],
  },
  {
    id: "non-surgical",
    label: "Non-Surgical",
    blurb: "Injectable, energy-based and regenerative treatments.",
    slugs: [
      "polynucleotides",
      "morpheus8",
      "ultraclear-laser",
      "superior-sulcus-filler",
      "sofwave",
    ],
  },
];
