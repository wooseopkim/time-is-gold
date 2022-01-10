import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { InterstitialAdManager } from 'react-native-fbads';
import packageJson from '../../../../package.json';
import openUrl from '../../linking/openUrl';
import ParamList from '../../navigation/ParamList';
import { LICENSES_SCREEN } from '../../screens/names';
import PageContainer from './../PageContainer';
import Content from './Content';

const sourceCode = packageJson.repository.url;
const buyMeACoffee = 'https://www.buymeacoffee.com/wooseopkim';
const placementId = '2133798973435812_2133812620101114';

export default function OthersPage() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamList>>();

  return (
    <PageContainer>
      <Content
        onAchievementsClick={() => {}}
        onLanguageClick={() => {}}
        onBackgroundClick={() => {}}
        onRestorePurchasesClick={() => {}}
        onWatchAdClick={() =>
          InterstitialAdManager.showAd(placementId).catch(console.log)
        }
        onLicensesClick={() => navigation.navigate(LICENSES_SCREEN, {})}
        onSourceCodeClick={() => openUrl(sourceCode)}
        onBuyMeACoffeeClick={() => openUrl(buyMeACoffee)}
      />
    </PageContainer>
  );
}
