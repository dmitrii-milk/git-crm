export const prepareOptions = <T extends Record<string, any>>(
  data: T[],
  options: {
    value: keyof T;
    label: keyof T;
  }
) => {
  return data.map((item) => {
    return {
      value: item[options.value],
      label: item[options.label],
    };
  });
};
