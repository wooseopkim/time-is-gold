import { ColorSchemeName, StyleSheet } from 'react-native';

export default function createStyles(colorScheme: ColorSchemeName) {
  const isDarkMode = colorScheme === 'dark';
  const text = {
    backgroundColor: isDarkMode ? 'black' : 'white',
    color: isDarkMode ? 'white' : 'black',
    fontFamily: 'OldStandardTT-Regular',
  };
  return StyleSheet.create({
    heading: {
      ...text,
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    body: {
      ...text,
    },
  });
}
