import * as fs from 'fs';
import { getMaxSignal } from './amplifier-sequence';
import { getFeedbackSignal } from './feedback-sequence';

const testCode = fs.readFileSync('src/day7/input.txt', { encoding: 'utf8' });
console.log('Result, part 1:', getMaxSignal(testCode));
console.log('Result, part 2:', getFeedbackSignal(testCode));
