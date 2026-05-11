import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getGameBySlug } from '@/lib/games';

export { generateStaticParams } from '@/lib/game-static-params';

type GameSlugLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string; 'game-slug': string }>;
};

export default async function GameSlugLayout({
  children,
  params,
}: GameSlugLayoutProps) {
  const { locale, 'game-slug': gameSlug } = await params;
  setRequestLocale(locale);

  const game = getGameBySlug(gameSlug);
  if (!game) {
    notFound();
  }

  return children;
}
