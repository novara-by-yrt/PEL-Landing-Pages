"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";
import styles from "./PublicationsList.module.css";

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

      {/* Search and Filter Header */}
      <div className={styles.pubControls}>
        <div className={styles.pubSearch}>
          <input
            id="publication-search-input"
            type="text"
            placeholder="Search by publication title, journal, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <TpIcon name="search" size={18} />
        </div>

        <div className={styles.pubFilters} role="tablist" aria-label="Publication Categories">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                id={`cat-filter-${category.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`${styles.pubFilterPill}${isActive ? ` ${styles.isActive}` : ""}`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Publications Grid */}
      {filteredPublications.length === 0 ? (
        <div className={styles.pubEmpty}>
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
        <div className={styles.pubGrid}>
          {filteredPublications.map((pub, index) => {
            const formattedDate = pub.date
              ? new Date(pub.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })
              : "";

            return (
              <article key={pub.slug || index} id={`pub-card-${index}`} className={styles.pubCard}>
                <div>
                  <div className={styles.pubCardTop}>
                    <span className={styles.pubJournalBadge}>{pub.journal}</span>
                    {formattedDate && <span className={styles.pubDate}>{formattedDate}</span>}
                  </div>

                  <h3 className={styles.pubTitle}>
                    <Link href={`/blog/${pub.slug}`} id={`pub-title-link-${index}`}>
                      {pub.rawTitle}
                    </Link>
                  </h3>
                </div>

                <Link href={`/blog/${pub.slug}`} id={`pub-link-${index}`} className={styles.pubReadLink}>
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
