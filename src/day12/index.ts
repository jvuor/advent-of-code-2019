import * as fs from 'fs';
import { GravitySystem } from './Gravity-system';

const input = fs.readFileSync('src/day12/input.txt', { encoding: 'utf8' });
const system = new GravitySystem(input);
while (system.getSteps() < 1000) {
  system.step();
}
system.output();

const system2 = new GravitySystem(input);
system2.getRepeats();
