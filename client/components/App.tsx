import React, { useState } from 'react';
import {
  NativeModules,
  Platform,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { PagerView } from 'react-native-pager-view';
import ColorSchemeContext from './colorScheme/context';
import LocaleContext from './i18n/context';
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

  const pages = [
    <GoldPage key="1" />,
    <TimePage key="2" />,
    <OthersPage key="3" />,
  ];
  const pager = (
    <PagerView style={styles.pager} initialPage={0}>
      {pages.map(page => (
        /**
         * https://github.com/callstack/react-native-pager-view#usage
         * Attention: Note that you can only use View components as children of PagerView (cf. folder /example)
         */
        <View key={page.key}>{page}</View>
      ))}
    </PagerView>
  );

  return (
    <ColorSchemeContext.Provider value={[colorScheme, setColorScheme]}>
      <LocaleContext.Provider value={[locale, setLocale]}>
        {pager}
      </LocaleContext.Provider>
    </ColorSchemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  pager: {
    flex: 1,
  },
});
