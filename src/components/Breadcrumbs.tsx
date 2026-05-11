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
    <nav aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.35rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          fontSize: '0.875rem',
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} style={{ display: 'flex', gap: '0.35rem' }}>
              {item.href && !isLast ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              )}
              {!isLast ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
