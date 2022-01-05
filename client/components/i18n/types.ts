export type LocaleCode = 'ko_KR' | 'en_US';

type Platform = 'ios' | 'android';
export type PlayerGroup = 'all' | Platform;

export type Locale = {
  timeIsGold: string;
  goldIsTime: string;
  enjoyGame: string;
  youHaveEarned: (args: { amount: number }) => string;
  byPlayingFor: (args: { seconds: number }) => string;
  nextPayoutIsIn: (args: { seconds: number }) => string;
  youAreTopPlayer: (args: {
    ratio: number;
    rank: number;
    group: PlayerGroup;
  }) => string;
  all: string;
  ios: string;
  android: string;
  buyMultiplier: (args: {
    ratio: number;
    price: number;
    currency: string;
  }) => string;
  buyGold: (args: {
    amount: number;
    price: number;
    currency: string;
  }) => string;
  buyAnimeGirl: (args: { gold: number }) => string;
  seeAchievements: string;
  changeLanguage: string;
  changeBackground: string;
  restorePurchases: string;
  watchAd: string;
  seeThirdPartyLicenses: string;
  seeSourceCode: string;
  buyMeACoffee: string;
};
