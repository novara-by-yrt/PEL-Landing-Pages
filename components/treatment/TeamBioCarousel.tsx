"use client";

import { useState } from "react";
import Image from "next/image";
import type { TeamBiosData } from "@/lib/mdx";
import { TpIcon } from "./TpIcon";
import styles from "./TeamBioCarousel.module.css";

/** A fixed portrait beside a paged bio panel — one team member at a time. */
export function TeamBioCarousel({ data }: { data?: TeamBiosData }) {
  const [index, setIndex] = useState(0);

  if (!data?.members?.length) return null;

  const { members, heading = "Meet the Experts Team", image } = data;
  const member = members[index];
  const prev = () => setIndex((i) => (i - 1 + members.length) % members.length);
  const next = () => setIndex((i) => (i + 1) % members.length);

  return (
    <section className="tp-section" aria-labelledby="team-bios-title">
      <div className="container">
        <div className="tp-head tp-center">
          <h2 id="team-bios-title">{heading}</h2>
          <span className={styles.tpRule} aria-hidden="true" />
        </div>

        <div className={styles.tpGrid}>
          {image && (
            <div className={styles.tpPhotoFrame}>
              <Image src={image} alt={heading} fill sizes="(max-width: 860px) 100vw, 45vw" />
            </div>
          )}

          <div className={styles.tpPanel}>
            <h3 className={styles.tpName}>{member.name}</h3>
            <p className={styles.tpRole}>{member.role}</p>
            <p className={styles.tpBio}>{member.bio}</p>

            {member.qualifications?.length ? (
              <>
                <p className={styles.tpQualLabel}>Qualifications / Experience / Specialisations</p>
                <ul className={styles.tpQualList}>
                  {member.qualifications.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </>
            ) : null}

            {members.length > 1 && (
              <div className={styles.tpControls}>
                <button
                  type="button"
                  className={styles.tpArrow}
                  onClick={prev}
                  aria-label="Previous team member"
                >
                  <TpIcon name="chevron" size={16} direction="left" />
                </button>
                <div className={styles.tpDots}>
                  {members.map((m, i) => (
                    <button
                      key={m.name}
                      type="button"
                      className={`${styles.tpDot} ${i === index ? styles.tpDotActive : ""}`}
                      onClick={() => setIndex(i)}
                      aria-label={`Show ${m.name}`}
                      aria-current={i === index}
                    />
                  ))}
                </div>
                <button type="button" className={styles.tpArrow} onClick={next} aria-label="Next team member">
                  <TpIcon name="chevron" size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
