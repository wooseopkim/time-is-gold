export function createNumberFormatter(locale?: string) {
  return (value: number) => {
    return value.toLocaleString(locale?.replace('_', '-'));
  };
}
