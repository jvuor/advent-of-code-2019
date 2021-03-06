import { operate } from '../shared/intcode-computer';
import { IntcodeConfig, IntcodeOutput } from '../shared/interfaces';
import { ControlInput, Sprite } from './interfaces';
import { Joystick } from './Joystick';
import { Screen } from './Screen';
import { controlMap } from './utils/controls-map';

export class Arcade {
  private opCode: number[];
  private screen: Screen;
  private joystick: Joystick;
  private gameLoop: NodeJS.Timeout | null = null;
  private state: IntcodeOutput | null = null;

  public constructor(opCode: number[]) {
    this.opCode = opCode;
    this.screen = new Screen();
    this.joystick = new Joystick();
  }

  public testRun(): void {
    const state = operate(this.opCode, { noOutputToConsole: true });
    this.outputToScreen(state.output);
    this.screen.end(true);
  }

  public async run(): Promise<any> {
    // insert coin:
    this.opCode[0] = 2;
    this.gameLoop = setInterval(() => this.step(), 500);
  }

  private step(): void {
    const inputFromJoystick = this.joystick.poll();
    const input = controlMap.get(inputFromJoystick) as ControlInput;

    let opCode: number[] = [];
    const config: IntcodeConfig = {
      inputs: [ input ],
      interruptOnInput: true,
      noOutputToConsole : true,
    };
    if (this.state) {
      opCode = this.state.code;
      config.state = this.state;
    } else {
      opCode = this.opCode;
    }

    this.state = operate(opCode, config);

    this.outputToScreen(this.state.output);

    if (this.state.complete && this.gameLoop) {
      clearInterval(this.gameLoop);
      this.screen.end();
      this.joystick.end();
      process.exit();
    }
  }

  private outputToScreen(output: number[]): void {
    if (output.length % 3 !== 0) {
      return;
      console.error(output);
      throw new Error('Invalid output');
    }

    for (let pointer = 0; pointer < output.length; pointer += 3) {
      const x = output[pointer];
      const y = output[pointer + 1];
      const sprite: Sprite = output[pointer + 2];

      this.screen.draw(x, y, sprite);
    }
  }
}
