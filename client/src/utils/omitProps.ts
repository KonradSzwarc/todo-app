// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omitProps = <T extends Record<string, any>>(toOmit: string[], obj: T): T => {
  const copy = { ...obj };

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(obj)) {
    if (toOmit.includes(key)) {
      // eslint-disable-next-line no-param-reassign
      delete obj[key];
    }
  }

  return copy;
};
