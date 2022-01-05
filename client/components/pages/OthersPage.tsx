import React from 'react';
import { useTranslator } from '../i18n/hooks';
import { Body, Heading } from '../primitives/typography';
import PageContainer from './PageContainer';

export default function OthersPage() {
  const translate = useTranslator();

  return (
    <PageContainer>
      <Heading>{translate('enjoyGame')}</Heading>
      <Body>{translate('seeAchievements')}</Body>
      <Body>{translate('changeLanguage')}</Body>
      <Body>{translate('changeBackground')}</Body>
      <Body>{translate('restorePurchases')}</Body>
      <Body>{translate('watchAd')}</Body>
      <Body>{translate('seeThirdPartyLicenses')}</Body>
      <Body>{translate('seeSourceCode')}</Body>
      <Body>{translate('buyMeACoffee')}</Body>
    </PageContainer>
  );
}
