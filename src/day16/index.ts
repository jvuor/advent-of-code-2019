import * as fs from 'fs';
import { FFT } from './FFT';

const input = fs.readFileSync('src/day16/input.txt', { encoding: 'utf8' });
const result = FFT(input, 100);
console.log('Part 1 result', result.substring(0, 8));
