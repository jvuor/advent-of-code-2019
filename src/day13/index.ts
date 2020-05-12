import * as fs from 'fs';
import { parseIntcode } from '../shared/intcode-computer';
import { Arcade } from './Arcade';
import { VirtualArcade } from './Virtual-arcade';

const input = fs.readFileSync('src/day13/input.txt', { encoding: 'utf8' });

// Part 1
// const arcade = new Arcade(parseIntcode(input));
// arcade.testRun();

// Part 2, real arcade:
// const arcade = new Arcade(parseIntcode(input));
// arcade.run();

// Part 2, robot arcade:
const virtualArcade = new VirtualArcade(parseIntcode(input));
virtualArcade.run();
