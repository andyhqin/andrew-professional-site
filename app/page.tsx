import { cta, featureGrid, hero, standardBlocks } from '@andyhqin/blocks';
import { BlockRenderer, createRegistry, type BlockInstance } from '@andyhqin/renderer';
import { JsonLd } from '@andyhqin/seo';
import { Container, Heading } from '@andyhqin/ui';
import Link from 'next/link';

import { PostList } from '../components/post-list';
import { listPosts } from '../lib/content';
import { pageMetadata } from '../lib/metadata';
import { CONTACT_HREF, person, site } from '../lib/site';

export const metadata = pageMetadata({ path: '/' });

const registry = createRegistry(standardBlocks);

// PLACEHOLDER copy in the hero and the feature grid: see CONTENT.md.
const intro: BlockInstance[] = [
  {
    blockType: hero.name,
    eyebrow: person.role,
    headline: `Hi, I'm ${person.name}.`,
    supportingText:
      'Placeholder: one or two sentences on what you build and what you care about as an engineer.',
    primaryAction: { label: 'See my projects', href: '/projects' },
    secondaryAction: { label: 'About me', href: '/about' },
  },
  {
    blockType: featureGrid.name,
    eyebrow: 'What I work on',
    headline: 'Placeholder: a headline for what you do',
    columns: '3',
    tone: 'muted',
    features: [
      { title: 'Placeholder', description: 'Something you are good at, in a sentence.' },
      { title: 'Placeholder', description: 'Something else you are good at.' },
      { title: 'Placeholder', description: 'Something you are learning or exploring now.' },
    ],
  },
];

const outro: BlockInstance[] = [
  {
    blockType: cta.name,
    headline: 'Want to talk?',
    supportingText: 'About a project, a role, or anything on this site. I read every message.',
    primaryAction: { label: 'Get in touch', href: CONTACT_HREF },
    tone: 'inverted',
  },
];

export default function HomePage() {
  const latest = listPosts().slice(0, 3);
  return (
    <>
      <BlockRenderer blocks={intro} registry={registry} />
      <section aria-labelledby="latest-writing" className="py-16 sm:py-24">
        <Container width="prose">
          <Heading level={2} id="latest-writing">
            Latest writing
          </Heading>
          <div className="mt-6">
            <PostList posts={latest} headingLevel={3} />
          </div>
          <p className="mt-6">
            <Link
              href="/blog"
              className="text-brand-700 focus-visible:outline-brand-600 rounded-sm font-medium hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              All posts →
            </Link>
          </p>
        </Container>
      </section>
      <BlockRenderer blocks={outro} registry={registry} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: person.name,
          jobTitle: person.role,
          url: site.siteUrl,
          sameAs: [person.github],
        }}
      />
    </>
  );
}
