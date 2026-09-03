import Image from "next/image";
import CallbackDialog from "@/components/forms/CallbackDialog";
import styles from "./Header.module.css";

/**
 * The clinic bar: who this is, and the two ways to start a conversation.
 *
 * No navigation. These are standalone ad landing pages, so the nav links,
 * mega-menu panels and mobile drawer the site's header carried are all ways
 * to leave a page that has one job — and the drawer, the scroll-shrink
 * animation and the hover lamp that came with them are what made that header
 * a 28KB client component. What is left needs no state, so this renders on
 * the server.
 *
 * The CTA opens the callback dialog rather than linking to the contact page,
 * which keeps the visitor on the page they landed on. It is the same dialog
 * the pinned pill and every button on a landing page open: this used to be
 * the booking form, a different set of fields, so which button a visitor
 * happened to press decided what they were asked. See CallbackDialog.
 */
export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.bar}>
        {/* Not a link: on a landing page the logo's job is to say whose page
            this is, and a link home is a way out of it. The mark is sized by
            height so its 719:347 proportions hold, and the width/height below
            reserve its box so nothing shifts as it loads. Eager, since it is
            above the fold — but not preloaded, which would put it ahead of
            the fonts and the hero headline. */}
        <span className={styles.brand}>
          <Image
            src="/PEL_logo_without_background.png"
            alt="The Perfect Eyes Clinic"
            width={719}
            height={347}
            sizes="(min-width: 640px) 210px, 150px"
            loading="eager"
            className={styles.logo}
          />
        </span>

        <div className={styles.actions}>
          <CallbackDialog className={styles.cta} label="Begin your journey">
            <span className={styles.ctaLong}>Begin your journey</span>
            <span className={styles.ctaShort}>Begin</span>
          </CallbackDialog>
        </div>
      </div>
    </header>
  );
}
