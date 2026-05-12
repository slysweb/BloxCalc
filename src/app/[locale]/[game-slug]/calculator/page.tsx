import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TradeTotalsFairnessCalculator } from '@/components/game/TradeTotalsFairnessCalculator';
import { getGameBySlug } from '@/lib/games';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export { generateStaticParams } from '@/lib/game-static-params';

type GameCalculatorPageProps = {
  params: Promise<{ locale: string; 'game-slug': string }>;
};

function tradeCalcNamespace(
  slug: string,
): 'AdoptMeCalculator' | 'BloxFruitsCalculator' | null {
  if (slug === 'adopt-me') return 'AdoptMeCalculator';
  if (slug === 'blox-fruits') return 'BloxFruitsCalculator';
  return null;
}

export async function generateMetadata({ params }: GameCalculatorPageProps) {
  const { locale, 'game-slug': gameSlug } = await params;
  const game = getGameBySlug(gameSlug);
  if (!game) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: 'GameCalculator' });
  const ns = tradeCalcNamespace(gameSlug);
  const tMeta =
    ns != null
      ? await getTranslations({ locale, namespace: ns })
      : null;
  return {
    title: `${game.name} — ${t('metaTitleSuffix')}`,
    description: tMeta?.('metaDescription') ?? game.description,
  };
}

export default async function GameCalculatorPage({
  params,
}: GameCalculatorPageProps) {
  const { locale, 'game-slug': gameSlug } = await params;
  setRequestLocale(locale);

  const game = getGameBySlug(gameSlug);
  if (!game) {
    notFound();
  }

  const t = await getTranslations('Breadcrumbs');
  const tCalc = await getTranslations('GameCalculator');
  const tradeNs = tradeCalcNamespace(game.slug);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 space-y-6 px-4 py-10 lg:max-w-6xl">
      <Breadcrumbs
        items={[
          { label: t('home'), href: '/' },
          { label: game.name, href: `/${game.slug}` },
          { label: t('calculator') },
        ]}
      />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          {tCalc('heading', { game: game.name })}
        </h1>
        <p className="max-w-3xl text-slate-400">{tCalc('lead')}</p>
      </header>

      {tradeNs ? (
        <TradeTotalsFairnessCalculator namespace={tradeNs} />
      ) : (
        <div className="site-card space-y-3">
          <p className="text-slate-400">{tCalc('placeholder')}</p>
        </div>
      )}
    </main>
  );
}
