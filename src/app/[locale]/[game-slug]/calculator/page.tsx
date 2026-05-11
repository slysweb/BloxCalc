import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getGameBySlug } from '@/lib/games';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export { generateStaticParams } from '@/lib/game-static-params';

type GameCalculatorPageProps = {
  params: Promise<{ locale: string; 'game-slug': string }>;
};

export async function generateMetadata({ params }: GameCalculatorPageProps) {
  const { locale, 'game-slug': gameSlug } = await params;
  const game = getGameBySlug(gameSlug);
  if (!game) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: 'GameCalculator' });
  return {
    title: `${game.name} — ${t('metaTitleSuffix')}`,
    description: game.description,
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

  return (
    <main>
      <Breadcrumbs
        items={[
          { label: t('home'), href: '/' },
          { label: game.name, href: `/${game.slug}` },
          { label: t('calculator') },
        ]}
      />
      <h1>{tCalc('heading', { game: game.name })}</h1>
      <p>{tCalc('placeholder')}</p>
    </main>
  );
}
