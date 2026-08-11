"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";
import ClinicPhone, { ClinicPhoneIcon } from "@/components/shared/ClinicPhone";
import { RESULT_CATEGORIES } from "@/lib/results";

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
  { label: "EMFACE", href: "/non-surgical/emface-treatment-uk" },
];

/* Conditions, split across the three panel columns.
   ⚠️ Every condition page under content/condition/ is periorbital — there are
   no face-only or skin-only condition pages — so this grouping is by the
   nature of the complaint, not by separate content sets. Worth a clinical
   eye before it ships. */
const EYE_CONDITIONS: SimpleLink[] = [
  { label: "Hooded Eyelids", href: "/condition/hooded-eyelids" },
  { label: "Droopy Eyelids", href: "/condition/droopy-ptosis-eye" },
  { label: "Eye Bags", href: "/condition/eye-bags" },
  { label: "Hollow/Sunken Eyes", href: "/condition/hollow-sunken-eyes" },
  { label: "Swollen Eyelids", href: "/condition/swollen-eyelids" },
  { label: "Monolids", href: "/condition/monolids" },
  { label: "Thyroid Puffy Eyes", href: "/condition/thyroid-disease-puffy-eyes" },
  { label: "Chalazion", href: "/condition/chalazion" },
];

const FACE_CONDITIONS: SimpleLink[] = [
  { label: "Crow's Feet", href: "/condition/crows-feet" },
  { label: "Dark Circles", href: "/condition/dark-circles-under-eyes" },
];

const SKIN_CONDITIONS: SimpleLink[] = [
  { label: "Xanthelasma", href: "/condition/xanthelasma" },
  { label: "Eyelid Cancer", href: "/condition/eyelid-cancer" },
];

/* Before/after galleries. The split lives in lib/results so this panel and
   the Results index page can never present different categories; the labels
   are the case-study titles from content/before-after/. */
const RESULT_TITLES: Record<string, string> = {
  "upper-blepharoplasty": "Upper Blepharoplasty",
  "lower-blepharoplasty-eyebag-removal": "Lower Blepharoplasty (Eyebag removal)",
  "ptosis-surgery": "Ptosis Surgery",
  "asian-blepharoplasty": "Asian Blepharoplasty",
  "revision-blepharoplasty": "Revision Blepharoplasty",
  blepharoplasty: "Blepharoplasty",
  polynucleotides: "Polynucleotides",
  morpheus8: "Morpheus8",
  "ultraclear-laser": "Ultraclear Lasers",
  "superior-sulcus-filler": "Superior Sulcus Filler",
  sofwave: "Sofwave\u2122",
};

const RESULT_GROUPS: NavGroup[] = RESULT_CATEGORIES.map((category) => ({
  label: category.label,
  sub: category.slugs.map((slug) => ({
    label: RESULT_TITLES[slug] ?? slug,
    href: `/before-after/${slug}`,
  })),
}));

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
    children: [
      { label: "Dr Sabrina Shah-Desai", href: "/oculoplastic-surgeon-eyelid-cosmetic-surgeon-london" },
      { label: "Team", href: "/team" },
      { label: "Publications", href: "/publications" },
    ],
  },
  {
    label: "Eye Conditions",
    href: "/condition/hooded-eyelids",
    variant: "mega",
    groups: [
      { label: "Eyes", sub: EYE_CONDITIONS },
      { label: "Face", sub: FACE_CONDITIONS },
      { label: "Skin", sub: SKIN_CONDITIONS },
    ],
  },
  {
    label: "Treatments",
    href: "/surgical/eyelid-surgery/upper-eyelid-blepharoplasty-uk",
    variant: "mega",
    viewAll: { label: "View All Treatments", href: "/#treatments" },
    groups: [
      { label: "Surgical Treatments", sub: SURGICAL_TREATMENTS },
      { label: "Non-Surgical Treatments", sub: NON_SURGICAL_TREATMENTS },
    ],
  },
  {
    label: "Eye Journey",
    href: "/journey-of-eye-care",
    variant: "simple",
    children: [
      { label: "Journey of Eye Care", href: "/journey-of-eye-care" },
      { label: "Advanced Periorbital Skincare", href: SHOP_HREF, external: true },
    ],
  },
  {
    label: "Results",
    href: "/before-after",
    variant: "mega",
    viewAll: { label: "View All Results", href: "/before-after" },
    groups: RESULT_GROUPS,
  },
  { label: "Shop", href: SHOP_HREF, external: true },
  { label: "Blog", href: "/blog" },
];

