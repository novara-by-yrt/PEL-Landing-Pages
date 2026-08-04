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
  /** Points off-site; renders a plain anchor that opens in a new tab. */
  external?: boolean;
  variant?: "simple" | "grid" | "mega";
  children?: SimpleLink[];
  groups?: NavGroup[];
  /** Eyebrow above the panel's first column. */
  panelLabel?: string;
  /** Footer link closing the panel's first column. */
  viewAll?: SimpleLink;
}

/** The Shopify storefront — same destination as the skincare link under Eye Journey. */
const SHOP_HREF = "https://drsabrina.com/collections/all";

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

/* Before/after galleries, split the way the results panel presents them. Every
   entry is an existing case study under content/before-after. */
const SURGICAL_RESULTS: SimpleLink[] = [
  { label: "Upper Blepharoplasty", href: "/before-after/upper-blepharoplasty" },
  { label: "Lower Blepharoplasty (Eyebag removal)", href: "/before-after/lower-blepharoplasty-eyebag-removal" },
  { label: "Ptosis Surgery", href: "/before-after/ptosis-surgery" },
  { label: "Asian Blepharoplasty", href: "/before-after/asian-blepharoplasty" },
  { label: "Revision Blepharoplasty", href: "/before-after/revision-blepharoplasty" },
];

const NON_SURGICAL_RESULTS: SimpleLink[] = [
  { label: "Polynucleotides", href: "/before-after/polynucleotides" },
  { label: "Morpheus8", href: "/before-after/morpheus8" },
  { label: "Ultraclear Lasers", href: "/before-after/ultraclear-laser" },
  { label: "Superior Sulcus Filler", href: "/before-after/superior-sulcus-filler" },
  { label: "Sofwave\u2122", href: "/before-after/sofwave" },
];

/**
 * One row inside a dropdown panel. External destinations need a plain anchor
 * (next/link would try to route them) and a new tab, so the choice is made
 * here rather than repeated at each call site.
 */
