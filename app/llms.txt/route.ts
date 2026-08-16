import treatmentMetaRaw from "@/content/treatment-meta.json";
import { CLINIC } from "@/lib/clinic";
import { isIndexable } from "@/lib/indexable";
import { getAllPosts, type PostFrontmatter } from "@/lib/mdx";
import { TREATMENT_PATHS } from "@/lib/treatment-urls";

/**
 * /llms.txt — a curated Markdown map of the site for LLM agents, following the
 * llmstxt.org convention: an H1, a blockquote summary, then sections of
 * `- [name](url): description` links.
 *
 * It is generated from the same content collections as the sitemap and filtered
 * through the same isIndexable() rule, so a page that is noindex or a canonical
 * alias never appears here either. The blog archive sits under `## Optional`,
 * which the convention defines as the section an agent may skip when its
 * context budget is tight.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

type TreatmentMeta = { subtitle?: string; type?: string };
const treatmentMeta = treatmentMetaRaw as Record<string, TreatmentMeta>;

/** Frontmatter prose is HTML-ish and often long; links need one clean line. */
function summarise(...candidates: (string | undefined)[]): string {
  const raw = candidates.find((c) => c && c.trim());
  if (!raw) return "";
  const text = raw
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= 165) return text;
  const cut = text.slice(0, 165);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : 165)}…`;
}

function link(name: string, path: string, description: string): string {
  const url = `${SITE_URL}${path}`;
  return description ? `- [${name}](${url}): ${description}` : `- [${name}](${url})`;
}

type Entry = { slug: string; frontmatter: PostFrontmatter; content: string };

/**
 * Most blog posts carry no seo.description or excerpt — fall back to the
 * opening prose of the body so every link still says what it is.
 *
 * Migrated WordPress bodies are inconsistent: some open with <p>, many with a
 * bare <span>, and the publication entries are a single outbound <a> with no
 * prose at all. So this prefers a real paragraph, then falls back to the first
 * readable text anywhere, and gives up rather than emitting a naked URL.
 */
function firstParagraph(content: string): string | undefined {
  const paragraph = content.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1];
  const candidate = paragraph ?? content.slice(0, 1200);
  const text = candidate
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text || /^https?:\/\//i.test(text)) return undefined;
  return text;
}

function indexableEntries(
  dir: "posts" | "pages" | "before-after" | "condition",
  toPath: (slug: string) => string,
): { entry: Entry; path: string }[] {
  return getAllPosts(dir)
    .map((entry) => ({ entry, path: toPath(entry.slug) }))
    .filter(({ entry, path }) => isIndexable(entry.frontmatter, path));
}

function section(title: string, lines: string[]): string {
  return lines.length ? `## ${title}\n\n${lines.join("\n")}\n` : "";
}

export const dynamic = "force-static";

