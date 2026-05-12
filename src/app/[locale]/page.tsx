import { HomePageClient } from '@/components/home/HomePageClient';
import type { HomeRecentUpdate } from '@/components/home/HomePageClient';
import { buildTrendingHubs } from '@/config/home/trending-hubs';
import { gamesList } from '@/config/games/registry';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

export { generateStaticParams } from '@/i18n/generate-locale-static-params';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

type HomePageMessages = {
  recentUpdatesItems?: HomeRecentUpdate[];
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('HomePage');
  const messages = await getMessages();
  const homeMessages = messages.HomePage as HomePageMessages | undefined;
  const recentUpdates = homeMessages?.recentUpdatesItems ?? [];

  const trendingHubs = buildTrendingHubs(gamesList, t('trendingMyKnifeFarmName'));

  const copy = {
    heroTagline: t('heroTagline'),
    searchPlaceholder: t('searchPlaceholder'),
    searchAriaLabel: t('searchAriaLabel'),
    trendingHeading: t('trendingHeading'),
    recentUpdatesHeading: t('recentUpdatesHeading'),
    calculator: t('calculator'),
    codes: t('codes'),
    noResults: t('noResults'),
  };

  return (
    <main className="flex flex-1 flex-col">
      <HomePageClient trendingHubs={trendingHubs} recentUpdates={recentUpdates} copy={copy} />
    </main>
  );
}
