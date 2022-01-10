import { render } from '@testing-library/react-native';
import React, { ComponentProps } from 'react';
import 'react-native';
import { Text, TextStyle, View } from 'react-native';
import { ReactTestInstance } from 'react-test-renderer';
import LocaleContext from '../i18n/context';
import { LocaleCode } from '../i18n/types';
import { Body, Heading } from './typography';

test('Heading elements of lower levels have bigger font size', () => {
  const headings = Array(6)
    .fill(0)
    .map((_, i) => i + 1)
    .map(level =>
      render(
        <Heading level={level as ComponentProps<typeof Heading>['level']} />,
      ),
    );

  for (let i = 1; i < headings.length; i++) {
    const x = headings[i - 1].container.findByType(Text);
    const y = headings[i].container.findByType(Text);
    expect(getMergedStyle(x).fontSize).toBeGreaterThan(
      getMergedStyle(y).fontSize as number,
    );
  }
});

test('Heading of level 6 and Body components have the same font size', () => {
  const heading = render(<Heading level={6} />);
  const body = render(<Body />);

  const x = heading.container.findByType(Text);
  const y = body.container.findByType(Text);
  expect(getMergedStyle(x).fontSize).toBe(getMergedStyle(y).fontSize);
});

test('style gets merged with default style', () => {
  const style = { color: 'red' };

  const emptyHeading = render(<Heading style={style} />);
  const emptyBody = render(<Body style={style} />);
  const styledHeading = render(<Heading style={style} />);
  const styledBody = render(<Body style={style} />);

  const a = styledHeading.container.findByType(Text);
  const b = styledBody.container.findByType(Text);
  const c = emptyHeading.container.findByType(Text);
  const d = emptyBody.container.findByType(Text);
  expect(getMergedStyle(a).color).toBe('red');
  expect(getMergedStyle(b).color).toBe('red');
  expect(getMergedStyle(c).fontSize).toBe(getMergedStyle(a).fontSize);
  expect(getMergedStyle(d).fontSize).toBe(getMergedStyle(b).fontSize);
});

it("inserts zero-width space after all characters when wordBreak is 'all'", () => {
  const { toJSON } = render(
    <Body wordBreak="all">
      aaa {'bbb'} <View />
      <Body wordBreak="all">ccc {'ddd'} eee</Body>
    </Body>,
  );

  const text = getText(toJSON());

  expect(text.replace(/​+/g, '​')).toBe(
    'aaa bbb ccc ddd eee'
      .split('')
      .map(x => x + '​')
      .join(''),
  );
});

it.each([
  ['all' as ComponentProps<typeof Body>['wordBreak']],
  ['word' as ComponentProps<typeof Body>['wordBreak']],
])('has proper a11y label even when wordBreak="%s"', wordBreak => {
  // https://reactnative.dev/docs/react-node
  const { getByA11yLabel } = render(
    <Body wordBreak={wordBreak}>
      aaa {1234} <View />
      <Body wordBreak={wordBreak}>
        bbb{true}
        {null}
        {undefined}
        {'ccc'}5
      </Body>
      {[
        true,
        null,
        undefined,
        6,
        [
          <Text key="x">string</Text>,
          <Body key="y" wordBreak={wordBreak}>
            wow
          </Body>,
        ],
      ].map((x, i) => {
        return <Text key={i}>{x}</Text>;
      })}
    </Body>,
  );

  expect(getByA11yLabel('aaa 1234 bbbccc56stringwow')).toBeTruthy();
});

it.each([
  ['ko_KR' as LocaleCode, 'NanumMyeongjo'],
  ['en_US' as LocaleCode, 'OldStandardTT'],
])("renders with selected language's font", (code, fontFamily) => {
  const { container } = render(
    <LocaleContext.Provider value={{ value: code, onChange: () => {} }}>
      <Body />
    </LocaleContext.Provider>,
  );

  const actual = container.findByType(Text).props.style.fontFamily;
  expect(actual).toMatch(fontFamily);
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
