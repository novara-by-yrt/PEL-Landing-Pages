"use client";

import { useState, useEffect, useRef } from "react";
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
];

const NON_SURGICAL_TREATMENTS: SimpleLink[] = [
  { label: "Tear Trough Fillers", href: "/non-surgical-tear-trough-fillers-uk" },
  { label: "Polynucleotides", href: "/polynucleotides" },
  { label: "Morpheus8", href: "/morpheus8" },
  { label: "Endolift®", href: "/endolift" },
  { label: "Sofwave™", href: "/sofwave" },
  { label: "UltraClear Laser", href: "/non-surgical-ultraclear-laser-treatment-uk" },
  { label: "Chemical Peel", href: "/chemical-peel" },
  { label: "EMFACE", href: "/emface" },
];

const EYE_CONDITIONS: SimpleLink[] = [
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
];

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/dr-sabrina-shah-desai" },
  {
    label: "Eye Journey",
    href: "/journey-of-eye-care",
    variant: "simple",
    children: [
      { label: "Journey of Eye Care", href: "/journey-of-eye-care" },
      { label: "Blog", href: "/blog" },
      { label: "Advanced Periorbital Skincare", href: "https://drsabrina.com/collections/all", external: true },
    ],
  },
  { label: "Eye Conditions", href: "/condition-hooded-eyelids", variant: "grid", children: EYE_CONDITIONS },
  {
    label: "Treatments",
    href: "/upper-eyelid-lift-surgery-blepharoplasty",
    variant: "mega",
    groups: [
      { label: "Surgical Treatments", sub: SURGICAL_TREATMENTS },
      { label: "Non-Surgical Treatments", sub: NON_SURGICAL_TREATMENTS },
    ],
  },
  { label: "Before & After", href: "/before-after" },
  { label: "Publications", href: "/publications" },
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
      <style>{navCSS}</style>

      <div className={`pel-pill${solid ? " is-solid" : " is-top"}`}>
        <a className="sr-only" href="#main-content">Skip to main content</a>

        <Link href="/" className="pel-brand" aria-label="Perfect Eyes Ltd home">
          <span className="pel-wordmark">Perfect Eyes</span>
          <span className="pel-wordmark-sub">EYES · FACE · SKIN</span>
        </Link>

        <nav className="pel-links" aria-label="Main navigation" ref={navRef}>
          {NAV.map((item) => {
            if (!item.variant) {
              return (
                <Link key={item.href} href={item.href} className="pel-link">
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
            <span className="pel-wordmark">Perfect Eyes</span>
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

const navCSS = `
.pel-nav{position:sticky;top:0;z-index:200;padding:16px 24px calc(16px + env(safe-area-inset-top,0px));transition:padding .45s var(--tp-ease);}
.pel-nav.at-top{padding-left:0;padding-right:0}
.pel-pill{max-width:1340px;margin:0 auto;height:72px;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:24px;padding:0 12px 0 24px;border-radius:999px;background:var(--tp-glass-bg);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid transparent;transition:height .45s var(--tp-ease),max-width .45s var(--tp-ease),padding .45s var(--tp-ease),border-radius .45s var(--tp-ease),box-shadow .45s var(--tp-ease),border-color .45s var(--tp-ease),background .45s var(--tp-ease);}
.pel-pill.is-top{max-width:none;height:80px;border-radius:0;background:#fff;backdrop-filter:none;-webkit-backdrop-filter:none;box-shadow:0 1px 0 var(--tp-hairline);padding-left:clamp(20px,4vw,48px);padding-right:clamp(12px,3vw,32px)}
.pel-pill.is-solid{border-color:var(--tp-hairline);box-shadow:var(--tp-shadow-md);background:rgba(255,255,255,0.86)}
.pel-brand{display:inline-flex;flex-direction:column;line-height:1;text-decoration:none;flex-shrink:0}
.pel-wordmark{font-family:var(--tp-display);font-size:20px;font-weight:600;letter-spacing:0.03em;color:var(--tp-indigo-900);white-space:nowrap}
.pel-wordmark-sub{font-family:var(--tp-body);font-size:8.5px;letter-spacing:0.34em;color:var(--tp-lavender-500);margin-top:4px}
.pel-links{display:flex;justify-content:center;align-items:center;gap:2px;min-width:0}
.pel-navitem{position:relative;display:flex;align-items:center}
.pel-link{position:relative;display:inline-flex;align-items:center;gap:5px;font-family:var(--tp-body);font-size:0.875rem;font-weight:500;color:var(--tp-slate);text-decoration:none;white-space:nowrap;padding:9px 13px;border-radius:999px;background:none;border:none;cursor:pointer;transition:color 160ms var(--tp-ease),background 160ms var(--tp-ease)}
.pel-link:hover{color:var(--tp-indigo-700);background:var(--tp-lavender-050)}
.pel-link-has-menu svg{transition:transform 220ms var(--tp-ease)}
.pel-navitem.has-panel .pel-link-has-menu{color:var(--tp-indigo-700);background:var(--tp-lavender-050)}
.pel-navitem.has-panel .pel-link-has-menu svg{transform:rotate(-90deg)}
.pel-dropdown{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:14px;z-index:10}
.pel-dropdown-inner{background:var(--tp-paper);border:1px solid var(--tp-hairline);border-radius:var(--tp-radius-lg);box-shadow:var(--tp-shadow-lg);padding:10px}
.pel-simple{display:flex;flex-direction:column;width:max-content;min-width:230px;max-width:320px}
.pel-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;width:max-content;max-width:min(90vw,460px)}
.pel-simple-link{display:block;padding:11px 16px;font-family:var(--tp-body);font-size:0.9375rem;font-weight:500;color:var(--tp-slate);text-decoration:none;border-radius:10px;white-space:nowrap;transition:background 140ms var(--tp-ease),color 140ms var(--tp-ease)}
.pel-simple-link:hover{background:var(--tp-lavender-050);color:var(--tp-indigo-700)}
.pel-mega2{display:grid;grid-template-columns:minmax(280px,320px);gap:0;padding:0;width:max-content;max-width:min(94vw,700px);overflow:hidden}
.pel-navitem.has-panel .pel-mega2{grid-template-columns:minmax(280px,320px) minmax(280px,360px)}
.pel-mega2-left{display:flex;flex-direction:column;gap:2px;padding:20px 16px}
.pel-navitem.has-panel .pel-mega2-left{border-right:1px solid var(--tp-hairline)}
.pel-mega2-eyebrow{padding:2px 16px 12px;font-family:var(--tp-body);font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--tp-lavender-500)}
.pel-mega2-cat{position:relative;display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:12px 16px;background:transparent;border:0;border-radius:12px;cursor:pointer;text-align:left;text-decoration:none;font-family:var(--tp-body);font-size:0.9375rem;font-weight:500;color:var(--tp-ink);transition:background 140ms var(--tp-ease),color 140ms var(--tp-ease)}
.pel-mega2-cat svg{flex:0 0 auto;color:var(--tp-mist);transition:color 140ms var(--tp-ease),transform 140ms var(--tp-ease)}
.pel-mega2-cat:hover{color:var(--tp-lavender-500)}
.pel-mega2-cat.is-active{background:var(--tp-lavender-050);color:var(--tp-ink)}
.pel-mega2-cat.is-active svg{color:var(--tp-lavender-500);transform:rotate(90deg)}
.pel-mega2-viewall{display:flex;align-items:center;gap:9px;margin-top:8px;padding:13px 16px 4px;border-top:1px solid var(--tp-hairline);font-family:var(--tp-body);font-size:13px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:var(--tp-ink);text-decoration:none}
.pel-mega2-viewall svg{color:var(--tp-lavender-500)}
.pel-mega2-viewall:hover{color:var(--tp-lavender-500)}
.pel-mega2-right{padding:20px 22px;background:var(--tp-paper)}
.pel-mega2-rhead{display:block;padding:2px 4px 12px;font-family:var(--tp-body);font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--tp-lavender-500)}
.pel-mega2-rlist{display:flex;flex-direction:column;gap:2px}
.pel-mega2-link{display:block;padding:11px 4px;font-family:var(--tp-body);font-size:0.9375rem;color:var(--tp-slate);text-decoration:none;border-radius:8px;transition:color 140ms var(--tp-ease),padding-left 140ms var(--tp-ease)}
.pel-mega2-link:hover{color:var(--tp-lavender-500);padding-left:10px}
.pel-actions{display:flex;align-items:center;gap:14px;flex-shrink:0}
.pel-phone{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;flex-shrink:0;color:#fff;background:var(--tp-indigo-700);border-radius:50%;text-decoration:none;transition:background 160ms var(--tp-ease),transform 160ms var(--tp-ease)}
.pel-phone:hover{background:var(--tp-indigo-600);transform:translateY(-1px)}
.pel-cta{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:999px;background:var(--tp-indigo-700);color:#fff;font-family:var(--tp-body);font-size:0.875rem;font-weight:600;text-decoration:none;white-space:nowrap;transition:background 160ms var(--tp-ease),transform 160ms var(--tp-ease)}
.pel-cta:hover{background:var(--tp-indigo-600);transform:translateY(-1px)}
.pel-cta-short{display:none}
.pel-burger{display:none;align-items:center;justify-content:center;width:42px;height:42px;background:none;border:none;cursor:pointer;color:var(--tp-indigo-700);border-radius:12px;flex-shrink:0}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}

.pel-scrim{position:fixed;inset:0;z-index:210;background:var(--tp-glass-bg-deep);backdrop-filter:blur(4px);opacity:0;visibility:hidden;transition:opacity 220ms var(--tp-ease),visibility 220ms var(--tp-ease);pointer-events:none}
.pel-scrim.is-open{opacity:1;visibility:visible;pointer-events:auto}
.pel-drawer{position:fixed;top:0;left:0;z-index:211;height:100%;height:100dvh;width:min(400px,86vw);display:flex;flex-direction:column;background:var(--tp-paper);box-shadow:var(--tp-shadow-lg);transform:translateX(-100%);transition:transform 420ms var(--tp-ease);pointer-events:none;padding:max(20px,env(safe-area-inset-top)) 0 max(20px,env(safe-area-inset-bottom))}
.pel-drawer.is-open{transform:translateX(0);pointer-events:auto}
.pel-drawer-top{display:flex;align-items:center;justify-content:space-between;padding:4px 20px 20px;border-bottom:1px solid var(--tp-hairline)}
.pel-close{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:none;border:none;cursor:pointer;color:var(--tp-indigo-700);border-radius:12px}
.pel-drawer-links{flex:1;display:flex;flex-direction:column;padding:12px;overflow-y:auto;-webkit-overflow-scrolling:touch}
.pel-drawer-group,.pel-drawer-links>.pel-drawer-link{border-bottom:1px solid var(--tp-hairline)}
.pel-drawer-links>*:last-child{border-bottom:0}
.pel-drawer-link{display:flex;align-items:center;justify-content:space-between;width:100%;min-height:54px;padding:0 14px;font-family:var(--tp-display);font-size:20px;font-weight:600;color:var(--tp-ink);text-decoration:none;background:none;border:none;cursor:pointer;text-align:left;border-radius:12px;transition:background 140ms var(--tp-ease),color 140ms var(--tp-ease)}
.pel-drawer-link:hover{background:var(--tp-lavender-050);color:var(--tp-indigo-700)}
.pel-drawer-group{display:flex;flex-direction:column}
.pel-drawer-sub{display:flex;flex-direction:column;gap:2px;padding:2px 0 10px 12px;margin-left:8px;border-left:2px solid var(--tp-hairline)}
.pel-drawer-sublink{display:flex;align-items:center;min-height:44px;padding:0 14px;font-family:var(--tp-body);font-size:0.9375rem;font-weight:500;color:var(--tp-slate);text-decoration:none;border-radius:10px;transition:background 140ms var(--tp-ease),color 140ms var(--tp-ease)}
.pel-drawer-sublink:hover{background:var(--tp-lavender-050);color:var(--tp-indigo-700)}
.pel-drawer-subgroup{display:flex;flex-direction:column;gap:2px}
.pel-drawer-subgroup+.pel-drawer-subgroup{margin-top:4px}
.pel-drawer-subhead{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:10px 14px;background:transparent;border:0;border-radius:10px;cursor:pointer;font-family:var(--tp-body);font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--tp-ink)}
.pel-drawer-subhead svg{color:var(--tp-lavender-500)}
.pel-drawer-subgroup-list{display:flex;flex-direction:column;gap:2px;padding-left:6px}
.pel-drawer-foot{display:flex;flex-direction:column;gap:12px;padding:20px;border-top:1px solid var(--tp-hairline)}
.pel-cta-full{width:100%;justify-content:center}
.pel-drawer-phone{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:46px;font-family:var(--tp-body);font-size:0.9375rem;font-weight:600;color:var(--tp-indigo-700);text-decoration:none;border:1px solid var(--tp-hairline);border-radius:999px}

@media(max-width:1200px){.pel-links{gap:0}.pel-pill{gap:14px}.pel-link{padding:9px 10px}}
@media(max-width:1120px){
  .pel-nav{padding:12px 20px}
  .pel-pill{grid-template-columns:1fr auto;height:64px;gap:14px;padding:0 10px 0 20px}
  .pel-pill.is-top{height:70px;padding-left:clamp(16px,4vw,28px);padding-right:clamp(8px,3vw,20px)}
  .pel-links,.pel-actions{display:none}
  .pel-burger{display:inline-flex}
}
`;
