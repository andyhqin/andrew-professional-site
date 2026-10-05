import { Container } from '@andyhqin/ui';

import { PageHeader } from '../../components/page-header';
import { PostList } from '../../components/post-list';
import { listPosts } from '../../lib/content';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata({
  path: '/blog',
  title: 'Blog',
  description: 'Writing by Andrew Qin on software engineering and what he is learning.',
});

export default function BlogPage() {
  return (
    <>
      <PageHeader title="Blog" intro="Writing on software engineering, and what I am learning." />
      <Container width="prose" className="pb-16">
        <PostList posts={listPosts()} />
      </Container>
    </>
  );
}
