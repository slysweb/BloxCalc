import { Link } from '@/i18n/navigation';
import { getGameBySlug, getGameSlugs } from '@/lib/games';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export { generateStaticParams } from '@/i18n/generate-locale-static-params';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('HomePage');
  const slugs = getGameSlugs();

  return (
    <main>
      <h1>{t('title')}</h1>
      <p>
        <Link href="/about">{t('aboutLink')}</Link>
      </p>
      <section aria-labelledby="games-heading">
        <h2 id="games-heading">{t('gamesHeading')}</h2>
        <ul>
          {slugs.map((slug) => {
            const game = getGameBySlug(slug);
            if (!game) return null;
            return (
              <li key={slug}>
                <Link href={`/${slug}`}>{game.name}</Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
