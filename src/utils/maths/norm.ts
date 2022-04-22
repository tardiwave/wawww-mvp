export const norm = (value: number, min = 0, max = 1) => {
  return (value - min) / (max - min);
}
