import { render } from '@testing-library/react-native';
import React, { ReactNode } from 'react';
import 'react-native';
import { Text } from 'react-native';
import { ReactTestInstance } from 'react-test-renderer';
import ContentPager from './ContentPager';

it('renders given items with View wrappers', () => {
  const items = [
    <Page key="foo">foo</Page>,
    <Page key="bar">bar</Page>,
    <Page key="baz">baz</Page>,
    <Page key="qux">qux</Page>,
  ];

  const { container } = render(<ContentPager items={items} />);

  const wrapperTypes = container
    .findAllByType(Page)
    .map(x => (x as ReactTestInstance).parent?.type);
  expect(wrapperTypes).toEqual(Array(items.length).fill('View'));
});

function Page({ children }: { children: ReactNode }) {
  return <Text testID="page">{children}</Text>;
}
