import { render } from '@testing-library/react-native';
import React from 'react';
import App from './App';

test('default screen is game screen', () => {
  const { getByText } = render(<App />);

  expect(getByText(/Enjoy Time Is Gold/)).toBeTruthy();
});
