export default function createNumberFormatter(
  every: number = 3,
  delimiter: string = ',',
  fractionPoint: string = '.',
) {
  return (value: number) => {
    return value
      .toString()
      .replace('.', fractionPoint)
      .replace(new RegExp(`(.)(?=(\\d{${every}})+$)`, 'g'), `$1${delimiter}`);
  };
}