export function GET(): Response {
  const pages = indexableEntries("pages", (s) => `/${TREATMENT_PATHS[s] ?? s}`);

  // Treatments carry a type ("surgical" / "non-surgical") in treatment-meta;
  // anything without an entry there is a plain content page, not a treatment.
  const treatmentLines = (kind: string) =>
    pages
      .filter(({ entry }) => treatmentMeta[entry.slug]?.type === kind)
      .map(({ entry, path }) =>
        link(
          entry.frontmatter.title,
          path,
          summarise(treatmentMeta[entry.slug]?.subtitle, entry.frontmatter.seo?.description),
        ),
      )
      .sort();

  // A handful of migrated WordPress category containers have an empty body and
  // no structured data behind them. They are real URLs, but listing them here
  // would just spend an agent's context on a page with nothing to read.
  const hasSomethingToRead = ({ entry }: { entry: Entry }) =>
    entry.content.trim().length > 60 ||
    Boolean(entry.frontmatter.overviewPanels?.length) ||
    Boolean(entry.frontmatter.faq?.length) ||
    Boolean(entry.frontmatter.gallery?.length);

  const otherPageLines = pages
    .filter(({ entry }) => !treatmentMeta[entry.slug]?.type)
    .filter(hasSomethingToRead)
    .map(({ entry, path }) =>
      link(
        entry.frontmatter.title,
        path,
        summarise(
          entry.frontmatter.seo?.description,
          entry.frontmatter.excerpt,
          firstParagraph(entry.content),
        ),
      ),
    )
    .sort();

  const conditionLines = indexableEntries("condition", (s) => `/condition/${s}`)
    .map(({ entry, path }) =>
      link(
        entry.frontmatter.title,
        path,
        summarise(entry.frontmatter.seo?.description, entry.frontmatter.excerpt),
      ),
    )
    .sort();

  const beforeAfterLines = indexableEntries("before-after", (s) => `/before-after/${s}`)
    .map(({ entry, path }) =>
      link(
        entry.frontmatter.title,
        path,
        summarise(
          entry.frontmatter.seo?.description,
          entry.frontmatter.galleryDescription,
          entry.frontmatter.intro,
        ),
      ),
    )
    .sort();

  // Newest first — an agent skimming the archive wants current material.
  const blogLines = indexableEntries("posts", (s) => `/blog/${s}`)
    .sort(
      (a, b) =>
        new Date(b.entry.frontmatter.modified || b.entry.frontmatter.date || 0).getTime() -
        new Date(a.entry.frontmatter.modified || a.entry.frontmatter.date || 0).getTime(),
    )
    .map(({ entry, path }) =>
      link(
        entry.frontmatter.title,
        path,
        summarise(
          entry.frontmatter.seo?.description,
          entry.frontmatter.excerpt,
          firstParagraph(entry.content),
        ),
      ),
    );

  const keyPages = [
    link("Home", "", "Overview of the clinic, its treatments and patient results."),
    link("Meet the team", "/team", "The clinical practitioners and support staff at the clinic."),
    link("Patient journey", "/journey-of-eye-care", "What to expect from first enquiry through to aftercare."),
    link("Before & after results", "/before-after", "Real patient before-and-after photography by treatment."),
    link("Case studies", "/case-studies", "Detailed write-ups of individual patient cases."),
    link("Publications", "/publications", "Peer-reviewed papers and scientific work by Dr Sabrina Shah-Desai."),
    link("Contact", "/contact", `Book a consultation. ${CLINIC.address}. Tel ${CLINIC.phoneDisplay}.`),
  ];

  // Header blocks are separated by blank lines, so they are joined separately
  // from the sections — filtering empty sections must not strip those spacers.
  const header = [
    `# ${CLINIC.name}`,
    "",
    `> ${CLINIC.name} is a CQC-registered oculoplastic and aesthetic clinic at ${CLINIC.addressShort}, led by consultant oculoplastic surgeon Dr Sabrina Shah-Desai. The practice specialises in surgical and non-surgical treatment of the eyelids and the area around the eyes, alongside wider facial aesthetics.`,
    "",
    `Dr Shah-Desai has over two decades of surgical experience and has been listed in Tatler as a leading eye surgeon since 2019. Treatments are grouped below as surgical procedures, non-surgical procedures, and the eye conditions they address.`,
    "",
    `Contact: ${CLINIC.phoneDisplay} · ${CLINIC.email} · ${CLINIC.address}`,
    "",
    `Opening hours: ${CLINIC.hours.map((h) => `${h.day} ${h.time}`).join("; ")}`,
  ].join("\n");

  const sections = [
    section("Surgical treatments", treatmentLines("surgical")),
    section("Non-surgical treatments", treatmentLines("non-surgical")),
    section("Eye conditions", conditionLines),
    section("Before & after galleries", beforeAfterLines),
    section("Key pages", keyPages),
    section("Other pages", otherPageLines),
    section("Optional", blogLines),
  ].filter(Boolean);

  const body = [header, ...sections].join("\n\n").replace(/\n{3,}/g, "\n\n").trimEnd();

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
