export const sqdist = (x1: number, y1: number, x2: number, y2: number) => {
  return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
};

export const dist = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(sqdist(x1, y1, x2, y2));
};
