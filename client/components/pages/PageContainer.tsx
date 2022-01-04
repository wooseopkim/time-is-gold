import React, { ReactNode, useMemo } from 'react';
import { ColorSchemeName, StyleSheet, View } from 'react-native';
import useUserDefinedColorScheme from '../colorScheme/hooks';

interface Props {
  children: ReactNode;
}

export default function PageContainer({ children }: Props) {
  const { colorScheme } = useUserDefinedColorScheme();
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);

  return <View style={styles.layout}>{children}</View>;
}

function createStyles(colorScheme: ColorSchemeName) {
  const isDarkMode = colorScheme === 'dark';
  return StyleSheet.create({
    layout: {
      backgroundColor: isDarkMode ? 'black' : 'white',
      width: '100%',
      height: '100%',
    },
  });
}
