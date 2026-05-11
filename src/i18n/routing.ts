import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ja', 'zh', 'pt', 'th'],
  defaultLocale: 'en',
  localePrefix: 'always',
});
