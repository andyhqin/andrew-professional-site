import Link from 'next/link';

import { formatDate, type PostMeta } from '../lib/content';

/** Blog posts as a list of titles, dates, and descriptions. */
export function PostList({ posts, headingLevel = 2 }: { posts: PostMeta[]; headingLevel?: 2 | 3 }) {
  if (posts.length === 0) {
    return <p className="text-ink-muted">No posts yet. The first one is on its way.</p>;
  }
  const Title = `h${headingLevel}` as const;
  return (
    <ol className="divide-line divide-y">
      {posts.map((post) => (
        <li key={post.slug} className="py-6">
          <article>
            <Title className="font-display text-xl font-semibold">
              <Link
                href={`/blog/${post.slug}`}
                className="text-ink hover:text-brand-700 focus-visible:outline-brand-600 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {post.title}
              </Link>
            </Title>
            <p className="text-ink-muted mt-1 text-sm">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.draft ? ' · Draft' : null}
            </p>
            <p className="text-ink-muted mt-2">{post.description}</p>
          </article>
        </li>
      ))}
    </ol>
  );
}
