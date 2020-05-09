
// This function calculates the least common multiple for several numbers
export function lcm(numbers: number[]): number {
  const mostAppearances = new Map<number, number>();
  let factors: number[] = [];

  // step 1: Get prime factors for each number.
  //         Calculate the max amount of times each prime occurs in any number.
  numbers.forEach(num => {
    const primes = primeFactors(num);
    primes.forEach(prime => {
      const appearancesHere = primes.filter(p2 => prime === p2).length;
      if (!mostAppearances.has(prime)) {
        mostAppearances.set(prime, appearancesHere);
      } else {
        const oldValue = mostAppearances.get(prime);
        if (!oldValue || oldValue < appearancesHere) {
          mostAppearances.set(prime, appearancesHere);
        }
      }
    });
  });

  // Step 2: Add each prime as a factor as many times as it occurs the most in one number.
  mostAppearances.forEach((amount, prime) => {
    const newFactors = new Array(amount).fill(prime);
    factors = factors.concat(newFactors);
  });

  // Step 3: Multiply all factors with each other.
  const leastCommonMultiple = factors.reduce((total, factor) => total * factor, 1);
  return leastCommonMultiple;
}

function primeFactors(n: number): number[] {
  const factors: number[] = [];
  let divisor = 2;

  while (n > 2) {
    if (n % divisor === 0) {
      factors.push(divisor);
      n = n / divisor;
    } else {
      divisor++;
    }
  }

  return factors;
}
