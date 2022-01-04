import { createContext } from 'react';
import { ColorSchemeName } from 'react-native';

type ColorScheme = [ColorSchemeName, (x: ColorSchemeName) => void];

const ColorSchemeContext = createContext<ColorScheme>([null, () => {}]);
export default ColorSchemeContext;
