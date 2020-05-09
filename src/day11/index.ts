import * as fs from 'fs';
import { Robot } from './Robot';

const code = fs.readFileSync('src/day11/input.txt', { encoding: 'utf8' });
const robot = new Robot(code);
robot.run();
