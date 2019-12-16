import { operate, parseIntcode } from '../shared/intcode-computer';
import { generatePermutations } from './generate-permutations';

export function getMaxSignal(testCode: string): number {
  const parsedCode = parseIntcode(testCode);

  const allSequences = generatePermutations([0, 1, 2, 3, 4]);
  let maxResult = -Infinity;

  allSequences.forEach(sequence => {
    let input = [0];
    sequence.forEach(signal => {
      input = operate(parsedCode, {
        inputs: [ signal, ...input ],
        noOutputToConsole: true,
      }).output;
    });
    const output = input[0];
    if (output > maxResult) {
      maxResult = output;
    }
  });

  return maxResult;
}
