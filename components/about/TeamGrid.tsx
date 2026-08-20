"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SafeImage from "@/components/shared/SafeImage";
import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";
import styles from "./TeamRoster.module.css";

export type Member = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  tags: string[];
  fact: string | null;
  bookable: boolean;
  /** Optional pull-quote shown in the profile's header band. */
  quote?: string;
};

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

export function TeamGrid({ members }: { members: Member[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const isOpen = openId !== null;
  const active = members.find((m) => m.id === openId) ?? null;

  const close = useCallback(() => setOpenId(null), []);

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

  return (
    <>
      <div className={styles.grid}>
        {members.map((member) => (
          <article key={member.id} className={styles.card}>
            {/* SafeImage, not a bare next/image: a portrait can be a
                /uploads path served from the WordPress origin, where files
                have gone missing before - a plain <img> then paints the alt
                text and the browser's broken-image glyph in the middle of the
                card. This degrades to the brand placeholder instead. */}
            <div className={styles.photo}>
              <SafeImage
                src={member.image}
                alt={member.name}
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 45vw, 30vw"
              />
            </div>
            <div className={styles.body}>
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
              {/* Full bio stays in the document for search/accessibility - the
                  modal is a progressive-disclosure UI, not the only copy. */}
              <p className="sr-only">{member.bio}</p>
              <div className={styles.actions}>
                <button
                  type="button"
                  className="tp-btn tp-btn-secondary tp-btn-block"
                  onClick={(e) => {
                    lastFocused.current = e.currentTarget;
                    setOpenId(member.id);
                  }}
                >
                  View Profile
                </button>
                {member.bookable && (
                  <Link href="/contact" className="tp-btn tp-btn-primary tp-btn-block">
                    Book Now
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {active && portalHost && createPortal(
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} - ${active.role}`}
          onClick={close}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              ref={closeRef}
              type="button"
              className={styles.overlayClose}
              onClick={close}
              aria-label="Close profile"
            >
              <TpIcon name="close" size={18} />
            </button>

            {/* Header band: portrait beside the identity block, on the brand
                tint - the visual anchor before the prose starts. */}
            <div className={styles.modalHeader}>
              <div className={styles.modalPhoto}>
                <SafeImage
                  src={active.image}
                  alt={active.name}
                  sizes="(max-width: 760px) 100vw, 320px"
                />
              </div>

              <div className={styles.modalIdentity}>
                <span className={styles.modalRole}>{active.role}</span>
                <h3 className={styles.modalName}>{active.name}</h3>
                <span className={styles.modalRule} aria-hidden="true" />

                {active.tags.length > 0 && (
                  <div className={styles.tags}>
                    {active.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {active.quote && (
                  <figure className={styles.quote}>
                    <span className={styles.quoteMark} aria-hidden="true">
                      &ldquo;
                    </span>
                    <blockquote className={styles.quoteText}>{active.quote}</blockquote>
                    <figcaption className={styles.quoteAttrib}>{active.name}</figcaption>
                  </figure>
                )}
              </div>
            </div>

            {/* Body: the bio runs in two columns on desktop, one on mobile. */}
            <div className={styles.modalBody}>
              <div className={styles.modalProse}>
                {paragraphs(active.bio).map((para, i) => (
                  <p key={i} className={styles.modalBio}>
                    {para}
                  </p>
                ))}
              </div>

              {(active.fact || active.bookable) && (
                <div className={styles.modalFoot}>
                  {active.fact && (
                    <p className={styles.fact}>
                      <b>Fun fact - </b>
                      {active.fact}
                    </p>
                  )}
                  {active.bookable && (
                    <Link href="/contact" className={`tp-btn tp-btn-primary ${styles.modalCta}`}>
                      Book a Consultation
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>,
        portalHost,
      )}
    </>
  );
}
