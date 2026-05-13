import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LatestCodes } from '@/components/game/LatestCodes';
import { getGameJsonBySlug } from '@/config/games';
import { Link } from '@/i18n/navigation';
import { buildOgAndCanonical } from '@/lib/seo-metadata';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

export { generateStaticParams } from '@/lib/game-static-params';

type GameDetailPageProps = {
  params: Promise<{ locale: string; 'game-slug': string }>;
};

function buildFaqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export async function generateMetadata({ params }: GameDetailPageProps) {
  const { locale, 'game-slug': gameSlug } = await params;
  const game = getGameJsonBySlug(gameSlug);
  if (!game) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: 'GameDetail' });
  const titleSegment = t('metaTitle', { game: game.name });
  return {
    title: titleSegment,
    description: game.description,
    ...buildOgAndCanonical({
      locale,
      pathSegments: [gameSlug],
      titleSegment,
      description: game.description,
    }),
  };
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { locale, 'game-slug': gameSlug } = await params;
  setRequestLocale(locale);

  const game = getGameJsonBySlug(gameSlug);
  if (!game) {
    notFound();
  }

  const t = await getTranslations('Breadcrumbs');
  const tDetail = await getTranslations('GameDetail');
  const faqLd = buildFaqJsonLd(game.faq);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 space-y-8 px-4 py-10 lg:max-w-6xl">
      <LatestCodes codes={game.codes} />

      <Breadcrumbs
        items={[
          { label: t('home'), href: '/' },
          { label: game.name },
        ]}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">{game.name}</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-slate-400">{game.description}</p>
      </header>

      <section aria-labelledby="quick-nav-heading" className="site-card space-y-3">
        <h2 id="quick-nav-heading" className="text-lg font-semibold text-slate-100">
          {tDetail('quickNavHeading')}
        </h2>
        <p className="text-sm text-slate-400">{tDetail('quickNavDescription')}</p>
        <Link href={`/${game.slug}/calculator`} className="site-btn inline-flex w-fit">
          {t('openCalculator')}
        </Link>
      </section>

      {game.faq.length > 0 ? (
        <section aria-labelledby="faq-heading" className="site-card space-y-4">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
          />
          <h2 id="faq-heading" className="text-lg font-semibold text-slate-100">
            {tDetail('faqHeading')}
          </h2>
          <dl className="m-0 space-y-4">
            {game.faq.map((item) => (
              <Fragment key={item.question}>
                <dt className="text-base font-semibold text-slate-200">{item.question}</dt>
                <dd className="m-0 border-l-2 border-emerald-500/25 pl-4 text-sm leading-relaxed text-slate-400">
                  {item.answer}
                </dd>
              </Fragment>
            ))}
          </dl>
        </section>
      ) : null}
    </main>
  );
}
