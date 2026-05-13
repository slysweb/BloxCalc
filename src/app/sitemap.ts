import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getGameSlugs } from '@/lib/games';
import { getSiteOrigin } from '@/lib/site-url';

/** 与 `output: 'export'` 兼容：构建期生成 sitemap。 */
export const dynamic = 'force-static';

const STATIC_PATHS = [
  '',
  '/privacy',
  '/terms',
  '/about',
  '/my-knife-farm',
  '/my-knife-farm/zones-list',
  '/my-knife-farm/roi-calculator',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteOrigin();
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const prefix = `/${locale}`;

    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${base}${prefix}${path}`,
        lastModified,
      });
    }

    for (const slug of getGameSlugs()) {
      entries.push({
        url: `${base}${prefix}/${slug}`,
        lastModified,
      });
      entries.push({
        url: `${base}${prefix}/${slug}/calculator`,
        lastModified,
      });
    }
  }

  return entries;
}
