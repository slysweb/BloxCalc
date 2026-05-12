import { Link } from '@/i18n/navigation';
import { getGameBySlug, getGameSlugs } from '@/lib/games';
import { getTranslations } from 'next-intl/server';

export async function SiteNavbar() {
  const t = await getTranslations('SiteLayout');
  const slugs = getGameSlugs();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-slate-100 transition-colors hover:text-emerald-300"
        >
          {t('brand')}
        </Link>

        <nav
          aria-label={t('navAria')}
          className="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm font-medium"
        >
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white"
          >
            {t('navHome')}
          </Link>
          <Link
            href="/my-knife-farm"
            className="rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white"
          >
            {t('navMyKnifeFarm')}
          </Link>

          <span className="hidden h-4 w-px bg-slate-700 md:inline" aria-hidden="true" />

          {slugs.map((slug) => {
            const game = getGameBySlug(slug);
            if (!game) return null;
            return (
              <Link
                key={slug}
                href={`/${slug}`}
                className="rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white"
              >
                {game.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
