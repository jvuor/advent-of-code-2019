import * as readlineSync from 'readline-sync';

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

function operate(startCode: number[]): number[] {
  const intcode = [...startCode];
  let pointer = 0;
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
        // using a library for input here because the default node readline is async
        let inputAccepted = false;
        let input = 0;
        while (!inputAccepted) {
          const inputText = readlineSync.question('Input: ');
          input = parseInt(inputText, 10);
          if (!isNaN(input)) {
            inputAccepted = true;
          } else {
            console.log('Error, not a number');
          }
        }
        set(pointer + 1, input);
        pointer += 2;
        break;
      case 4:
        const output = get(pointer + 1, mode1);
        console.log('Output: ', output);
        pointer += 2;
        break;
      case 99:
        execute = false;
        break;
    }
  }

  return intcode;
}

function test(code: string) {
  return operate(parseIntcode(code));
}

export { test, parseIntcode, operate, getModes };
