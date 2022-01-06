import React from 'react';
import 'react-native';
import { Text, View } from 'react-native';
import {
  PagerViewOnPageScrollEvent,
  PagerViewProps,
} from 'react-native-pager-view';
import renderer from 'react-test-renderer';
import ColorSchemeContext from '../colorScheme/context';
import PaginatedPager from './PaginatedPager';

it('renders with given function', () => {
  const render = () => <TestComponent />;

  const result = renderer.create(
    <ColorSchemeContext.Provider value={[null, () => {}]}>
      <PaginatedPager render={render} />
    </ColorSchemeContext.Provider>,
  );

  const found = result.root.findByType(TestComponent);
  expect(found).not.toBeUndefined();
});

test.each([
  [0, 0, 1],
  [1, 0.1, 2],
  [2, 0.9, 4],
])(
  'paginator display the closest page',
  (offset: number, position: number, page: number) => {
    const render = (props: PagerViewProps) => <TestComponent {...props} />;
    const result = renderer.create(
      <ColorSchemeContext.Provider value={[null, () => {}]}>
        <PaginatedPager render={render} />
      </ColorSchemeContext.Provider>,
    );

    renderer.act(() => {
      result.root.findByType(TestComponent).props.onPageScroll({
        nativeEvent: { offset, position },
      } as PagerViewOnPageScrollEvent);
    });

    const paginator = result.root.findByType(Text);
    expect(paginator.props.children.join('')).toBe(`p.${page}`);
  },
);

function TestComponent(props: PagerViewProps) {
  return <View {...props} />;
}
