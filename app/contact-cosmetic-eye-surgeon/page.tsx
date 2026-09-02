import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { PageHero, TpIcon } from "@/components/treatment";
import BookAppointmentForm from "@/components/forms/BookAppointmentForm";
import ClinicPhone from "@/components/shared/ClinicPhone";
import { CLINIC, CONSULTATION_FEES, MAPS_URL } from "@/lib/clinic";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import styles from "./page.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export const metadata: Metadata = {
  title: "Contact Us for Any Queries",
  description: "Get in touch with Perfect Eyes Clinic. Ask questions about our treatments & doctors. Contact us Today!",
  alternates: { canonical: `${SITE_URL}/contact-cosmetic-eye-surgeon` },
  openGraph: {
    url: `${SITE_URL}/contact-cosmetic-eye-surgeon`,
    type: "website",
    title: "Get In Touch | Contact Us for Any Queries - Perfect Eyes Clinic.",
    description: "Get in touch with Perfect Eyes Clinic. Ask questions about our treatments & doctors. Contact us today!",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ContactCosmeticEyeSurgeonPage() {
  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Contact a Surgeon", url: `${SITE_URL}/contact-cosmetic-eye-surgeon` },
  ];

  return (
    <div className="tp">
      <BreadcrumbSchema items={breadcrumbItems} url={`${SITE_URL}/contact-cosmetic-eye-surgeon`} />
      <PageHero
        breadcrumbItems={[
          { name: "Home", url: SITE_URL },
          { name: "Contact", url: "" },
        ]}
        siteUrl={SITE_URL}
        h1="Contact Us"
        lead="If you are interested in any of our treatments or need further information, we are here to answer. Feel free to contact us by phone, email, or by filling out the form below."
      />

      <section className="tp-section">
        <div className={`container ${styles.grid}`}>
          <div className={styles.card}>
            <span className="tp-eyebrow">
              <TpIcon name="shield" size={13} />
              Consultation Fees
            </span>
            <dl className={styles.feesList}>
              {CONSULTATION_FEES.map((fee) => (
                <div key={fee.label} className={styles.feesRow}>
                  <dt>
                    {fee.label}
                    <span className={styles.feesWith}>with {fee.with}</span>
                  </dt>
                  <dd>{fee.price}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.card}>
            <span className="tp-eyebrow">
              <TpIcon name="sparkle" size={13} />
              For Enquiries
            </span>
            <h2 className={styles.contactName}>Mrs Sabrina Shah-Desai</h2>
            <p className={styles.contactTitle}>Consultant Ophthalmologist &amp; Oculoplastic Surgeon</p>

            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={styles.detailRow}>
              <TpIcon name="pin" size={16} />
              {CLINIC.address}
            </a>
            <ClinicPhone className={styles.detailRow} icon />
            <a href={`mailto:${CLINIC.email}`} className={styles.detailRow}>
              <TpIcon name="mail" size={16} />
              {CLINIC.email}
            </a>
            <p className={styles.hours}>
              {CLINIC.hours.map((h) => `${h.day}: ${h.time}`).join(" · ")}
            </p>
          </div>
        </div>
      </section>

      <section className="tp-section tp-fog">
        <div className="container">
          {/* The clinic's own form, not the LeadConnector widget that used to
              sit here. That widget was an iframe plus a script from
              link.perfecteyesltd.com, and the site's Content-Security-Policy
              allows frames only from YouTube and scripts only from self and
              Google Tag Manager - so the browser refused both and the panel
              rendered as an empty box. Rather than open the policy to a
              third-party origin, this uses BookAppointmentForm, which is what
              /contact already posts through. */}
          <div className={styles.formCard}>
            <div className="tp-head">
              <span className="tp-eyebrow">
                <TpIcon name="quote" size={13} />
                Ask Us Anything
              </span>
              <h2>Book an Appointment</h2>
              <p>Fill out the form below to be contacted by a member of our team.</p>
            </div>
            {/* showHeading=false: this card already has its own "Book an
                Appointment" heading above (with an eyebrow and lead
                paragraph the form's built-in heading doesn't have), so the
                form's own <h2> would just repeat it verbatim. */}
            <BookAppointmentForm showHeading={false} />
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className={`container ${styles.notices}`}>
          <p>
            <strong>Confidentiality:</strong> all enquiries are always treated confidentially. Please note Dr
            Shah-Desai does not offer free consultations.
          </p>
          <p>
            If you are one of our private patients in need of urgent out-of-hours advice, please contact our
            emergency phone, which you should have from our previous correspondence.
          </p>
          <p>
            <strong>Complaints:</strong> although Dr Shah-Desai seeks to offer you the highest level of service,
            if you have cause for complaint please email{" "}
            <a href="mailto:enquiries@perfecteyesltd.com">enquiries@perfecteyesltd.com</a>. Our complaints policy can
            be found <a href="/uploads/2018/11/ComplaintsPolicyPEL.pdf" target="_blank" rel="noopener noreferrer">here</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
