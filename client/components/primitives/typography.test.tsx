import React, { ComponentProps } from 'react';
import 'react-native';
import { Text } from 'react-native';
// Note: test renderer must be required after react-native.
import renderer, { ReactTestInstance } from 'react-test-renderer';
import { Body, Heading } from './typography';

test('Heading elements of lower levels have bigger font size', () => {
  const headings = Array(6)
    .fill(0)
    .map((_, i) => i + 1)
    .map(level =>
      renderer.create(
        <Heading level={level as ComponentProps<typeof Heading>['level']} />,
      ),
    );

  for (let i = 1; i < headings.length; i++) {
    const x = headings[i - 1].root.findByType(Text);
    const y = headings[i].root.findByType(Text);
    expect(getFontSize(x.props)).toBeGreaterThan(getFontSize(y.props));
  }
});

test('Heading of level 6 and Body components have the same font size', () => {
  const heading = renderer.create(<Heading level={6} />);
  const body = renderer.create(<Body />);

  const x = heading.root.findByType(Text);
  const y = body.root.findByType(Text);
  expect(getFontSize(x.props)).toBe(getFontSize(y.props));
});

function getFontSize(props: ReactTestInstance['props']) {
  const style = Array.isArray(props.style)
    ? props.style.reduce((acc, x) => ({ ...acc, ...x }))
    : props.style;
  return style?.fontSize;
}
