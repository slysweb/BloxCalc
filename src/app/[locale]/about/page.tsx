import { Link } from '@/i18n/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export { generateStaticParams } from '@/i18n/generate-locale-static-params';

const SUPPORT_EMAIL = 'support@bloxcalc.com';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('AboutPage');

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-8 px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">{t('title')}</h1>
        <p className="text-sm text-slate-500">{t('subtitle')}</p>
      </header>

      <div className="site-card space-y-8 text-sm leading-relaxed text-slate-300">
        <p>{t('intro')}</p>

        <section id="contact" className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-100">{t('contactHeading')}</h2>
          <p>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="site-link">
              {SUPPORT_EMAIL}
            </a>
          </p>
          <p className="text-slate-400">{t('contactNote')}</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-100">{t('legalHeading')}</h2>
          <ul className="list-inside list-disc space-y-2 text-slate-300">
            <li>
              <Link href="/privacy" className="site-link">
                {t('linkPrivacy')}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="site-link">
                {t('linkTerms')}
              </Link>
            </li>
          </ul>
        </section>

        <p className="border-t border-slate-800 pt-6 text-slate-400">
          <Link href="/" className="site-link">
            {t('homeLink')}
          </Link>
        </p>
      </div>
    </main>
  );
}
