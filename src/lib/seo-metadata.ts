import type { Metadata } from 'next';

/** 与 `src/app/[locale]/layout.tsx` 中 `title.template` 保持一致。 */
export const metadataTitleTemplate = '%s | BloxCalc';

const brandTitleSuffix = ' | BloxCalc';

const ogLocaleBySiteLocale: Record<string, string> = {
  en: 'en_US',
  ja: 'ja_JP',
  zh: 'zh_CN',
  pt: 'pt_BR',
  th: 'th_TH',
};

/** 生成与布局 `title.template` 一致的完整标题（用于 OG / Twitter）。 */
export function resolvedTitleFromSegment(segment: string): string {
  return `${segment}${brandTitleSuffix}`;
}

/** 规范路径：`/${locale}` 或 `/${locale}/a/b`（不含域名，相对 `metadataBase`）。 */
export function buildLocalePath(locale: string, segments: string[]): string {
  const clean = segments
    .map((s) => s.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean);
  return ['', locale, ...clean].join('/');
}

export function buildOgAndCanonical(options: {
  locale: string;
  pathSegments: string[];
  /** 与 `metadata.title` 传入的片段相同（不含品牌后缀）。 */
  titleSegment: string;
  description: string;
}): Pick<Metadata, 'alternates' | 'openGraph' | 'twitter'> {
  const pathname = buildLocalePath(options.locale, options.pathSegments);
  const ogLocale = ogLocaleBySiteLocale[options.locale] ?? 'en_US';
  const resolvedTitle = resolvedTitleFromSegment(options.titleSegment);

  return {
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      type: 'website',
      url: pathname,
      siteName: 'BloxCalc',
      locale: ogLocale,
      title: resolvedTitle,
      description: options.description,
      images: [
        {
          url: '/og-image.png',
          width: 512,
          height: 512,
          alt: 'BloxCalc',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: options.description,
      images: ['/og-image.png'],
    },
  };
}
