import * as fs from 'fs';

export function readInputFile(): number[] {
  const inputFilePath = './src/day1/1/input.txt';
  const fileData = fs.readFileSync(inputFilePath, { encoding: 'utf8' });

  return fileData.split('\n').map(row => parseInt(row.trim(), 10)).filter(row => row);
}