const BOOK_HREF = "/contact-cosmetic-eye-surgeon";

/** left/top/width/height of the tubelight lamp, in pixels relative to `.pel-links`. */
interface LampRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [subExpanded, setSubExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  /* Tubelight nav highlight: a single glowing bar that glides to whichever
     top-level item is hovered or focused, rather than each item drawing its
     own (previously invisible — see layout-chrome.css) hover background.
     `highlighted` names the item; `lampRect` is its last measured box, kept
     around after `highlighted` clears so the lamp fades out in place instead
     of jumping to a corner. */
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [lampRect, setLampRect] = useState<LampRect | null>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  const registerNavItem = (label: string) => (el: HTMLElement | null) => {
    if (el) itemRefs.current.set(label, el);
    else itemRefs.current.delete(label);
  };

  /* Keeps the two-pane panel inside the viewport.
     The panel is anchored so its category column is centred on the trigger
     and the second pane opens to the right (see .pel-dropdown-mega). For the
     right-most menu that would run past the window edge, so nudge the whole
     panel back by however much it overflows.
     Crucially the nudge is computed from the trigger position and the panel's
     *expanded* width, both constant while the menu is open — so it is the
     same before and after a category is picked, and the category column
     still never moves. Written straight to the DOM rather than through state
     to avoid a re-render on every resize tick. */
  useLayoutEffect(() => {
    const panel = navRef.current?.querySelector<HTMLElement>(".pel-dropdown-mega");
    const trigger = openItem ? itemRefs.current.get(openItem) : null;
    if (!panel || !trigger) return;

    const GUTTER = 16;
    const apply = () => {
      const css = getComputedStyle(document.documentElement);
      const col = parseFloat(css.getPropertyValue("--pel-mega-col")) || 320;
      const col2 = parseFloat(css.getPropertyValue("--pel-mega-col2")) || 380;
      const rect = trigger.getBoundingClientRect();
      const left = rect.left + rect.width / 2 - col / 2;
      const right = left + col + col2;

      let shift = 0;
      if (right > window.innerWidth - GUTTER) shift = window.innerWidth - GUTTER - right;
      if (left + shift < GUTTER) shift = GUTTER - left;
      panel.style.setProperty("--pel-mega-shift", `${Math.round(shift)}px`);
    };

    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [openItem]);

  useLayoutEffect(() => {
    if (!highlighted) return;

    const measure = () => {
      const el = itemRefs.current.get(highlighted);
      const container = navRef.current;
      if (!el || !container) return;
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setLampRect({
        left: elRect.left - containerRect.left,
        top: elRect.top - containerRect.top,
        width: elRect.width,
        height: elRect.height,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [highlighted]);

  useEffect(() => {
    /**
     * Two separate thresholds, not one. With a single boundary, any scroll
     * that hovers around it flips the bar back and forth — and because going
     * solid also shrinks the bar, that reads as a flicker. Going solid at 72px
     * but only reverting below 24px leaves a dead band the shrink cannot
     * bounce inside.
     *
     * Reads are batched into a frame so a fast scroll cannot queue a state
     * update per event.
     */
    let frame = 0;

    const read = () => {
      frame = 0;
      const y = window.scrollY;
      setSolid((wasSolid) => (wasSolid ? y > 24 : y > 72));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
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
    <>
      {/* Holds the bar's full-size height in the flow. The bar itself is
          fixed, so shrinking it cannot move the page underneath — which is
          what made the transition judder while scrolling. */}
      <div className="pel-nav-spacer" aria-hidden="true" />

      <header className={`pel-nav${solid ? "" : " at-top"}`} role="banner">
      <a className="sr-only" href="#main-content">Skip to main content</a>

      <div className={`pel-pill${solid ? " is-solid" : " is-top"}`}>
        {/* The logo sits beside the nav, not above it: large while the visitor
            is at the top of the page, shrinking into the bar as they scroll.
            Height is what animates, so the 719:347 proportions hold and the
            reserved width/height keep it shift-free while it loads. */}
        <Link href="/" className="pel-brand" aria-label="The Perfect Eyes Clinic — home">
          {/* Above the fold, so eager rather than lazy — but not preloaded,
              which would put it ahead of the fonts and the hero headline. */}
          <Image
            src="/PEL_logo_without_background.png"
            alt="The Perfect Eyes Clinic"
            width={719}
            height={347}
            sizes="(min-width: 900px) 280px, 200px"
            loading="eager"
            className="pel-logo"
          />
        </Link>

        <nav className="pel-links" aria-label="Main navigation" ref={navRef}>
          <span
            className={`pel-lamp${highlighted ? " is-visible" : ""}`}
            style={
              lampRect
                ? {
                    left: lampRect.left,
                    top: lampRect.top,
                    width: lampRect.width,
                    height: lampRect.height,
                  }
                : undefined
            }
            aria-hidden="true"
          />

          {NAV.map((item, navIndex) => {
            if (!item.variant) {
              return item.external ? (
                <a
                  key={`${item.href}-${navIndex}`}
                  ref={registerNavItem(item.label)}
                  href={item.href}
                  className="pel-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHighlighted(item.label)}
                  onMouseLeave={() => setHighlighted(null)}
                  onFocus={() => setHighlighted(item.label)}
                  onBlur={() => setHighlighted(null)}
                >
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link
                  key={`${item.href}-${navIndex}`}
                  ref={registerNavItem(item.label)}
                  href={item.href}
                  className="pel-link"
                  onMouseEnter={() => setHighlighted(item.label)}
                  onMouseLeave={() => setHighlighted(null)}
                  onFocus={() => setHighlighted(item.label)}
                  onBlur={() => setHighlighted(null)}
                >
                  {item.label}
                </Link>
              );
            }

            const isOpen = openItem === item.label;

            return (
              <div
                key={item.label}
                ref={registerNavItem(item.label)}
                className={`pel-navitem${isOpen ? " has-panel" : ""}`}
                onMouseEnter={() => { setOpenItem(item.label); setHighlighted(item.label); }}
                onMouseLeave={() => { setOpenItem(null); setActiveGroup(null); setHighlighted(null); }}
                onFocus={() => { setOpenItem(item.label); setHighlighted(item.label); }}
                onBlur={(e) => {
                  if (e.currentTarget.contains(e.relatedTarget as Node)) return;
                  setOpenItem(null);
                  setActiveGroup(null);
                  setHighlighted(null);
                }}
              >
                <button
                  type="button"
                  className="pel-link pel-link-has-menu"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => {
                    const next = isOpen ? null : item.label;
                    setOpenItem(next);
                    setHighlighted(next);
                  }}
                >
                  {item.label}
                  <TpIcon name="chevron" size={13} style={{ transform: "rotate(90deg)" }} />
                </button>

                {isOpen && item.variant !== "mega" && (
                  <div className="pel-dropdown" role="menu">
                    <div className={`pel-dropdown-inner pel-panel pel-panel-${item.variant}`}>
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
                  <div className="pel-dropdown pel-dropdown-mega" role="menu">
                    {/* The second column only exists once a category is
                        picked, so the panel is never a narrow list beside a
                        blank rectangle. */}
                    <div
                      className={`pel-dropdown-inner pel-mega2${
                        activeGroup?.startsWith(`${item.label}::`) ? " is-expanded" : ""
                      }`}
                    >
                      <div className="pel-mega2-left">
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
          <ClinicPhoneIcon className="pel-phone" />
          <Link href={BOOK_HREF} className="pel-cta">
            <span className="pel-cta-long">Book a Consultation</span>
            <span className="pel-cta-short">Book</span>
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
          {/* Driven by NAV in order, so the drawer can never drift out of step
              with the desktop bar. Plain entries render as links; the rest
              become accordion groups. */}
          {NAV.map((item) => {
            if (!item.variant) {
              return item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="pel-drawer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDrawerOpen(false)}
                >
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="pel-drawer-link"
                  onClick={() => setDrawerOpen(false)}
                >
                  {item.label}
                </Link>
              );
            }

            return (
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
                                  {g.sub.map((sub) => (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      className="pel-drawer-sublink"
                                      onClick={() => setDrawerOpen(false)}
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })
                      : item.children!.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className="pel-drawer-sublink"
                            {...(child.external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            onClick={() => setDrawerOpen(false)}
                          >
                            {child.label}
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
            );
          })}
        </nav>

        <div className="pel-drawer-foot">
          <Link href={BOOK_HREF} className="pel-cta pel-cta-full" onClick={() => setDrawerOpen(false)}>
            Book a Consultation
          </Link>
          <ClinicPhone className="pel-drawer-phone" icon />
        </div>
      </aside>
      </header>
    </>
  );
}
