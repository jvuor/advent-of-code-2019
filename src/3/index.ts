import * as fs from 'fs';

function parseIntcode(code: string): number[] {
  return code
    .split(',')
    .map(num => num.replace(/\D/g, ''))
    .map(num => parseInt(num, 10))
    .filter(num => !isNaN(num));
}

function operate(startCode: number[]): number[] {
  const intcode = [...startCode];
  let pointer = 0;
  let execute = true;

  const set = (addr: number, value: number) => {
    intcode[intcode[addr]] = value;
  };

  const get = (addr: number): number => intcode[intcode[addr]];

  while (execute) {
    const operation = intcode[pointer];
    switch (operation) {
      case 1:
        set(pointer + 3, get(pointer + 1) + get(pointer + 2));
        pointer += 4;
        break;
      case 2:
        set(pointer + 3, get(pointer + 1) * get(pointer + 2));
        pointer += 4;
        break;
      case 99:
        execute = false;
        break;
    }
  }

  return intcode;
}

function run(code: string): void {
  const intcode = parseIntcode(code);
  intcode[1] = 12;
  intcode[2] = 2;
  const result = operate(intcode);
  console.log('result: ', result[0]);
}

function test(code: string) {
  return operate(parseIntcode(code));
}

const data = fs.readFileSync('src/3/input.txt', { encoding: 'utf8' });
run(data);

export { test };
