"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import BookAppointmentForm from "./BookAppointmentForm";
import styles from "./Forms.module.css";

/**
 * "Book a Consultation", as a dialog rather than a page.
 *
 * The booking form itself is the same BookAppointmentForm the contact page
 * renders — the fields a booking needs (preferred time, enquiry type,
 * how to reply) are not worth a second, divergent copy, and a lead should
 * arrive in the same shape whichever route the visitor took to send it.
 *
 * Dialog behaviour follows the on-load popup so the two feel like one thing:
 * Escape closes, a click on the backdrop closes, focus moves in on open and
 * returns to the trigger on close, and the page behind is held still while it
 * is up.
 */
export default function BookConsultationModal({
  className,
  children,
  label = "Book a Consultation",
  onOpen,
}: {
  className?: string;
  /** Trigger contents, when the caller needs its own markup inside. */
  children?: React.ReactNode;
  /** Accessible name for the trigger, when `children` is markup. */
  label?: string;
  /** Fired as the dialog opens — the mobile drawer uses it to close itself,
   *  so the panel is not left sitting behind the dialog. */
  onOpen?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  /* The dialog is portalled to <body>. One of the two triggers lives inside
     the mobile nav drawer, which has its own `transform` for the slide-in
     animation — that transform creates a new containing block for
     `position: fixed` descendants, so without the portal this overlay gets
     clipped to the drawer's own box instead of covering the screen.
     Read once during render rather than in an effect: the portal only ever
     renders after a click, so the server's null and the client's body element
     never disagree at hydration. */
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
        onClick={() => {
          onOpen?.();
          setOpen(true);
        }}
      >
        {children ?? label}
      </button>

      {open && portalHost && createPortal(
        <div className={styles.overlay} onClick={close} role="presentation">
          <div
            className={styles.popup}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.popupClose}
              onClick={close}
              aria-label="Close"
            >
              &times;
            </button>

            <h2 id={titleId} className={styles.popupTitle}>
              Book a consultation
            </h2>
            <p className={styles.popupLead}>
              Tell us when suits and what you would like to discuss, and a member of the
              team will be in touch to arrange your appointment.
            </p>

            <BookAppointmentForm showHeading={false} />
          </div>
        </div>,
        portalHost
      )}
    </>
  );
}
