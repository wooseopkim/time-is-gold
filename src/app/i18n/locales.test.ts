import en_US from './en_US';
import ko_KR from './ko_KR';
import { Locale } from './types';

const args = new Proxy(
  {},
  {
    get: (_, __, ___) => {
      return Number.NaN;
    },
  },
);

describe.each([[en_US], [ko_KR]])('', locale => {
  const keys = Object.keys(locale).map(x => x as keyof Locale);
  it.each(keys)('', key => {
    if (key === 'meta') {
      return;
    }

    const value = locale[key];

    if (typeof value === 'string') {
      expect(value.length).toBeGreaterThan(0);
      return;
    }
    if (typeof value === 'function') {
      const result: string = (value as Function).call(undefined, args);
      expect(result).toContain('NaN');
      return;
    }
    throw `Unexpected type of value ${value} ${typeof value}`;
  });
});
