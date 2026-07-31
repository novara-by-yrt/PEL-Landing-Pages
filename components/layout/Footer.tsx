import Link from "next/link";

const FOOTER_COLS = [
  {
    heading: "Surgical Treatments",
    links: [
      { href: "/upper-eyelid-lift-surgery-blepharoplasty", label: "Upper Lid Blepharoplasty" },
      { href: "/eye-bag-removal-blepharoplasty-uk", label: "Eye Bag Removal" },
      { href: "/ptosis-surgery", label: "Ptosis Surgery" },
      { href: "/double-eyelid-surgery", label: "Double Eyelid Surgery" },
      { href: "/surgical-brow-lift-uk", label: "Brow Lift" },
      { href: "/surgical-festoons-malar-bags-treatment-uk", label: "Festoons & Malar Bags" },
      { href: "/surgical-eyelid-surgery-chalazion-removal-uk", label: "Chalazion Removal" },
      { href: "/surgical-eyelid-surgery-revision-blepharoplasty-uk", label: "Revision Blepharoplasty" },
    ],
  },
  {
    heading: "Non-Surgical Treatments",
    links: [
      { href: "/non-surgical-tear-trough-fillers-uk", label: "Tear Trough Fillers" },
      { href: "/polynucleotides", label: "Polynucleotides" },
      { href: "/morpheus8", label: "Morpheus8" },
      { href: "/endolift", label: "Endolift®" },
      { href: "/sofwave", label: "Sofwave™" },
      { href: "/non-surgical-ultraclear-laser-treatment-uk", label: "UltraClear Laser" },
      { href: "/chemical-peel", label: "Chemical Peel" },
      { href: "/emface", label: "EMFACE" },
    ],
  },
  {
    heading: "Eye Conditions",
    links: [
      { href: "/condition-hooded-eyelids", label: "Hooded Eyelids" },
      { href: "/eye-bags", label: "Eye Bags" },
      { href: "/droopy-ptosis-eye", label: "Droopy Eyelids" },
      { href: "/dark-circles-under-eyes", label: "Dark Circles" },
      { href: "/chalazion", label: "Chalazion" },
      { href: "/xanthelasma", label: "Xanthelasma" },
      { href: "/crows-feet", label: "Crow's Feet" },
      { href: "/eyelid-cancer", label: "Eyelid Cancer" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid" style={{ gridTemplateColumns: "1.5fr repeat(3, 1fr)" }}>
          {/* Brand */}
          <div className="footer-brand">
            <h2>Perfect Eyes Ltd</h2>
            <p>
              London&rsquo;s leading cosmetic eye surgery and non-surgical aesthetic clinic.
              Expert care from Dr Sabrina Shah-Desai, MS, FRCS (Ed) Ophth.
            </p>
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a
                href="tel:+442074864886"
                style={{ fontSize: "var(--text-sm)", color: "hsl(0 0% 100% / 0.7)", transition: "color 0.15s ease" }}
              >
                📞 020 7486 4886
              </a>
              <a
                href="mailto:perfecteyesltd@gmail.com"
                style={{ fontSize: "var(--text-sm)", color: "hsl(0 0% 100% / 0.7)", transition: "color 0.15s ease" }}
              >
                ✉ perfecteyesltd@gmail.com
              </a>
              <p style={{ fontSize: "var(--text-sm)", color: "hsl(0 0% 100% / 0.6)", marginTop: "0.25rem" }}>
                9 Harley Street, London, W1G 9QY
              </p>
            </div>
            <div style={{ marginTop: "1.25rem", display: "flex", gap: "1rem" }}>
              <a
                href="https://www.instagram.com/drsabrinashahdesaiofficial/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "hsl(0 0% 100% / 0.5)", fontSize: "1.25rem", lineHeight: 1 }}
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading} className="footer-col">
              <h3>{col.heading}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid hsl(0 0% 100% / 0.1)",
            paddingTop: "var(--space-6)",
            marginTop: "var(--space-8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "var(--text-xs)",
            color: "hsl(0 0% 100% / 0.5)",
          }}
        >
          <div>
            <p>© {currentYear} Perfect Eyes Ltd. All rights reserved.</p>
            <p style={{ marginTop: "0.25rem" }}>
              Registered in England & Wales. Company No. 10036376.
            </p>
          </div>
          <nav aria-label="Legal links" style={{ display: "flex", gap: "1.5rem" }}>
            <Link
              href="/privacy-notice"
              style={{ color: "hsl(0 0% 100% / 0.5)", transition: "color 0.15s ease" }}
            >
              Privacy Notice
            </Link>
            <Link
              href="/non-surgical-terms-conditions"
              style={{ color: "hsl(0 0% 100% / 0.5)", transition: "color 0.15s ease" }}
            >
              Terms & Conditions
            </Link>
            <Link
              href="/before-after"
              style={{ color: "hsl(0 0% 100% / 0.5)", transition: "color 0.15s ease" }}
            >
              Before & After
            </Link>
            <Link
              href="/publications"
              style={{ color: "hsl(0 0% 100% / 0.5)", transition: "color 0.15s ease" }}
            >
              Publications
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
