import React from 'react';
import { useTranslator } from '../i18n/hooks';
import { Body, Heading } from '../primitives/typography';
import PageContainer from './PageContainer';

export default function OthersPage() {
  const translate = useTranslator();

  return (
    <PageContainer>
      <Heading>{translate('enjoyGame')}</Heading>
      <Body onPress={() => {}}>{translate('seeAchievements')}</Body>
      <Body onPress={() => {}}>{translate('changeLanguage')}</Body>
      <Body onPress={() => {}}>{translate('changeBackground')}</Body>
      <Body onPress={() => {}}>{translate('restorePurchases')}</Body>
      <Body onPress={() => {}}>{translate('watchAd')}</Body>
      <Body onPress={() => {}}>{translate('seeThirdPartyLicenses')}</Body>
      <Body onPress={() => {}}>{translate('seeSourceCode')}</Body>
      <Body onPress={() => {}}>{translate('buyMeACoffee')}</Body>
    </PageContainer>
  );
}
