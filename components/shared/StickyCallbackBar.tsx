"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import RequestCallbackForm from "@/components/forms/RequestCallbackForm";
import styles from "./StickyCallbackBar.module.css";

function PhoneIcon() {
  return (
    <svg
      className={styles.icon}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.7 16.6v2.7a1.8 1.8 0 0 1-2 1.8 17.9 17.9 0 0 1-7.8-2.8 17.6 17.6 0 0 1-5.4-5.4A17.9 17.9 0 0 1 2.7 5.1 1.8 1.8 0 0 1 4.4 3.3h2.7a1.8 1.8 0 0 1 1.8 1.5c.1.8.4 1.7.7 2.4a1.8 1.8 0 0 1-.4 1.9L8 10.4a14.4 14.4 0 0 0 5.4 5.4l1.3-1.2a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.6 2.4.7a1.8 1.8 0 0 1 1.7 1.7z" />
    </svg>
  );
}

/**
 * Site-wide "Request a call back" button, pinned bottom-centre, opening the
 * callback form in a dialog.
 *
 * The form is the same RequestCallbackForm the home page's contact panel
 * renders, in its `compact` variant — one definition, one set of field names,
 * one place a change has to be made. See that component and the dialog rules
 * in the stylesheet for how it is sized to clear the viewport without
 * scrolling.
 *
 * Dialog behaviour matches BookConsultationModal so the site's two dialogs
 * feel like one thing: Escape closes, a backdrop click closes, focus moves in
 * on open and returns to the trigger on close, and the page behind is held
 * still while it is up.
 */
export default function StickyCallbackBar() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  /* Portalled to <body> for the same reason BookConsultationModal is: the
     overlay must not inherit a containing block from anything with its own
     transform. Read during render rather than in an effect — the portal only
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
      <div className={styles.bar}>
        <button
          ref={triggerRef}
          type="button"
          className={styles.button}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <PhoneIcon />
          Request a call back
        </button>
      </div>

      {open && portalHost && createPortal(
        <div className={styles.overlay} onClick={close} role="presentation">
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={close}
              aria-label="Close"
            >
              &times;
            </button>

            <h2 id={titleId} className={styles.dialogTitle}>
              Request a call back
            </h2>
            <p className={styles.dialogLead}>
              Leave your details and a member of the team will call you back.
            </p>

            <RequestCallbackForm compact />
          </div>
        </div>,
        portalHost
      )}
    </>
  );
}
