export function moduleFuel(mass: number): number {
  const solution = (Math.floor(mass / 3)) - 2;
  return solution > 0 ? solution : 0;
}
