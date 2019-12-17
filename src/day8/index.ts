import * as fs from 'fs';
import { checkImageData } from './parse-image';

const imageData = fs.readFileSync('src/day8/input.txt', { encoding: 'utf8' });
console.log('Part 1 result:', checkImageData(imageData, 25, 6));
