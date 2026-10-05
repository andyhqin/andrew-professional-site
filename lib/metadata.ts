import { buildMetadata } from '@andyhqin/seo/next';
import type { Metadata } from 'next';

import { allowIndexing, site } from './site';

/** Served by app/share-image.png/route.tsx. */
export const SHARE_IMAGE = { url: '/share-image.png', width: 1200, height: 630, alt: site.siteName };

/** A page's metadata: title, description, canonical URL, share image, robots. */
export function pageMetadata(page: { path: string; title?: string; description?: string }): Metadata {
  return buildMetadata({ site, page, allowIndexing, image: SHARE_IMAGE });
}
