import { LegalPageShell, LegalSection } from '@/components/legal/LegalPageShell';
import { Link } from '@/i18n/navigation';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

export { generateStaticParams } from '@/i18n/generate-locale-static-params';

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

type LegalSectionBlock = {
  title: string;
  paragraphs: string[];
};

type PrivacyMessages = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lastUpdated: string;
  sections: LegalSectionBlock[];
  backToAbout: string;
};

export async function generateMetadata({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PrivacyPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const data = messages.PrivacyPage as PrivacyMessages;

  return (
    <>
      <LegalPageShell title={data.title} lastUpdated={data.lastUpdated}>
        {data.sections.map((section, index) => (
          <LegalSection key={index} title={section.title} paragraphs={section.paragraphs} />
        ))}
      </LegalPageShell>
      <div className="mx-auto w-full max-w-3xl px-4 pb-10">
        <p className="text-sm text-slate-400">
          <Link href="/about" className="site-link">
            {data.backToAbout}
          </Link>
        </p>
      </div>
    </>
  );
}
