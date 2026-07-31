import { getAllPosts } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/BlogCard";
import { TpIcon } from "./TpIcon";

const RELATED_COUNT = 6;

export function RelatedBlogs({ excludeSlug }: { excludeSlug?: string } = {}) {
  const posts = getAllPosts("posts")
    .filter((p) => !p.frontmatter.seo?.robots?.includes("noindex"))
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, RELATED_COUNT);

  if (posts.length === 0) return null;

  return (
    <section className="tp-section tp-fog">
      <style>{`
        .tp-blogs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.75rem; margin-top: 2.5rem; }
      `}</style>
      <div className="container">
        <div className="tp-head">
          <span className="tp-eyebrow"><TpIcon name="sparkle" size={13} />From the journal</span>
          <h2>Related Blogs</h2>
        </div>
        <div className="tp-blogs-grid">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
