/** 生产站点根 URL（无尾部斜杠），与 README 中 `NEXT_PUBLIC_SITE_URL` 一致。 */
export function getSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  return raw ?? 'https://bloxcalc.pages.dev';
}
