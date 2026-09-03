"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./PrivacyNoticeModal.module.css";

/**
 * The privacy notice, in a dialog rather than at its own URL.
 *
 * On a landing page the notice has to be reachable at the point where
 * personal details are collected, but sending someone to /privacy-notice
 * means leaving the page with the form on it, and a visitor who reads three
 * screens of data-protection copy rarely comes back to finish the enquiry.
 * The notice opens over the page instead, and closing it returns the reader
 * to the form exactly where they left it.
 *
 * Dialog behaviour matches BookConsultationModal so the page's two dialogs
 * feel like one thing: Escape closes, a click on the backdrop closes, focus
 * moves in on open and returns to the trigger on close, and the page behind
 * is held still while it is up.
 *
 * The notice's own body is passed in as HTML rather than fetched: it lives in
 * content/pages/privacy-notice.mdx and is read on the server, so opening the
 * dialog costs no request and works with JavaScript already loaded.
 */
export default function PrivacyNoticeModal({
  html,
  className,
  children,
}: {
  /** The notice body, already HTML, from content/pages/privacy-notice.mdx. */
  html: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  /* Portalled to <body>: the trigger sits inside the form card, which has its
     own stacking context, and a dialog clipped to a card is not a dialog.
     Read during render rather than in an effect, the same way the booking
     dialog does it, so the server's null and the client's body element never
     disagree at hydration. */
  const [portalHost] = useState<HTMLElement | null>(() =>
    typeof document === "undefined" ? null : document.body,
  );

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={className}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>

      {open && portalHost && createPortal(
        <div className={styles.overlay} onClick={close} role="presentation">
          <div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.head}>
              <h2 id={titleId} className={styles.title}>
                Privacy Notice
              </h2>
              <button
                ref={closeRef}
                type="button"
                className={styles.close}
                onClick={close}
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {/* The notice scrolls inside the dialog rather than the dialog
                growing to fit it: it runs to several screens, and a dialog
                taller than the viewport puts its close button out of reach. */}
            <div className={styles.body} dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>,
        portalHost
      )}
    </>
  );
}
