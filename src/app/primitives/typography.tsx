import React, { Fragment, ReactNode, useMemo } from 'react';
import {
  ColorSchemeName,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import useUserDefinedColorScheme from '../colorScheme/hooks';
import { fontSizeUnit } from '../responsiveness';

type StyleGetter<T> = (x: ReturnType<typeof createStyles>) => T;

interface TypographyProps extends TextProps {
  wordBreak?: 'word' | 'all';
}

interface StyledTextProps<T> extends TypographyProps {
  getStyle: StyleGetter<T>;
}

interface HeadingProps extends TypographyProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

interface BodyProps extends TypographyProps {}

const defaultHeadingLevel = 3;

export function Heading({
  level,
  children,
  style: passedStyle,
  ...rest
}: HeadingProps) {
  const originalStyle = {
    fontSize: (fontSizeUnit * (10 - (level ?? defaultHeadingLevel))) / 4,
  };
  const composedStyle = StyleSheet.compose<TextStyle>(
    originalStyle,
    passedStyle,
  );

  return (
    <StyledText
      getStyle={styles => styles.heading}
      style={composedStyle}
      {...rest}>
      {children}
    </StyledText>
  );
}

export function Body({ children, ...rest }: BodyProps) {
  return (
    <StyledText getStyle={styles => styles.body} {...rest}>
      {children}
    </StyledText>
  );
}

function StyledText<T extends StyleProp<TextStyle>>({
  getStyle,
  children,
  style: passedStyle,
  onPress,
  wordBreak = 'word',
  ...rest
}: StyledTextProps<T>) {
  const { colorScheme } = useUserDefinedColorScheme();
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);
  const originalStyle = useMemo(() => getStyle(styles), [getStyle, styles]);
  const composedStyle = StyleSheet.compose(originalStyle, passedStyle);

  const reduceA11yLabel = useMemo(
    () =>
      (acc: string, x: ReactNode): string => {
        if (x === undefined || x === null || typeof x === 'boolean') {
          return acc;
        }
        if (typeof x !== 'object') {
          return acc + x;
        }
        if (isArrayLike(x)) {
          if (x.length <= 1) {
            return acc + x[0];
          }
          return Array.from(x).reduce(reduceA11yLabel, acc);
        }
        if ('props' in x) {
          return acc + reduceA11yLabel('', x.props.children);
        }
        return acc;
      },
    [],
  );
  const mapWordBreak = useMemo(
    () => (child: ReactNode, index: number) => {
      const shouldBreak = wordBreak === 'all' && isArrayLike(child);
      if (!shouldBreak) {
        return child;
      }
      const key = `${reduceA11yLabel('', child)}${index}`;
      return (
        <Fragment key={key}>
          {child.length > 1 ? Array.from(child).map(mapWordBreak) : child}
          {'​'}
        </Fragment>
      );
    },
    [wordBreak, reduceA11yLabel],
  );

  const a11yLabel = useMemo(
    () => reduceA11yLabel('', children),
    [reduceA11yLabel, children],
  );
  const processedChildren = useMemo(
    () => mapWordBreak(children, 0),
    [mapWordBreak, children],
  );
  const text = (
    <Text style={composedStyle} accessibilityLabel={a11yLabel} {...rest}>
      {processedChildren}
    </Text>
  );
  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{text}</TouchableOpacity>;
  }
  return text;
}

function createStyles(colorScheme: ColorSchemeName) {
  const isDarkMode = colorScheme === 'dark';
  const text = {
    color: isDarkMode ? 'white' : 'black',
  };
  return StyleSheet.create({
    heading: {
      ...text,
      fontFamily: 'OldStandardTT-Bold',
    },
    body: {
      ...text,
      fontFamily: 'OldStandardTT-Regular',
      fontSize: fontSizeUnit,
    },
  });
}

function isArrayLike(value: any): value is ArrayLike<any> {
  return Array.isArray(value) || typeof value === 'string';
}
