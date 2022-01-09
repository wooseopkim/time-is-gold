import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Item from './Item';

it('opens link on license URL click', () => {
  const name = 'some-library';
  const licenses = 'MIT';
  const licenseUrl = 'https://example.com/license';
  const repository = 'https://example.com/repository';
  const { getByA11yLabel } = render(
    <Item
      name={name}
      licenses={licenses}
      repository={repository}
      licenseUrl={licenseUrl}
    />,
  );

  fireEvent.press(getByA11yLabel(repository));
});
