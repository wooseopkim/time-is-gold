import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children: ReactNode;
}

export default function PageContainer({ children }: Props) {
  return <View style={styles.layout}>{children}</View>;
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
