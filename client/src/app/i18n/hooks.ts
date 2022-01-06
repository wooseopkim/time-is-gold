import { useContext } from 'react';
import LocaleContext from './context';
import translate from './translate';
import { Locale } from './types';

export function useLocale() {
  const [value, setValue] = useContext(LocaleContext);
  return { locale: value, setLocale: setValue };
}

export function useTranslator() {
  const { locale } = useLocale();
  return function <T extends keyof Locale>(key: T) {
    return translate(locale, key);
  };
}
