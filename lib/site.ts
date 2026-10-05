import { footer as footerBlock, nav as navBlock } from '@andyhqin/blocks';
import { indexingAllowed, siteSeoSchema } from '@andyhqin/seo';

/**
 * The site's public address, from SITE_URL. Required for a production build:
 * canonical URLs, the sitemap, and share previews all depend on it, and a
 * wrong one would quietly credit search results to another address.
 */
function siteUrl(): string {
  const url = process.env.SITE_URL;
  if (url) return url;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SITE_URL is not set. Set it to the site\'s public address; see .env.example.');
  }
  return 'http://localhost:3000';
}

export const site = siteSeoSchema.parse({
  siteName: 'Andrew Qin',
  siteUrl: siteUrl(),
  defaultDescription: 'Andrew Qin is a software engineer. Projects, writing, tools, and books.',
  locale: 'en_US',
  brandColor: '#22d3ee',
});

/** Set BLOCK_INDEXING=true on a staging copy to keep it out of search results. */
export const allowIndexing = indexingAllowed(process.env);

export const person = {
  name: 'Andrew Qin',
  role: 'Software engineer',
  github: 'https://github.com/andyhqin',
  linkedin: 'https://www.linkedin.com/in/andyhqin',
};

export type SocialLink = { label: string; href: string; icon: 'github' | 'linkedin' };

/** Profiles elsewhere, shown as icons in the header. */
export const social: SocialLink[] = [
  { label: 'GitHub', href: person.github, icon: 'github' },
  { label: 'LinkedIn', href: person.linkedin, icon: 'linkedin' },
];

/** Where the contact form lives; the ContactForm block's anchor is fixed as #contact. */
export const CONTACT_HREF = '/about#contact';

export const nav = navBlock.schema.parse({
  brandName: person.name,
  links: [
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Uses', href: '/uses' },
    { label: 'Bookshelf', href: '/bookshelf' },
  ],
  callToAction: { label: 'Get in touch', href: CONTACT_HREF },
});

export const footer = footerBlock.schema.parse({
  brandName: person.name,
  tagline: `${person.role}.`,
  columns: [
    {
      heading: 'Explore',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Projects', href: '/projects' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      heading: 'More',
      links: [
        { label: 'Uses', href: '/uses' },
        { label: 'Bookshelf', href: '/bookshelf' },
        { label: 'Contact', href: CONTACT_HREF },
      ],
    },
    {
      heading: 'Elsewhere',
      links: [
        { label: 'GitHub', href: person.github },
        { label: 'LinkedIn', href: person.linkedin },
      ],
    },
  ],
  legal: `© ${new Date().getFullYear()} ${person.name}`,
});
