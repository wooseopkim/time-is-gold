import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Data } from './data';
import Item from './Item';

it('opens link on license URL click', () => {
  const data: Data = {
    name: 'some-library',
    licenses: 'MIT',
    licenseUrl: 'https://example.com/license',
    repository: 'https://example.com/repository',
  };
  const { getByA11yLabel } = render(<Item data={data} />);

  fireEvent.press(getByA11yLabel(data.repository));
});
