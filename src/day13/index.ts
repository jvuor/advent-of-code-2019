import * as fs from 'fs';
import { parseIntcode } from '../shared/intcode-computer';
import { Arcade } from './Arcade';

const input = fs.readFileSync('src/day13/input.txt', { encoding: 'utf8' });
const arcade = new Arcade(parseIntcode(input));
arcade.run();
