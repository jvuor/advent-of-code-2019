import * as fs from 'fs';
import { checkImageData, decodeImage } from './parse-image';

const imageData = fs.readFileSync('src/day8/input.txt', { encoding: 'utf8' });
console.log('Part 1 result:', checkImageData(imageData, 25, 6));
console.log('Part 2 result:');
decodeImage(imageData, 25, 6);
