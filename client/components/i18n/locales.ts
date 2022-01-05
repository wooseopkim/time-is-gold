import en_US from './en_US';
import ko_KR from './ko_KR';
import { Locale, LocaleCode } from './types';

export const defaultLocale: LocaleCode = 'en_US';

export const locales: {
  [key in LocaleCode]: Locale;
} = {
  ko_KR,
  en_US,
};
