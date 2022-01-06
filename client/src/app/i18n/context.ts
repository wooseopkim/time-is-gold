import { createContext } from 'react';
import { defaultLocale } from './locales';
import { LocaleCode } from './types';

type Locale = [LocaleCode, (x: LocaleCode) => void];

const LocaleContext = createContext<Locale>([defaultLocale, () => {}]);
export default LocaleContext;
