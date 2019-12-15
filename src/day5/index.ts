import * as fs from 'fs';
import { operate, parseIntcode } from '../shared/intcode-computer';

function run(code: string): void {
  const intcode = parseIntcode(code);
  operate(intcode);
}

const data = fs.readFileSync('src/day5/input.txt', { encoding: 'utf8' });
run(data);
