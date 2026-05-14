import type { GameConfig } from '@/config/games/types';

export type TrendingHub = {
  id: string;
  name: string;
  icon: string;
  /** Game / hub landing page (no hash). */
  hubHref: string;
  calculatorHref: string;
  codesHref: string;
};

const DEFAULT_ICON = '🎮';

const ICON_BY_SLUG: Record<string, string> = {
  'blox-fruits': '🍈',
  'adopt-me': '🐾',
  'slime-rng': '🧪',
  'kick-a-lucky-block': '🍀',
};

/**
 * Trending grid: registry games + My Knife Farm hub (not in games JSON folder).
 * Order: registry list, then MKF.
 */
export function buildTrendingHubs(
  games: GameConfig[],
  myKnifeFarmDisplayName: string,
): TrendingHub[] {
  const fromGames: TrendingHub[] = games.map((g) => ({
    id: g.slug,
    name: g.name,
    icon: ICON_BY_SLUG[g.slug] ?? DEFAULT_ICON,
    hubHref: `/${g.slug}`,
    calculatorHref: `/${g.slug}/calculator`,
    codesHref: `/${g.slug}#latest-codes`,
  }));

  const mkf: TrendingHub = {
    id: 'my-knife-farm',
    name: myKnifeFarmDisplayName,
    icon: '🔪',
    hubHref: '/my-knife-farm',
    calculatorHref: '/my-knife-farm/roi-calculator',
    codesHref: '/my-knife-farm#latest-codes',
  };

  return [...fromGames, mkf];
}
