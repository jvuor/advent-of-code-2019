function solve2(min: number, max: number): number {
  let matchingPasswords = 0;

  for (let num = min; num <= max; ++num) {
    const password: string[] = String(num).split('').reverse();

    let numbersGrow = true;
    let hasPair = false;

    for (let i = 0; i < 6; ++i) {
      const digit: string = password[i];
      const previousDigit = password[i - 1];

      if (previousDigit !== undefined && +digit > +previousDigit) {
        numbersGrow = false;
      }

      if (
        password[i + 1] === digit
        && password[i + 2] !== digit
        && (previousDigit === undefined || previousDigit !== digit)
      ) {
        hasPair = true;
      }
    }

    if (numbersGrow && hasPair) {
      ++matchingPasswords;
    }
  }

  return matchingPasswords;
}

export { solve2 };
