import { useContext } from 'react';
import ColorSchemeContext from './context';

export default function useUserDefinedColorScheme() {
  const { value, onChange } = useContext(ColorSchemeContext);
  const filledValue = value ?? 'light';
  return { colorScheme: filledValue, onColorSchemeChange: onChange };
}
