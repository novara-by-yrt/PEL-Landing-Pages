import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactSection from "@/components/home/ContactSection";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { DEFAULT_OG_IMAGE, metadataTitle, resolveTitle } from "@/lib/seo";
import {
  PageHero,
  BeforeAfterGallery,
  BeforeAfterNav,
  TreatmentExpert,
  TreatmentCTA,
} from "@/components/treatment";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export async function generateStaticParams() {
  return getPostSlugs("before-after").map((slug) => ({ slug }));
}

/** The live site titles these pages "<Treatment> Before and After". */
function pageTitle(title: string) {
  return /before\s*(and|&)\s*after/i.test(title) ? title : `${title} Before and After`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("before-after", slug);
  if (!post) return {};
  const { frontmatter } = post;
  const url = `${SITE_URL}/before-after/${slug}`;
  const heading = pageTitle(frontmatter.title);
  return {
    // Through the shared helpers, so a frontmatter title that already
    // signs off with the brand (or the "- PEL" abbreviation) does not get a
    // second one appended by the layout's title template.
    title: metadataTitle(resolveTitle(frontmatter.seo?.title, heading)),
    description:
      frontmatter.seo?.description ||
      frontmatter.galleryDescription ||
      `View real ${frontmatter.title} before and after results by Dr Sabrina Shah-Desai.`,
    alternates: { canonical: url },
    openGraph: {
      url,
      type: "website",
      images: frontmatter.featuredImage
        ? [{ url: `${SITE_URL}${frontmatter.featuredImage}` }]
        : [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function BeforeAfterCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug("before-after", slug);
  if (!post) notFound();

  const { frontmatter } = post;
  const url = `${SITE_URL}/before-after/${slug}`;
  const heading = pageTitle(frontmatter.title);

  const navItems = getAllPosts("before-after").map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
  }));

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Before & After", url: `${SITE_URL}/before-after` },
    { name: heading, url },
  ];

  const pageSchema = buildWebPageSchema(frontmatter, url);
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, url);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="tp">
        <PageHero
          breadcrumbItems={breadcrumbItems}
          siteUrl={SITE_URL}
          eyebrow="Before & After"
          h1={heading}
          lead={frontmatter.intro?.replace(/<[^>]+>/g, "")}
        />

        {/* No heading block: on this page the hero directly above already says
            "<Treatment> Before and After" and "See the <Treatment> before and
            after results below", which the gallery head then restated almost
            word for word. The frontmatter still carries galleryHeading and
            galleryDescription — generateMetadata uses the description as the
            page description — so nothing is deleted, just not shown twice. */}
        <BeforeAfterGallery
          gallery={frontmatter.gallery}
          title={frontmatter.title}
          showHead={false}
        />

        <TreatmentExpert />

        <BeforeAfterNav items={navItems} currentSlug={slug} />

        <TreatmentCTA />
        <ContactSection />
      </div>
    </>
  );
}
