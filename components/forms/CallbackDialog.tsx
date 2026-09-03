"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import RequestCallbackForm from "./RequestCallbackForm";
import styles from "./CallbackDialog.module.css";

/**
 * The callback form in a dialog, with the caller supplying the trigger.
 *
 * One dialog behind every call to action on the site: the pill pinned to the
 * bottom of the page, the button in the header, and each button on a landing
 * page. They used to do three different things. The header opened the booking
 * form, a different set of fields entirely; the landing page's buttons were
 * anchors that scrolled to a panel at the foot of the page, which on a phone
 * is a long way to travel and a long way back if you change your mind. Now
 * they all open this.
 *
 * The dialog was extracted from StickyCallbackBar, which is where it lived
 * when it had one caller. That component keeps its bar and its pill and now
 * renders this for the rest.
 *
 * Behaviour matches the site's other dialogs: Escape closes, a backdrop click
 * closes, focus moves in on open and returns to the trigger on close, and the
 * page behind is held still while it is up.
 */
export default function CallbackDialog({
  className,
  children,
  label,
  title = "Begin your journey",
  lead = "Leave your details and a member of the team will call you back.",
}: {
  /** Class for the trigger, so each caller keeps its own button styling. */
  className?: string;
  /** Trigger contents. */
  children: React.ReactNode;
  /** Accessible name for the trigger, when `children` is markup. */
  label?: string;
  title?: string;
  lead?: string;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  /* Portalled to <body>: the overlay must not inherit a containing block from
     an ancestor with its own transform, and several of the triggers sit
     inside sections that have one. Read during render rather than in an
     effect, since the portal only renders after a click and the server's null
     and the client's body element never disagree at hydration. */
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
        aria-label={label}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>

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
              {title}
            </h2>
            <p className={styles.dialogLead}>{lead}</p>

            <RequestCallbackForm compact submitLabel="Begin your journey" />
          </div>
        </div>,
        portalHost
      )}
    </>
  );
}
