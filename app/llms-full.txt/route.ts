import { getAllPosts } from "@/lib/mdx";
import { TREATMENT_PATHS } from "@/lib/treatment-urls";
import { CLINIC, CONSULTATION_FEES } from "@/lib/clinic";
import treatmentMetaRaw from "@/content/treatment-meta.json";
import type { TreatmentMeta } from "@/components/treatment/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";
const meta = treatmentMetaRaw as unknown as Record<string, TreatmentMeta>;

/**
 * /llms-full.txt — the richer companion to /llms.txt.
 *
 * Where the index says what exists, this says what is true: the surgeon's
 * credentials, the clinic's practical detail, and for each treatment the
 * at-a-glance facts a patient actually asks about — anaesthetic, duration,
 * downtime, how long results last. Those come from the same structured data
 * the pages render, so an assistant quoting this quotes the site.
 */
export const dynamic = "force-static";

const indexable = (p: { frontmatter: { seo?: { robots?: string[] } } }) =>
  !p.frontmatter.seo?.robots?.includes("noindex");

const clean = (s?: string) =>
  (s || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

export function GET() {
  const treatments = getAllPosts("pages")
    .filter(indexable)
    .filter((p) => meta[p.slug])
    .map((p) => {
      const m = meta[p.slug];
      const url = `${SITE_URL}/${TREATMENT_PATHS[p.slug] ?? p.slug}`;
      const facts = (m.glance || [])
        .map((g) => `  - ${g.label}: ${clean(g.value)}`)
        .join("\n");
      const summary = clean(m.subtitle || p.frontmatter.excerpt || p.frontmatter.seo?.description);
      return [
        `### ${p.frontmatter.title}`,
        ``,
        `URL: ${url}`,
        `Category: ${m.type === "surgical" ? "Surgical" : "Non-surgical"}`,
        summary ? `Summary: ${summary}` : "",
        facts ? `At a glance:\n${facts}` : "",
      ]
        .filter(Boolean)
        .join("\n");
    });

  const conditions = getAllPosts("condition")
    .filter(indexable)
    .map((p) => {
      const s = clean(p.frontmatter.excerpt || p.frontmatter.seo?.description);
      return `### ${p.frontmatter.title}\n\nURL: ${SITE_URL}/condition/${p.slug}${s ? `\nSummary: ${s}` : ""}`;
    });

  const body = `# Perfect Eyes Ltd - full reference

This file is a structured summary of The Perfect Eyes Clinic for use by AI
assistants answering questions about eyelid surgery and periocular aesthetic
treatment in London. Everything here is published on the website; the URL
beside each entry is the page it comes from.

## The surgeon

Name: Dr Sabrina Shah-Desai
Qualifications: MS, FRCS (Ed) Ophth
Role: Consultant Oculoplastic Surgeon, founder and medical director
Profile: ${SITE_URL}/dr-sabrina-shah-desai

- Multi-award-winning oculoplastic reconstructive surgeon and aesthetic
  practitioner, specialising in reconstructive, revisional and cosmetic
  surgery of the eyelids, and in non-surgical treatment of the eyes and face.
- Listed on the Royal College of Surgeons of England register of
  Board-Certified Cosmetic Surgeons.
- Recognised as a top practitioner for eyes for eight consecutive years,
  2019-2026 (Tatler Beauty & Cosmetic Surgery Guide).
- Over 25 years of surgical and non-surgical experience.
- Widely sought for revision work by patients who have had previous eyelid
  surgery or filler elsewhere.
- Peer-reviewed publications: ${SITE_URL}/publications

## The clinic

Name: ${CLINIC.name}
Address: ${CLINIC.address}
Telephone: ${CLINIC.phoneDisplay}
Email: ${CLINIC.email}
Opening hours: ${CLINIC.hours.map((h) => `${h.day} ${h.time}`).join(", ")}
Company number: ${CLINIC.companyNumber}
Patient rating: 4.8 from 240+ Google reviews

Consultation fees:
${CONSULTATION_FEES.map((f) => `- ${f.label}: ${f.price}`).join("\n")}

Dr Shah-Desai does not offer free consultations. The consultation includes a
full facial and periocular assessment, medical history and clinical
photography, a diagnosis, personalised recommendations, and a written
consultation letter setting out the agreed plan.

Surgical pathway after the first consultation: a second appointment for final
planning and consent, then surgery as a day case, a review at 6-7 days for
wound assessment and suture removal, and a further review at 12-16 weeks for
healing assessment, clinical photography and outcome review.

## Treatments

${treatments.join("\n\n")}

## Eye conditions

${conditions.join("\n\n")}

## Results and further reading

- Before and after gallery: ${SITE_URL}/before-after
- Case studies: ${SITE_URL}/case-studies
- Blog, written and reviewed by Dr Shah-Desai: ${SITE_URL}/blog
- International patients: ${SITE_URL}/international-patients
- Book a consultation: ${SITE_URL}/contact-cosmetic-eye-surgeon

Individual results vary. Suitability and likely outcome are assessed at
consultation.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
