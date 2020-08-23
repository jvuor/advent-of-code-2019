import * as fs from 'fs';
import { parseIntcode, operate } from '../shared/intcode-computer';
import { Direction, Response } from './interfaces';
import { IntcodeOutput } from '../shared/interfaces';

export class RemoteOperator {
  private intcode: number[];
  private state: IntcodeOutput | null;
  
  public constructor() {
    const input = fs.readFileSync('src/day15/input.txt', { encoding: 'utf8' });
    this.intcode = parseIntcode(input);
    this.state = null;
  }

  public step(direction: Direction): Response {
    let output: IntcodeOutput;

    if (!this.state) {
      output = operate(this.intcode, { inputs: [ direction ], interruptOnOutput: true });
    } else {
      output = operate(
        this.state.code,
        {
          inputs: [ direction ],
          interruptOnOutput: true,
          state: this.state
        }
      );
    }
    
    
    if (output.complete) {
      throw new Error('Intcode program completed'); // it should keep on running as long as we provide more inputs
    }
    
    this.state = output;

    return output.output[0];
  }
}
