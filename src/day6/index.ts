import * as fs from 'fs';
import { parseMap } from './orbit-map';

const testData = fs.readFileSync('src/day6/input.txt', { encoding: 'utf8' });
console.log('Result, part 1: ', parseMap(testData));
