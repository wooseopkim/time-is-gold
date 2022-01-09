import { format } from './format';

describe('createNumberFormatter', () => {
  test('default parameters', () => {
    const result = format(123456789.123);

    expect(result).toBe('123,456,789.123');
  });

  it.each([
    ['ko-KR', '123,456,789.123'],
    ['fr-FR', '123 456 789,123'],
  ])('formats with given locale %s', (locale, expected) => {
    const result = format(123456789.1234, locale);

    expect(result).toBe(expected);
  });
});
