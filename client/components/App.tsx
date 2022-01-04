import React, { useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { PagerView } from 'react-native-pager-view';
import ColorSchemeContext from './colorScheme/context';
import GoldPage from './pages/GoldPage';
import OthersPage from './pages/OthersPage';
import TimePage from './pages/TimePage';

export default function App() {
  const [colorScheme, setColorScheme] = useState(useColorScheme());

  const pages = [
    <GoldPage key="1" />,
    <TimePage key="2" />,
    <OthersPage key="3" />,
  ];
  const pager = (
    <PagerView style={styles.pager} initialPage={0}>
      {pages.map(page => (
        /**
         * https://github.com/callstack/react-native-pager-view#usage
         * Attention: Note that you can only use View components as children of PagerView (cf. folder /example)
         */
        <View key={page.key}>{page}</View>
      ))}
    </PagerView>
  );

  return (
    <ColorSchemeContext.Provider value={[colorScheme, setColorScheme]}>
      {pager}
    </ColorSchemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  pager: {
    flex: 1,
  },
});
