import type { MetadataRoute } from 'next';
import { getSiteOrigin } from '@/lib/site-url';

/** 与 `output: 'export'` 兼容：构建期生成 robots.txt。 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const base = getSiteOrigin();
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${base}/sitemap.xml`,
  };
}
