import Link from "next/link";
import type { Post } from "@/lib/mdx";
import { excerptFrom } from "@/lib/blogContent";

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="tp-blog-card">
      <style>{`
        .tp-blog-card { display: block; text-decoration: none; color: inherit; background: #fff; border: 1px solid var(--tp-line); border-radius: var(--tp-radius-lg); overflow: hidden; box-shadow: var(--tp-shadow-xs); transition: transform 240ms var(--tp-ease), box-shadow 240ms var(--tp-ease); }
        .tp-blog-card:hover { transform: translateY(-4px); box-shadow: var(--tp-shadow-md); }
        .tp-blog-img { aspect-ratio: 16/10; background: var(--tp-lavender-050); position: relative; overflow: hidden; }
        .tp-blog-img img { width: 100%; height: 100%; object-fit: cover; }
        .tp-blog-body { padding: 1.25rem 1.35rem; }
        .tp-blog-cat { display: inline-block; background: var(--tp-lavender-100); color: var(--tp-indigo-700); font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; padding: 3px 10px; border-radius: 999px; margin-bottom: 10px; }
        .tp-blog-meta { font-size: 11.5px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--tp-lavender-500); margin-bottom: 8px; }
        .tp-blog-title { font-family: var(--tp-display); font-size: 1.05rem; font-weight: 600; color: var(--tp-ink); line-height: 1.3; margin: 0 0 8px; }
        .tp-blog-excerpt { font-size: 0.8375rem; color: var(--tp-slate); line-height: 1.55; margin: 0; }
      `}</style>
      {post.frontmatter.featuredImage && (
        <div className="tp-blog-img">
          <img src={post.frontmatter.featuredImage} alt={post.frontmatter.title} loading="lazy" />
        </div>
      )}
      <div className="tp-blog-body">
        {post.frontmatter.categories && post.frontmatter.categories.length > 0 && (
          <span className="tp-blog-cat">{post.frontmatter.categories[0]}</span>
        )}
        <div className="tp-blog-meta">
          {post.frontmatter.author?.name || "Dr Sabrina Shah-Desai"}
          {post.frontmatter.date && ` · ${new Date(post.frontmatter.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`}
        </div>
        <h3 className="tp-blog-title">{post.frontmatter.title}</h3>
        <p className="tp-blog-excerpt">{excerptFrom(post.content)}</p>
      </div>
    </Link>
  );
}
