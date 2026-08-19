"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/home/ContactSection";
import { TpIcon } from "@/components/treatment/TpIcon";
import { JoinClubForm } from "@/components/forms/JoinClubForm";
import styles from "./DrSabrinaClub.module.css";

interface Plan {
  name: string;
  tagline: string;
  price: string;
  image: string;
  includes: string[];
  perks: string[];
}

const PLANS: Plan[] = [
  {
    name: "The Eye Edit",
    tagline: "Positioned for bright and healthy eyes.",
    price: "£350",
    image: "/uploads/2026/01/DSC02104-1.jpg",
    includes: [
      "6 polynucleotide/Sunekos eye injections (course of three, twice a year)",
      "Quarterly upper face anti-wrinkle injections (botulinum toxin)",
      "1 Dr Sabrina Eye Regenerate LED session",
      "Quarterly products: Dr Sabrina Hydrating Eye Cleanser, Relax & Refresh Eye Mask, Perfect 360 Eye Illuminate, Bright Eye hydrocolloid patches",
    ],
    perks: ["10% off periorbital dermal filler", "5% off energy-based treatments", "5% off Emface Eyes"],
  },
  {
    name: "The Regeneration Edit",
    tagline: "Positioned for overall skin and eye rejuvenation.",
    price: "£450",
    image: "/uploads/2026/01/DSC02254-1.jpg",
    includes: [
      "3 polynucleotide/Sunekos eye/face injections",
      "Biostimulator face injections (2 vials of Juläine of Sweden / 3ml of Biostimulation)",
      "Quarterly Skin Visia analysis",
      "10% off Dr Sabrina periorbital skincare",
      "5% off Skinceuticals skincare",
    ],
    perks: [
      "10% off dermal filler",
      "10% off Endolift lower face",
      "5% off energy-based treatments including Emface, Sofwave, Morpheus8, Tixel, microneedling, and UltraClear laser",
    ],
  },
  {
    name: "The Face Edit",
    tagline: "Positioned for a sculpted and youthful profile.",
    price: "£460",
    image: "/uploads/2026/01/DSC02103-1.jpg",
    includes: [
      "2ml of dermal filler injections",
      "3 upper face anti-wrinkle injections every quarter",
      "3 lower face masseter/Nefertiti injections every quarter",
      "Quarterly Skin Visia analysis",
      "10% off Dr Sabrina periorbital skincare",
      "5% off Skinceuticals skincare",
    ],
    perks: [
      "10% discount on one signature periorbital dermal filler treatment",
      "10% off Endolift lower face",
      "5% off therapist-delivered energy-based treatments",
    ],
  },
  {
    name: "The Glow Edit",
    tagline: "The radiance you deserve.",
    price: "£400",
    image: "/uploads/2026/01/DSC02278-1.jpg",
    includes: [
      "3 Redensity 1 babyGLOW by Teoxane face injections",
      "3 polynucleotide/Sunekos perioral/face injections",
      "Quarterly 3D MiracL facial laser",
      "Quarterly Skin Visia analysis",
      "10% off Dr Sabrina periorbital skincare",
      "5% off Skinceuticals skincare",
    ],
    perks: ["10% off one dermal filler treatment by Dr Sabrina's team", "5% off Sofwave ultrasound"],
  },
];

const WHY_JOIN = [
  { icon: "shield", title: "Doctor-Guided Care", sub: "Personalised 12-Month Programmes" },
  { icon: "star", title: "Signature & Team Treatments", sub: "Visible & Lasting Results" },
  { icon: "sparkle", title: "Exclusive Discounts & Perks", sub: "Save on Premium Procedures" },
  { icon: "compass", title: "Premium Experience", sub: "Luxury Clinic Access" },
  { icon: "pulse", title: "Advanced Technology", sub: "Latest Medical Devices" },
  { icon: "phone", title: "Priority Support & Comfort", sub: "Guidance Every Step" },
] as const;

