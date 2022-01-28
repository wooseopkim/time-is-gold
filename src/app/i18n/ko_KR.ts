import { format } from './format';
import { Locale, PlayerGroup } from './types';

const ko_KR: Locale = {
  meta: {
    name: 'ko-KR',
    readableName: '한국어',
    fontFamily: {
      regular: 'NanumMyeongjo-Regular',
      bold: 'NanumMyeongjo-Bold',
    },
  },
  timeIsGold: '이곳에서, 시간은 금입니다.',
  goldIsTime: '그리고, 금은 시간입니다.',
  enjoyGame: '"돈낭비: 시간은 금이다"를 즐겨주세요!',
  youHaveEarned: ({ amount }: { amount: number }): string =>
    `${format(amount)} 골드를 벌었습니다.`,
  byPlayingFor: ({ seconds }: { seconds: number }): string =>
    `${seconds}초 동안 플레이했습니다.`,
  nextPayoutIsIn: ({ seconds }: { seconds: number }): string =>
    `다음 수입은 ${seconds}초 후입니다.`,
  youAreTopPlayer: ({
    ratio,
    rank,
    group,
  }: {
    ratio: number;
    rank: number;
    group: PlayerGroup;
  }): string => `${ko_KR[group]} 플레이어 중 ${ratio}% 또는 ${rank}등입니다.`,
  all: '모든',
  ios: 'iOS',
  android: 'Android',
  seeAchievements: '업적을 봅니다.',
  changeLanguage: '언어를 바꿉니다.',
  restorePurchases: '구매 사항을 복구합니다.',
  watchAd: '심심하니까 광고를 봅니다.',
  seeThirdPartyLicenses: '서드파티 라이선스를 봅니다.',
  seeSourceCode: '소스 코드를 봅니다.',
  buyMeACoffee: '개발자에게 커피를 사줍니다.',
  licenses: '서드파티 라이선스',
};

export default ko_KR;
