import Image from "next/image";
import ClinicPhone from "@/components/shared/ClinicPhone";
import { TpIcon } from "@/components/treatment/TpIcon";
import { CLINIC } from "@/lib/clinic";
import styles from "./Footer.module.css";

/**
 * The clinic, and nothing else.
 *
 * These are standalone ad landing pages: every link out of one is a way to
 * leave without converting, so the footer carries none. What is left says
 * who is running the page and how to reach them, plus the two statements a
 * paid-traffic page has to make — the platform disclaimer, and the company
 * details the Companies Act requires on a company's website.
 *
 * Laid out to take as little height as it can while still holding those.
 * The mark sits beside the address rather than above it, and the three
 * contact rows run along one line from 760px instead of stacking, which is
 * most of the difference: none of this content rewards a long scroll, and
 * every pixel of it sits below the page's last call to action.
 */
export default function Footer() {
  /* Resolved when the page is built rather than in the browser, which is what
     lets this stay a server component — the pages are rebuilt often enough
     for the year to keep up. */
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.top}>
          {/* Not a link: there is nowhere for it to go. The transparent PNG,
              not the JPEG — the JPEG carries a baked white background, which
              would show as a hard edge against the plate. The plate itself is
              there because the mark is drawn in dark ink for pale pages and
              this footer is not one. */}
          <span className={styles.mark}>
            <Image
              src="/PEL_logo_without_background.png"
              alt="The Perfect Eyes Clinic"
              width={719}
              height={347}
              sizes="(min-width: 760px) 168px, 150px"
              className={styles.markImg}
            />
          </span>

          <div className={styles.detail}>
            <p className={styles.tagline}>
              A Harley Street clinic for eyes, face and skin, led by Dr Sabrina Shah-Desai.
            </p>

            <address className={styles.contact}>
              <span className={styles.contactRow}>
                <span className={styles.contactIcon}>
                  <TpIcon name="pin" size={15} />
                </span>
                {CLINIC.address}
              </span>
              <ClinicPhone className={styles.contactRow}>
                <span className={styles.contactIcon}>
                  <TpIcon name="phone" size={15} />
                </span>
                {CLINIC.phoneDisplay}
              </ClinicPhone>
              <a href={`mailto:${CLINIC.email}`} className={styles.contactRow}>
                <span className={styles.contactIcon}>
                  <TpIcon name="mail" size={15} />
                </span>
                {CLINIC.email}
              </a>
            </address>
          </div>
        </div>

        <div className={styles.fine}>
          {/* One template string rather than text interleaved with {…} holes:
              JSX decides for itself which spaces around an expression survive,
              and this line lost the one after the year.

              "Perfect Eyes Ltd", not CLINIC.name (the trading name) — the
              Companies Act asks for the registered entity, which must carry
              its "Ltd" suffix. See lib/clinic.ts. */}
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
