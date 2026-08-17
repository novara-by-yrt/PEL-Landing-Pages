import Link from "next/link";
import type { Post } from "@/lib/mdx";
import { excerptFrom } from "@/lib/blogContent";
import SafeImage from "@/components/shared/SafeImage";
import styles from "./BlogCard.module.css";

export function BlogCard({
  post,
  /* The first row of the archive is on screen before anyone scrolls, so those
     thumbnails are fetched with the page rather than waiting for an
     intersection — which is what left them blank, then briefly broken, on
     first interaction. Everything below the fold stays lazy. */
  priority = false,
}: {
  post: Post;
  priority?: boolean;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.tpBlogCard}>
      {post.frontmatter.featuredImage && (
        <div className={styles.tpBlogImg}>
          <SafeImage
            src={post.frontmatter.featuredImage}
            alt={post.frontmatter.title}
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            priority={priority}
          />
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
