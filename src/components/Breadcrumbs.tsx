import { Link } from '@/i18n/navigation';

export type BreadcrumbItem = {
  label: string;
  /** Pathname without locale prefix (next-intl adds the active locale). */
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

function buildAbsoluteItemUrl(href: string): string | undefined {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (!base) return undefined;
  const path = href.startsWith('/') ? href : `/${href}`;
  return `${base}${path}`;
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const position = index + 1;
      const absolute = item.href ? buildAbsoluteItemUrl(item.href) : undefined;
      return {
        '@type': 'ListItem',
        position,
        name: item.label,
        ...(absolute ? { item: absolute } : {}),
      };
    }),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 p-0 text-sm text-slate-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="site-link font-medium text-slate-300">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? 'font-medium text-slate-200' : undefined}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <span className="text-slate-600" aria-hidden="true">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