export function DrSabrinaClub() {
  const [joinOpen, setJoinOpen] = useState(false);
  // Set when a specific plan card's "Choose X" button opens the modal, so
  // JoinClubForm can preselect it — the hero and closing CTAs open with no
  // plan in mind, so this stays unset for those.
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  const openJoin = (plan?: string) => {
    setSelectedPlan(plan);
    setJoinOpen(true);
  };

  /* The dialog is portalled to <body> so its z-index competes with the
     site's fixed header (.pel-nav, z-index 200) on equal footing — nested
     inline it lost that contest, since this overlay's z-index (100) is
     lower and the two sit in the same stacking context.
     Read once during render rather than in an effect: the portal only ever
     renders after a click, so the server's null and the client's body element
     never disagree at hydration. */
  const [portalHost] = useState<HTMLElement | null>(() =>
    typeof document === "undefined" ? null : document.body,
  );

  return (
    <>
    <div className="tp">
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div>
            <span className="tp-eyebrow">
              <TpIcon name="sparkle" size={13} />
              Welcome To
            </span>
            <h1 className={styles.heroTitle}>The Dr Sabrina Club</h1>
            <p className={styles.heroTagline}>Doctor-led Care, Smart Plans &amp; Real Results.</p>
            <p className={styles.heroSub}>A full-year journey made just for you.</p>
            <button type="button" className="tp-btn tp-btn-primary" onClick={() => openJoin()}>
              Choose Your Club &amp; Join
            </button>
          </div>
          <div className={styles.heroImageWrap}>
            <Image
              src="/uploads/2026/01/Untitled-design-2026-01-22T120429.820.png"
              alt="Dr Sabrina Shah-Desai"
              fill
              sizes="(max-width: 860px) 80vw, 420px"
              priority
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="tp-section">
        <div className={`container ${styles.aboutBlock}`}>
          <span className="tp-eyebrow">About</span>
          <h2>About The Dr Sabrina Club</h2>
          <p>
            Dr Sabrina Club is a special membership for skin and eye care. Our expert doctors at Perfect Skin
            Studio and Perfect Eyes Ltd create a personalised 12-month plan just for you.
          </p>
          <p>With Dr Sabrina Club, your care is guided, planned, and supported all year.</p>
        </div>
      </section>

      {/* Plans */}
      <section className="tp-section tp-fog">
        <div className="container">
          <div className={`tp-head tp-center ${styles.plansHead}`}>
            <span className="tp-eyebrow">
              <TpIcon name="clipboard" size={13} />
              Membership Plans
            </span>
            <h2>Dr Sabrina Club Edits Made For You!</h2>
            <p>Each membership is a 12-month personalised plan, designed by our experts. Pick your favourite and enjoy exclusive treatments and perks.</p>
          </div>

          <div className={styles.plansGrid}>
            {PLANS.map((plan) => (
              <div key={plan.name} className={styles.planCard}>
                <div className={styles.planImage}>
                  <Image src={plan.image} alt={plan.name} fill sizes="(max-width: 760px) 100vw, 25vw" />
                </div>
                <div className={styles.planBody}>
                  <h3>{plan.name}</h3>
                  <p className={styles.planTagline}>{plan.tagline}</p>
                  <p className={styles.planPrice}>
                    {plan.price}
                    <span>/month</span>
                  </p>

                  <h4>It Includes</h4>
                  <ul>
                    {plan.includes.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <h4>More Perks</h4>
                  <ul>
                    {plan.perks.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <button type="button" className="tp-btn tp-btn-secondary" onClick={() => openJoin(plan.name)}>
                    Choose {plan.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance */}
      <section className="tp-section">
        <div className={`container ${styles.financeBlock}`}>
          <h2>Flexible Payment Options Available</h2>
          <p>
            We understand that investing in your appearance is important. That&apos;s why we offer flexible
            financing options to make your journey more accessible.
          </p>
          <div className={styles.financeLogos}>
            <Image src="/uploads/2026/02/Klarna-Logo-2-1.svg" alt="Klarna Finance" width={110} height={40} />
            <span>&amp;</span>
            <Image src="/uploads/2026/02/plim-2.svg" alt="PLIM Finance" width={90} height={40} />
          </div>
          <p className={styles.financeNote}>Spread the cost with our trusted financing partners. Terms and conditions apply.</p>
        </div>
      </section>

      {/* Why join */}
      <section className="tp-section tp-fog">
        <div className="container">
          <div className="tp-head tp-center">
            <span className="tp-eyebrow">
              <TpIcon name="quote" size={13} />
              Why Join
            </span>
            <h2>Why Join Dr Sabrina Club</h2>
          </div>
          <div className={styles.whyGrid}>
            {WHY_JOIN.map((item) => (
              <div key={item.title} className={styles.whyCard}>
                <span className={styles.whyIcon}>
                  <TpIcon name={item.icon} size={20} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className={styles.closingCta}>
        <div className="container">
          <h2>It&apos;s Time To Upgrade Your Care!</h2>
          <p>Join the Dr Sabrina Club &amp; Feel The Comfort.</p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <button type="button" className="tp-btn tp-btn-inverse" onClick={() => openJoin()}>
              Choose Your Club &amp; Join
            </button>
            <Link href="/contact-cosmetic-eye-surgeon" className="tp-btn tp-btn-outline-light">
              Book Your Consultation Today
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>

    {joinOpen && portalHost && createPortal(
      <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="Join Dr Sabrina Club">
        <div className={styles.modalContent}>
          <button type="button" className={styles.modalClose} onClick={() => setJoinOpen(false)} aria-label="Close">
            <TpIcon name="close" size={18} />
          </button>
          <h2>Join Dr Sabrina Club</h2>
          <JoinClubForm
            plans={PLANS.map((plan) => ({ name: plan.name, price: plan.price }))}
            initialPlan={selectedPlan}
            onClose={() => setJoinOpen(false)}
          />
        </div>
      </div>,
      portalHost
    )}
    </>
  );
}
