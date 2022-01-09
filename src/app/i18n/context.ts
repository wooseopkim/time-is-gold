import { createContext } from 'react';
import { defaultLocale } from './locales';
import { LocaleCode } from './types';

type Locale = {
  value: LocaleCode;
  onChange: (x: LocaleCode) => void;
};

const LocaleContext = createContext<Locale>({
  value: defaultLocale,
  onChange: () => {},
});
export default LocaleContext;
