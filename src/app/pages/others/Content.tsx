import React from 'react';
import { View } from 'react-native';
import { useTranslator } from '../../i18n/hooks';
import { Body, Heading } from '../../primitives/typography';

interface Props {
  onAchievementsClick: () => void;
  onLanguageClick: () => void;
  onBackgroundClick: () => void;
  onRestorePurchasesClick: () => void;
  onWatchAdClick: () => void;
  onLicensesClick: () => void;
  onSourceCodeClick: () => void;
  onBuyMeACoffeeClick: () => void;
}

export default function Content({
  onAchievementsClick,
  onLanguageClick,
  onBackgroundClick,
  onRestorePurchasesClick,
  onWatchAdClick,
  onLicensesClick,
  onSourceCodeClick,
  onBuyMeACoffeeClick,
}: Props) {
  const translate = useTranslator();

  return (
    <View>
      <Heading>{translate('enjoyGame')}</Heading>
      <Body onPress={onAchievementsClick}>{translate('seeAchievements')}</Body>
      <Body onPress={onLanguageClick}>{translate('changeLanguage')}</Body>
      <Body onPress={onBackgroundClick}>{translate('changeBackground')}</Body>
      <Body onPress={onRestorePurchasesClick}>
        {translate('restorePurchases')}
      </Body>
      <Body onPress={onWatchAdClick}>{translate('watchAd')}</Body>
      <Body onPress={onLicensesClick}>
        {translate('seeThirdPartyLicenses')}
      </Body>
      <Body onPress={onSourceCodeClick}>{translate('seeSourceCode')}</Body>
      <Body onPress={onBuyMeACoffeeClick}>{translate('buyMeACoffee')}</Body>
    </View>
  );
}
