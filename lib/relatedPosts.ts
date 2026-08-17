import { getAllPosts, type Post } from "@/lib/mdx";

/**
 * Picks blog posts that are actually about a given treatment or condition.
 *
 * The Related Blogs rail used to take the six newest posts and show them on
 * every page, so a ptosis page and a microneedling page carried an identical
 * list — no relationship to the subject, and no value as an internal link.
 *
 * Posts carry topical categories ("Blepharoplasty", "Polynucleotides",
 * "Stye", "Tear Trough Filler", "hooded eyes"), which is enough to match on.
 * A post has to earn its place: only posts sharing a meaningful word with the
 * subject are returned, and if none do the caller renders nothing rather than
 * padding the page with unrelated links.
 */

/* Words that appear in half the titles on the site and so carry no signal
   about what a page is about. */
const STOPWORDS = new Set([
  "the", "and", "for", "with", "your", "our", "from", "that", "this", "what",
  "how", "why", "when", "uk", "london", "harley", "street", "treatment",
  "treatments", "surgery", "surgical", "procedure", "clinic", "cost", "price",
  "best", "guide", "expert", "advanced", "perfect", "eyes", "eye", "non",
]);

/** Lowercase alphabetic words of 4+ characters, crudely de-pluralised. */
function tokenise(input: string): string[] {
  return (input.toLowerCase().match(/[a-z]+/g) || [])
    .filter((w) => w.length >= 4 && !STOPWORDS.has(w))
    .map((w) => (w.endsWith("s") && w.length > 4 ? w.slice(0, -1) : w));
}

function postTokens(post: Post): { strong: Set<string>; weak: Set<string> } {
  const fm = post.frontmatter;
  // Categories and tags are curated; the title is incidental, so it counts
  // for less.
  const strong = new Set(tokenise([...(fm.categories || []), ...(fm.tags || [])].join(" ")));
  const weak = new Set(tokenise(fm.title || ""));
  return { strong, weak };
}

export function getRelatedPosts({
  topic,
  limit = 6,
  excludeSlug,
}: {
  /** The subject to match against — a treatment or condition title. */
  topic: string;
  limit?: number;
  excludeSlug?: string;
}): Post[] {
  const wanted = tokenise(topic);
  if (wanted.length === 0) return [];

  return getAllPosts("posts")
    .filter((p) => !p.frontmatter.seo?.robots?.includes("noindex"))
    .filter((p) => p.slug !== excludeSlug)
    .map((post) => {
      const { strong, weak } = postTokens(post);
      let score = 0;
      for (const w of wanted) {
        if (strong.has(w)) score += 3;
        else if (weak.has(w)) score += 1;
      }
      return { post, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // Same relevance: newest first.
      const da = Date.parse(a.post.frontmatter.date || "") || 0;
      const db = Date.parse(b.post.frontmatter.date || "") || 0;
      return db - da;
    })
    .slice(0, limit)
    .map((x) => x.post);
}
