import React from 'react';
import { PagerViewProps } from 'react-native-pager-view';
import ContentPager from '../pager/ContentPager';
import PaginatedPager from '../pager/PaginatedPager';
import GoldPage from '../pages/GoldPage';
import OthersPage from '../pages/others';
import TimePage from '../pages/TimePage';

export default function GameScreen() {
  const items = [
    <GoldPage key="1" />,
    <TimePage key="2" />,
    <OthersPage key="3" />,
  ];
  const render = (props: PagerViewProps) => (
    <ContentPager items={items} {...props} />
  );
  return <PaginatedPager renderContent={render} />;
}
