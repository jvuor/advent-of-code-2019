import * as fs from 'fs';
import { operate, parseIntcode } from './intcode-computer';

function run(code: string): void {
  const intcode = parseIntcode(code);
  intcode[1] = 12;
  intcode[2] = 2;
  const result = operate(intcode);
  console.log('result: ', result[0]);
}

const data = fs.readFileSync('src/3/input.txt', { encoding: 'utf8' });
run(data);
