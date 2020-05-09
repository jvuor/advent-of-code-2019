import * as fs from 'fs';
import { solveMap } from './solve-map';

const map = fs.readFileSync('src/day10/input.txt', { encoding: 'utf8' });
const solution = solveMap(map);
console.log(`Most connected asteroid is at x:${solution.x} y:${solution.y} with ${solution.connections} connections`);
