import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export { generateStaticParams } from '@/i18n/generate-locale-static-params';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('AboutPage');

  return (
    <main>
      <h1>{t('title')}</h1>
      <p>
        <Link href="/">{t('homeLink')}</Link>
      </p>
    </main>
  );
}
