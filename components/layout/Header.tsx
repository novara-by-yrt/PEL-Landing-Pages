"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";

interface SimpleLink {
  label: string;
  href: string;
  external?: boolean;
}

interface NavGroup {
  label: string;
  sub: SimpleLink[];
}

interface NavItem {
  label: string;
  href: string;
  variant?: "simple" | "grid" | "mega";
  children?: SimpleLink[];
  groups?: NavGroup[];
}

const SURGICAL_TREATMENTS: SimpleLink[] = [
  { label: "Upper Lid Blepharoplasty", href: "/surgical/eyelid-surgery/upper-eyelid-blepharoplasty-uk" },
  { label: "Eye Bag Removal", href: "/surgical/eyelid-surgery/eye-bag-removal-blepharoplasty-uk" },
  { label: "Double Eyelid Surgery", href: "/surgical/eyelid-surgery/double-eyelids-asian-blepharoplasty-uk" },
  { label: "Ptosis Surgery", href: "/surgical/eyelid-surgery/droppy-eye-ptosis-surgery-uk" },
  { label: "Brow Lift", href: "/surgical/browlift-treatment-uk" },
  { label: "Eyelid Lump Removal", href: "/surgical/eyelid-surgery/lump-on-eyelid-bumps-treatment-uk" },
  { label: "Festoons & Malar Bags", href: "/surgical/festoons-malar-bags-treatment-uk" },
  { label: "Chalazion Removal", href: "/surgical/eyelid-surgery/chalazion-removal-uk" },
  { label: "Revision Blepharoplasty", href: "/surgical/eyelid-surgery/revision-blepharoplasty-uk" },
  { label: "Thyroid Lid Lowering", href: "/surgical/thyroid-lid-lowering-surgery" },
];

const NON_SURGICAL_TREATMENTS: SimpleLink[] = [
  { label: "Tear Trough Fillers", href: "/non-surgical/tear-trough-fillers-uk" },
  { label: "Polynucleotides", href: "/non-surgical/polynucleotide-treatment-uk" },
  { label: "Morpheus8", href: "/non-surgical/morpheus8-treatment-uk" },
  { label: "Endolift®", href: "/non-surgical/endolift-for-malar-bags-uk" },
  { label: "Sofwave™", href: "/non-surgical/sofwave-treatment-uk" },
  { label: "UltraClear Laser", href: "/non-surgical/ultraclear-laser-treatment-uk" },
  { label: "Chemical Peel", href: "/non-surgical/chemical-peel-treatment-uk" },
  { label: "EMFACE", href: "/non-surgical/emface-treatment-uk" },
];

const EYE_CONDITIONS: SimpleLink[] = [
  { label: "Hooded Eyelids", href: "/condition/hooded-eyelids" },
  { label: "Eye Bags", href: "/condition/eye-bags" },
  { label: "Droopy Eyelids", href: "/condition/droopy-ptosis-eye" },
  { label: "Dark Circles", href: "/condition/dark-circles-under-eyes" },
  { label: "Hollow/Sunken Eyes", href: "/condition/hollow-sunken-eyes" },
  { label: "Crow's Feet", href: "/condition/crows-feet" },
  { label: "Swollen Eyelids", href: "/condition/swollen-eyelids" },
  { label: "Chalazion", href: "/condition/chalazion" },
  { label: "Xanthelasma", href: "/condition/xanthelasma" },
  { label: "Monolids", href: "/condition/monolids" },
  { label: "Thyroid Puffy Eyes", href: "/condition/thyroid-disease-puffy-eyes" },
  { label: "Eyelid Cancer", href: "/condition/eyelid-cancer" },
];

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/dr-sabrina-shah-desai",
    variant: "simple",
    children: [
      { label: "About Dr Sabrina Shah-Desai", href: "/oculoplastic-surgeon-eyelid-cosmetic-surgeon-london" },
      { label: "Team", href: "/team" },
      { label: "Publications", href: "/publications" },
    ],
  },
  {
    label: "Eye Journey",
    href: "/journey-of-eye-care",
    variant: "simple",
    children: [
      { label: "Journey of Eye Care", href: "/journey-of-eye-care" },
      { label: "Advanced Periorbital Skincare", href: "https://drsabrina.com/collections/all", external: true },
      { label: "Blog", href: "/blog" },
    ],
  },
  { label: "Eye Conditions", href: "/condition/hooded-eyelids", variant: "grid", children: EYE_CONDITIONS },
  {
    label: "Treatments",
    href: "/surgical/eyelid-surgery/upper-eyelid-blepharoplasty-uk",
    variant: "mega",
    groups: [
      { label: "Surgical Treatments", sub: SURGICAL_TREATMENTS },
      { label: "Non-Surgical Treatments", sub: NON_SURGICAL_TREATMENTS },
    ],
  },
  { label: "Before & After", href: "/before-after" },
];

