export type Point2D = {
  x: number;
  y: number;
};

export function optionalClamp(
  value: number,
  min?: number,
  max?: number
): number {
  const valueMin = min ? Math.max(min, value) : value;
  return max ? Math.min(max, valueMin) : valueMin;
}
