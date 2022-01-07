import React, { useMemo } from 'react';
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

interface TypographyProps extends TextProps {}

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
  ...rest
}: StyledTextProps<T>) {
  const { colorScheme } = useUserDefinedColorScheme();
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);
  const originalStyle = useMemo(() => getStyle(styles), [getStyle, styles]);
  const composedStyle = StyleSheet.compose(originalStyle, passedStyle);

  const text = (
    <Text style={composedStyle} {...rest}>
      {children}
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