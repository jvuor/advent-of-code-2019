import { operate } from '../shared/intcode-computer';
import { Sprite } from './interfaces';
import { Screen } from './Screen';

export class Arcade {
  private opCode: number[];
  private screen: Screen;

  public constructor(opCode: number[]) {
    this.opCode = opCode;
    this.screen = new Screen();
  }

  public run(): void {
    const state = operate(this.opCode, { noOutputToConsole: true });
    this.outputToScreen(state.output);
  }

  private outputToScreen(output: number[]): void {
    if (output.length % 3 !== 0) {
      throw new Error('Invalid output');
    }

    for (let pointer = 0; pointer < output.length; pointer += 3) {
      const x = output[pointer];
      const y = output[pointer + 1];
      const sprite: Sprite = output[pointer + 2];

      this.screen.draw(x, y, sprite);
    }

    this.screen.end();
  }
}
