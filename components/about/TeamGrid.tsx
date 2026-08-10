"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
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
};

export function TeamGrid({ members }: { members: Member[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const isOpen = openId !== null;
  const active = members.find((m) => m.id === openId) ?? null;

  const close = useCallback(() => setOpenId(null), []);

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
            <div className={styles.photo}>
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 45vw, 30vw"
                loading="lazy"
              />
            </div>
            <div className={styles.body}>
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
              {/* Full bio stays in the document for search/accessibility — the
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

      {active && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} — ${active.role}`}
          onClick={close}
        >
          <button ref={closeRef} type="button" className={styles.overlayClose} onClick={close} aria-label="Close profile">
            <TpIcon name="close" size={20} />
          </button>

          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalPhoto}>
              <Image src={active.image} alt={active.name} fill sizes="(max-width: 700px) 100vw, 260px" />
            </div>
            <div className={styles.modalBody}>
              <span className={styles.modalRole}>{active.role}</span>
              <h3 className={styles.modalName}>{active.name}</h3>
              <p className={styles.modalBio}>{active.bio}</p>
              {active.tags.length > 0 && (
                <div className={styles.tags}>
                  {active.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {active.fact && (
                <p className={styles.fact}>
                  <b>Fun fact — </b>
                  {active.fact}
                </p>
              )}
              {active.bookable && (
                <Link href="/contact" className="tp-btn tp-btn-primary tp-btn-block" style={{ marginTop: 6 }}>
                  Book a Consultation
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
