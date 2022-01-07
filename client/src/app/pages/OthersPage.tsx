import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslator } from '../i18n/hooks';
import ParamList from '../navigation/ParamList';
import { Body, Heading } from '../primitives/typography';
import { LICENSES_SCREEN } from '../screens/names';
import PageContainer from './PageContainer';

export default function OthersPage() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamList>>();
  const translate = useTranslator();

  return (
    <PageContainer>
      <Heading>{translate('enjoyGame')}</Heading>
      <Body onPress={() => {}}>{translate('seeAchievements')}</Body>
      <Body onPress={() => {}}>{translate('changeLanguage')}</Body>
      <Body onPress={() => {}}>{translate('changeBackground')}</Body>
      <Body onPress={() => {}}>{translate('restorePurchases')}</Body>
      <Body onPress={() => {}}>{translate('watchAd')}</Body>
      <Body onPress={() => navigation.navigate(LICENSES_SCREEN, {})}>
        {translate('seeThirdPartyLicenses')}
      </Body>
      <Body onPress={() => {}}>{translate('seeSourceCode')}</Body>
      <Body onPress={() => {}}>{translate('buyMeACoffee')}</Body>
    </PageContainer>
  );
}
