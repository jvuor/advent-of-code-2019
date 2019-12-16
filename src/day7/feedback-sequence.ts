import { operate, parseIntcode } from '../shared/intcode-computer';
import { IntcodeOutput } from '../shared/interfaces';
import { generatePermutations } from './generate-permutations';

export function getFeedbackSignal(intcode: string): number {
  const parsedCode = parseIntcode(intcode);
  const allSequences = generatePermutations([5, 6, 7, 8, 9]);
  let maxSignal = -Infinity;

  allSequences.forEach(sequence => {
    let input = [0];
    let run = true;
    const previousStates: { [key: number]: IntcodeOutput } = {};
    while (run) {
      sequence.forEach(amplifier => {
        let code: number[];
        let pointer: number;

        if (previousStates.hasOwnProperty(amplifier)) {
          code = previousStates[amplifier].code;
          pointer = previousStates[amplifier].pointer;
        } else {
          input = [amplifier, ...input];
          code = parsedCode;
          pointer = 0;
        }

        const output = operate(code, {
          inputs: [...input],
          interruptOnOutput: true,
          noOutputToConsole: true,
          state: { pointer },
        });

        previousStates[amplifier] = output;
        if (output.output.length > 0) {
          input = output.output;
        }
        run = !output.complete;
      });

    }

    const signal = input[0];
    if (signal > maxSignal) {
      maxSignal = signal;
    }
  });

  return maxSignal;
}
