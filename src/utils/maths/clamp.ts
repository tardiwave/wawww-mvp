export const clamp = (value: number, min = 0, max = 7) => {
  return Math.min(Math.max(value, min), max);
};
