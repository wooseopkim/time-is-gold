import React, { useState } from 'react';
import { NativeModules, Platform, useColorScheme } from 'react-native';
import ColorSchemeContext from './colorScheme/context';
import LocaleContext from './i18n/context';
import ContentPager from './pager/ContentPager';
import PaginatedPager from './pager/PaginatedPager';
import GoldPage from './pages/GoldPage';
import OthersPage from './pages/OthersPage';
import TimePage from './pages/TimePage';

const defaultLocale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

export default function App() {
  const [colorScheme, setColorScheme] = useState(useColorScheme());
  const [locale, setLocale] = useState(defaultLocale);

  const renderContentPager = () => (
    <ContentPager
      items={[
        <GoldPage key="1" />,
        <TimePage key="2" />,
        <OthersPage key="3" />,
      ]}
    />
  );
  return (
    <ColorSchemeContext.Provider value={[colorScheme, setColorScheme]}>
      <LocaleContext.Provider value={[locale, setLocale]}>
        <PaginatedPager render={renderContentPager} />
      </LocaleContext.Provider>
    </ColorSchemeContext.Provider>
  );
}
