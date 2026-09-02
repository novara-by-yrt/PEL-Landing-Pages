import Image from "next/image";
import ContactSection from "@/components/home/ContactSection";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import BeginJourney from "@/components/shared/BeginJourney";
import styles from "./TermsConditions.module.css";

type Block =
  | { kind: "p"; text: React.ReactNode }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: React.ReactNode[] }
  | { kind: "callout"; text: React.ReactNode };

type Section = { id: string; heading: string; blocks: Block[] };

const SECTIONS: Section[] = [
  {
    id: "patient-information",
    heading: "Patient Information",
    blocks: [
      {
        kind: "p",
        text: "All patients are required to provide contact details, including address, telephone and email, in order to secure an appointment.",
      },
      { kind: "p", text: "We ask that you bring a form of ID with you to your initial consultation." },
      {
        kind: "p",
        text: "For your initial consultation we recommend you arrive about 5 minutes before your appointment time.",
      },
      {
        kind: "p",
        text: "As we are a medical clinic, we require all patients to complete a detailed medical history form at their first appointment; this is necessary for the consultation and treatment planning process.",
      },
      {
        kind: "p",
        text: "If there is a change in medical history, it is the responsibility of the patient to inform the Doctor.",
      },
      {
        kind: "p",
        text: "Please note that Perfect Eyes Clinic, trading as Perfect Eyes Ltd, is the medical arm of Dr Shah Desai's practice. Perfect Skin Studio is the aesthetic arm of Dr Sabrina Shah-Desai's practice, and treatments there will incur a VAT charge.",
      },
      {
        kind: "p",
        text: "Please note that your personal data will be shared between both companies and all information will be treated as confidential and protected in accordance with Data Protection legislation.",
      },
      { kind: "h3", text: "Perfect Eyes Ltd New Patient Appointments" },
      {
        kind: "ul",
        items: [
          "A consultation fee is required to secure a comprehensive new patient assessment with Dr Shah Desai.",
          "Separate rates apply for second opinions, revision consultations, and follow-up appointments.",
          "All non-refundable consultation charges are not redeemable against treatment costs.",
          "Booking a consultation does not guarantee that Dr Shah Desai will take over your care.",
          <>
            For revision consultations, all documents relating to previous treatments/surgery must be
            submitted to{" "}
            <a href="mailto:enquiries@perfecteyesltd.com">enquiries@perfecteyesltd.com</a> prior to
            your appointment.
          </>,
        ],
      },
      { kind: "h3", text: "Perfect Skin Studio New Patient Appointments" },
      {
        kind: "ul",
        items: [
          "A consultation fee applies for assessments with an associate doctor.",
          "Follow-up or review consultation fees are also applicable.",
          "All non-refundable consultation charges are redeemable against treatment costs.",
          "Full payment of the consultation fee is required at the time of booking to mitigate administration costs and missed appointments.",
        ],
      },
      { kind: "p", text: "Please arrive makeup free for your appointment to allow for clinical photography." },
      {
        kind: "p",
        text: "You are required to attend appointments alone, unless you require the assistance of a chaperone. Please contact us to discuss this prior to the appointment.",
      },
      { kind: "p", text: "The building has disability facilities available (access ramp / toilet)." },
      {
        kind: "p",
        text: "Should you require the assistance of an interpreter, please let us know in advance so that we can book this service for you.",
      },
      {
        kind: "p",
        text: "Routine review appointments are offered after treatment with Toxin as a courtesy. No additional treatment or 'top up' is provided free of charge for fillers. Free top up for toxin is only offered within a review period of 2-3 weeks post treatment.",
      },
      {
        kind: "p",
        text: "New patients are seen for consultation and assessment; except in exceptional circumstances, with prior arrangement, we do not offer treatment on the first visit.",
      },
      { kind: "p", text: "Please bring a form of ID to your initial consultation appointment." },
    ],
  },
  {
    id: "children",
    heading: "Children",
    blocks: [
      {
        kind: "p",
        text: "Please do not bring accompanying children to the clinic, as due to Health Care Commission regulations we are unable to allow anyone under the age of 18 into the clinic building.",
      },
    ],
  },
  {
    id: "payment",
    heading: "Payment",
    blocks: [
      {
        kind: "ul",
        items: [
          "You will be advised of the full costs of any treatment plan proposed and agreed, including that of any maintenance treatment, before any treatment is undertaken.",
          "Payment is taken, in full, at the time of treatment.",
          "The clinic accepts all major debit and credit cards. We do not accept cash payment.",
          "Finance options are available, please ask the team for further details if it is something you'd like to discuss with us.",
          "A discretionary deposit will be taken for some treatments and in some circumstances.",
        ],
      },
      {
        kind: "callout",
        text: (
          <p>
            <strong>Important:</strong> all lower lid blepharoplasty procedures will incur an
            additional 20% VAT unless you provide a GP or psychiatrists letter confirming medical necessity prior to
            your consultation.
          </p>
        ),
      },
    ],
  },
  {
    id: "refunds",
    heading: "Refunds",
    blocks: [
      {
        kind: "p",
        text: "Fees charged for treatment are for the delivery of a treatment and the accompanying service, which is inclusive of:",
      },
      {
        kind: "ul",
        items: [
          "Consultation and assessment",
          "Provision of information and advice",
          "Safe treatment with evidence based products",
          "Follow up appointments and aftercare advice and support as appropriate",
        ],
      },
      {
        kind: "callout",
        text: (
          <p>
            <strong>Please note:</strong> consultations and treatments are non-refundable.
          </p>
        ),
      },
      {
        kind: "p",
        text: "Whilst we undertake to provide excellent service - factual, honest and ethical advice, safe, expert treatment in experienced hands and only the best products - we cannot guarantee your results and cannot offer refunds if the results achieved fail to meet your expectations, or you change your mind after commencing treatment of a “package price” treatment.",
      },
      { kind: "p", text: "Skin care products are non-returnable / non-refundable." },
    ],
  },
  {
    id: "complaints",
    heading: "Complaints",
    blocks: [
      {
        kind: "p",
        text: (
          <>
            Although Dr Shah-Desai seeks to offer you the highest level of service, if you do have
            cause for complaint please email{" "}
            <a href="mailto:enquiries@perfecteyesltd.com">enquiries@perfecteyesltd.com</a>. Our
            complaints policy can be found{" "}
            <a href="/uploads/2018/11/ComplaintsPolicyPEL.pdf" target="_blank" rel="noopener noreferrer">
              here
            </a>
            .
          </>
        ),
      },
    ],
  },
];

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "p":
      return <p className={styles.p}>{block.text}</p>;
    case "h3":
      return <h3 className={styles.h3}>{block.text}</h3>;
    case "ul":
      return (
        <ul className={styles.list}>
          {block.items.map((item, i) => (
            <li key={i} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      );
    case "callout":
      return <div className={styles.callout}>{block.text}</div>;
  }
}

export function TermsConditions() {
  return (
    <div className={styles.page}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="terms-title">
        <div className={styles.heroBg}>
          <Image
            src="/uploads/2018/11/Non-surgical-facelift-london-1.jpg"
            alt=""
            fill
            sizes="100vw"
            loading="eager"
          />
        </div>
        <span className={styles.heroScrim} aria-hidden="true" />
        <div className="container">
          <span className={styles.eyebrow}>Legal</span>
          <h1 id="terms-title" className={styles.heroTitle}>
            Terms and Conditions
          </h1>
          <p className={styles.heroLead}>
            The terms below cover appointments, payment, refunds and complaints at Perfect Eyes Ltd
            and Perfect Skin Studio.
          </p>
          <span className={styles.rule} aria-hidden="true" />
        </div>
      </section>

      {/* ── Accredited & recognised by ───────────────────────────────────── */}
      <AccreditedStrip />

      {/* ── Document body ────────────────────────────────────────────────── */}
      <section className={styles.body}>
        <div className="container">
          <div className={styles.column}>
            {SECTIONS.map((section) => (
              <div key={section.id} id={section.id} className={styles.section}>
                <h2 className={styles.h2}>{section.heading}</h2>
                {section.blocks.map((block, i) => (
                  <BlockView key={i} block={block} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Begin your Perfect Eyes and Skin journey ─────────────────────── */}
      <BeginJourney />

      {/* ── Contact our clinic ───────────────────────────────────────────── */}
      <ContactSection />
    </div>
  );
}
