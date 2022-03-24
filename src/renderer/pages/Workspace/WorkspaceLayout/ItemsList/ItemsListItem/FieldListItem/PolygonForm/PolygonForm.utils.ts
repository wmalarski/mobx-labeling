export const toPairs = (flattened: number[]): number[][] => {
  return flattened.reduce<number[][]>((prev, curr, index, array) => {
    if (index % 2 === 1 || index >= array.length) return prev;
    return [...prev, [curr, array[index + 1]]];
  }, []);
};
