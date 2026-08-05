import { TpIcon } from "@/components/treatment/TpIcon";
import { CLINIC } from "@/lib/clinic";

/**
 * The clinic's phone number, everywhere it appears.
 *
 * Both the number and its `tel:` href come from CLINIC in lib/clinic.ts, so
 * changing that one entry updates every call link on the site. Use this rather
 * than writing an `<a href="tel:…">` by hand — a hand-written one is how the
 * header ended up publishing a different number from the footer.
 *
 * Note this cannot reach the migrated MDX pages under content/, which render
 * as raw HTML and so carry their numbers as literal text.
 */
export default function ClinicPhone({
  className,
  style,
  icon,
  iconSize = 17,
  /** Render just the number, no link — for use inside an existing anchor. */
  asText = false,
  /** Overrides the visible number; the href still comes from CLINIC. */
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  icon?: boolean;
  iconSize?: number;
  asText?: boolean;
  children?: React.ReactNode;
}) {
  const body = (
    <>
      {icon ? <TpIcon name="phone" size={iconSize} /> : null}
      {children ?? CLINIC.phoneDisplay}
    </>
  );

  if (asText) {
    return (
      <span className={className} style={style}>
        {body}
      </span>
    );
  }

  return (
    <a href={CLINIC.phoneHref} className={className} style={style}>
      {body}
    </a>
  );
}

/**
 * Icon-only variant: the number never appears, so the link needs its own
 * accessible name.
 */
export function ClinicPhoneIcon({
  className,
  size = 17,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <a
      href={CLINIC.phoneHref}
      className={className}
      aria-label={`Call ${CLINIC.phoneDisplay}`}
      title={CLINIC.phoneDisplay}
    >
      <TpIcon name="phone" size={size} />
    </a>
  );
}
