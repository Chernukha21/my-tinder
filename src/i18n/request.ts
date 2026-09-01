import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export type Locale = 'en' | 'uk';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    return {
      locale: routing.defaultLocale,
      messages: (await import(`../translations/${routing.defaultLocale}.json`)).default,
    };
  }

  return {
    locale,
    messages: (await import(`../translations/${locale}.json`)).default,
  };
});
