import { routing } from '@/i18n/routing';
import { getGameSlugs } from '@/lib/games';

/** Locales × game slugs for `app/[locale]/[game-slug]/**` static export. */
export function generateStaticParams() {
  const slugs = getGameSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, 'game-slug': slug })),
  );
}
