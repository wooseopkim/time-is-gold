import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { NativeModules, Platform, useColorScheme } from 'react-native';
import ColorSchemeContext from './colorScheme/context';
import LocaleContext from './i18n/context';
import Stack from './navigation/Stack';
import GameScreen from './screens/GameScreen';
import { GAME_SCREEN } from './screens/names';

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
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={GAME_SCREEN}
              component={GameScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LocaleContext.Provider>
    </ColorSchemeContext.Provider>
  );
}
