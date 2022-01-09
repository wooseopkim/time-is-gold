import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { NativeModules, Platform, useColorScheme } from 'react-native';
import ColorSchemeContext from './colorScheme/context';
import LocaleContext from './i18n/context';
import { useTranslator } from './i18n/hooks';
import Stack from './navigation/Stack';
import GameScreen from './screens/GameScreen';
import LicensesScreen from './screens/licenses';
import { GAME_SCREEN, LICENSES_SCREEN } from './screens/names';

const defaultLocale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

export default function App() {
  const [colorScheme, setColorScheme] = useState(useColorScheme());
  const [locale, setLocale] = useState(defaultLocale);
  const translate = useTranslator();

  return (
    <ColorSchemeContext.Provider
      value={{ value: colorScheme, onChange: setColorScheme }}>
      <LocaleContext.Provider value={{ value: locale, onChange: setLocale }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={GAME_SCREEN}
              component={GameScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={LICENSES_SCREEN}
              component={LicensesScreen}
              options={{ title: translate('licenses') }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LocaleContext.Provider>
    </ColorSchemeContext.Provider>
  );
}
