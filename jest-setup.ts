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

jest.mock('react-native-iap', () => ({
  initConnection: jest.fn(() => Promise.resolve(true)),
  endConnection: jest.fn(() => Promise.resolve()),
  getProducts: jest.fn(() => Promise.resolve([])),
  requestPurchase: jest.fn(() => Promise.resolve({})),
  clearTransactionIOS: jest.fn(),
  flushFailedPurchasesCachedAsPendingAndroid: jest.fn(),
}));

export {};
