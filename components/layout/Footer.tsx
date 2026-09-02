import Link from "next/link";
import ClinicPhone from "@/components/shared/ClinicPhone";
import { CLINIC } from "@/lib/clinic";
import styles from "./Footer.module.css";

/** The clinic's own entry on the CQC register. */
const CQC_REGISTER_URL = "https://www.cqc.org.uk/location/1-5591490767";

/* Legal only. These are standalone landing pages, so the footer carries no
   navigation: the page has one job and every link out of it is a way to
   leave without converting. What stays is what a landing page still has to
   say — who is running it, how to reach them, and where the privacy notice
   and terms are. Google Ads and Meta both check for a reachable privacy
   policy, and a CQC-registered provider has to publish its rating, so those
   three links earn their place where a "Popular treatments" column does not.

   Both targets are live: /privacy-notice (content/pages/privacy-notice.mdx —
   not the -1/-2 drafts, which are superseded and excluded from the index)
   and the terms page under the surgeon's path. */
const LEGAL_LINKS = [
  { href: "/privacy-notice", label: "Privacy Notice" },
  {
    href: "/dr-sabrina-shah-desai/non-surgical-terms-conditions",
    label: "Terms & Conditions",
  },
];

export default function Footer() {
  /* Resolved when the page is built rather than in the browser, which is what
     lets this stay a server component — the pages are rebuilt often enough
     for the year to keep up. */
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.row}>
          <p className={styles.clinic}>{CLINIC.name}</p>

          <ClinicPhone className={styles.phone} icon />

          <nav className={styles.legal} aria-label="Legal">
            {LEGAL_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className={styles.legalLink}>
                {item.label}
              </Link>
            ))}
            <a
              href={CQC_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.legalLink}
            >
              CQC registered
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </nav>
        </div>

        <div className={styles.fine}>
          {/* One template string rather than text interleaved with {…} holes:
              JSX decides for itself which spaces around an expression survive,
              and this line lost the one after the year. It also keeps React
              from stitching the sentence together out of half a dozen text
              nodes separated by <!-- --> markers in the HTML.

              "Perfect Eyes Ltd", not CLINIC.name (the trading name) — this
              line makes a statement about the actual Companies House entity,
              which must carry its "Ltd" suffix. See lib/clinic.ts. */}
          <p>
            {`© ${currentYear} Perfect Eyes Ltd. All rights reserved. ` +
              `Registered in England & Wales, company no. ${CLINIC.companyNumber}. ` +
              `${CLINIC.addressShort}.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
