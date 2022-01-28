import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import { getProducts, Product } from 'react-native-iap';
import TimePage from './TimePage';

describe('Timepage', () => {
  beforeEach(() => {
    (getProducts as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve([
        {
          productId: '10x_multiplier',
          localizedPrice: '$0.99',
          title: 'test2',
        },
        {
          productId: '2x_multiplier',
          localizedPrice: '$2.99',
          title: 'test1',
        },
        {
          productId: '5x_multiplier',
          localizedPrice: '$1.99',
          title: 'test3',
        },
      ] as Product[]),
    );
  });

  it('displays fetched products', async () => {
    const { getByText } = render(<TimePage />);

    await waitFor(() => {
      expect(getByText('test1 ($2.99)')).toBeTruthy();
      expect(getByText('test2 ($0.99)')).toBeTruthy();
      expect(getByText('test3 ($1.99)')).toBeTruthy();
    });
  });
});
