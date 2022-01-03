import React, { useMemo } from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { PagerView } from 'react-native-pager-view';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

  return (
    <PagerView style={styles.container} initialPage={0}>
      <View key="1" style={styles.item}>
        <Text>Page 1</Text>
      </View>
      <View key="2" style={styles.item}>
        <Text>Page 2</Text>
      </View>
      <View key="3" style={styles.item}>
        <Text>Page 3</Text>
      </View>
    </PagerView>
  );
};

function createStyles(isDarkMode: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? 'black' : 'white',
      color: isDarkMode ? 'white' : 'black',
    },
  });
}

export default App;
