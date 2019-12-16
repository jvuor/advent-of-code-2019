import * as readlineSync from 'readline-sync';
import { IntcodeConfig, IntcodeOutput } from './interfaces';

function parseIntcode(code: string): number[] {
  return code
    .split(',')
    .map(num => parseInt(num, 10))
    .filter(num => !isNaN(num));
}

// returns an array where the first element is the opcode and following elements
// are parameter modes
function getModes(instruction: number): number[] {
  const instructionString = instruction.toString(10);
  const paddedInstruction = instructionString.padStart(5, '0');
  return [
    +paddedInstruction.slice(-2),
    +paddedInstruction.slice(-3, -2),
    +paddedInstruction.slice(-4, -3),
    +paddedInstruction.slice(-5, -4),
  ];
}

function getInputFromConsole(): number {
  // using a library for input here because the default node readline is async
  while (true) {
    const inputText = readlineSync.question('Input: ');
    const input = parseInt(inputText, 10);
    if (!isNaN(input)) {
      return input;
    } else {
      console.log('Error, not a number');
    }
  }
}

function operate(startCode: number[], config: IntcodeConfig = {}): IntcodeOutput {
  let pointer = 0;

  if (config.state?.pointer) {
    pointer = config.state.pointer;
  }

  const intcode = [...startCode];
  const outputs: number[] = [];
  let execute = true;

  const set = (addr: number, value: number) => {
    intcode[intcode[addr]] = value;
  };

  const get = (addr: number, mode: number): number => mode ? intcode[addr] : intcode[intcode[addr]];

  while (execute) {
    const [ operation, mode1, mode2, mode3 ] = getModes(intcode[pointer]);
    switch (operation) {
      case 1:
        set(pointer + 3, get(pointer + 1, mode1) + get(pointer + 2, mode2));
        pointer += 4;
        break;
      case 2:
        set(pointer + 3, get(pointer + 1, mode1) * get(pointer + 2, mode2));
        pointer += 4;
        break;
      case 3:
        const input = config.inputs
         ? config.inputs.splice(0, 1)[0]
         : getInputFromConsole();
        set(pointer + 1, input);
        pointer += 2;
        break;
      case 4:
        const output = get(pointer + 1, mode1);
        outputs.push(output);
        pointer += 2;
        if (config.interruptOnOutput) {
          return {
            code: intcode,
            complete: false,
            output: outputs,
            pointer,
          };
        } else if (!config.noOutputToConsole) {
          console.log('Output: ', output);
        }
        break;
      case 5:
        if (get(pointer + 1, mode1) !== 0) {
          pointer = get(pointer + 2, mode2);
        } else {
          pointer += 3;
        }
        break;
      case 6:
        if (get(pointer + 1, mode1) === 0) {
          pointer = get(pointer + 2, mode2);
        } else {
          pointer += 3;
        }
        break;
      case 7:
        if (get(pointer + 1, mode1) < get(pointer + 2, mode2)) {
          set(pointer + 3, 1);
        } else {
          set(pointer + 3, 0);
        }
        pointer += 4;
        break;
      case 8:
        if (get(pointer + 1, mode1) === get(pointer + 2, mode2)) {
          set(pointer + 3, 1);
        } else {
          set(pointer + 3, 0);
        }
        pointer += 4;
        break;
      case 99:
        execute = false;
        break;
      default:
        throw new Error('Unknown operation, intcode processing halted');
    }
  }

  return {
    code: intcode,
    complete: true,
    output: outputs,
    pointer,
  };
}

function test(code: string, config: IntcodeConfig = {}) {
  return operate(parseIntcode(code), config);
}

export { test, parseIntcode, operate, getModes };
