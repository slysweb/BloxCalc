import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from '@/i18n/navigation';
import { getGameBySlug } from '@/lib/games';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export { generateStaticParams } from '@/lib/game-static-params';

type GameDetailPageProps = {
  params: Promise<{ locale: string; 'game-slug': string }>;
};

export async function generateMetadata({ params }: GameDetailPageProps) {
  const { 'game-slug': gameSlug } = await params;
  const game = getGameBySlug(gameSlug);
  if (!game) {
    return {};
  }
  return {
    title: game.name,
    description: game.description,
  };
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { locale, 'game-slug': gameSlug } = await params;
  setRequestLocale(locale);

  const game = getGameBySlug(gameSlug);
  if (!game) {
    notFound();
  }

  const t = await getTranslations('Breadcrumbs');

  return (
    <main>
      <Breadcrumbs
        items={[
          { label: t('home'), href: '/' },
          { label: game.name },
        ]}
      />
      <h1>{game.name}</h1>
      <p>{game.description}</p>
      <p>
        <Link href={`/${game.slug}/calculator`}>{t('openCalculator')}</Link>
      </p>
    </main>
  );
}
