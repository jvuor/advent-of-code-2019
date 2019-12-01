import { moduleFuel } from './module-fuel';
import { readInputFile } from './read-file';

const inputs = readInputFile();

let total = 0;

while (inputs.length > 0) {
  const moduleWeight = inputs.pop() as number;
  const fuelRequirement = moduleFuel(moduleWeight);
  if ( fuelRequirement > 0 ) {
    total += fuelRequirement;
    inputs.push(fuelRequirement);
  }
}

console.log('Total fuel requirement: ', total);
