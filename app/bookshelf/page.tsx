import { Container } from '@andyhqin/ui';

import { Bookshelf } from '../../components/bookshelf';
import { PageHeader } from '../../components/page-header';
import { books } from '../../content/bookshelf';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata({
  path: '/bookshelf',
  title: 'Bookshelf',
  description: 'What Andrew Qin is reading, has read, and wants to read.',
});

export default function BookshelfPage() {
  return (
    <>
      <PageHeader title="Bookshelf" intro="What I am reading, what I have read, and what is next." />
      <Container width="prose" className="pb-16">
        <Bookshelf books={books} />
      </Container>
    </>
  );
}
