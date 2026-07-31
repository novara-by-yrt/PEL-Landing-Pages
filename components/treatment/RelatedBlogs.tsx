import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { TpIcon } from "./TpIcon";

const RELATED_COUNT = 6;

function excerptFrom(html: string, maxLen = 150): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

export function RelatedBlogs() {
  const posts = getAllPosts("posts")
    .filter((p) => !p.frontmatter.seo?.robots?.includes("noindex"))
    .slice(0, RELATED_COUNT);

  if (posts.length === 0) return null;

  return (
    <section className="tp-section tp-fog">
      <style>{`
        .tp-blogs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.75rem; margin-top: 2.5rem; }
        .tp-blog-card { display: block; text-decoration: none; color: inherit; background: #fff; border: 1px solid var(--tp-line); border-radius: var(--tp-radius-lg); overflow: hidden; box-shadow: var(--tp-shadow-xs); transition: transform 240ms var(--tp-ease), box-shadow 240ms var(--tp-ease); }
        .tp-blog-card:hover { transform: translateY(-4px); box-shadow: var(--tp-shadow-md); }
        .tp-blog-img { aspect-ratio: 16/10; background: var(--tp-lavender-050); position: relative; overflow: hidden; }
        .tp-blog-img img { width: 100%; height: 100%; object-fit: cover; }
        .tp-blog-body { padding: 1.25rem 1.35rem; }
        .tp-blog-meta { font-size: 11.5px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--tp-lavender-500); margin-bottom: 8px; }
        .tp-blog-title { font-family: var(--tp-display); font-size: 1.05rem; font-weight: 600; color: var(--tp-ink); line-height: 1.3; margin: 0 0 8px; }
        .tp-blog-excerpt { font-size: 0.8375rem; color: var(--tp-slate); line-height: 1.55; margin: 0; }
      `}</style>
      <div className="container">
        <div className="tp-head">
          <span className="tp-eyebrow"><TpIcon name="sparkle" size={13} />From the journal</span>
          <h2>Related Blogs</h2>
        </div>
        <div className="tp-blogs-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="tp-blog-card">
              {post.frontmatter.featuredImage && (
                <div className="tp-blog-img">
                  <img src={post.frontmatter.featuredImage} alt={post.frontmatter.title} />
                </div>
              )}
              <div className="tp-blog-body">
                <div className="tp-blog-meta">
                  {post.frontmatter.author?.name || "Dr Sabrina Shah-Desai"}
                  {post.frontmatter.date && ` · ${new Date(post.frontmatter.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`}
                </div>
                <h3 className="tp-blog-title">{post.frontmatter.title}</h3>
                <p className="tp-blog-excerpt">{excerptFrom(post.content)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
