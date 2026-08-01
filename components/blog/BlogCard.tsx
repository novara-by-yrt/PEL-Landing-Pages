import Link from "next/link";
import type { Post } from "@/lib/mdx";
import { excerptFrom } from "@/lib/blogContent";
import styles from "./BlogCard.module.css";

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.tpBlogCard}>
      {post.frontmatter.featuredImage && (
        <div className={styles.tpBlogImg}>
          <img src={post.frontmatter.featuredImage} alt={post.frontmatter.title} loading="lazy" />
        </div>
      )}
      <div className={styles.tpBlogBody}>
        {post.frontmatter.categories && post.frontmatter.categories.length > 0 && (
          <span className={styles.tpBlogCat}>{post.frontmatter.categories[0]}</span>
        )}
        <div className={styles.tpBlogMeta}>
          {post.frontmatter.author?.name || "Dr Sabrina Shah-Desai"}
          {post.frontmatter.date && ` · ${new Date(post.frontmatter.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`}
        </div>
        <h3 className={styles.tpBlogTitle}>{post.frontmatter.title}</h3>
        <p className={styles.tpBlogExcerpt}>{excerptFrom(post.content)}</p>
      </div>
    </Link>
  );
}
