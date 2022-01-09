import { useContext } from 'react';
import LocaleContext from './context';
import { locales } from './locales';
import { Locale } from './types';

export function useLocale() {
  const { value, onChange } = useContext(LocaleContext);
  return { locale: value, onLocaleChange: onChange };
}

export function useTranslator() {
  const { locale } = useLocale();
  return function <T extends keyof Locale>(key: T) {
    return locales[locale][key];
  };
}
