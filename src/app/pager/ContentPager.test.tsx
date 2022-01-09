import React from 'react';
import 'react-native';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import ContentPager from './ContentPager';

it('renders given items', () => {
  const items = [
    <Text key="foo">foo</Text>,
    <Text key="bar">bar</Text>,
    <Text key="baz">baz</Text>,
    <Text key="qux">qux</Text>,
  ];

  const result = renderer.create(<ContentPager items={items} />);

  const actual = result.root.findAllByType(Text).map(x => x.props.children);
  const expected = items.map(x => x.props.children);
  expect(actual).toEqual(expected);
});
