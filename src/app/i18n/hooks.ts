import { useContext } from 'react';
import LocaleContext from './context';
import { locales } from './locales';
import { Locale } from './types';

export function useLocale() {
  const [value, setValue] = useContext(LocaleContext);
  return { locale: value, setLocale: setValue };
}

export function useTranslator() {
  const { locale } = useLocale();
  return function <T extends keyof Locale>(key: T) {
    return locales[locale][key];
  };
}
