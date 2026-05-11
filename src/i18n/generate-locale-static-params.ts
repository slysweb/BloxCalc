import { routing } from './routing';

/** Shared by every `app/[locale]` layout and page for `output: 'export'`. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
