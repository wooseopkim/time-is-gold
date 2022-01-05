import React from 'react';
import { useTranslator } from '../i18n/hooks';
import { Body, Heading } from '../primitives/typography';
import PageContainer from './PageContainer';

export default function GoldPage() {
  const translate = useTranslator();

  return (
    <PageContainer>
      <Heading level={2}>{translate('timeIsGold')}</Heading>
      <Body>{translate('youHaveEarned')({ amount: 0 })}</Body>
      <Body>{translate('byPlayingFor')({ seconds: 0 })}</Body>
      <Body>{translate('nextPayoutIsIn')({ seconds: 1 })}</Body>
      <Body>
        {translate('youAreTopPlayer')({ rank: 1, ratio: 0.01, group: 'all' })}
      </Body>
    </PageContainer>
  );
}
