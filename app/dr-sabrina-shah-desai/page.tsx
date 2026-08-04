import type { Metadata } from "next";
import SurgeonProfile from "@/components/surgeon/SurgeonProfile";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

/**
 * Both this path and /oculoplastic-surgeon-eyelid-cosmetic-surgeon-london
 * resolved to the same MDX before the redesign, and both are linked from the
 * site. They now render the same component, with the canonical pointing at
 * the longer, keyword-bearing URL so the duplicate does not compete.
 */
export const metadata: Metadata = {
  title: "Dr Sabrina Shah-Desai — Aesthetic Eye Surgeon",
  description:
    "Dr Sabrina Shah-Desai specialises in eyelid lifts (blepharoplasty and brow lifts), droopy eyelid correction, and revision eyelid surgery.",
  alternates: {
    canonical: `${SITE_URL}/oculoplastic-surgeon-eyelid-cosmetic-surgeon-london`,
  },
};

export default function Page() {
  return <SurgeonProfile />;
}
