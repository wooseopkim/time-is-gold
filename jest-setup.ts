/* globals jest */

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(() => Promise.resolve('')),
  addEventListener: () => {},
}));
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'android',
  select: ({ android }: { android: any }) => android,
}));
jest.mock('react-native/Libraries/BatchedBridge/NativeModules', () => ({
  I18nManager: {
    localeIdentifier: 'en_US',
  },
}));
jest.mock('react-native/Libraries/Utilities/PixelRatio', () => ({
  getFontScale: () => 1,
  get: () => 1,
  roundToNearestPixel: () => 1,
}));
jest.mock('react-native/Libraries/ReactNative/NativeI18nManager', () => ({
  getConstants: () => ({}),
}));
jest.mock('react-native/Libraries/Utilities/NativeDeviceInfo', () => ({
  getConstants: () => ({
    Dimensions: {
      window: {},
      screen: {},
    },
  }),
}));

export {};
