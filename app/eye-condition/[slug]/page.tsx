import { redirect } from "next/navigation";
import { getPostSlugs } from "@/lib/mdx";

export async function generateStaticParams() {
  return getPostSlugs("eye-condition").map((slug) => ({ slug }));
}

export default async function EyeConditionRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/condition/${slug}`);
}
