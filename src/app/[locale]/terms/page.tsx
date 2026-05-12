import { LegalPageShell, LegalSection } from '@/components/legal/LegalPageShell';
import { Link } from '@/i18n/navigation';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

export { generateStaticParams } from '@/i18n/generate-locale-static-params';

type TermsPageProps = {
  params: Promise<{ locale: string }>;
};

type LegalSectionBlock = {
  title: string;
  paragraphs: string[];
};

type TermsMessages = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lastUpdated: string;
  sections: LegalSectionBlock[];
  backToAbout: string;
};

export async function generateMetadata({ params }: TermsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'TermsPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const data = messages.TermsPage as TermsMessages;

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
