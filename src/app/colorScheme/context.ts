import { createContext } from 'react';
import { ColorSchemeName } from 'react-native';

type ColorScheme = {
  value: ColorSchemeName;
  onChange: (x: ColorSchemeName) => void;
};

const ColorSchemeContext = createContext<ColorScheme>({
  value: null,
  onChange: () => {},
});
export default ColorSchemeContext;
