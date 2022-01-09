import { render } from '@testing-library/react-native';
import React from 'react';
import LicensesScreen from '.';

it('displays license data', () => {
  const { getByA11yLabel } = render(<LicensesScreen />);

  expect(getByA11yLabel(/^react-native@/)).toBeTruthy();
});
