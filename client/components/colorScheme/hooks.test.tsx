import { renderHook, RenderHookOptions } from '@testing-library/react-hooks';
import React, { useState } from 'react';
import { ColorSchemeName } from 'react-native';
import { act } from 'react-test-renderer';
import ColorSchemeContext from './context';
import useUserDefinedColorScheme from './hooks';

test('default value is light', () => {
  const options = createOptions(() => [null, () => {}]);
  const { result } = renderHook(() => useUserDefinedColorScheme(), options);

  expect(result.current.colorScheme).toBe('light');
});

test('setColorScheme calls given function', () => {
  const setter = jest.fn();
  const options = createOptions(() => [null, setter]);
  const { result } = renderHook(() => useUserDefinedColorScheme(), options);

  act(() => result.current.setColorScheme('dark'));

  expect(setter).toHaveBeenCalledWith('dark');
});

test('multiple instances share values', () => {
  const options = createOptions(() => useState<ColorSchemeName>('light'));
  const { result } = renderHook(
    () => [useUserDefinedColorScheme(), useUserDefinedColorScheme()],
    options,
  );

  act(() => result.current[0].setColorScheme('dark'));

  expect(result.current[1].colorScheme).toBe('dark');
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
