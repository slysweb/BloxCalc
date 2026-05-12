import { Link } from '@/i18n/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

export { generateStaticParams } from '@/i18n/generate-locale-static-params';

type MyKnifeFarmLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function MyKnifeFarmLayout({
  children,
  params,
}: MyKnifeFarmLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('MyKnifeFarm');

  return (
    <div className="space-y-6">
      <nav
        aria-label={t('subNavAria')}
        className="flex flex-wrap gap-2 border-b border-slate-800 pb-4"
      >
        <Link
          href="/my-knife-farm"
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white"
        >
          {t('navHub')}
        </Link>
        <Link
          href="/my-knife-farm/roi-calculator"
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white"
        >
          {t('navRoi')}
        </Link>
        <Link
          href="/my-knife-farm/zones-list"
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white"
        >
          {t('navZones')}
        </Link>
      </nav>
      {children}
    </div>
  );
}
