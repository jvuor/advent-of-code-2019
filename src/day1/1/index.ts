import { moduleFuel } from './module-fuel';
import { readInputFile } from './read-file';

const inputs = readInputFile();

let total = 0;

inputs.forEach(module => {
  total += moduleFuel(module);
});

console.log('Total fuel requirement: ', total);
