import * as fs from 'fs';
import { solve } from './solution';

function main(): void {
  const paths = fs.readFileSync('src/day3/5/input.txt', { encoding: 'utf8' }).split('\n');
  console.log('Solution:', solve(paths[0], paths[1]));
}

main();
