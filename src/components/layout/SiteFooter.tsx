import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { LocaleSwitcher } from './LocaleSwitcher';

export async function SiteFooter() {
  const t = await getTranslations('SiteLayout');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <p className="text-base font-semibold text-slate-100">{t('brand')}</p>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">{t('footerTagline')}</p>
          </div>

          <LocaleSwitcher />

          <div className="space-y-3 text-sm text-slate-500 sm:col-span-2 lg:col-span-1">
            <p>{t('footerDisclaimer')}</p>
            <p className="text-slate-600">
              {t('footerCopyright', { year })}
            </p>
          </div>
        </div>

        <nav
          aria-label={t('footerLegalNav')}
          className="flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-800 pt-6 text-sm"
        >
          <Link href="/privacy" className="site-link font-medium text-slate-300">
            {t('footerPrivacy')}
          </Link>
          <Link href="/terms" className="site-link font-medium text-slate-300">
            {t('footerTerms')}
          </Link>
          <Link href="/about" className="site-link font-medium text-slate-300">
            {t('footerAbout')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
