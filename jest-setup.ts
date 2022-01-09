/* globals jest */
import { Linking } from 'react-native';

jest.spyOn(Linking, 'openURL').mockImplementation(() => Promise.resolve(''));
