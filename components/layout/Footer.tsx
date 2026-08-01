import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";

const FOOTER_COLS = [
  {
    heading: "Surgical Treatments",
    links: [
      { href: "/surgical/eyelid-surgery/upper-eyelid-blepharoplasty-uk", label: "Upper Lid Blepharoplasty" },
      { href: "/surgical/eyelid-surgery/eye-bag-removal-blepharoplasty-uk", label: "Eye Bag Removal" },
      { href: "/surgical/eyelid-surgery/droppy-eye-ptosis-surgery-uk", label: "Ptosis Surgery" },
      { href: "/surgical/eyelid-surgery/double-eyelids-asian-blepharoplasty-uk", label: "Double Eyelid Surgery" },
      { href: "/surgical/browlift-treatment-uk", label: "Brow Lift" },
      { href: "/surgical/festoons-malar-bags-treatment-uk", label: "Festoons & Malar Bags" },
      { href: "/surgical/eyelid-surgery/chalazion-removal-uk", label: "Chalazion Removal" },
      { href: "/surgical/eyelid-surgery/revision-blepharoplasty-uk", label: "Revision Blepharoplasty" },
    ],
  },
  {
    heading: "Non-Surgical Treatments",
    links: [
      { href: "/non-surgical/tear-trough-fillers-uk", label: "Tear Trough Fillers" },
      { href: "/non-surgical/polynucleotide-treatment-uk", label: "Polynucleotides" },
      { href: "/non-surgical/morpheus8-treatment-uk", label: "Morpheus8" },
      { href: "/non-surgical/endolift-for-malar-bags-uk", label: "Endolift®" },
      { href: "/non-surgical/sofwave-treatment-uk", label: "Sofwave™" },
      { href: "/non-surgical/ultraclear-laser-treatment-uk", label: "UltraClear Laser" },
      { href: "/non-surgical/chemical-peel-treatment-uk", label: "Chemical Peel" },
      { href: "/non-surgical/emface-treatment-uk", label: "EMFACE" },
    ],
  },
  {
    heading: "Eye Conditions",
    links: [
      { href: "/condition/hooded-eyelids", label: "Hooded Eyelids" },
      { href: "/condition/eye-bags", label: "Eye Bags" },
      { href: "/condition/droopy-ptosis-eye", label: "Droopy Eyelids" },
      { href: "/condition/dark-circles-under-eyes", label: "Dark Circles" },
      { href: "/condition/chalazion", label: "Chalazion" },
      { href: "/condition/xanthelasma", label: "Xanthelasma" },
      { href: "/condition/crows-feet", label: "Crow's Feet" },
      { href: "/condition/eyelid-cancer", label: "Eyelid Cancer" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/drsabrinashahdesaiofficial/" },
  { label: "X / Twitter", href: "https://twitter.com/perfecteyesltd" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pel-footer" role="contentinfo">
      <style>{`
        .pel-footer { background: linear-gradient(160deg, var(--tp-indigo-950), var(--tp-indigo-800)); color: var(--tp-lavender-200); }
        .pel-footer-inner { max-width: var(--max-width); margin: 0 auto; padding: 4rem 1.5rem 1.75rem; }
        .pel-footer-grid { display: grid; grid-template-columns: minmax(260px,1.5fr) repeat(3,1fr); gap: 2.5rem; }
        .pel-footer-brand { font-family: var(--tp-display); font-size: 27px; font-weight: 600; letter-spacing: 0.03em; color: #fff; }
        .pel-footer-tagline { font-family: var(--tp-body); font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--tp-lavender-400); margin: 9px 0 22px; }
        .pel-footer-desc { font-size: 0.875rem; line-height: 1.6; color: var(--tp-lavender-200); max-width: 300px; margin-bottom: 20px; }
        .pel-footer-contact { display: flex; flex-direction: column; gap: 14px; }
        .pel-footer-row { display: flex; gap: 11px; align-items: flex-start; font-size: 0.875rem; line-height: 1.5; color: var(--tp-lavender-200); text-decoration: none; max-width: 280px; transition: color 160ms var(--tp-ease); }
        a.pel-footer-row:hover { color: #fff; }
        .pel-footer-row-icon { color: var(--tp-lavender-400); flex-shrink: 0; margin-top: 1px; }
        .pel-footer-col-head { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--tp-lavender-400); margin-bottom: 18px; }
        .pel-footer-col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .pel-footer-col a { font-size: 0.875rem; color: var(--tp-lavender-200); text-decoration: none; transition: color 160ms var(--tp-ease); }
        .pel-footer-col a:hover { color: #fff; }
        .pel-footer-bottom { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.12); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .pel-footer-copy { font-size: 0.75rem; color: var(--tp-lavender-300); }
        .pel-footer-copy p + p { margin-top: 4px; }
        .pel-footer-legal { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .pel-footer-legal a { font-size: 0.75rem; color: var(--tp-lavender-300); text-decoration: none; transition: color 160ms var(--tp-ease); }
        .pel-footer-legal a:hover { color: #fff; }
        @media (max-width: 860px) { .pel-footer-grid { grid-template-columns: 1fr 1fr; } .pel-footer-brand-col { grid-column: 1 / -1; } }
        @media (max-width: 560px) { .pel-footer-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="pel-footer-inner">
        <div className="pel-footer-grid">
          <div className="pel-footer-brand-col">
            <div className="pel-footer-brand">Perfect Eyes Ltd</div>
            <div className="pel-footer-tagline">Eyes · Face · Skin</div>
            <p className="pel-footer-desc">
              London&rsquo;s leading cosmetic eye surgery and non-surgical aesthetic clinic. Expert care from Dr Sabrina Shah-Desai, MS, FRCS (Ed) Ophth.
            </p>
            <div className="pel-footer-contact">
              <span className="pel-footer-row">
                <span className="pel-footer-row-icon"><TpIcon name="pin" size={16} /></span>
                9 Harley Street, London, W1G 9QY
              </span>
              <a href="tel:+442074864886" className="pel-footer-row">
                <span className="pel-footer-row-icon"><TpIcon name="phone" size={16} /></span>
                020 7486 4886
              </a>
              <a href="mailto:perfecteyesltd@gmail.com" className="pel-footer-row">
                <span className="pel-footer-row-icon"><TpIcon name="mail" size={16} /></span>
                perfecteyesltd@gmail.com
              </a>
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.heading} className="pel-footer-col">
              <div className="pel-footer-col-head">{col.heading}</div>
              <ul>
                {col.links.map((link, linkIndex) => (
                  <li key={`${link.href}-${linkIndex}`}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pel-footer-bottom">
          <div className="pel-footer-copy">
            <p>© {currentYear} Perfect Eyes Ltd · Harley Street, London. All rights reserved.</p>
            <p>Registered in England &amp; Wales. Company No. 10036376.</p>
          </div>
          <nav aria-label="Legal and social links" className="pel-footer-legal">
            <Link href="/privacy-notice">Privacy Notice</Link>
            <Link href="/non-surgical-terms-conditions">Terms &amp; Conditions</Link>
            <Link href="/before-after">Before &amp; After</Link>
            <Link href="/publications">Publications</Link>
            {SOCIALS.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
