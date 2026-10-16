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

const intro: BlockInstance[] = [
  {
    blockType: hero.name,
    eyebrow: person.role,
    headline: `Hi, I'm ${person.name}.`,
    supportingText:
      'I build full-stack apps and the cloud infrastructure behind them at Intel. Twelve years in, I still love clean, readable code and a good puzzle to solve.',
    primaryAction: { label: 'See my projects', href: '/projects' },
    secondaryAction: { label: 'About me', href: '/about' },
  },
  {
    blockType: featureGrid.name,
    eyebrow: 'What I work on',
    headline: 'Full-stack apps, built, tested, and shipped on AWS',
    columns: '3',
    tone: 'muted',
    features: [
      { title: 'Full-stack development', description: 'React and TypeScript on the frontend, Node.js and Python on the backend, Postgres and MongoDB underneath.' },
      { title: 'Cloud and delivery', description: 'Serverless on AWS, Terraform, Docker, Kubernetes, and CI/CD pipelines with GitHub Actions.' },
      { title: 'Taking things apart', description: 'From custom PCs to my homelab, I learn how systems work by opening them up and putting them back together.' },
    ],
  },
];

const outro: BlockInstance[] = [
  {
    blockType: cta.name,
    headline: 'Want to talk?',
    supportingText: "I'm open to freelance work, collaborations, and the right role. Or just say hi!",
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
