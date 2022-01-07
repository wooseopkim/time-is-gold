import { Linking } from 'react-native';

export default function openUrl(url: string) {
  return Linking.openURL(url).catch(() => {});
}
