"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";
import ClinicPhone from "@/components/shared/ClinicPhone";
import { CLINIC, SOCIALS } from "@/lib/clinic";
import styles from "./Footer.module.css";

const QUICK_LINKS = [
  { href: "/dr-sabrina-shah-desai", label: "Meet Dr Shah-Desai" },
  { href: "/meet-team", label: "About the Clinic" },
  { href: "/journey-of-eye-care", label: "The Eye Care Journey" },
  { href: "/before-after", label: "Results" },
  { href: "/contact-cosmetic-eye-surgeon", label: "Book a Consultation" },
  { href: "/contact", label: "Contact" },
];

const POPULAR_TREATMENTS = [
  {
    href: "/surgical/eyelid-surgery/upper-eyelid-blepharoplasty-uk",
    label: "Upper Eyelid Blepharoplasty",
  },
  {
    href: "/surgical/eyelid-surgery/eye-bag-removal-blepharoplasty-uk",
    label: "Eye Bag Removal Blepharoplasty",
  },
  { href: "/surgical/eyelid-surgery/droppy-eye-ptosis-surgery-uk", label: "Ptosis Surgery" },
  { href: "/surgical/browlift-treatment-uk", label: "Browlift Treatment" },
  { href: "/non-surgical/tear-trough-fillers-uk", label: "Tear Trough Fillers" },
];

const LEGAL_LINKS = [
  { href: "/privacy-notice-1", label: "Privacy Notice 1" },
  { href: "/privacy-notice-2", label: "Privacy Notice 2" },
  { href: "/non-surgical-terms-conditions", label: "Non Surgical Terms Conditions" },
];

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  "X / Twitter": (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21h-3l7-8L2.6 3h6.2l4.2 5.6L17.5 3z" />
    </svg>
  ),
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  /* Publishes the footer's own rendered height as a CSS custom property, so
     #footer-spacer (layout-chrome.css) can reserve exactly that much scroll
     room for the reveal effect. A ResizeObserver rather than a one-off
     measurement, since the footer's height changes with viewport width
     (columns stack on mobile) and with content reflow (e.g. a webfont
     swapping in).

     The reveal only works while the footer fits on screen: it is
     `position: fixed`, so any part of it taller than the viewport sits above
     the top edge and can never be scrolled to. Stacked into one column on a
     phone the footer runs ~1450px against a ~640–850px viewport, which left
     the top third — the whole Quick links column — permanently unreachable.
     So measure against the viewport and, when it cannot fit, hand the footer
     back to normal flow (`data-reveal="off"`) and zero the spacer. */
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const sync = () => {
      const fits = el.offsetHeight <= window.innerHeight;
      el.dataset.reveal = fits ? "on" : "off";
      document.documentElement.style.setProperty(
        "--footer-h",
        fits ? `${el.offsetHeight}px` : "0px",
      );
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    /* Rotating a phone changes the viewport without necessarily changing the
       footer's own height, so the observer alone would miss it. */
    window.addEventListener("resize", sync);
    window.addEventListener("orientationchange", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", sync);
    };
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.grid}>
          <nav className={styles.colStart} aria-label="Quick links">
            <h2 className={styles.colHead}>Quick links</h2>
            <ul className={styles.list}>
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.brand}>
            {/* The transparent PNG, not the JPEG: the JPEG carries a baked
                white background, which would show as a hard white block if
                the card behind it ever changes. */}
            <Link href="/" className={styles.mark} aria-label="The Perfect Eyes Clinic — home">
              <Image
                src="/PEL_logo_without_background.png"
                alt="The Perfect Eyes Clinic"
                width={719}
                height={347}
                sizes="(min-width: 640px) 210px, 180px"
                className={styles.markImg}
              />
            </Link>

            <span className={styles.markRule} aria-hidden="true" />

            <p className={styles.tagline}>
              A Harley Street clinic for eyes, face and skin, led by Dr Sabrina Shah-Desai.
            </p>

            <div className={styles.socials}>
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.social}
                  /* Icon only, so the link needs its own accessible name. */
                  aria-label={`${social.label} (opens in a new tab)`}
                >
                  {SOCIAL_ICONS[social.label]}
                </a>
              ))}
            </div>

            <address className={styles.contact}>
              <span className={styles.contactRow}>
                <span className={styles.contactIcon}>
                  <TpIcon name="pin" size={16} />
                </span>
                {CLINIC.address}
              </span>
              <ClinicPhone className={styles.contactRow}>
                <span className={styles.contactIcon}>
                  <TpIcon name="phone" size={16} />
                </span>
                {CLINIC.phoneDisplay}
              </ClinicPhone>
              <a href={`mailto:${CLINIC.email}`} className={styles.contactRow}>
                <span className={styles.contactIcon}>
                  <TpIcon name="mail" size={16} />
                </span>
                {CLINIC.email}
              </a>
            </address>
          </div>

          <nav className={styles.colEnd} aria-label="Popular treatments">
            <h2 className={styles.colHead}>Popular treatments</h2>
            <ul className={styles.list}>
              {POPULAR_TREATMENTS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <nav className={styles.legal} aria-label="Legal">
            {LEGAL_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className={styles.legalLink}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.fine}>
            <p>
              © {currentYear} {CLINIC.name}. All rights reserved. Registered in England &amp;
              Wales, company no. {CLINIC.companyNumber}.
            </p>
            <p>{CLINIC.addressShort}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
