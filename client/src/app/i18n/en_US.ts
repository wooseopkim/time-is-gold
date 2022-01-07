import { format } from './format';
import { Locale, PlayerGroup } from './types';

const en_US: Locale = {
  meta: {
    name: 'en-US',
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
  buyMultiplier: ({
    ratio,
    price,
    currency,
  }: {
    ratio: number;
    price: number;
    currency: string;
  }): string =>
    `Buy one-time ${ratio}x income multiplier (${formatCurrency(
      price,
      currency,
    )}).`,
  buyGold: ({
    amount,
    price,
    currency,
  }: {
    amount: number;
    price: number;
    currency: string;
  }): string =>
    `Buy ${format(amount)} gold (${formatCurrency(price, currency)}).`,
  buyAnimeGirl: ({ gold }: { gold: number }): string =>
    `Buy an anime girl (${gold} gold).`,
  seeAchievements: 'See achievements.',
  changeLanguage: 'Change language.',
  changeBackground: 'Change background.',
  restorePurchases: 'Restore purchases.',
  watchAd: 'Watch an ad for no reason.',
  seeThirdPartyLicenses: 'See third-party licenses.',
  seeSourceCode: 'See source code.',
  buyMeACoffee: 'Buy me a coffee.',
  licenses: 'Third-Party Licenses',
};

export default en_US;

function formatCurrency(amount: number, currency: string): string {
  return `${currency}${format(amount, en_US.meta.name)}`;
}
