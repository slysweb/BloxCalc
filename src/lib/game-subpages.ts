/** 已注册「区域列表」静态子路由的游戏 slug（与 `app/[locale]/[game-slug]/zones/page.tsx` 一致）。 */
const GAME_SLUGS_WITH_ZONES_PAGE = new Set<string>(['kick-a-lucky-block']);

export function gameHasZonesListPage(slug: string): boolean {
  return GAME_SLUGS_WITH_ZONES_PAGE.has(slug);
}
