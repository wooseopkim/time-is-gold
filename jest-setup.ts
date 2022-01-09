/* globals jest */

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(() => Promise.resolve('')),
  addEventListener: () => {},
}));

export {};
