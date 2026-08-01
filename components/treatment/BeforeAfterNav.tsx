import Link from "next/link";
import { TpIcon } from "./TpIcon";

export function BeforeAfterNav({
  items,
  currentSlug,
}: {
  items: { slug: string; title: string }[];
  currentSlug: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className="tp-section tp-fog">
      <style>{`
        .tp-banav-list { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1.75rem; }
        .tp-banav-link {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.6rem 1.05rem; border-radius: 999px;
          background: #fff; border: 1px solid var(--tp-line);
          font-size: 0.875rem; font-weight: 600; color: var(--tp-ink); text-decoration: none;
          transition: border-color 200ms var(--tp-ease), color 200ms var(--tp-ease), transform 200ms var(--tp-ease);
        }
        .tp-banav-link:hover { border-color: var(--tp-indigo-700); color: var(--tp-indigo-700); transform: translateY(-2px); }
        .tp-banav-link[aria-current="page"] {
          background: var(--tp-indigo-700); border-color: var(--tp-indigo-700); color: #fff; cursor: default;
        }
        .tp-banav-link[aria-current="page"]:hover { transform: none; }
      `}</style>
      <div className="container">
        <div className="tp-head">
          <span className="tp-eyebrow">
            <TpIcon name="search" size={13} />
            Browse by procedure
          </span>
          <h2>Explore More Before &amp; After Results</h2>
        </div>
        <nav className="tp-banav-list" aria-label="Before and after galleries by procedure">
          {items.map((item) => {
            const isCurrent = item.slug === currentSlug;
            return (
              <Link
                key={item.slug}
                href={`/before-after/${item.slug}`}
                className="tp-banav-link"
                aria-current={isCurrent ? "page" : undefined}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
