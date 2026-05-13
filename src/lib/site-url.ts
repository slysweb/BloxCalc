/** 生产站点根 URL（无尾部斜杠）；未设置 `NEXT_PUBLIC_SITE_URL` 时使用正式域名。 */
export function getSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  return raw ?? 'https://bloxcalc.com';
}
