import { Container, Heading } from '@andyhqin/ui';
import { notFound } from 'next/navigation';

import { Prose } from '../../../components/prose';
import { formatDate, getPost, listPosts } from '../../../lib/content';
import { pageMetadata } from '../../../lib/metadata';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

/** Every post is prerendered; a slug with no post is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return listPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({ path: `/blog/${post.meta.slug}`, title: post.meta.title, description: post.meta.description });
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article>
      <Container as="header" width="prose" className="pt-16 pb-8 sm:pt-24">
        <p className="text-brand-700 text-sm font-medium">
          <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
          {post.meta.draft ? ' · Draft' : null}
        </p>
        <Heading level={1} size="lg" className="mt-2">
          {post.meta.title}
        </Heading>
        <p className="text-ink-muted mt-4 text-lg">{post.meta.description}</p>
      </Container>
      <Prose html={post.html} />
    </article>
  );
}
