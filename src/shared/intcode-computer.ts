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
  let relativeBase = 0;

  if (config.state) {
    pointer = config.state.pointer;
    relativeBase = config.state.relativeBase;
  }

  const intcode = [...startCode];
  const outputs: number[] = [];
  let execute = true;

  const set = (addr: number, value: number, mode: number) => {
    switch (mode) {
      case 0:
        intcode[intcode[addr]] = value;
        return;
      case 1:
        throw new Error('Writing in immediate mode is not allowed');
      case 2:
        intcode[intcode[addr] + relativeBase] = value;
        return;
      default:
        throw new Error('Illegal mode setting');
    }
  };

  const get = (addr: number, mode: number): number => {
    const nullCheck = (value: number) => isNaN(value) ? 0 : value;

    switch (mode) {
      case 0:
        // position mode: value is a memory address for the fetched value
        return nullCheck(intcode[intcode[addr]]);
      case 1:
        // immediate mode: value is a read from directly from the memory address
        return nullCheck(intcode[addr]);
      case 2:
        // relative mode: like position mode but gives the memory address as relative value
        return nullCheck(intcode[intcode[addr] + relativeBase]);
      default:
        throw new Error('Illegal mode setting');
    }
  };

  while (execute) {
    const [ operation, mode1, mode2, mode3 ] = getModes(intcode[pointer]);
    switch (operation) {
      case 1:
        // add
        set(pointer + 3, get(pointer + 1, mode1) + get(pointer + 2, mode2), mode3);
        pointer += 4;
        break;
      case 2:
        // multiply
        set(pointer + 3, get(pointer + 1, mode1) * get(pointer + 2, mode2), mode3);
        pointer += 4;
        break;
      case 3:
        // input

        if (config.interruptOnInput && config.inputs?.length === 0) {
          return {
            code: intcode,
            complete: false,
            output: outputs,
            pointer,
            relativeBase,
          };
        }

        if (config.inputs && config.inputs.length === 0) {
          throw new Error('Out of inputs');
        }

        const input = config.inputs
         ? config.inputs.splice(0, 1)[0]
         : getInputFromConsole();
        set(pointer + 1, input, mode1);
        pointer += 2;
        break;
      case 4:
        // output
        const output = get(pointer + 1, mode1);
        outputs.push(output);
        pointer += 2;
        if (config.interruptOnOutput) {
          return {
            code: intcode,
            complete: false,
            output: outputs,
            pointer,
            relativeBase,
          };
        } else if (!config.noOutputToConsole) {
          console.log('Output: ', output);
        }
        break;
      case 5:
        // jump-if-true
        if (get(pointer + 1, mode1) !== 0) {
          pointer = get(pointer + 2, mode2);
        } else {
          pointer += 3;
        }
        break;
      case 6:
        // jump-if-false
        if (get(pointer + 1, mode1) === 0) {
          pointer = get(pointer + 2, mode2);
        } else {
          pointer += 3;
        }
        break;
      case 7:
        // less than
        if (get(pointer + 1, mode1) < get(pointer + 2, mode2)) {
          set(pointer + 3, 1, mode3);
        } else {
          set(pointer + 3, 0, mode3);
        }
        pointer += 4;
        break;
      case 8:
        // equals
        if (get(pointer + 1, mode1) === get(pointer + 2, mode2)) {
          set(pointer + 3, 1, mode3);
        } else {
          set(pointer + 3, 0, mode3);
        }
        pointer += 4;
        break;
      case 9:
        // adjust relative base
        relativeBase += get(pointer + 1, mode1);
        pointer += 2;
        break;
      case 99:
        // end
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
    relativeBase,
  };
}

function test(code: string, config: IntcodeConfig = {}) {
  return operate(parseIntcode(code), config);
}

export { test, parseIntcode, operate, getModes };
