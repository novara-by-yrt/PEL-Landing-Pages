import Link from "next/link";

const FOOTER_COLS = [
  {
    heading: "Treatments",
    links: [
      { href: "/blepharoplasty-treatment-in-london", label: "Blepharoplasty" },
      { href: "/ptosis-surgery", label: "Ptosis Surgery" },
      { href: "/non-surgical-tear-trough-fillers-uk", label: "Tear Trough Fillers" },
      { href: "/polynucleotides", label: "Polynucleotides" },
      { href: "/morpheus8", label: "Morpheus8" },
    ],
  },
  {
    heading: "Conditions",
    links: [
      { href: "/droopy-ptosis-eye", label: "Droopy Eyelids" },
      { href: "/eye-bags", label: "Eye Bags" },
      { href: "/dark-circles-under-eyes", label: "Dark Circles" },
      { href: "/festoons-and-malar-bags-treatment-uk", label: "Festoons & Malar Bags" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about-drsabrina", label: "About" },
      { href: "/meet-team", label: "Team" },
      { href: "/blog", label: "Blog" },
      { href: "/before-after", label: "Before & After" },
      { href: "/contact-cosmetic-eye-surgeon", label: "Contact" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>Skynology</h2>
            <p>
              Expert cosmetic eye surgery and non-surgical aesthetic treatments.
              Delivering outstanding results with a personalised approach.
            </p>
          </div>
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

        <div className="footer-bottom">
          <p>© {currentYear} Skynology. All rights reserved.</p>
          <nav aria-label="Legal links">
            <Link href="/privacy-notice" style={{ marginRight: "1rem" }}>
              Privacy Notice
            </Link>
            <Link href="/non-surgical-terms-conditions">Terms & Conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
