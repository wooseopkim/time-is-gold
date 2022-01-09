import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { InterstitialAdManager } from 'react-native-fbads';
import packageJson from '../../../package.json';
import { useTranslator } from '../i18n/hooks';
import openUrl from '../linking/openUrl';
import ParamList from '../navigation/ParamList';
import { Body, Heading } from '../primitives/typography';
import { LICENSES_SCREEN } from '../screens/names';
import PageContainer from './PageContainer';

const sourceCode = packageJson.repository.url;
const buyMeACoffee = 'https://www.buymeacoffee.com/wooseopkim';
const placementId = '2133798973435812_2133812620101114';

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
      <Body
        onPress={() =>
          InterstitialAdManager.showAd(placementId).catch(console.log)
        }>
        {translate('watchAd')}
      </Body>
      <Body onPress={() => navigation.navigate(LICENSES_SCREEN, {})}>
        {translate('seeThirdPartyLicenses')}
      </Body>
      <Body onPress={() => openUrl(sourceCode)}>
        {translate('seeSourceCode')}
      </Body>
      <Body onPress={() => openUrl(buyMeACoffee)}>
        {translate('buyMeACoffee')}
      </Body>
    </PageContainer>
  );
}
