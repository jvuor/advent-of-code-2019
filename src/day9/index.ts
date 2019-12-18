import * as fs from 'fs';
import { operate, parseIntcode } from './../shared/intcode-computer';

const code = fs.readFileSync('src/day9/input.txt', { encoding: 'utf8' });
const result = operate(parseIntcode(code), { inputs: [1], noOutputToConsole: true });
console.log('Part 1 result:', result.output[0]);
