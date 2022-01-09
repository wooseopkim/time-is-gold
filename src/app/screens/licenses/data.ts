import licenses from '../../../../licenses.json';

const data = Object.keys(licenses).map(key => ({
  name: key,
  ...(licenses[key as keyof typeof licenses] as {
    licenses: string;
    repository: string;
    licenseUrl: string;
  }),
}));

export default data;

export type Data = typeof data[number];
