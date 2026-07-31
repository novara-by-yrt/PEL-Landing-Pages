import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AutoScrollCarousel from "@/components/home/AutoScrollCarousel";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import VideoCard from "@/components/home/VideoCard";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export const metadata: Metadata = {
  title: "Perfect Eyes Ltd | London's Leading Cosmetic Eye Surgeon",
  description:
    "Rejuvenate your eyes with blepharoplasty, fillers, and laser treatments by Dr Sabrina Shah-Desai, a leading cosmetic eye surgeon in London.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    url: SITE_URL,
    type: "website",
    title: "London's Leading Cosmetic Eye Surgeon - Perfect Eyes Ltd",
    description:
      "Rejuvenate your eyes with blepharoplasty, fillers, and laser treatments by Dr. Sabrina Shah-Desai, leading cosmetic eye surgeon in London.",
  },
};

const AWARD_LOGOS = [
  { src: "/uploads/2024/09/11.png", alt: "Award logo 1" },
  { src: "/uploads/2024/09/22.png", alt: "Award logo 2" },
  { src: "/uploads/2024/09/31.png", alt: "Award logo 3" },
  { src: "/uploads/2024/09/41.png", alt: "Award logo 4" },
  { src: "/uploads/2024/09/51.png", alt: "Award logo 5" },
  { src: "/uploads/2024/09/61.png", alt: "South African Society for Dermatologic Surgery" },
  { src: "/uploads/2024/09/71.png", alt: "BOPSS British Oculoplastic Surgery Society" },
];

const SURGICAL_TREATMENTS = [
  {
    image: "/uploads/2018/10/Eye-Lid-Lifts-Upper-Lid-Blepharoplasty-london.jpg",
    title: "Upper Lid Blepharoplasty",
    href: "/upper-eyelid-lift-surgery-blepharoplasty",
  },
  {
    image: "/uploads/2018/10/Eye-Bag-Surgery-Lower-Lid-Blepharoplasty-london.jpg",
    title: "Eye Bag Surgery",
    href: "/eye-bag-removal-blepharoplasty-uk",
  },
  {
    image: "/uploads/2018/10/eyeboost.jpg",
    title: "Festoons & Malar Bags",
    href: "/surgical-festoons-malar-bags-treatment-uk",
  },
  {
    image: "/uploads/2018/11/Ptosis-surgery-uk.jpg",
    title: "Ptosis Surgery",
    href: "/ptosis-surgery",
  },
  {
    image: "/uploads/2018/10/Double-eyelid-surgery-london.jpg",
    title: "Double Eyelid Surgery",
    href: "/double-eyelid-surgery",
  },
  {
    image: "/uploads/2024/09/hyaluronidase-dissolving.jpg",
    title: "Hyaluronidase Dissolving",
    href: "/eyelid-swelling-migrated-fillers-hyaluronidase-dissolving",
  },
  {
    image: "/uploads/2024/07/eyelid-lump.jpg",
    title: "Eyelid Lump & Bump Removal",
    href: "/eyelid-lump-bump-removal",
  },
  {
    image: "/uploads/2025/03/revision-surgeyr-1-min.jpg",
    title: "Revision Blepharoplasty",
    href: "/surgical-eyelid-surgery-revision-blepharoplasty-uk",
  },
  {
    image: "/uploads/2025/03/browlift-min.jpg",
    title: "Brow Lift",
    href: "/surgical-brow-lift-uk",
  },
];

const NONSURGICAL_TREATMENTS = [
  {
    image: "/uploads/2018/10/Silhoutte-Soft-treatment-london.jpg",
    title: "Endolift®",
    href: "/endolift",
  },
  {
    image: "/uploads/2025/03/Morpheus-min.jpg",
    title: "Morpheus8",
    href: "/morpheus8",
  },
  {
    image: "/uploads/2024/09/supeor-sulcus.jpg",
    title: "Superior Sulcus Filler",
    href: "/non-surgical-injectables-medical-aesthetic",
  },
  {
    image: "/uploads/2018/10/tear-trough-treatment-london.jpg",
    title: "Tear Trough Fillers",
    href: "/non-surgical-tear-trough-fillers-uk",
  },
  {
    image: "/uploads/2018/10/Ultherapy-london.jpg",
    title: "Ellansé",
    href: "/ellanse",
  },
  {
    image: "/uploads/2024/09/ultraclear-laser.jpg",
    title: "UltraClear Laser",
    href: "/non-surgical-ultraclear-laser-treatment-uk",
  },
  {
    image: "/uploads/2018/11/Non-surgical-facelift-fillers-london.jpg",
    title: "Non-Surgical Facial Contouring",
    href: "/non-surgical-facial-contouring",
  },
  {
    image: "/uploads/2017/08/Sofwave.jpg",
    title: "Sofwave™",
    href: "/sofwave",
  },
  {
    image: "/uploads/2025/06/Plasma-Pen.jpg",
    title: "Plexr / Plasma Pen",
    href: "/plexr-plasma-pen",
  },
];

