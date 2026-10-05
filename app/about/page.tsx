import { contactForm, standardBlocks } from '@andyhqin/blocks';
import { BlockRenderer, createRegistry, type BlockInstance } from '@andyhqin/renderer';

import { PageHeader } from '../../components/page-header';
import { Prose } from '../../components/prose';
import { markdownPage } from '../../lib/content';
import { pageMetadata } from '../../lib/metadata';

const page = markdownPage('about');

export const metadata = pageMetadata({ path: '/about', title: page.meta.title, description: page.meta.description });

const registry = createRegistry(standardBlocks);

/** The contact form. Its anchor is #contact, which the nav's "Get in touch" points at. */
const contact: BlockInstance[] = [
  {
    blockType: contactForm.name,
    headline: 'Get in touch',
    supportingText: 'About a project, a role, or anything on this site. I read every message.',
    successMessage: 'Thanks, your message is on its way. I will reply as soon as I can.',
    tone: 'muted',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About me" />
      <Prose html={page.html} />
      <BlockRenderer blocks={contact} registry={registry} />
    </>
  );
}
