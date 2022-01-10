import React from 'react';
import { useTranslator } from '../i18n/hooks';
import { Body, Heading } from '../primitives/typography';
import PageContainer from './PageContainer';

export default function TimePage() {
  const translate = useTranslator();

  return (
    <PageContainer>
      <Heading>{translate('goldIsTime')}</Heading>
      <Body onPress={() => {}}>
        {translate('buyMultiplier')({ ratio: 2, price: 1, currency: '$' })}
      </Body>
      <Body onPress={() => {}}>
        {translate('buyMultiplier')({ ratio: 5, price: 10, currency: '$' })}
      </Body>
      <Body onPress={() => {}}>
        {translate('buyMultiplier')({ ratio: 5, price: 10, currency: '$' })}
      </Body>
      <Body onPress={() => {}}>
        {translate('buyMultiplier')({ ratio: 10, price: 100, currency: '$' })}
      </Body>
      <Body onPress={() => {}}>
        {translate('buyGold')({ amount: 1000, price: 1, currency: '$' })}
      </Body>
      <Body onPress={() => {}}>
        {translate('buyGold')({ amount: 25000, price: 10, currency: '$' })}
      </Body>
      <Body onPress={() => {}}>
        {translate('buyGold')({ amount: 50000, price: 100, currency: '$' })}
      </Body>
    </PageContainer>
  );
}
