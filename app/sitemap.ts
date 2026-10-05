import { buildSitemap } from '@andyhqin/seo/next';
import type { MetadataRoute } from 'next';

import { listPosts } from '../lib/content';
import { site } from '../lib/site';

const PAGES = ['/', '/about', '/projects', '/blog', '/uses', '/bookshelf'];

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap(site, [
    ...PAGES.map((path) => ({ path })),
    // Drafts are already left out of production builds by listPosts.
    ...listPosts().map((post) => ({ path: `/blog/${post.slug}`, updatedAt: new Date(`${post.date}T00:00:00Z`) })),
  ]);
}
