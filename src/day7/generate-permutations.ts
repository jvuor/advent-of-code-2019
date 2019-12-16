export function generatePermutations(list: number[]): number[][] {
  const permutations: number[][] = [];

  // https://en.wikipedia.org/wiki/Heap%27s_algorithm
  const heapsAlgorithm = (a: number[], n: number): void => {
    if (n === 1) {
      permutations.push([...a]);
    } else {
      for (let i = 0; i < (n - 1); i++) {
        heapsAlgorithm(a, n - 1);
        if (n % 2 === 0) {
          [a[i], a[n - 1]] = [a[n - 1], a[i]];
        } else {
          [a[0], a[n - 1]] = [a[n - 1], a[0]];
        }
      }
      heapsAlgorithm(a, n - 1);
    }
  };

  heapsAlgorithm(list, list.length);

  return permutations;
}
