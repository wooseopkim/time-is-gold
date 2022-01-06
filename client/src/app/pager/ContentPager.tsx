import React, { ReactElement } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { PagerView, PagerViewProps } from 'react-native-pager-view';

interface Props extends PagerViewProps {
  items: ReactElement[];
}

export default function ContentPager({ style, items, ...rest }: Props) {
  const composedStyle = StyleSheet.compose<ViewStyle>(styles.pager, style);

  return (
    <PagerView style={composedStyle} {...rest}>
      {items.map(page => (
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
