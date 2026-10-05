import { PageHeader } from '../../components/page-header';
import { Prose } from '../../components/prose';
import { markdownPage } from '../../lib/content';
import { pageMetadata } from '../../lib/metadata';

const page = markdownPage('uses');

export const metadata = pageMetadata({ path: '/uses', title: page.meta.title, description: page.meta.description });

export default function UsesPage() {
  return (
    <>
      <PageHeader title={page.meta.title} />
      <Prose html={page.html} />
    </>
  );
}
