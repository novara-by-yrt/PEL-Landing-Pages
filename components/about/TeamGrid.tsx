"use client";

import Link from "next/link";
import SafeImage from "@/components/shared/SafeImage";
import type { Member } from "@/lib/team";
import { useTeamProfile } from "./TeamProfileModal";
import styles from "./TeamRoster.module.css";

export type { Member };

export function TeamGrid({ members }: { members: Member[] }) {
  const { open, dialog } = useTeamProfile();

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
                {/* The whole card is the target, not just this control: the
                    button/link below carries a stretched ::after that covers
                    the card, so a tap anywhere on the portrait or the name
                    does what this says. Done this way rather than by wrapping
                    the card in an anchor so there is still exactly one
                    interactive element with one accessible name, and "Book
                    Now" can sit above the stretch and stay separately
                    clickable. */}
                {member.profileHref ? (
                  <Link
                    href={member.profileHref}
                    className={`tp-btn tp-btn-secondary tp-btn-block ${styles.cardStretch}`}
                  >
                    View Profile
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={`tp-btn tp-btn-secondary tp-btn-block ${styles.cardStretch}`}
                    onClick={(e) => open(member, e.currentTarget)}
                  >
                    View Profile
                  </button>
                )}
                {member.bookable && (
                  <Link
                    href="/contact"
                    className={`tp-btn tp-btn-primary tp-btn-block ${styles.aboveStretch}`}
                  >
                    Book Now
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {dialog}
    </>
  );
}
