import React, { ComponentProps } from 'react';
import 'react-native';
import { Text, TextStyle, View } from 'react-native';
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
    expect(getMergedStyle(x).fontSize).toBeGreaterThan(
      getMergedStyle(y).fontSize as number,
    );
  }
});

test('Heading of level 6 and Body components have the same font size', () => {
  const heading = renderer.create(<Heading level={6} />);
  const body = renderer.create(<Body />);

  const x = heading.root.findByType(Text);
  const y = body.root.findByType(Text);
  expect(getMergedStyle(x).fontSize).toBe(getMergedStyle(y).fontSize);
});

test('style gets merged with default style', () => {
  const style = { color: 'red' };

  const emptyHeading = renderer.create(<Heading style={style} />);
  const emptyBody = renderer.create(<Body style={style} />);
  const styledHeading = renderer.create(<Heading style={style} />);
  const styledBody = renderer.create(<Body style={style} />);

  const a = styledHeading.root.findByType(Text);
  const b = styledBody.root.findByType(Text);
  const c = emptyHeading.root.findByType(Text);
  const d = emptyBody.root.findByType(Text);
  expect(getMergedStyle(a).color).toBe('red');
  expect(getMergedStyle(b).color).toBe('red');
  expect(getMergedStyle(c).fontSize).toBe(getMergedStyle(a).fontSize);
  expect(getMergedStyle(d).fontSize).toBe(getMergedStyle(b).fontSize);
});

it("inserts zero-width space after all characters when wordBreak is 'all'", () => {
  const result = renderer.create(
    <Body wordBreak="all">
      aaa {'bbb'} <View />
      <Body wordBreak="all">ccc {'ddd'} eee</Body>
    </Body>,
  );

  const json = result.toJSON();
  const text = getText(json);

  expect(text.replace(/​+/g, '​')).toBe(
    'aaa bbb ccc ddd eee'
      .split('')
      .map(x => x + '​')
      .join(''),
  );
});

function getText(json: any) {
  function reduce(acc: string, x: any): string {
    if (x === undefined || x == null) {
      return acc;
    }
    if (typeof x === 'string') {
      return acc + x;
    }
    if (!isArrayLike(x)) {
      return acc + reduce('', x.children);
    }
    return acc + Array.from(x).reduce(reduce, acc);
  }
  return reduce('', json);
}

function isArrayLike(value: any): value is ArrayLike<any> {
  return Array.isArray(value) || typeof value === 'string';
}

function getMergedStyle(instance: ReactTestInstance): TextStyle {
  const style: TextStyle | TextStyle[] = instance.props.style;

  function reduce(acc: TextStyle, x: TextStyle | TextStyle[]): TextStyle {
    if (Array.isArray(x)) {
      return { ...acc, ...x.reduce(reduce, acc) };
    }
    return { ...acc, ...x };
  }

  return Array.isArray(style) ? style.reduce(reduce) : style ?? {};
}
