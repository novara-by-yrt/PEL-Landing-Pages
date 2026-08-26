import Link from "next/link";
import ContactSection from "@/components/home/ContactSection";
import { PageHero } from "@/components/treatment/PageHero";
import { TpIcon } from "@/components/treatment/TpIcon";
import { TreatmentCTA } from "@/components/treatment/TreatmentCTA";
import type { BreadcrumbItem } from "@/components/treatment/types";
import { TeamGrid } from "./TeamGrid";
import { TEAM_MEMBERS } from "@/lib/team";
import styles from "./TeamRoster.module.css";


export function TeamRoster({
  breadcrumbItems,
  siteUrl,
}: {
  breadcrumbItems: BreadcrumbItem[];
  siteUrl: string;
}) {
  return (
    <div className="tp">
      <PageHero
        breadcrumbItems={breadcrumbItems}
        siteUrl={siteUrl}
        eyebrow="Perfect Eyes Clinic & Perfect Skin Studio"
        h1="Meet the Team"
        lead="Our exceptional practitioners and dedicated support staff work together to deliver outstanding aesthetic outcomes and an unparalleled patient experience."
      >
        {/* The first way to book was 1,303px down, just past the fold. */}
        <div className={styles.heroCtas}>
          <Link href="/contact-cosmetic-eye-surgeon" className="tp-btn tp-btn-inverse">
            Book a Consultation
          </Link>
        </div>
      </PageHero>

      <section className={`${styles.section} ${styles.paper}`}>
        <div className="container">
          <div className={styles.head}>
            <span className={styles.eyebrow}>
              <TpIcon name="sparkle" size={13} />
              Clinical Team &amp; Practitioners
            </span>
            <h2 className={styles.heading}>Expert Aesthetic Practitioners</h2>
            <p className={styles.lead}>
              Focused on delivering natural, balanced and refined results for every patient.
            </p>
          </div>
          <TeamGrid members={TEAM_MEMBERS} />
        </div>
      </section>

      {/* The one dark band on the page. */}
      <section className={styles.band}>
        <div className="container">
          <div className={styles.bandInner}>
            <h2 className={styles.bandHeading}>
              A dedicated team committed to your care and wellbeing
            </h2>
            <p className={styles.bandText}>
              Behind every exceptional patient experience is a team that goes beyond clinical
              expertise - coordinating, educating and supporting every step of your journey at
              Perfect Eyes Clinic.
            </p>
          </div>
        </div>
      </section>

      <TreatmentCTA />
      <ContactSection />
    </div>
  );
}
