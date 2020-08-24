import { Pattern } from "./Pattern";

export function FFT(input: string, phases = 1): string {
  let result = input;

  for (let i = 0; i < phases; ++i) {
    result = singlePhase(result);
  }

  return result;
}

function multiplyWithPattern(signal: string, position: number): string {
  const pattern = new Pattern(position + 1);
  const lastDigit = signal.split('')
    .map(d => +d * pattern.getNext())
    .reduce((sum, current) => sum + current, 0)
    .toString(10)
    .substr(-1);

  return lastDigit;
}

function singlePhase(input: string): string {
  const output = input.split('')
    .map(d => +d)
    .map((_, i) => multiplyWithPattern(input, i))
    .join('');

  return output;
}
