export const mean = (values: number[]) => {
  let result: number = 0;
  for (const value of values) {
    result += value;
  }
  return result / values.length;
};
