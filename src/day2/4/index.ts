import * as fs from 'fs';
import { operate, parseIntcode } from '../../shared/intcode-computer';

function run(code: string): void {
  const startCode = parseIntcode(code);

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const intcode = [...startCode];
      intcode[1] = noun;
      intcode[2] = verb;
      const result = operate(intcode);

      if (result[0] === 19690720) {
        console.log('result:', 100 * noun + verb);
        return;
      }
    }
  }
}

const data = fs.readFileSync('src/day2/3/input.txt', { encoding: 'utf8' });
run(data);
