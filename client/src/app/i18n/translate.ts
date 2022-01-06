import { locales } from './locales';
import { Locale, LocaleCode } from './types';

export default function translate<Key extends keyof Locale>(
  locale: LocaleCode,
  key: Key,
): Locale[Key] {
  return locales[locale][key];
}
