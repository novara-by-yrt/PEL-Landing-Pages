"use client";

import ClinicPhone from "@/components/shared/ClinicPhone";
import { CLINIC } from "@/lib/clinic";
import { TpIcon } from "@/components/treatment/TpIcon";
import { PageHero } from "@/components/treatment/PageHero";
import BookAppointmentForm from "@/components/forms/BookAppointmentForm";
import styles from "./page.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

const WHY_CHOOSE_US = [
  { icon: "shield", title: "CQC Regulated", body: "All treatments are performed in a fully CQC-regulated environment for your safety." },
  { icon: "eye", title: "Specialist Surgeons", body: "Our surgeons are fellowship-trained oculoplastic specialists with 20+ years of experience." },
  { icon: "star", title: "5-Star Rated", body: "Consistently rated 5 stars by our patients across all major review platforms." },
  { icon: "sparkle", title: "Personalised Approach", body: "Every treatment plan is tailored to your unique anatomy, goals, and lifestyle." },
] as const;

export default function ContactPage() {
  return (
    <>
      <div className="tp">

        <PageHero
          breadcrumbItems={[
            { name: "Home", url: SITE_URL },
            { name: "Contact", url: `${SITE_URL}/contact` },
          ]}
          siteUrl={SITE_URL}
          eyebrow="Get In Touch"
          h1="Book a Consultation"
          lead="Fill in the form below and our team will get back to you within 24 hours to discuss your treatment options."
        />

        <div className={styles.contactGrid}>
          {/* Left: Info */}
          <div className={styles.contactWhy}>
            <h2>Why Choose Perfect Eyes?</h2>

            {WHY_CHOOSE_US.map((item) => (
              <div key={item.title} className={styles.contactWhyItem}>
                <span className={styles.contactWhyIcon}><TpIcon name={item.icon} size={19} /></span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}

            <div className={styles.contactDetails}>
              <div className={styles.contactDetailsLabel}>Contact Details</div>
              {/* From lib/clinic, not typed in here: the address and email were
                  hardcoded to the values that file documents as superseded. */}
              <div className={styles.contactDetailsRow}><TpIcon name="pin" size={16} />{CLINIC.address}</div>
              <div className={styles.contactDetailsRow}><TpIcon name="phone" size={15} /><ClinicPhone /></div>
              <div className={styles.contactDetailsRow}><TpIcon name="mail" size={16} /><a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a></div>
            </div>
          </div>

          {/* Right: the "Book an Appointment" form */}
          <div className={styles.contactFormPanel}>
            <BookAppointmentForm />
          </div>
        </div>
      </div>
    </>
  );
}
