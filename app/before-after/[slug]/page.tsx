import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schema";
import {
  TreatmentStyles,
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
    title: frontmatter.seo?.title || heading,
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
        : [],
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

      <TreatmentStyles />
      <div className="tp">
        <PageHero
          breadcrumbItems={breadcrumbItems}
          siteUrl={SITE_URL}
          eyebrow="Before & After"
          h1={heading}
          lead={frontmatter.intro?.replace(/<[^>]+>/g, "")}
        />

        <BeforeAfterGallery
          gallery={frontmatter.gallery}
          heading={frontmatter.galleryHeading}
          description={frontmatter.galleryDescription}
          title={frontmatter.title}
        />

        <TreatmentExpert />

        <BeforeAfterNav items={navItems} currentSlug={slug} />

        <TreatmentCTA />
      </div>
    </>
  );
}
