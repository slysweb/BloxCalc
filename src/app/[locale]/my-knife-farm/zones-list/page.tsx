import { AdSlotSidebar, AdSlotTop } from '@/components/ads/AdSlotPlaceholders';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TimeToGoalCalculator } from '@/components/my-knife-farm/TimeToGoalCalculator';
import { ZonesSeoSummaryTable } from '@/components/my-knife-farm/ZonesSeoSummaryTable';
import { MY_KNIFE_FARM_ZONES, myKnifeFarmSite } from '@/config/my-knife-farm';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export { generateStaticParams } from '@/i18n/generate-locale-static-params';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MyKnifeFarm' });
  return {
    title: t('metaZonesTitle'),
    description: t('metaZonesDescription'),
    keywords: [
      'My Knife Farm zone requirements',
      'My Knife Farm knife rarity chances',
      'My Knife Farm crate odds',
      'My Knife Farm zones list',
    ],
  };
}

export default async function MyKnifeFarmZonesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const game = myKnifeFarmSite;
  const t = await getTranslations('Breadcrumbs');
  const tM = await getTranslations('MyKnifeFarm');

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-10">
      <Breadcrumbs
        items={[
          { label: t('home'), href: '/' },
          { label: game.name, href: '/my-knife-farm' },
          { label: tM('breadcrumbZones') },
        ]}
      />

      <AdSlotTop />

      <div className="flex flex-wrap items-start gap-6 lg:gap-8">
        <div className="min-w-0 flex-1 basis-[18rem] space-y-6">
          <header className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">{tM('zonesH1')}</h1>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-400">{tM('zonesLead')}</p>
          </header>

          <TimeToGoalCalculator />

          <div className="site-table-wrap">
            <table className="site-table">
              <thead>
                <tr>
                  <th scope="col">{tM('zonesColZone')}</th>
                  <th scope="col">{tM('zonesColCash')}</th>
                  <th scope="col">{tM('zonesColKeys')}</th>
                  <th scope="col">{tM('zonesColDrops')}</th>
                  <th scope="col">{tM('zonesColCrates')}</th>
                </tr>
              </thead>
              <tbody>
                {MY_KNIFE_FARM_ZONES.map((z) => (
                  <tr key={z.id}>
                    <td className="font-semibold text-slate-100">{z.name}</td>
                    <td>{z.cashRequirement}</td>
                    <td>{z.keyOrUnlock ?? '—'}</td>
                    <td>{z.notableDrops}</td>
                    <td>{z.crateKnifeOdds}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500">{tM('dataDisclaimer')}</p>
        </div>

        <aside
          aria-label={tM('zonesSidebarAdsAria')}
          className="sticky top-20 shrink-0 self-start lg:top-24"
        >
          <AdSlotSidebar />
        </aside>
      </div>

      <ZonesSeoSummaryTable
        zones={MY_KNIFE_FARM_ZONES}
        heading={tM('zonesSeoTableHeading')}
        caption={tM('zonesSeoTableCaption')}
        colZone={tM('zonesSeoColZone')}
        colMinCash={tM('zonesSeoColMinCash')}
        colUnlock={tM('zonesSeoColUnlock')}
        colDrops={tM('zonesSeoColDrops')}
        colCrates={tM('zonesSeoColCrates')}
      />
    </main>
  );
}
