'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

export function LocaleSwitcher() {
  const pathname = usePathname();
  const activeLocale = useLocale();
  const t = useTranslations('SiteLayout');

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {t('footerLocales')}
      </span>
      <div className="flex flex-wrap gap-2">
        {routing.locales.map((locale) => {
          const isActive = locale === activeLocale;
          return (
            <Link
              key={locale}
              href={pathname}
              locale={locale}
              className={`rounded-md border px-2.5 py-1 text-xs font-semibold uppercase transition-colors ${
                isActive
                  ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-200'
                  : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
              prefetch={false}
            >
              {locale}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
