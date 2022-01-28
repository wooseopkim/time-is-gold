import { format } from './format';
import { Locale, PlayerGroup } from './types';

const en_US: Locale = {
  meta: {
    name: 'en-US',
    readableName: 'English',
    fontFamily: {
      regular: 'OldStandardTT-Regular',
      bold: 'OldStandardTT-Bold',
    },
  },
  timeIsGold: 'Here, time is gold...',
  goldIsTime: 'And, gold is time.',
  enjoyGame: 'Enjoy Time Is Gold: A Waste of Money!',
  youHaveEarned: ({ amount }: { amount: number }): string =>
    `You have earned ${format(amount)} gold,`,
  byPlayingFor: ({ seconds }: { seconds: number }): string =>
    `by playing for ${seconds} ${seconds === 1 ? 'second' : 'seconds'}.`,
  nextPayoutIsIn: ({ seconds }: { seconds: number }): string =>
    `Next payout is in ${seconds} ${seconds === 1 ? 'second' : 'seconds'}.`,
  youAreTopPlayer: ({
    ratio,
    rank,
    group,
  }: {
    ratio: number;
    rank: number;
    group: PlayerGroup;
  }): string =>
    `You are top ${ratio * 100}% or #${rank} of the ${en_US[group]} players.`,
  all: 'all',
  ios: 'iOS',
  android: 'Android',
  seeAchievements: 'See achievements.',
  changeLanguage: 'Change language.',
  restorePurchases: 'Restore purchases.',
  watchAd: 'Watch an ad for no reason.',
  seeThirdPartyLicenses: 'See third-party licenses.',
  seeSourceCode: 'See source code.',
  buyMeACoffee: 'Buy me a coffee.',
  licenses: 'Third-Party Licenses',
};

export default en_US;
