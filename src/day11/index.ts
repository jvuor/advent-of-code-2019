import * as fs from 'fs';
import { Robot } from './Robot';

const code = fs.readFileSync('src/day11/input.txt', { encoding: 'utf8' });
const robot1 = new Robot(code, 1);
robot1.run();
const robot2 = new Robot(code, 2);
robot2.run();
