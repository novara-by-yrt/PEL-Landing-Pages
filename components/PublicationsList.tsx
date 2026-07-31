"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";

export interface PublicationItem {
  slug: string;
  title: string;
  rawTitle: string;
  date: string;
  journal: string;
  url: string;
  featuredImage: string | null;
}

interface PublicationsListProps {
  initialPublications: PublicationItem[];
}

export default function PublicationsList({ initialPublications }: PublicationsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Ptosis & Eyelid Surgery",
    "Fillers & Complications",
    "Ophthalmic Pathology",
  ];

  const filteredPublications = useMemo(() => {
    return initialPublications.filter((pub) => {
      const matchesSearch =
        searchQuery === "" ||
        pub.rawTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.journal.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === "All") return true;

      const titleLower = pub.rawTitle.toLowerCase();

      if (selectedCategory === "Ptosis & Eyelid Surgery") {
        return (
          titleLower.includes("ptosis") ||
          titleLower.includes("eyelid") ||
          titleLower.includes("lid") ||
          titleLower.includes("blepharoptosis")
        );
      }

      if (selectedCategory === "Fillers & Complications") {
        return (
          titleLower.includes("filler") ||
          titleLower.includes("hyaluronic") ||
          titleLower.includes("occlusion") ||
          titleLower.includes("edema") ||
          titleLower.includes("dark circles")
        );
      }

      if (selectedCategory === "Ophthalmic Pathology") {
        return (
          titleLower.includes("lymphoma") ||
          titleLower.includes("bcc") ||
          titleLower.includes("carcinoma") ||
          titleLower.includes("aspergillosis") ||
          titleLower.includes("scleral") ||
          titleLower.includes("blind eye")
        );
      }

      return true;
    });
  }, [initialPublications, searchQuery, selectedCategory]);

  return (
    <section id="publications-list-section">
      <style>{`
        .pub-controls { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 3rem; }
        .pub-search { position: relative; max-width: 520px; width: 100%; }
        .pub-search input {
          width: 100%; padding: 0.85rem 1.1rem 0.85rem 2.85rem; font-family: var(--tp-body); font-size: 0.9375rem;
          border-radius: var(--tp-radius-md); border: 1px solid var(--tp-line); background: var(--tp-fog);
          color: var(--tp-ink); outline: none; transition: border-color 160ms var(--tp-ease), background 160ms var(--tp-ease);
        }
        .pub-search input:focus { border-color: var(--tp-lavender-400); background: #fff; }
        .pub-search svg { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--tp-mist); pointer-events: none; }
        .pub-filters { display: flex; gap: 0.625rem; flex-wrap: wrap; }
        .pub-filter-pill {
          padding: 0.5rem 1.1rem; border-radius: 999px; font-family: var(--tp-body); font-size: 0.8125rem; font-weight: 600;
          border: 1px solid var(--tp-line); background: #fff; color: var(--tp-slate); cursor: pointer;
          transition: background 160ms var(--tp-ease), color 160ms var(--tp-ease), border-color 160ms var(--tp-ease);
        }
        .pub-filter-pill:hover { border-color: var(--tp-lavender-300); }
        .pub-filter-pill.is-active { background: var(--tp-indigo-700); border-color: var(--tp-indigo-700); color: #fff; }

        .pub-empty { text-align: center; padding: 4rem 2rem; background: var(--tp-fog); border-radius: var(--tp-radius-lg); border: 1px dashed var(--tp-line); }
        .pub-empty p { font-size: 1.0625rem; color: var(--tp-slate); margin-bottom: 1rem; }
        .pub-empty button { padding: 0.6rem 1.4rem; border-radius: 999px; background: var(--tp-indigo-700); color: #fff; border: none; cursor: pointer; font-family: var(--tp-body); font-weight: 600; }
        .pub-empty button:hover { background: var(--tp-indigo-600); }

        .pub-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
        .pub-card {
          background: #fff; border: 1px solid var(--tp-line); border-radius: var(--tp-radius-lg); padding: 1.75rem;
          display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--tp-shadow-xs);
          transition: transform 240ms var(--tp-ease), box-shadow 240ms var(--tp-ease);
        }
        .pub-card:hover { transform: translateY(-4px); box-shadow: var(--tp-shadow-md); }
        .pub-card-top { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .pub-journal-badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.02em; background: var(--tp-lavender-100); color: var(--tp-indigo-700); }
        .pub-date { font-size: 0.8125rem; color: var(--tp-mist); }
        .pub-title { font-family: var(--tp-display); font-size: 1.15rem; font-weight: 600; line-height: 1.4; color: var(--tp-ink); margin-bottom: 1rem; }
        .pub-title a { color: inherit; text-decoration: none; }
        .pub-title a:hover { color: var(--tp-indigo-700); }
        .pub-read-link { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 600; color: var(--tp-indigo-700); text-decoration: none; margin-top: 1.25rem; }
        .pub-read-link:hover { color: var(--tp-indigo-600); }
      `}</style>

      {/* Search and Filter Header */}
      <div className="pub-controls">
        <div className="pub-search">
          <input
            id="publication-search-input"
            type="text"
            placeholder="Search by publication title, journal, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <TpIcon name="search" size={18} />
        </div>

        <div className="pub-filters" role="tablist" aria-label="Publication Categories">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                id={`cat-filter-${category.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`pub-filter-pill${isActive ? " is-active" : ""}`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Publications Grid */}
      {filteredPublications.length === 0 ? (
        <div className="pub-empty">
          <p>No publications found matching your search.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="pub-grid">
          {filteredPublications.map((pub, index) => {
            const formattedDate = pub.date
              ? new Date(pub.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })
              : "";

            return (
              <article key={pub.slug || index} id={`pub-card-${index}`} className="pub-card">
                <div>
                  <div className="pub-card-top">
                    <span className="pub-journal-badge">{pub.journal}</span>
                    {formattedDate && <span className="pub-date">{formattedDate}</span>}
                  </div>

                  <h3 className="pub-title">
                    <Link href={`/blog/${pub.slug}`} id={`pub-title-link-${index}`}>
                      {pub.rawTitle}
                    </Link>
                  </h3>
                </div>

                <Link href={`/blog/${pub.slug}`} id={`pub-link-${index}`} className="pub-read-link">
                  Read Publication
                  <TpIcon name="arrow" size={15} />
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
