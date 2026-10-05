import { buildRobots } from '@andyhqin/seo/next';
import type { MetadataRoute } from 'next';

import { allowIndexing, site } from '../lib/site';

export default function robots(): MetadataRoute.Robots {
  return buildRobots(site, allowIndexing);
}
