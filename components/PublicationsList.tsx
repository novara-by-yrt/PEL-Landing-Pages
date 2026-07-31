"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

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
    <section id="publications-list-section" style={{ marginTop: "2rem" }}>
      {/* Search and Filter Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        {/* Search Bar */}
        <div style={{ position: "relative", maxWidth: "600px", width: "100%" }}>
          <input
            id="publication-search-input"
            type="text"
            placeholder="Search by publication title, journal, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.875rem 1.25rem 0.875rem 3rem",
              fontSize: "1rem",
              borderRadius: "12px",
              border: "1px solid var(--clr-border)",
              backgroundColor: "#fff",
              color: "var(--clr-text)",
              boxShadow: "0 2px 12px hsl(220 25% 12% / 0.04)",
              outline: "none",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            }}
          />
          <svg
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "20px",
              height: "20px",
              fill: "none",
              stroke: "var(--clr-text-muted)",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              pointerEvents: "none",
            }}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        {/* Category Pills */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
          role="tablist"
          aria-label="Publication Categories"
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                id={`cat-filter-${category.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  border: isActive
                    ? "1px solid var(--clr-primary)"
                    : "1px solid var(--clr-border)",
                  backgroundColor: isActive
                    ? "var(--clr-primary)"
                    : "#fff",
                  color: isActive ? "#fff" : "var(--clr-text-muted)",
                  transition: "all 0.2s ease",
                  boxShadow: isActive
                    ? "0 4px 12px hsl(199 90% 32% / 0.25)"
                    : "none",
                }}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Publications Grid */}
      {filteredPublications.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            backgroundColor: "#fff",
            borderRadius: "16px",
            border: "1px dashed var(--clr-border)",
          }}
        >
          <p style={{ fontSize: "1.125rem", color: "var(--clr-text-muted)" }}>
            No publications found matching your search.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              backgroundColor: "var(--clr-primary)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredPublications.map((pub, index) => {
            const formattedDate = pub.date
              ? new Date(pub.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })
              : "";

            const isExternal = pub.url.startsWith("http");

            return (
              <article
                key={pub.slug || index}
                id={`pub-card-${index}`}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  border: "1px solid var(--clr-border)",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 20px hsl(220 25% 12% / 0.04)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                }}
                className="pub-card-hover"
              >
                <div>
                  {/* Journal Badge & Date */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                        backgroundColor: "hsl(199 90% 95%)",
                        color: "var(--clr-primary-dark)",
                      }}
                    >
                      {pub.journal}
                    </span>
                    {formattedDate && (
                      <span
                        style={{
                          fontSize: "0.8125rem",
                          color: "var(--clr-text-light)",
                        }}
                      >
                        {formattedDate}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.25rem",
                      lineHeight: 1.35,
                      color: "var(--clr-text)",
                      marginBottom: "1rem",
                    }}
                  >
                    <Link
                      href={`/blog/${pub.slug}`}
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                      }}
                      id={`pub-title-link-${index}`}
                    >
                      {pub.rawTitle}
                    </Link>
                  </h3>
                </div>

                {/* Card Action Link */}
                <div style={{ marginTop: "1.5rem" }}>
                  <Link
                    href={`/blog/${pub.slug}`}
                    id={`pub-link-${index}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--clr-primary)",
                      textDecoration: "none",
                    }}
                  >
                    Read Publication
                    <svg
                      style={{ width: "14px", height: "14px" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
