import React, { ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  PagerViewOnPageScrollEvent,
  PagerViewProps,
} from 'react-native-pager-view';
import { Heading } from '../primitives/typography';

interface Props {
  render: (props: PagerViewProps) => ReactElement;
}

export default function PaginatedPager({ render }: Props) {
  const [{ offset, position }, setLastEvent] = useState({
    offset: 0,
    position: 0,
  });
  const onPageScroll = (e: PagerViewOnPageScrollEvent) => {
    setLastEvent(e.nativeEvent);
  };

  const page = Math.round(position + offset + 1);

  const content = render({ onPageScroll });
  return (
    <View style={styles.layout}>
      <View style={styles.container}>{content}</View>
      <Heading style={styles.paginator}>p.{page}</Heading>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  paginator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
