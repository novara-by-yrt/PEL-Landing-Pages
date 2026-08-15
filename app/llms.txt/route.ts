import { getAllPosts } from "@/lib/mdx";
import { TREATMENT_PATHS } from "@/lib/treatment-urls";
import { CLINIC, CONSULTATION_FEES } from "@/lib/clinic";
import treatmentMetaRaw from "@/content/treatment-meta.json";
import type { TreatmentMeta } from "@/components/treatment/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";
const meta = treatmentMetaRaw as unknown as Record<string, TreatmentMeta>;

/**
 * /llms.txt — the index an AI assistant reads to find its way around the site.
 *
 * Generated from the same content the pages are built from rather than
 * hand-written, so it cannot fall out of date when a treatment is added,
 * renamed or retired. Indexable pages only: anything carrying noindex is
 * excluded here for the same reason it is excluded from the sitemap.
 */
export const dynamic = "force-static";

const indexable = (p: { frontmatter: { seo?: { robots?: string[] } } }) =>
  !p.frontmatter.seo?.robots?.includes("noindex");

export function GET() {
  const pages = getAllPosts("pages").filter(indexable);
  const treatments = pages
    .filter((p) => meta[p.slug])
    .map((p) => ({
      title: p.frontmatter.title,
      url: `${SITE_URL}/${TREATMENT_PATHS[p.slug] ?? p.slug}`,
      blurb: (meta[p.slug].subtitle || p.frontmatter.excerpt || "").trim(),
      type: meta[p.slug].type,
    }));

  const conditions = getAllPosts("condition")
    .filter(indexable)
    .map((p) => ({
      title: p.frontmatter.title,
      url: `${SITE_URL}/condition/${p.slug}`,
      blurb: (p.frontmatter.excerpt || "").trim(),
    }));

  const results = getAllPosts("before-after")
    .filter(indexable)
    .map((p) => `- [${p.frontmatter.title}](${SITE_URL}/before-after/${p.slug})`);

  const line = (t: string, u: string, b: string) =>
    `- [${t}](${u})${b ? `: ${b.replace(/\s+/g, " ").slice(0, 160)}` : ""}`;

  const surgical = treatments.filter((t) => t.type === "surgical");
  const nonSurgical = treatments.filter((t) => t.type !== "surgical");

  const body = `# Perfect Eyes Ltd — The Perfect Eyes Clinic

> A Harley Street clinic for eyes, face and skin, led by Dr Sabrina Shah-Desai,
> MS, FRCS (Ed) Ophth — a consultant oculoplastic surgeon with over 25 years of
> surgical and non-surgical experience. The clinic specialises in eyelid
> surgery, periocular aesthetics and revision work following surgery or filler
> performed elsewhere.

Location: ${CLINIC.address}
Telephone: ${CLINIC.phoneDisplay}
Email: ${CLINIC.email}
Opening hours: ${CLINIC.hours.map((h) => `${h.day} ${h.time}`).join(", ")}
Consultation fees: ${CONSULTATION_FEES.map((f) => `${f.label} ${f.price}`).join(", ")}
Note: Dr Shah-Desai does not offer free consultations.

## About

- [Dr Sabrina Shah-Desai](${SITE_URL}/dr-sabrina-shah-desai): The clinic's founder and lead surgeon — qualifications, registrations, awards and publications.
- [The clinic team](${SITE_URL}/team): Practitioners and support staff.
- [Publications](${SITE_URL}/publications): Peer-reviewed research authored by Dr Shah-Desai.
- [Patient journey](${SITE_URL}/journey-of-eye-care): What happens from first enquiry through to follow-up.
- [International patients](${SITE_URL}/international-patients): How patients travelling from abroad plan treatment.

## Surgical treatments

${surgical.map((t) => line(t.title, t.url, t.blurb)).join("\n")}

## Non-surgical treatments

${nonSurgical.map((t) => line(t.title, t.url, t.blurb)).join("\n")}

## Eye conditions

${conditions.map((c) => line(c.title, c.url, c.blurb)).join("\n")}

## Results

${results.join("\n")}

## Contact

- [Book a consultation](${SITE_URL}/contact-cosmetic-eye-surgeon): Enquiry form, fees and clinic details.
- [Blog](${SITE_URL}/blog): Articles on eye health and aesthetic medicine, written and reviewed by Dr Shah-Desai.

## Optional

- [Full detail](${SITE_URL}/llms-full.txt): Longer structured summary of the surgeon, the clinic and each treatment.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
