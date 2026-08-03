import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";
import { CLINIC, SOCIALS } from "@/lib/clinic";
import styles from "./Footer.module.css";

const QUICK_LINKS = [
  { href: "/dr-sabrina-shah-desai", label: "Meet Dr Shah-Desai" },
  { href: "/meet-team", label: "About the Clinic" },
  { href: "/journey-of-eye-care", label: "The Eye Care Journey" },
  { href: "/before-after", label: "Before & After" },
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

  return (
    <footer className={styles.footer} role="contentinfo">
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
            {/* No logo file exists in the repository, so the mark is set in
                the brand's own type rather than pointing at an image that
                would render broken. Swap in an <Image> when there is one. */}
            <Link href="/" className={styles.mark} aria-label="Perfect Eyes Ltd — home">
              <TpIcon name="eye" size={34} style={{ color: "var(--tp-indigo-700)" }} />
              <span className={styles.markName}>THE PERFECT EYES</span>
              <span className={styles.markSub}>Clinic</span>
              <span className={styles.markSub}>Eyes · Face · Skin</span>
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
                >
                  {SOCIAL_ICONS[social.label]}
                  {social.label}
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
              <a href={CLINIC.phoneHref} className={styles.contactRow}>
                <span className={styles.contactIcon}>
                  <TpIcon name="phone" size={16} />
                </span>
                {CLINIC.phoneDisplay}
              </a>
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
