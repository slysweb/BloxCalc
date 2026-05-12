import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteNavbar } from '@/components/layout/SiteNavbar';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Lexend } from 'next/font/google';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

export { generateStaticParams } from '@/i18n/generate-locale-static-params';

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={lexend.variable}>
      <body
        className={`${lexend.className} flex min-h-screen flex-col bg-slate-950 text-slate-200 antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <SiteNavbar />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
