import { Breadcrumbs } from '@/components/Breadcrumbs';
import { KALB_ZONE_ROWS } from '@/config/kick-a-lucky-block';
import { getGameJsonBySlug } from '@/config/games';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { gameHasZonesListPage } from '@/lib/game-subpages';
import { buildOgAndCanonical } from '@/lib/seo-metadata';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
    'game-slug': 'kick-a-lucky-block',
  }));
}

type ZonesPageProps = {
  params: Promise<{ locale: string; 'game-slug': string }>;
};

export async function generateMetadata({ params }: ZonesPageProps) {
  const { locale, 'game-slug': gameSlug } = await params;
  if (!gameHasZonesListPage(gameSlug)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: 'KickALuckyBlockZones' });
  const titleSegment = t('metaTitle');
  const description = t('metaDescription');
  return {
    title: titleSegment,
    description,
    ...buildOgAndCanonical({
      locale,
      pathSegments: [gameSlug, 'zones'],
      titleSegment,
      description,
    }),
  };
}

export default async function GameZonesPage({ params }: ZonesPageProps) {
  const { locale, 'game-slug': gameSlug } = await params;
  setRequestLocale(locale);

  if (!gameHasZonesListPage(gameSlug)) {
    notFound();
  }

  const game = getGameJsonBySlug(gameSlug);
  if (!game) {
    notFound();
  }

  const t = await getTranslations('Breadcrumbs');
  const tZ = await getTranslations('KickALuckyBlockZones');
  const fmt = (n: number) => n.toLocaleString(locale, { maximumFractionDigits: 0 });

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 space-y-8 px-4 py-10 lg:max-w-6xl">
      <Breadcrumbs
        items={[
          { label: t('home'), href: '/' },
          { label: game.name, href: `/${game.slug}` },
          { label: tZ('breadcrumbZones') },
        ]}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">{tZ('zonesH1')}</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-slate-400">{tZ('zonesLead')}</p>
      </header>

      <aside
        className="space-y-2 rounded-lg border border-amber-500/35 bg-amber-950/25 p-4 text-sm leading-relaxed text-amber-100/90"
        role="note"
      >
        <p className="m-0 font-semibold text-amber-50">{tZ('dataPlaceholderTitle')}</p>
        <p className="m-0 text-amber-100/88">{tZ('dataPlaceholderBody')}</p>
      </aside>

      <div className="site-card space-y-4">
        <div className="flex flex-wrap gap-3">
          <Link href={`/${game.slug}/calculator`} className="site-btn site-btn-sm inline-flex w-fit">
            {tZ('linkToCalculator')}
          </Link>
        </div>
        <div className="site-table-wrap">
          <table className="site-table">
            <thead>
              <tr>
                <th scope="col">{tZ('colZone')}</th>
                <th scope="col">{tZ('colPower')}</th>
                <th scope="col">{tZ('colNote')}</th>
              </tr>
            </thead>
            <tbody>
              {KALB_ZONE_ROWS.map((z) => (
                <tr key={z.id}>
                  <td className="font-medium text-slate-200">{z.name}</td>
                  <td className="tabular-nums text-slate-300">{fmt(z.requiredPower)}</td>
                  <td className="max-w-md text-sm text-slate-400">{z.note ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