function PanelLink({
  link,
  className,
  leadingChevron,
  onNavigate,
}: {
  link: SimpleLink;
  className: string;
  leadingChevron?: boolean;
  onNavigate: () => void;
}) {
  const body = (
    <>
      {leadingChevron && <TpIcon name="chevron" size={14} />}
      {link.label}
      {link.external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  return link.external ? (
    <a
      href={link.href}
      className={className}
      role="menuitem"
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
    >
      {body}
    </a>
  ) : (
    <Link href={link.href} className={className} role="menuitem" onClick={onNavigate}>
      {body}
    </Link>
  );
}

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/dr-sabrina-shah-desai",
    variant: "simple",
    panelLabel: "Browse",
    children: [
      { label: "Dr Sabrina Shah-Desai", href: "/oculoplastic-surgeon-eyelid-cosmetic-surgeon-london" },
      { label: "Team", href: "/team" },
      { label: "Publications", href: "/publications" },
    ],
  },
  {
    label: "Eye Journey",
    href: "/journey-of-eye-care",
    variant: "simple",
    panelLabel: "Browse",
    children: [
      { label: "Journey of Eye Care", href: "/journey-of-eye-care" },
      { label: "Advanced Periorbital Skincare", href: SHOP_HREF, external: true },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Eye Conditions",
    href: "/condition/hooded-eyelids",
    variant: "grid",
    panelLabel: "Browse by condition",
    children: EYE_CONDITIONS,
  },
  {
    label: "Treatments",
    href: "/surgical/eyelid-surgery/upper-eyelid-blepharoplasty-uk",
    variant: "mega",
    panelLabel: "Browse by type",
    viewAll: { label: "View All Treatments", href: "/#treatments" },
    groups: [
      { label: "Surgical Treatments", sub: SURGICAL_TREATMENTS },
      { label: "Non-Surgical Treatments", sub: NON_SURGICAL_TREATMENTS },
    ],
  },
  {
    label: "Results",
    href: "/before-after",
    variant: "mega",
    panelLabel: "Browse by type",
    viewAll: { label: "View All Results", href: "/before-after" },
    groups: [
      { label: "Surgical", sub: SURGICAL_RESULTS },
      { label: "Non-Surgical", sub: NON_SURGICAL_RESULTS },
    ],
  },
  { label: "Shop", href: SHOP_HREF, external: true },
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
      <a className="sr-only" href="#main-content">Skip to main content</a>

      {/* The logo sits in its own band above the bar, showing large while the
          visitor is at the top of the page. On scroll the band collapses and
          the copy inside the bar takes over — only one is ever visible, so
          the other is pulled out of the accessibility tree with
          `visibility: hidden` rather than just being made transparent. */}
      <div className="pel-brandband">
        <Link href="/" className="pel-brand" aria-label="The Perfect Eyes Clinic — home">
          {/* Above the fold, so eager rather than lazy — but not preloaded,
              which would put it ahead of the fonts and the hero headline. */}
          <Image
            src="/PEL_logo_without_background.png"
            alt="The Perfect Eyes Clinic"
            width={719}
            height={347}
            sizes="(min-width: 900px) 320px, 240px"
            loading="eager"
            className="pel-logo"
          />
        </Link>
      </div>

      <div className={`pel-pill${solid ? " is-solid" : " is-top"}`}>
        <Link
          href="/"
          className="pel-brand pel-pill-brand"
          aria-label="The Perfect Eyes Clinic — home"
        >
          <Image
            src="/PEL_logo_without_background.png"
            alt="The Perfect Eyes Clinic"
            width={719}
            height={347}
            sizes="160px"
            loading="eager"
            className="pel-logo"
          />
        </Link>

        <nav className="pel-links" aria-label="Main navigation" ref={navRef}>
          {NAV.map((item, navIndex) => {
            if (!item.variant) {
              return item.external ? (
                <a
                  key={`${item.href}-${navIndex}`}
                  href={item.href}
                  className="pel-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
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

                {isOpen && item.variant !== "mega" && (
                  <div className="pel-dropdown" role="menu">
                    <div className={`pel-dropdown-inner pel-panel pel-panel-${item.variant}`}>
                      {item.panelLabel && (
                        <span className="pel-panel-eyebrow">{item.panelLabel}</span>
                      )}
                      <div className="pel-panel-list">
                        {item.children!.map((c) => (
                          <PanelLink
                            key={c.href}
                            link={c}
                            className="pel-panel-link"
                            onNavigate={() => setOpenItem(null)}
                          />
                        ))}
                      </div>
                      {item.viewAll && (
                        <PanelLink
                          link={item.viewAll}
                          className="pel-panel-viewall"
                          leadingChevron
                          onNavigate={() => setOpenItem(null)}
                        />
                      )}
                    </div>
                  </div>
                )}

                {isOpen && item.variant === "mega" && (
                  <div className="pel-dropdown" role="menu">
                    {/* The second column only exists once a category is
                        picked, so the panel is never a narrow list beside a
                        blank rectangle. */}
                    <div
                      className={`pel-dropdown-inner pel-mega2${
                        activeGroup?.startsWith(`${item.label}::`) ? " is-expanded" : ""
                      }`}
                    >
                      <div className="pel-mega2-left">
                        {item.panelLabel && (
                          <span className="pel-panel-eyebrow">{item.panelLabel}</span>
                        )}
                        {item.groups!.map((g) => {
                          const key = `${item.label}::${g.label}`;
                          const isActive = activeGroup === key;
                          return (
                            <button
                              key={g.label}
                              type="button"
                              className={`pel-mega2-cat${isActive ? " is-active" : ""}`}
                              aria-expanded={isActive}
                              /* Hover reveals the column, matching the rest of
                                 the bar; click still works for touch and keyboard. */
                              onMouseEnter={() => setActiveGroup(key)}
                              onFocus={() => setActiveGroup(key)}
                              onClick={() => setActiveGroup((v) => (v === key ? null : key))}
                            >
                              <span>{g.label}</span>
                              <TpIcon name="chevron" size={15} />
                            </button>
                          );
                        })}
                        {item.viewAll && (
                          <PanelLink
                            link={item.viewAll}
                            className="pel-panel-viewall"
                            leadingChevron
                            onNavigate={() => setOpenItem(null)}
                          />
                        )}
                      </div>
                      {item.groups!.map((g) => {
                        const key = `${item.label}::${g.label}`;
                        if (activeGroup !== key) return null;
                        return (
                          <div className="pel-mega2-right" key={key}>
                            <span className="pel-panel-eyebrow">{g.label}</span>
                            <div className="pel-mega2-rlist">
                              {g.sub.map((s) => (
                                <PanelLink
                                  key={s.href}
                                  link={s}
                                  className="pel-mega2-link"
                                  onNavigate={() => setOpenItem(null)}
                                />
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
          {/* About has its own accordion group below, so only Home is listed
              here — otherwise the drawer shows "About" twice. */}
          <Link href="/" className="pel-drawer-link" onClick={() => setDrawerOpen(false)}>Home</Link>

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
                  {item.viewAll && (
                    <Link
                      href={item.viewAll.href}
                      className="pel-drawer-sublink pel-drawer-viewall"
                      onClick={() => setDrawerOpen(false)}
                    >
                      {item.viewAll.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}

          <Link href="/publications" className="pel-drawer-link" onClick={() => setDrawerOpen(false)}>Publications</Link>
          <a
            href={SHOP_HREF}
            className="pel-drawer-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setDrawerOpen(false)}
          >
            Shop
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
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
