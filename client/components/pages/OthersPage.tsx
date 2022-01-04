import React, { useMemo } from 'react';
import { Text } from 'react-native';
import useUserDefinedColorScheme from '../colorScheme/hooks';
import PageContainer from './PageContainer';
import createStyles from './styles';

export default function OthersPage() {
  const { colorScheme } = useUserDefinedColorScheme();
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);

  return (
    <PageContainer>
      <Text style={styles.body}>Page 3</Text>
    </PageContainer>
  );
}
