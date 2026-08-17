import { getAllPosts } from "@/lib/mdx";
import { getRelatedPosts } from "@/lib/relatedPosts";
import { BlogCard } from "@/components/blog/BlogCard";
import { TpIcon } from "./TpIcon";
import styles from "./RelatedBlogs.module.css";

const RELATED_COUNT = 6;

export function RelatedBlogs({
  excludeSlug,
  /* The page's subject. With one, the rail shows only posts that share a
     meaningful word with it and renders nothing when none do — previously it
     took the six newest posts regardless, so every treatment page carried an
     identical, unrelated list. Without one (the blog's own pages) it keeps
     the old newest-first behaviour, which is the right thing there. */
  topic,
}: { excludeSlug?: string; topic?: string } = {}) {
  const posts = topic
    ? getRelatedPosts({ topic, limit: RELATED_COUNT, excludeSlug })
    : getAllPosts("posts")
        .filter((p) => !p.frontmatter.seo?.robots?.includes("noindex"))
        .filter((p) => p.slug !== excludeSlug)
        .slice(0, RELATED_COUNT);

  if (posts.length === 0) return null;

  return (
    <section className="tp-section tp-fog">
      <div className="container">
        <div className="tp-head tp-center">
          <span className="tp-eyebrow"><TpIcon name="sparkle" size={13} />From the journal</span>
          <h2>Related Blogs</h2>
          <span className={styles.tpBlogsRule} aria-hidden="true" />
        </div>
        <div className={styles.tpBlogsGrid}>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
