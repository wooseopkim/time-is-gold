/* globals jest */

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(() => Promise.resolve('')),
  addEventListener: () => {},
}));
jest.mock('react-native-fbads', () => ({
  InterstitialAdManager: {
    showAd: jest.fn(() => Promise.resolve(false)),
  },
}));

export {};
