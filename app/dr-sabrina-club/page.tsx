import type { Metadata } from "next";
import { DrSabrinaClub } from "@/components/club/DrSabrinaClub";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export const metadata: Metadata = {
  title: "Dr Sabrina Club",
  robots: "noindex,nofollow",
  alternates: { canonical: `${SITE_URL}/dr-sabrina-club` },
};

export default function DrSabrinaClubPage() {
  return <DrSabrinaClub />;
}
