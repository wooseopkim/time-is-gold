import { createNumberFormatter } from './format';
import { LocaleCode } from './types';

describe('createNumberFormatter', () => {
  test('default parameters', () => {
    const format = createNumberFormatter();

    const result = format(123456789.123);

    expect(result).toBe('123,456,789.123');
  });

  it.each([
    ['ko-KR', '123,456,789.123'],
    ['fr-FR', '123 456 789,123'],
  ])('formats with given locale %s', (locale, expected) => {
    const format = createNumberFormatter(locale as LocaleCode);

    const result = format(123456789.1234);

    expect(result).toBe(expected);
  });
});