const PHONE = "020 7486 4886";
const PHONE_HREF = "tel:+442074864886";
const BOOK_HREF = "/contact-cosmetic-eye-surgeon";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [subExpanded, setSubExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenItem(null);
        setActiveGroup(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [drawerOpen]);

  return (
    <header className={`pel-nav${solid ? "" : " at-top"}`} role="banner">

      <div className={`pel-pill${solid ? " is-solid" : " is-top"}`}>
        <a className="sr-only" href="#main-content">Skip to main content</a>

        <Link href="/" className="pel-brand" aria-label="The Perfect Eyes Clinic — home">
          {/* Above the fold, so eager rather than lazy — but not preloaded,
              which would put it ahead of the fonts and the hero headline. */}
          <Image
            src="/PEL_logo_without_background.png"
            alt="The Perfect Eyes Clinic"
            width={719}
            height={347}
            sizes="(min-width: 900px) 200px, 150px"
            loading="eager"
            className="pel-logo"
          />
        </Link>

        <nav className="pel-links" aria-label="Main navigation" ref={navRef}>
          {NAV.map((item, navIndex) => {
            if (!item.variant) {
              return (
                <Link key={`${item.href}-${navIndex}`} href={item.href} className="pel-link">
                  {item.label}
                </Link>
              );
            }

            const isOpen = openItem === item.label;

            return (
              <div
                key={item.label}
                className={`pel-navitem${isOpen ? " has-panel" : ""}`}
                onMouseEnter={() => setOpenItem(item.label)}
                onMouseLeave={() => { setOpenItem(null); setActiveGroup(null); }}
              >
                <button
                  type="button"
                  className="pel-link pel-link-has-menu"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => setOpenItem(isOpen ? null : item.label)}
                >
                  {item.label}
                  <TpIcon name="chevron" size={13} style={{ transform: "rotate(90deg)" }} />
                </button>

                {isOpen && item.variant === "simple" && (
                  <div className="pel-dropdown" role="menu">
                    <div className="pel-dropdown-inner pel-simple">
                      {item.children!.map((c) => (
                        <a
                          key={c.href}
                          href={c.href}
                          className="pel-simple-link"
                          role="menuitem"
                          {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          onClick={() => setOpenItem(null)}
                        >
                          {c.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {isOpen && item.variant === "grid" && (
                  <div className="pel-dropdown" role="menu">
                    <div className="pel-dropdown-inner pel-grid">
                      {item.children!.map((c) => (
                        <Link key={c.href} href={c.href} className="pel-simple-link" role="menuitem" onClick={() => setOpenItem(null)}>
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {isOpen && item.variant === "mega" && (
                  <div className="pel-dropdown" role="menu">
                    <div className="pel-dropdown-inner pel-mega2">
                      <div className="pel-mega2-left">
                        <span className="pel-mega2-eyebrow">Browse by Type</span>
                        {item.groups!.map((g) => {
                          const key = `${item.label}::${g.label}`;
                          const isActive = activeGroup === key;
                          return (
                            <button
                              key={g.label}
                              type="button"
                              className={`pel-mega2-cat${isActive ? " is-active" : ""}`}
                              aria-expanded={isActive}
                              onClick={() => setActiveGroup((v) => (v === key ? null : key))}
                            >
                              <span>{g.label}</span>
                              <TpIcon name="chevron" size={15} />
                            </button>
                          );
                        })}
                        <Link href="/#treatments" className="pel-mega2-viewall" onClick={() => setOpenItem(null)}>
                          <TpIcon name="chevron" size={14} />
                          View All Treatments
                        </Link>
                      </div>
                      {item.groups!.map((g) => {
                        const key = `${item.label}::${g.label}`;
                        if (activeGroup !== key) return null;
                        return (
                          <div className="pel-mega2-right" key={key}>
                            <span className="pel-mega2-rhead">{g.label}</span>
                            <div className="pel-mega2-rlist">
                              {g.sub.map((s) => (
                                <Link key={s.href} href={s.href} className="pel-mega2-link" role="menuitem" onClick={() => setOpenItem(null)}>
                                  {s.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="pel-actions">
          <a href={PHONE_HREF} className="pel-phone" aria-label={`Call ${PHONE}`} title={PHONE}>
            <TpIcon name="phone" size={17} />
          </a>
          <Link href={BOOK_HREF} className="pel-cta">
            <span className="pel-cta-long">Book a Consultation</span>
            <span className="pel-cta-short">Book</span>
            <TpIcon name="arrow" size={16} />
          </Link>
        </div>

        <button
          className="pel-burger"
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
          aria-controls="pel-drawer"
          onClick={() => setDrawerOpen(true)}
        >
          <TpIcon name="menu" size={24} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`pel-scrim${drawerOpen ? " is-open" : ""}`} onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      <aside
        id="pel-drawer"
        ref={drawerRef}
        className={`pel-drawer${drawerOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!drawerOpen}
      >
        <div className="pel-drawer-top">
          <span className="pel-drawer-brand">
            <Image
              src="/PEL_logo_without_background.png"
              alt="The Perfect Eyes Clinic"
              width={719}
              height={347}
              sizes="150px"
              className="pel-logo"
            />
          </span>
          <button className="pel-close" aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
            <TpIcon name="close" size={22} />
          </button>
        </div>

        <nav className="pel-drawer-links" aria-label="Mobile navigation">
          <Link href="/" className="pel-drawer-link" onClick={() => setDrawerOpen(false)}>Home</Link>
          <Link href="/dr-sabrina-shah-desai" className="pel-drawer-link" onClick={() => setDrawerOpen(false)}>About</Link>

          {NAV.filter((i) => i.variant).map((item) => (
            <div key={item.label} className="pel-drawer-group">
              <button
                type="button"
                className="pel-drawer-link pel-drawer-toggle"
                aria-expanded={expanded === item.label}
                onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
              >
                {item.label}
                <TpIcon name={expanded === item.label ? "minus" : "plus"} size={18} />
              </button>
              {expanded === item.label && (
                <div className="pel-drawer-sub">
                  {item.variant === "mega"
                    ? item.groups!.map((g) => {
                        const key = `${item.label}::${g.label}`;
                        const isOpen = subExpanded === key;
                        return (
                          <div key={g.label} className="pel-drawer-subgroup">
                            <button
                              type="button"
                              className="pel-drawer-subhead"
                              aria-expanded={isOpen}
                              onClick={() => setSubExpanded((v) => (v === key ? null : key))}
                            >
                              {g.label}
                              <TpIcon name={isOpen ? "minus" : "plus"} size={15} />
                            </button>
                            {isOpen && (
                              <div className="pel-drawer-subgroup-list">
                                {g.sub.map((s) => (
                                  <Link key={s.href} href={s.href} className="pel-drawer-sublink" onClick={() => setDrawerOpen(false)}>
                                    {s.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })
                    : item.children!.map((c) => (
                        <a
                          key={c.href}
                          href={c.href}
                          className="pel-drawer-sublink"
                          {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          onClick={() => setDrawerOpen(false)}
                        >
                          {c.label}
                        </a>
                      ))}
                </div>
              )}
            </div>
          ))}

          <Link href="/before-after" className="pel-drawer-link" onClick={() => setDrawerOpen(false)}>Before &amp; After</Link>
          <Link href="/publications" className="pel-drawer-link" onClick={() => setDrawerOpen(false)}>Publications</Link>
        </nav>

        <div className="pel-drawer-foot">
          <Link href={BOOK_HREF} className="pel-cta pel-cta-full" onClick={() => setDrawerOpen(false)}>
            Book a Consultation <TpIcon name="arrow" size={17} />
          </Link>
          <a href={PHONE_HREF} className="pel-drawer-phone">
            <TpIcon name="phone" size={17} />
            {PHONE}
          </a>
        </div>
      </aside>
    </header>
  );
}
