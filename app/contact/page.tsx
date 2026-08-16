import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import ContactPageContent from "./ContactPageContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

/**
 * The contact page's form needs `useState`, so the whole page used to carry
 * `"use client"` — and a client component cannot export `metadata`. The page
 * therefore had no title, no description and no canonical of its own: it
 * inherited the site-wide defaults, so the clinic's main enquiry page
 * competed in search results under the same generic title and 184-character
 * description as everything else, and told Google nothing about which URL was
 * the canonical one.
 *
 * Splitting the interactive part into ContactPageContent leaves this file a
 * server component that can describe the page properly. Nothing renders
 * differently — the same component tree, one boundary further down.
 */
export const metadata: Metadata = {
  title: "Contact the Clinic",
  description:
    "Contact Perfect Eyes Ltd on Harley Street, London. Book a consultation for eyelid surgery, tear trough fillers or periocular treatment.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    url: `${SITE_URL}/contact`,
    type: "website",
    title: "Contact Perfect Eyes Ltd | Harley Street, London",
    description:
      "Book a consultation for eyelid surgery, tear trough fillers or periocular treatment with our oculoplastic team on Harley Street.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