const MEDIA_LOGOS = [
  { src: "/uploads/2024/09/logo1.svg", alt: "Media logo 1" },
  { src: "/uploads/2024/09/logo2.svg", alt: "Media logo 2" },
  { src: "/uploads/2024/09/logo3.svg", alt: "Media logo 3" },
  { src: "/uploads/2024/09/logo4.svg", alt: "Media logo 4" },
  { src: "/uploads/2024/09/logo15.svg", alt: "Media logo 5" },
  { src: "/uploads/2024/09/logo6.svg", alt: "Media logo 6" },
  { src: "/uploads/2024/09/logo7.svg", alt: "Media logo 7" },
  { src: "/uploads/2024/09/logo8.svg", alt: "Media logo 8" },
  { src: "/uploads/2024/09/logo9.svg", alt: "Media logo 9" },
  { src: "/uploads/2024/09/logo10.svg", alt: "Media logo 10" },
];

export default function HomePage() {
  return (
    <>
      {/* ── 1. HERO SECTION ───────────────────────────────────────────────── */}
      <section
        className="home-hero"
        aria-label="Hero"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "620px",
          display: "flex",
          alignItems: "center",
          background: "#1b1818",
        }}
      >
        {/* Background image */}
        <Image
          src="/uploads/2025/10/234-1.png"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center", opacity: 0.7 }}
          sizes="100vw"
        />
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "hsl(220 25% 5% / 0.45)",
          }}
        />

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
            padding: "5rem var(--space-6)",
          }}
        >
          {/* Left: Heading + CTA */}
          <div>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.625rem, 3.5vw, 2.25rem)",
                color: "#fff",
                lineHeight: 1.35,
                marginBottom: "1.25rem",
              }}
            >
              Our expertise is in Clinically led assessment and treatment of eyelid and
              peri-ocular conditions, focused on function, comfort, and anatomical balance.
            </h1>
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "hsl(0 0% 100% / 0.85)",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Care is delivered using contemporary minimally invasive surgical and
              non-surgical techniques.
            </p>
            <Link
              href="/self-test-survey"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "hsl(220 25% 12%)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "var(--text-sm)",
                padding: "0.875rem 1.875rem",
                borderRadius: "var(--radius-full)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "background 0.2s ease",
              }}
            >
              Take the Eyelid Surgery Test
            </Link>
          </div>

          {/* Right: Dr Sabrina image + badge */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: "420px" }}>
              <Image
                src="/uploads/2026/06/Group-12.svg"
                alt="Dr. Sabrina Shah-Desai"
                width={420}
                height={480}
                style={{ width: "100%", height: "auto" }}
                priority
              />
              {/* Dr Badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  right: "-1rem",
                  background: "hsl(220 25% 12% / 0.9)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid hsl(0 0% 100% / 0.15)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1rem 1.25rem",
                  maxWidth: "220px",
                }}
              >
                <h5
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "0.875rem",
                    color: "hsl(38 92% 70%)",
                    marginBottom: "0.2rem",
                    fontWeight: 700,
                  }}
                >
                  DR. SABRINA SHAH—DESAI
                </h5>
                <small style={{ color: "hsl(0 0% 100% / 0.6)", fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}>
                  MS, FRCS (Ed) Ophth.
                </small>
                <p style={{ color: "hsl(0 0% 100% / 0.8)", fontSize: "0.75rem", lineHeight: 1.5, margin: 0 }}>
                  Has been consistently recognised as a top practitioner for eyes for eight
                  consecutive years, from 2019 to 2026
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .home-hero .container {
              grid-template-columns: 1fr !important;
            }
            .home-hero .container > div:last-child {
              display: none !important;
            }
          }
        `}</style>
      </section>

      {/* ── 2. AWARD LOGOS CAROUSEL ───────────────────────────────────────── */}
      <div
        style={{
          background: "#fff",
          padding: "2.5rem 0",
          borderBottom: "1px solid var(--clr-border)",
        }}
      >
        <AutoScrollCarousel items={AWARD_LOGOS} speed={35} />
      </div>

      {/* ── 3. ABOUT / VIDEO SECTION ──────────────────────────────────────── */}
      <section
        aria-label="About Dr Sabrina"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "500px",
        }}
        className="home-about-grid"
      >
        {/* Left: video with background */}
        <div
          style={{
            position: "relative",
            minHeight: "420px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#1b1818",
          }}
        >
          <Image
            src="/uploads/2024/09/drsabrina-hm-bg.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", opacity: 0.6 }}
            sizes="50vw"
          />
          <a
            href="https://www.youtube.com/watch?v=5Z-PVTuIR6c"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch Dr Sabrina video"
            style={{
              position: "relative",
              zIndex: 1,
              width: "72px",
              height: "72px",
              borderRadius: "9999px",
              background: "hsl(0 0% 100% / 0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px hsl(220 25% 12% / 0.4)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="var(--clr-primary)"
              style={{ width: "28px", height: "28px", marginLeft: "4px" }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </a>
        </div>

        {/* Right: bio */}
        <div
          style={{
            padding: "4rem 3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          className="home-about-text"
        >
          <span
            style={{
              fontSize: "var(--text-xs)",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--clr-primary)",
              marginBottom: "0.75rem",
            }}
          >
            About
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.625rem, 3vw, 2.25rem)",
              color: "var(--clr-text)",
              lineHeight: 1.2,
              marginBottom: "0.25rem",
            }}
          >
            Meet Dr Sabrina Shah-Desai
          </h2>
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-base)",
              fontWeight: 400,
              color: "var(--clr-text-muted)",
              marginBottom: "1.5rem",
            }}
          >
            MS, FRCS (Ed) Ophth
          </h3>
          <div
            style={{
              width: "80px",
              height: "2px",
              background: "var(--clr-accent)",
              marginBottom: "1.5rem",
            }}
          />
          <p style={{ color: "var(--clr-text-muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Dr Sabrina Shah-Desai, MS, FRCS (Ed) Ophth is a multi-award-winning Oculoplastic
            Reconstructive Surgeon and Aesthetic Practitioner specialising in reconstructive,
            revisional, and cosmetic surgery of the eyelids, as well as non-surgical treatments
            for the eyes and face. With over 25 years of experience, she is globally recognised
            for her pioneering, minimally invasive techniques.
          </p>
          <p style={{ color: "var(--clr-text-muted)", lineHeight: 1.8 }}>
            Known as the &ldquo;go-to&rdquo; surgeon for discerning patients seeking subtle,
            natural results, she is also highly sought after for revisional procedures by those
            who have undergone previous fillers or eyelid surgeries.{" "}
            <strong>
              Dr Shah-Desai is now listed on the Royal College of Surgeons of England register
              of Board-Certified Cosmetic Surgeons.
            </strong>
          </p>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .home-about-grid {
              grid-template-columns: 1fr !important;
            }
            .home-about-text {
              padding: 2.5rem 1.5rem !important;
            }
          }
        `}</style>
      </section>

      {/* ── 4. SPECIALIST TREATMENTS ─────────────────────────────────────── */}
      <section
        aria-label="Our Specialist Treatments"
        className="section"
        style={{ background: "#fff", paddingTop: "4rem", paddingBottom: "3rem" }}
      >
        <div className="container">
          <div className="section-header" style={{ textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.875rem, 4vw, 2.625rem)",
                color: "hsl(220 15% 25%)",
                marginBottom: "0.5rem",
              }}
            >
              Our Specialist Treatments and Procedures
            </h2>
            <div
              style={{
                width: "80px",
                height: "2px",
                background: "var(--clr-accent)",
                margin: "1rem auto 2rem",
              }}
            />
          </div>

          {/* Surgical */}
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
              color: "var(--clr-text)",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            Surgical Treatments
          </h3>
          <div
            style={{
              width: "80px",
              height: "2px",
              background: "var(--clr-accent)",
              margin: "0.75rem auto 2rem",
            }}
          />
          <div className="treatments-grid" style={{ marginBottom: "3.5rem" }}>
            {SURGICAL_TREATMENTS.map((t) => (
              <Link key={t.href} href={t.href} className="treatment-img-card">
                <div className="treatment-img-wrap">
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="treatment-img-overlay" />
                </div>
                <p className="treatment-img-title">{t.title}</p>
              </Link>
            ))}
          </div>

          {/* Non-Surgical */}
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
              color: "var(--clr-text)",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            Non-Surgical Treatments
          </h3>
          <div
            style={{
              width: "80px",
              height: "2px",
              background: "var(--clr-accent)",
              margin: "0.75rem auto 2rem",
            }}
          />
          <div className="treatments-grid">
            {NONSURGICAL_TREATMENTS.map((t) => (
              <Link key={t.href} href={t.href} className="treatment-img-card">
                <div className="treatment-img-wrap">
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="treatment-img-overlay" />
                </div>
                <p className="treatment-img-title">{t.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. BOOK YOUR CONSULTATION STEPS ─────────────────────────────── */}
      <section
        aria-label="Book your consultation"
        style={{ background: "hsl(210 20% 97%)", padding: "4rem 0" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "var(--clr-text)",
              marginBottom: "2.5rem",
            }}
          >
            Book Your Consultation Today
          </h2>

          {/* Steps */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "2rem",
            }}
          >
            {[
              { icon: "/uploads/2024/09/1bx.svg", text: "Discover what treatment is right for your concern and needs." },
              { icon: "/uploads/2024/09/2bx.svg", text: "Use our simple booking form to confirm your consultation or request a FREE call back." },
              { icon: "/uploads/2024/09/3bc.svg", text: "Look forward to coming in for your bespoke appointment." },
            ].map((step, i) => (
              <>
                <div
                  key={step.text}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    maxWidth: "200px",
                  }}
                >
                  <Image
                    src={step.icon}
                    alt={`Step ${i + 1}`}
                    width={72}
                    height={72}
                    style={{ width: "72px", height: "72px" }}
                  />
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--clr-text-muted)",
                      lineHeight: 1.6,
                      textAlign: "center",
                    }}
                  >
                    {step.text}
                  </p>
                </div>
                {i < 2 && (
                  <Image
                    key={`arrow-${i}`}
                    src="/uploads/2024/05/Arrow-16.svg"
                    alt=""
                    width={32}
                    height={32}
                    style={{ flexShrink: 0 }}
                    aria-hidden
                  />
                )}
              </>
            ))}
          </div>

          <p
            style={{
              fontSize: "var(--text-base)",
              color: "hsl(220 15% 40%)",
              maxWidth: "60ch",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            A consultation allows us to assess your concerns, discuss suitable options,
            expected recovery, and answer any questions, so you can make an informed decision.
          </p>

          <Link href="/contact-cosmetic-eye-surgeon" className="btn btn-primary btn-lg">
            Book A Compatibility Call
          </Link>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ──────────────────────────────────────────────── */}
      <section
        aria-label="Patient testimonials"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "5rem 0",
        }}
      >
        <Image
          src="/uploads/2024/09/testimonial-bg.jpg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "hsl(220 25% 12% / 0.55)",
          }}
        />
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          <TestimonialsSlider />
          <div />
        </div>

        <style>{`
          @media (max-width: 768px) {
            .testimonials-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── 7. PATIENT TESTIMONIAL VIDEOS ────────────────────────────────── */}
      <section
        aria-label="Video testimonials"
        style={{ background: "#fff", padding: "4rem 0 3rem" }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "var(--clr-text)",
                marginBottom: "0.5rem",
              }}
            >
              Patient Testimonials
            </h2>
            <div
              style={{
                width: "80px",
                height: "2px",
                background: "var(--clr-accent)",
                margin: "1rem auto",
              }}
            />
            <Image
              src="/uploads/2024/09/rating49.svg"
              alt="4.9 star rating"
              width={160}
              height={32}
              style={{ margin: "0 auto 0.5rem" }}
            />
            <p style={{ fontSize: "var(--text-sm)", color: "var(--clr-text-muted)" }}>
              Based on 220+ Google Reviews
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
            className="video-grid"
          >
            <VideoCard
              thumbnailSrc="/uploads/2025/03/Perfect-Eyes.png"
              title="A Happy Perfect Eyes Clinic's Patient"
              videoUrl="https://www.youtube.com/watch?v=gBKI4fAK7wk"
            />
            <VideoCard
              thumbnailSrc="/uploads/2025/03/perfecteyes.png"
              title="Upper Lid Blepharoplasty"
              videoUrl="https://www.youtube.com/watch?v=f-Z-4ET4YbQ"
            />
            <VideoCard
              thumbnailSrc="/uploads/2025/03/perfecteyes-2.png"
              title="Dermal Fillers Testimonial"
              videoUrl="https://www.youtube.com/shorts/L0sNTnUmLBw"
            />
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: "var(--text-sm)",
              color: "var(--clr-text-muted)",
              marginTop: "2rem",
            }}
          >
            *Individual results vary. Testimonials reflect personal experiences following
            consultation and treatment.
          </p>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .video-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 900px) and (min-width: 641px) {
            .video-grid { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── 8. RATING BADGES ─────────────────────────────────────────────── */}
      <section
        aria-label="Rating badges"
        style={{ background: "hsl(210 20% 97%)", padding: "3rem 0" }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { src: "/uploads/2024/09/grating.svg", alt: "Google Rating" },
              { src: "/uploads/2024/09/realrating.svg", alt: "RealSelf Rating" },
              { src: "/uploads/2024/09/carequlaity.svg", alt: "Care Quality Commission" },
            ].map((badge) => (
              <Image
                key={badge.src}
                src={badge.src}
                alt={badge.alt}
                width={140}
                height={70}
                style={{ height: "70px", width: "auto", objectFit: "contain" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. MEDIA / AS SEEN IN ────────────────────────────────────────── */}
      <div
        style={{
          background: "#fff",
          padding: "2.5rem 0",
          borderTop: "1px solid var(--clr-border)",
          borderBottom: "1px solid var(--clr-border)",
        }}
      >
        <AutoScrollCarousel items={MEDIA_LOGOS} speed={50} />
      </div>

      {/* ── 10. MEET THE CLINIC TEAM ─────────────────────────────────────── */}
      <section
        aria-label="Meet the clinic team"
        style={{
          background: "linear-gradient(135deg, hsl(199 30% 96%), hsl(220 20% 97%))",
          padding: "5rem 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Left: clinic image */}
          <div
            style={{
              position: "relative",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              aspectRatio: "4/3",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            <Image
              src="/uploads/2025/09/Homepage_Picture-1.jpg"
              alt="The Perfect Eyes Clinic"
              fill
              style={{ objectFit: "cover" }}
              sizes="50vw"
            />
          </div>

          {/* Right: team info */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.625rem, 3vw, 2.25rem)",
                color: "var(--clr-text)",
                marginBottom: "1rem",
              }}
            >
              Meet The Clinic Team
            </h2>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--clr-text-muted)", marginBottom: "1.5rem", lineHeight: 1.7 }}>
              Elegant &amp; discreet, the clinic ensures an environment that meets the highest
              standards of safety and hygiene and received a &ldquo;good rating&rdquo; in all 5 key
              areas by the{" "}
              <a
                href="https://www.cqc.org.uk/location/1-5591490767"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--clr-primary)", textDecoration: "underline" }}
              >
                Care Quality Commission
              </a>{" "}
              (CQC) in 2022.
            </p>

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}
              className="team-cols"
            >
              <div>
                <h4
                  style={{
                    fontSize: "var(--text-xs)",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--clr-text-muted)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Medical Aesthetics Team
                </h4>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[
                    { name: "Dr Sabrina Shah-Desai", title: "MS, FRCS, Board Certified Cosmetic Oculoplastic Surgeon" },
                    { name: "Dr Janine", title: "Dentist & Aesthetic Practitioner — Perfect Skin Studio" },
                    { name: "Dr Hemmali", title: "Dentist & Aesthetic Practitioner — Perfect Skin Studio" },
                    { name: "Irvana", title: "Level 4 LASER qualified therapist — Perfect Skin Studio" },
                  ].map((m) => (
                    <li key={m.name}>
                      <strong style={{ fontSize: "var(--text-sm)", color: "var(--clr-text)" }}>
                        {m.name}
                      </strong>
                      <br />
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--clr-text-muted)" }}>
                        {m.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4
                  style={{
                    fontSize: "var(--text-xs)",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--clr-text-muted)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Administrative Team
                </h4>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[
                    { name: "Leanne", title: "Practice Clinic Manager" },
                    { name: "Mojdeh", title: "Surgical Coordinator & Patient Educator" },
                    { name: "Mary", title: "Patient Coordinator" },
                    { name: "Lakshiya", title: "Patient Coordinator" },
                    { name: "Sally", title: "Patient Coordinator" },
                  ].map((m) => (
                    <li key={m.name}>
                      <strong style={{ fontSize: "var(--text-sm)", color: "var(--clr-text)" }}>
                        {m.name}
                      </strong>
                      <br />
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--clr-text-muted)" }}>
                        {m.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <Link href="/meet-team" className="btn btn-outline">
                Meet the Full Team
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .team-grid { grid-template-columns: 1fr !important; }
            .team-cols { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── 11. INSTAGRAM ────────────────────────────────────────────────── */}
      <section
        aria-label="Instagram"
        style={{ background: "hsl(210 20% 97%)", padding: "3.5rem 0 2.5rem" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--clr-text)",
            }}
          >
            Follow us on{" "}
            <strong>Instagram</strong>{" "}
            <a
              href="https://www.instagram.com/drsabrinashahdesaiofficial/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--clr-primary)", textDecoration: "underline" }}
            >
              @drsabrinashahdesaiofficial
            </a>{" "}
            to stay updated
          </p>
        </div>
      </section>

      {/* ── 12. ASK A QUESTION / BOOK APPOINTMENT ────────────────────────── */}
      <section
        aria-label="Book an appointment"
        style={{ background: "#fff", padding: "5rem 0" }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          {/* Left: image */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                aspectRatio: "4/3",
                boxShadow: "var(--shadow-xl)",
              }}
            >
              <Image
                src="/uploads/2024/09/askques-img.jpg"
                alt="Book your consultation"
                fill
                style={{ objectFit: "cover" }}
                sizes="50vw"
              />
            </div>
          </div>

          {/* Right: CTA */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.625rem, 3vw, 2.25rem)",
                color: "var(--clr-text)",
                lineHeight: 1.25,
                marginBottom: "1rem",
              }}
            >
              Ask Us A Question Or Book An Appointment
            </h2>
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "var(--clr-text-muted)",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Call or email us today, we would be delighted to answer your questions.
            </p>
            <Link href="/contact-cosmetic-eye-surgeon" className="btn btn-primary btn-lg">
              Book A Compatibility Call
            </Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .book-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── 13. VAT DISCLAIMER ───────────────────────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid var(--clr-border)",
          padding: "1.5rem 0",
          background: "#fff",
        }}
      >
        <div className="container">
          <p
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--clr-text-muted)",
              lineHeight: 1.6,
            }}
          >
            *Treatments undertaken solely for aesthetic purposes are subject to VAT at the
            prevailing rate. Where treatment is provided for a diagnosed medical condition, VAT
            status will be discussed during consultation.
          </p>
        </div>
      </div>

      {/* ── HOME PAGE STYLES ─────────────────────────────────────────────── */}
      <style>{`
        .treatments-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 900px) {
          .treatments-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .treatments-grid { grid-template-columns: 1fr; }
        }

        .treatment-img-card {
          display: block;
          text-decoration: none;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: box-shadow 0.25s ease, transform 0.25s ease;
          background: #fff;
        }
        .treatment-img-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }
        .treatment-img-card:hover .treatment-img-overlay {
          opacity: 0.2;
        }
        .treatment-img-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .treatment-img-wrap img {
          transition: transform 0.4s ease;
        }
        .treatment-img-card:hover .treatment-img-wrap img {
          transform: scale(1.06);
        }
        .treatment-img-overlay {
          position: absolute;
          inset: 0;
          background: hsl(199 90% 22%);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .treatment-img-title {
          padding: 0.875rem 1rem;
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--clr-text);
          text-align: center;
          margin: 0;
        }

        @media (max-width: 768px) {
          .home-hero .container {
            grid-template-columns: 1fr !important;
          }
          .home-about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
