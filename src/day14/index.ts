import * as fs from 'fs';
import { ReactionParser } from './Reaction-Parser';

const input = fs.readFileSync('src/day14/input.txt', { encoding: 'utf8' });
const parser = new ReactionParser(input);
const solution = parser.solveForOre();
console.log(`Ore required: ${solution}`);
console.log(`Max fuel from trillion ore: ${parser.solveMaximized()}`);
