import React, { useState } from 'react';
import { NativeModules, Platform, useColorScheme } from 'react-native';
import ColorSchemeContext from './colorScheme/context';
import LocaleContext from './i18n/context';
import ContentPager from './pager/ContentPager';
import PaginatedPager from './pager/PaginatedPager';

const defaultLocale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

export default function App() {
  const [colorScheme, setColorScheme] = useState(useColorScheme());
  const [locale, setLocale] = useState(defaultLocale);

  return (
    <ColorSchemeContext.Provider value={[colorScheme, setColorScheme]}>
      <LocaleContext.Provider value={[locale, setLocale]}>
        <PaginatedPager render={ContentPager} />
      </LocaleContext.Provider>
    </ColorSchemeContext.Provider>
  );
}
