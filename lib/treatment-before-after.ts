/**
 * Maps a treatment page's file slug (content/treatment-meta.json) to its
 * matching case-study slug in content/before-after/, so a treatment page can
 * show a before/after slideshow of results for that specific treatment only.
 *
 * Not every treatment has a corresponding case study, and a couple of the
 * before-after entries (generic "blepharoplasty") don't map cleanly onto any
 * single current treatment page — those are left out rather than guessed at.
 * Treatments missing here simply render without the slideshow section.
 */
export const TREATMENT_BEFORE_AFTER: Record<string, string> = {
  "upper-eyelid-lift-surgery-blepharoplasty": "upper-blepharoplasty",
  "eye-bag-removal-blepharoplasty-uk": "lower-blepharoplasty-eyebag-removal",
  "ptosis-surgery": "ptosis-surgery",
  // Double eyelid surgery is Asian blepharoplasty — the treatment page's own
  // title says as much ("Double Eyelid (Asian Blepharoplasty)").
  "double-eyelid-surgery": "asian-blepharoplasty",
  "surgical-eyelid-surgery-revision-blepharoplasty-uk": "revision-blepharoplasty",
  polynucleotides: "polynucleotides",
  morpheus8: "morpheus8",
  "non-surgical-ultraclear-laser-treatment-uk": "ultraclear-laser",
  sofwave: "sofwave",
  "superior-sulcus-filler": "superior-sulcus-filler",
};
