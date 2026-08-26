"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import SafeImage from "@/components/shared/SafeImage";
import { TpIcon } from "@/components/treatment/TpIcon";
import type { Member } from "@/lib/team";
import styles from "./TeamRoster.module.css";

/** Splits the bio into paragraphs so the modal body can run in two columns. */
function paragraphs(bio: string): string[] {
  const parts = bio
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length > 1) return parts;

  /* Single-block bios are the norm in the roster, so break on sentence
     boundaries near the middle - that gives the two columns roughly even
     depth instead of one long block beside a short one. */
  const sentences = bio.match(/[^.!?]+[.!?]+(\s|$)/g);
  if (!sentences || sentences.length < 2) return [bio];
  const mid = Math.ceil(sentences.length / 2);
  return [sentences.slice(0, mid).join("").trim(), sentences.slice(mid).join("").trim()].filter(
    Boolean,
  );
}

/**
 * Everything needed to open a member's biography: the dialog itself plus the
 * open/close state, escape handling, scroll lock and focus restoration.
 *
 * Shared because the /team grid and the home page's team carousel both open
 * the same profile. Each caller renders its own cards and calls `open(member,
 * trigger)`; the trigger element is remembered so focus returns to the card
 * that was clicked when the dialog closes.
 */
export function useTeamProfile() {
  const [active, setActive] = useState<Member | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const isOpen = active !== null;
  const close = useCallback(() => setActive(null), []);
  const open = useCallback((member: Member, trigger?: HTMLElement | null) => {
    lastFocused.current = trigger ?? null;
    setActive(member);
  }, []);

  /* The dialog is portalled to <body>. Without it the overlay is trapped in
     the stacking context <main> creates (position: relative; z-index: 1), so
     the fixed site header - z-index 200, outside main - paints over it no
     matter how high the overlay's own z-index goes.
     Read once during render rather than in an effect: the portal only ever
     renders after a click, so the server's null and the client's body element
     never disagree at hydration. */
  const [portalHost] = useState<HTMLElement | null>(() =>
    typeof document === "undefined" ? null : document.body,
  );

  // Escape to close, and lock background scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  // Move focus into the dialog on open, and back to the triggering card on close.
  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
    } else if (lastFocused.current) {
      lastFocused.current.focus();
      lastFocused.current = null;
    }
  }, [isOpen]);

  const dialog =
    active && portalHost
      ? createPortal(
          <TeamProfileDialog member={active} onClose={close} closeRef={closeRef} />,
          portalHost,
        )
      : null;

  return { open, close, dialog, activeId: active?.id ?? null };
}

function TeamProfileDialog({
  member,
  onClose,
  closeRef,
}: {
  member: Member;
  onClose: () => void;
  closeRef: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} - ${member.role}`}
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          className={styles.overlayClose}
          onClick={onClose}
          aria-label="Close profile"
        >
          <TpIcon name="close" size={18} />
        </button>

        {/* Header band: portrait beside the identity block, on the brand
            tint - the visual anchor before the prose starts. */}
        <div className={styles.modalHeader}>
          <div className={styles.modalPhoto}>
            <SafeImage src={member.image} alt={member.name} sizes="(max-width: 760px) 100vw, 320px" />
          </div>

          <div className={styles.modalIdentity}>
            <span className={styles.modalRole}>{member.role}</span>
            <h3 className={styles.modalName}>{member.name}</h3>
            <span className={styles.modalRule} aria-hidden="true" />

            {member.tags.length > 0 && (
              <div className={styles.tags}>
                {member.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {member.quote && (
              <figure className={styles.quote}>
                <span className={styles.quoteMark} aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className={styles.quoteText}>{member.quote}</blockquote>
                <figcaption className={styles.quoteAttrib}>{member.name}</figcaption>
              </figure>
            )}
          </div>
        </div>

        {/* Body: the bio runs in two columns on desktop, one on mobile. */}
        <div className={styles.modalBody}>
          <div className={styles.modalProse}>
            {paragraphs(member.bio).map((para, i) => (
              <p key={i} className={styles.modalBio}>
                {para}
              </p>
            ))}
          </div>

          {(member.fact || member.bookable) && (
            <div className={styles.modalFoot}>
              {member.fact && (
                <p className={styles.fact}>
                  <b>Fun fact - </b>
                  {member.fact}
                </p>
              )}
              {member.bookable && (
                <Link href="/contact" className={`tp-btn tp-btn-primary ${styles.modalCta}`}>
                  Book a Consultation
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
