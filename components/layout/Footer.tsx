"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";
import ClinicPhone from "@/components/shared/ClinicPhone";
import { CLINIC, SOCIALS } from "@/lib/clinic";
import styles from "./Footer.module.css";

/** The clinic's own entry on the CQC register — the same location the home
 *  page's "good rating in all 5 key areas" line points at. */
const CQC_REGISTER_URL = "https://www.cqc.org.uk/location/1-5591490767";

/**
 * The CQC badge the treatment pages already use.
 *
 * ⚠️ It is served from /uploads, which rewrites to the WordPress origin — the
 * origin this migration exists to switch off. Once the artwork is copied into
 * public/ (or UPLOADS_ORIGIN is repointed at R2), change this to the local
 * path. Until then the footer degrades to text alone rather than showing a
 * broken image on every page of the site, which is what the onError below is
 * for.
 */
const CQC_BADGE_SRC = "/uploads/2024/09/Frame-252.png";

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

/* Both privacy links used to point at /privacy-notice-1 and -2, which are
   superseded drafts of /privacy-notice and are excluded from the index — so
   every page linked twice to pages search engines are told to ignore, and
   neither was the live notice. One link, pointing at the real one.

   The terms link was also wrong: /non-surgical-terms-conditions 404s. The
   page lives under the surgeon's path. */
const LEGAL_LINKS = [
  { href: "/privacy-notice", label: "Privacy Notice" },
  {
    href: "/dr-sabrina-shah-desai/non-surgical-terms-conditions",
    label: "Non Surgical Terms Conditions",
  },
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
  /* The badge lives on an origin that is on its way out; if it does not load,
     the registration statement stands on its own rather than sitting beside a
     broken image on every page. */
  const [badgeFailed, setBadgeFailed] = useState(false);

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
      /* The header is fixed over the top of the viewport, so the room the
         footer actually has is the viewport minus the header — not the whole
         viewport. Measuring against the whole viewport left a band of window
         heights (on this site, 776px to 848px — which is where a 1440x900
         laptop lands once browser chrome is taken off) where the footer was
         judged to fit, stayed fixed, and then had its top 18-58px covered by
         the header: the Quick links heading and the first rows of the
         columns sat behind the bar with no way to scroll them out. Below
         that band the footer correctly fell back to normal flow; above it
         there was room to spare. Only the middle was broken, which is why it
         reads as intermittent. */
      const header = document.querySelector<HTMLElement>(".pel-nav");
      const available = window.innerHeight - (header?.offsetHeight ?? 0);
      const fits = el.offsetHeight <= available;
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
          {/* Regulatory registration, next to the company number and the
              legal links rather than up with the marketing — it is the same
              kind of statement. Links out to the clinic's own entry on the
              CQC register, so the claim can be checked rather than just read.

              The badge sits on a white plate: it is the artwork the treatment
              pages use, drawn for those pages' pale background, and the
              footer is dark. The plate keeps it legible whatever its ink,
              the same way the Google mark is handled on the dark review
              cards. */}
          <a
            href={CQC_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cqc}
          >
            {badgeFailed ? null : (
              <span className={styles.cqcPlate}>
                <Image
                  src={CQC_BADGE_SRC}
                  alt=""
                  width={190}
                  height={31}
                  className={styles.cqcMark}
                  onError={() => setBadgeFailed(true)}
                />
              </span>
            )}
            <span className={styles.cqcText}>CQC registered</span>
          </a>

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
