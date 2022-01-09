export function format(value: number, locale?: string) {
  return value.toLocaleString(locale?.replace('_', '-'));
}
