import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { PagerView, PagerViewProps } from 'react-native-pager-view';
import GoldPage from '../pages/GoldPage';
import OthersPage from '../pages/OthersPage';
import TimePage from '../pages/TimePage';

export default function ContentPager({ style, ...rest }: PagerViewProps) {
  const composedStyle = StyleSheet.compose<ViewStyle>(styles.pager, style);

  const pages = [
    <GoldPage key="1" />,
    <TimePage key="2" />,
    <OthersPage key="3" />,
  ];
  return (
    <PagerView style={composedStyle} {...rest}>
      {pages.map(page => (
        /**
         * https://github.com/callstack/react-native-pager-view#usage
         * Attention: Note that you can only use View components as children of PagerView (cf. folder /example)
         */
        <View key={page.key}>{page}</View>
      ))}
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pager: {
    flex: 1,
  },
});
