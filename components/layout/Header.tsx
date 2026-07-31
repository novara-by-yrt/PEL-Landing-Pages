"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/dr-sabrina-shah-desai" },
  {
    label: "Eye Journey",
    href: "#",
    children: [
      { label: "Journey of Eye Care", href: "/journey-of-eye-care" },
      { label: "Advanced Periorbital Skincare", href: "https://drsabrina.com/collections/all", external: true },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Eye Conditions",
    href: "#",
    children: [
      { label: "Hooded Eyelids", href: "/condition-hooded-eyelids" },
      { label: "Eye Bags", href: "/eye-bags" },
      { label: "Droopy Eyelids", href: "/droopy-ptosis-eye" },
      { label: "Dark Circles", href: "/dark-circles-under-eyes" },
      { label: "Hollow/Sunken Eyes", href: "/condition-hollow-sunken-eyes" },
      { label: "Crow's Feet", href: "/crows-feet" },
      { label: "Swollen Eyelids", href: "/condition-swollen-eyelids" },
      { label: "Chalazion", href: "/chalazion" },
      { label: "Xanthelasma", href: "/xanthelasma" },
      { label: "Monolids", href: "/monolids" },
      { label: "Thyroid Puffy Eyes", href: "/thyroid-disease-puffy-eyes" },
      { label: "Eyelid Cancer", href: "/eyelid-cancer" },
    ],
  },
  {
    label: "Treatments",
    href: "#",
    children: [
      { label: "Upper Lid Blepharoplasty", href: "/upper-eyelid-lift-surgery-blepharoplasty" },
      { label: "Eye Bag Removal", href: "/eye-bag-removal-blepharoplasty-uk" },
      { label: "Double Eyelid Surgery", href: "/double-eyelid-surgery" },
      { label: "Ptosis Surgery", href: "/ptosis-surgery" },
      { label: "Brow Lift", href: "/surgical-brow-lift-uk" },
      { label: "Eyelid Lump Removal", href: "/eyelid-lump-bump-removal" },
      { label: "Festoons & Malar Bags", href: "/surgical-festoons-malar-bags-treatment-uk" },
      { label: "Chalazion Removal", href: "/surgical-eyelid-surgery-chalazion-removal-uk" },
      { label: "Revision Blepharoplasty", href: "/surgical-eyelid-surgery-revision-blepharoplasty-uk" },
      { label: "Thyroid Lid Lowering", href: "/surgical-thyroid-lid-lowering-surgery" },
      { label: "──────────────", href: "#", external: false },
      { label: "Tear Trough Fillers", href: "/non-surgical-tear-trough-fillers-uk" },
      { label: "Polynucleotides", href: "/polynucleotides" },
      { label: "Morpheus8", href: "/morpheus8" },
      { label: "Endolift®", href: "/endolift" },
      { label: "Sofwave™", href: "/sofwave" },
      { label: "UltraClear Laser", href: "/non-surgical-ultraclear-laser-treatment-uk" },
      { label: "Chemical Peel", href: "/chemical-peel" },
      { label: "EMFACE", href: "/emface" },
    ],
  },
  { label: "Before & After", href: "/before-after" },
  { label: "Publications", href: "/publications" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="site-header" role="banner">
      <style>{`
        .dropdown {
          position: relative;
        }
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          border: 1px solid var(--clr-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          min-width: 220px;
          max-width: 260px;
          padding: 0.5rem;
          z-index: 200;
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }
        .dropdown-menu a {
          display: block;
          padding: 0.5rem 0.875rem;
          font-size: var(--text-sm);
          color: var(--clr-text-muted);
          border-radius: var(--radius);
          transition: background 0.15s ease, color 0.15s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dropdown-menu a:hover {
          background: hsl(199 90% 32% / 0.08);
          color: var(--clr-primary);
        }
        .dropdown-menu .divider {
          height: 1px;
          background: var(--clr-border);
          margin: 0.25rem 0;
          pointer-events: none;
        }
        .nav-chevron {
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-left: 3px;
          vertical-align: middle;
          transition: transform 0.2s ease;
        }
        .dropdown.open .nav-chevron {
          transform: rotate(180deg);
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 0.25rem;
          padding: 1rem 1.5rem;
          background: #fff;
          border-top: 1px solid var(--clr-border);
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          padding: 0.625rem 0;
          font-size: var(--text-sm);
          color: var(--clr-text);
          border-bottom: 1px solid var(--clr-border);
        }
        .mobile-menu a:last-child { border-bottom: none; }
        .mobile-menu .mobile-group-label {
          padding: 0.5rem 0 0.25rem;
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--clr-text-muted);
        }
        @media (max-width: 900px) {
          .main-nav { display: none; }
          .nav-mobile-toggle { display: flex; }
        }
      `}</style>

      <div className="container">
        <div className="header-inner">
          <a className="sr-only" href="#main-content">Skip to main content</a>

          <Link href="/" className="site-logo" aria-label="Perfect Eyes Ltd home">
            Perfect Eyes
          </Link>

          <nav
            className="main-nav"
            aria-label="Main navigation"
            id="main-nav"
            ref={navRef}
          >
            {NAV.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className={`dropdown${openDropdown === item.label ? " open" : ""}`}
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="nav-link"
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.label}
                    style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    <svg className="nav-chevron" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 1l4 4 4-4" />
                    </svg>
                  </button>
                  {openDropdown === item.label && (
                    <div className="dropdown-menu" role="menu">
                      {item.children.map((child) =>
                        child.label.startsWith("──") ? (
                          <div key={child.label} className="divider" />
                        ) : child.external ? (
                          <a
                            key={child.href}
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            role="menuitem"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label} ↗
                          </a>
                        ) : (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              )
            )}
            <Link href="/contact-cosmetic-eye-surgeon" className="nav-cta">
              Book Consultation
            </Link>
          </nav>

          <button
            className="nav-mobile-toggle"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu${mobileOpen ? " open" : ""}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link href="/dr-sabrina-shah-desai" onClick={() => setMobileOpen(false)}>About Dr Sabrina</Link>
        <Link href="/journey-of-eye-care" onClick={() => setMobileOpen(false)}>Journey of Eye Care</Link>
        <Link href="/blog" onClick={() => setMobileOpen(false)}>Blog</Link>
        <div className="mobile-group-label">Eye Conditions</div>
        <Link href="/condition-hooded-eyelids" onClick={() => setMobileOpen(false)}>Hooded Eyelids</Link>
        <Link href="/eye-bags" onClick={() => setMobileOpen(false)}>Eye Bags</Link>
        <Link href="/droopy-ptosis-eye" onClick={() => setMobileOpen(false)}>Droopy Eyelids</Link>
        <Link href="/dark-circles-under-eyes" onClick={() => setMobileOpen(false)}>Dark Circles</Link>
        <div className="mobile-group-label">Surgical Treatments</div>
        <Link href="/upper-eyelid-lift-surgery-blepharoplasty" onClick={() => setMobileOpen(false)}>Upper Lid Blepharoplasty</Link>
        <Link href="/eye-bag-removal-blepharoplasty-uk" onClick={() => setMobileOpen(false)}>Eye Bag Removal</Link>
        <Link href="/ptosis-surgery" onClick={() => setMobileOpen(false)}>Ptosis Surgery</Link>
        <Link href="/surgical-brow-lift-uk" onClick={() => setMobileOpen(false)}>Brow Lift</Link>
        <div className="mobile-group-label">Non-Surgical Treatments</div>
        <Link href="/non-surgical-tear-trough-fillers-uk" onClick={() => setMobileOpen(false)}>Tear Trough Fillers</Link>
        <Link href="/polynucleotides" onClick={() => setMobileOpen(false)}>Polynucleotides</Link>
        <Link href="/morpheus8" onClick={() => setMobileOpen(false)}>Morpheus8</Link>
        <Link href="/before-after" onClick={() => setMobileOpen(false)}>Before &amp; After</Link>
        <Link href="/publications" onClick={() => setMobileOpen(false)}>Publications</Link>
        <Link href="/contact-cosmetic-eye-surgeon" className="btn btn-primary" style={{ textAlign: "center", marginTop: "0.5rem" }} onClick={() => setMobileOpen(false)}>
          Book Consultation
        </Link>
      </div>
    </header>
  );
}
