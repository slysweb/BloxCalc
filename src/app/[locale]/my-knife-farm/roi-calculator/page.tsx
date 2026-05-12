import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SmartUpgradeList } from '@/components/my-knife-farm/SmartUpgradeList';
import { UpgradeRoiCalculator } from '@/components/my-knife-farm/UpgradeRoiCalculator';
import { myKnifeFarmSite } from '@/config/my-knife-farm';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export { generateStaticParams } from '@/i18n/generate-locale-static-params';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MyKnifeFarm' });
  return {
    title: t('metaRoiTitle'),
    description: t('metaRoiDescription'),
    keywords: [
      'My Knife Farm best upgrades',
      'how to get cash fast My Knife Farm',
      'My Knife Farm ROI',
      'My Knife Farm upgrade calculator',
    ],
  };
}

export default async function MyKnifeFarmRoiPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const game = myKnifeFarmSite;
  const t = await getTranslations('Breadcrumbs');
  const tM = await getTranslations('MyKnifeFarm');

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 space-y-8 px-4 py-10 lg:max-w-6xl">
      <Breadcrumbs
        items={[
          { label: t('home'), href: '/' },
          { label: game.name, href: '/my-knife-farm' },
          { label: tM('breadcrumbRoi') },
        ]}
      />
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">{tM('roiH1')}</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-slate-400">{tM('roiLead')}</p>
      </header>
      <SmartUpgradeList />
      <UpgradeRoiCalculator />
    </main>
  );
}
