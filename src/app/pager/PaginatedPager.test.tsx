import { act, render } from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import { View } from 'react-native';
import {
  PagerViewOnPageScrollEvent,
  PagerViewProps,
} from 'react-native-pager-view';
import ColorSchemeContext from '../colorScheme/context';
import PaginatedPager from './PaginatedPager';

it('renders with given function', () => {
  const renderContent = () => <TestComponent />;

  const { container } = render(
    <ColorSchemeContext.Provider value={[null, () => {}]}>
      <PaginatedPager renderContent={renderContent} />
    </ColorSchemeContext.Provider>,
  );

  const found = container.findByType(TestComponent);
  expect(found).toBeTruthy();
});

test.each([
  [0, 0, 1],
  [1, 0.1, 2],
  [2, 0.9, 4],
])(
  'paginator display the closest page',
  (offset: number, position: number, page: number) => {
    const renderContent = (props: PagerViewProps) => (
      <TestComponent {...props} />
    );
    const { getByText, container } = render(
      <ColorSchemeContext.Provider value={[null, () => {}]}>
        <PaginatedPager renderContent={renderContent} />
      </ColorSchemeContext.Provider>,
    );

    act(() => {
      container.findByType(TestComponent).props.onPageScroll({
        nativeEvent: { offset, position },
      } as PagerViewOnPageScrollEvent);
    });

    expect(getByText(`p.${page}`)).toBeTruthy();
  },
);

function TestComponent(props: PagerViewProps) {
  return <View {...props} />;
}
