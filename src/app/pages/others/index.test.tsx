import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import { Linking, Text } from 'react-native';
import { InterstitialAdManager } from 'react-native-fbads';
import OthersPage from '.';
import Stack from '../../navigation/Stack';
import { LICENSES_SCREEN, ScreenName } from '../../screens/names';

it('provides link to third party screen', () => {
  const licensesScreenContent = 'hello world';
  const LicensesPage = () => <Text>{licensesScreenContent}</Text>;
  const { getByText } = render(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'default' as ScreenName} component={OthersPage} />
        <Stack.Screen name={LICENSES_SCREEN} component={LicensesPage} />
      </Stack.Navigator>
    </NavigationContainer>,
  );

  fireEvent.press(getByText(/licenses/i));

  expect(getByText(licensesScreenContent)).toBeTruthy();
});

it.each([['source code'], ['Buy Me a Coffee']])(
  'provides link to %s',
  title => {
    const { getByText } = render(
      <NavigationContainer>
        <OthersPage />
      </NavigationContainer>,
    );

    fireEvent.press(getByText(new RegExp(title, 'i')));

    expect(Linking.openURL).toHaveBeenCalled();
  },
);

it('displays ad on click', () => {
  const { getByText } = render(
    <NavigationContainer>
      <OthersPage />
    </NavigationContainer>,
  );

  fireEvent.press(getByText(/watch an ad/i));

  expect(InterstitialAdManager.showAd).toHaveBeenCalled();
});
