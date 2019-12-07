function solve(min: number, max: number): number {
  let matchingPasswords = 0;

  for (let num = min; num <= max; ++num) {
    const password: string[] = String(num).split('').reverse();

    let hasPair = false;
    let numbersGrow = true;
    let previousDigit = password.pop() as string;

    while (password.length > 0) {
      const digit: string = password.pop() as string;
      if (previousDigit === digit) {
        hasPair = true;
      }
      if (+digit < +previousDigit) {
        numbersGrow = false;
      }

      previousDigit = digit;
    }

    if (hasPair && numbersGrow) {
      ++matchingPasswords;
    }
  }

  return matchingPasswords;
}

export { solve };
