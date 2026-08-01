import Image from "next/image";
import { TpIcon } from "@/components/treatment/TpIcon";
import styles from "./JourneySections.module.css";

type Img = { src: string; alt: string; w: number; h: number };
type Section = { id: string; heading: string; step: string | null; html: string; images: Img[] };

const IMG_RE = /<img\b[^>]*>/gi;

/** Migrated HTML is still entity-encoded; React would escape it twice. */
const ENTITIES: Record<string, string> = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " ",
};
const decode = (s: string) =>
  s.replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITIES[m] ?? m);

function parseImages(html: string): Img[] {
  const out: Img[] = [];
  for (const tag of html.match(IMG_RE) ?? []) {
    const src = /src="([^"]+)"/i.exec(tag)?.[1];
    if (!src) continue;
    out.push({
      src,
      alt: decode(/alt="([^"]*)"/i.exec(tag)?.[1] ?? ""),
      w: Number(/width="(\d+)"/i.exec(tag)?.[1] ?? 0) || 800,
      h: Number(/height="(\d+)"/i.exec(tag)?.[1] ?? 0) || 600,
    });
  }
  return out;
}

function splitStep(heading: string) {
  const m = /^STEP\s*(\d+)\s*(.*)$/i.exec(heading.trim());
  return m
    ? { step: m[1], rest: m[2].replace(/^[–—:-]\s*/, "").trim() }
    : { step: null, rest: heading };
}

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

/** Title Case for the shouty all-caps headings the CMS carries. */
const SMALL = new Set(["a", "an", "and", "as", "at", "for", "from", "in", "of", "on", "or", "the", "to"]);
function titleCase(s: string) {
  if (!/[a-z]/.test(s)) {
    return s
      .toLowerCase()
      .split(/\s+/)
      .map((w, i) => (i > 0 && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
      .join(" ");
  }
  return s;
}

function parse(html: string) {
  const parts = html.split(/(?=<h2>)/i);
  const introHtml = parts[0]?.match(/<h2>/i) ? "" : parts.shift() ?? "";
  const sections: Section[] = [];

  for (const part of parts) {
    const m = /^<h2>([\s\S]*?)<\/h2>/i.exec(part);
    if (!m) continue;
    const raw = decode(m[1].replace(/<[^>]+>/g, "").trim());
    const { step, rest } = splitStep(raw);
    const body = part.slice(m[0].length);
    sections.push({
      id: slug(raw),
      heading: titleCase(rest),
      step,
      html: body.replace(IMG_RE, ""),
      images: parseImages(body),
    });
  }
  return { intro: { html: introHtml.replace(IMG_RE, ""), images: parseImages(introHtml) }, sections };
}

function Figure({ img, priority = false }: { img: Img; priority?: boolean }) {
  return (
    <figure className={styles.figure}>
      <Image
        src={img.src}
        alt={img.alt}
        width={img.w}
        height={img.h}
        sizes="(max-width: 860px) 100vw, 45vw"
        priority={priority}
        loading={priority ? undefined : "lazy"}
      />
    </figure>
  );
}

const CHIPS = [
  { icon: "eye" as const, label: "Eyes" },
  { icon: "sparkle" as const, label: "Face" },
  { icon: "compass" as const, label: "Skin" },
];

/** Section backgrounds cycle paper → cream → fog, with the step sections that
 *  carry the pathway getting the single deep-indigo band the system allows. */
const TONES = [styles.paper, styles.cream, styles.fog];

export function JourneySections({ content }: { content: string }) {
  const { intro, sections } = parse(content);
  const stepSections = sections.filter((s) => s.step);
  const rest = sections.filter((s) => !s.step);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>
              <TpIcon name="compass" size={14} />
              The Perfect360™ Experience
            </span>
            <h1 className={styles.heroTitle}>The Journey of Eye Care</h1>
            <p className={styles.heroSub}>
              A guided pathway for eye, face and skin health — from everyday skincare through to
              surgery and the long-term care that keeps your results looking their best.
            </p>
            <div className={styles.chips}>
              {CHIPS.map((c) => (
                <span key={c.label} className={styles.chip}>
                  <TpIcon name={c.icon} size={16} />
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Opening statement */}
      {intro.html.trim() ? (
        <section className={`${styles.section} ${styles.paper}`}>
          <div className="container">
            <div className={`${styles.grid} ${intro.images[0] ? styles.hasMedia : ""}`}>
              <div className={styles.prose} dangerouslySetInnerHTML={{ __html: intro.html }} />
              {intro.images[0] ? <Figure img={intro.images[0]} priority /> : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* The four-step pathway — the one dark band on the page */}
      {stepSections.length > 0 ? (
        <section className={`${styles.section} ${styles.inverse}`}>
          <div className="container">
            <div className={`${styles.head} ${styles.headCenter}`}>
              <span className={styles.eyebrow}>
                <TpIcon name="compass" size={14} />
                The pathway
              </span>
              <h2 className={styles.heading}>Four steps, one continuous plan</h2>
            </div>
            <div className={styles.timeline}>
              {stepSections.map((s) => (
                <div key={s.id} className={styles.step}>
                  <span className={styles.stepNum} aria-hidden="true">{s.step}</span>
                  <div>
                    <h3 className={styles.stepTitle}>{s.heading}</h3>
                    <div className={styles.prose} dangerouslySetInnerHTML={{ __html: s.html }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Everything else, alternating tones with media paired beside the copy */}
      {rest.map((s, i) => {
        const media = s.images[0];
        return (
          <section key={s.id} id={s.id} className={`${styles.section} ${TONES[i % TONES.length]}`}>
            <div className="container">
              <div className={styles.head}>
                <h2 className={styles.heading}>{s.heading}</h2>
              </div>
              <div
                className={`${styles.grid} ${media ? styles.hasMedia : ""} ${
                  i % 2 === 1 ? styles.reverse : ""
                }`}
              >
                <div className={styles.prose} dangerouslySetInnerHTML={{ __html: s.html }} />
                {media ? <Figure img={media} /> : null}
              </div>
              {s.images.length > 1 ? (
                <div className={styles.gallery}>
                  {s.images.slice(1).map((img) => (
                    <Figure key={img.src} img={img} />
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        );
      })}
    </>
  );
}
