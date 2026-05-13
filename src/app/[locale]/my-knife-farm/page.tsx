import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LatestCodes } from '@/components/game/LatestCodes';
import { myKnifeFarmSite } from '@/config/my-knife-farm';
import { Link } from '@/i18n/navigation';
import { buildOgAndCanonical } from '@/lib/seo-metadata';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Fragment } from 'react';

export { generateStaticParams } from '@/i18n/generate-locale-static-params';

type PageProps = {
  params: Promise<{ locale: string }>;
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

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MyKnifeFarm' });
  const titleSegment = t('metaHubTitle');
  const description = t('metaHubDescription');
  return {
    title: titleSegment,
    description,
    keywords: [
      'My Knife Farm calculator',
      'My Knife Farm codes',
      'My Knife Farm guide',
      'Roblox My Knife Farm',
    ],
    ...buildOgAndCanonical({
      locale,
      pathSegments: ['my-knife-farm'],
      titleSegment,
      description,
    }),
  };
}

export default async function MyKnifeFarmHubPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const game = myKnifeFarmSite;
  const t = await getTranslations('Breadcrumbs');
  const tDetail = await getTranslations('GameDetail');
  const tM = await getTranslations('MyKnifeFarm');
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
        <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">{tM('hubH1')}</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-slate-400">{game.description}</p>
      </header>

      <section aria-labelledby="guide-heading" className="site-card space-y-6">
        <h2 id="guide-heading" className="text-xl font-semibold text-slate-100">
          {tM('guideHeading')}
        </h2>
        {game.guideSections.map((section) => (
          <section key={section.heading} className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-200">{section.heading}</h3>
            {section.paragraphs.map((p, i) => (
              <p key={`${section.heading}-${i}`} className="max-w-3xl text-sm leading-relaxed text-slate-400">
                {p}
              </p>
            ))}
          </section>
        ))}
      </section>

      <section aria-labelledby="quick-nav-heading" className="site-card space-y-3">
        <h2 id="quick-nav-heading" className="text-lg font-semibold text-slate-100">
          {tDetail('quickNavHeading')}
        </h2>
        <p className="text-sm text-slate-400">{tM('hubQuickNavBody')}</p>
        <ul className="m-0 list-none space-y-2 p-0">
          <li>
            <Link href="/my-knife-farm/roi-calculator" className="site-link text-base font-medium">
              {tM('hubLinkRoi')}
            </Link>
          </li>
          <li>
            <Link href="/my-knife-farm/zones-list" className="site-link text-base font-medium">
              {tM('hubLinkZones')}
            </Link>
          </li>
        </ul>
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
