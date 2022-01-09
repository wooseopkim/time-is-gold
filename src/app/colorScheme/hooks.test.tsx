import { renderHook, RenderHookOptions } from '@testing-library/react-hooks';
import React from 'react';
import { ColorSchemeName } from 'react-native';
import ColorSchemeContext from './context';
import useUserDefinedColorScheme from './hooks';

test('default value is light', () => {
  const options = createOptions(() => [null, () => {}]);
  const { result } = renderHook(() => useUserDefinedColorScheme(), options);

  expect(result.current.colorScheme).toBe('light');
});

function createOptions(
  contextProvider: () => [ColorSchemeName, (x: ColorSchemeName) => void],
): RenderHookOptions<unknown> {
  return {
    wrapper: function Wrapper({ children }) {
      const [value, setValue] = contextProvider.call(undefined);
      return (
        <ColorSchemeContext.Provider value={[value, setValue]}>
          {children}
        </ColorSchemeContext.Provider>
      );
    },
  };
}
