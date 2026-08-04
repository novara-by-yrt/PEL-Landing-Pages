import type { Metadata } from "next";
import SurgeonProfile from "@/components/surgeon/SurgeonProfile";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";
const PATH = "/oculoplastic-surgeon-eyelid-cosmetic-surgeon-london";

export const metadata: Metadata = {
  title: "Dr Sabrina Shah-Desai — Aesthetic Eye Surgeon",
  description:
    "Dr Sabrina Shah-Desai specialises in eyelid lifts (blepharoplasty and brow lifts), droopy eyelid correction, and revision eyelid surgery.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    url: `${SITE_URL}${PATH}`,
    type: "profile",
    title: "Dr Sabrina Shah-Desai — Aesthetic Ophthalmic Plastic Surgeon, London",
    description:
      "Dr Sabrina Shah-Desai specialises in eyelid lifts (blepharoplasty & brow lifts), droopy eyelid correction & revision cosmetic eyelid surgery.",
  },
};

export default function Page() {
  return <SurgeonProfile />;
}
