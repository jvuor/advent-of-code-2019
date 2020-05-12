import { operate } from '../shared/intcode-computer';
import { IntcodeConfig, IntcodeOutput } from '../shared/interfaces';
import { ControlInput, Sprite } from './interfaces';
import { RobotPlayer } from './Robot-Player';
import { Screen } from './Screen';
import { controlMap } from './utils/controls-map';
import { VirtualScreen } from './Virtual-screen';

export class VirtualArcade {
  private opCode: number[];
  private screen: Screen;
  private virtualScreen: VirtualScreen;
  private robotPlayer: RobotPlayer;
  private gameLoop: NodeJS.Timeout | null = null;
  private state: IntcodeOutput | null = null;

  public constructor(opCode: number[]) {
    this.opCode = opCode;
    this.screen = new Screen();
    this.virtualScreen = new VirtualScreen();
    this.robotPlayer = new RobotPlayer(this.screen, this.virtualScreen);
  }

  public async run(): Promise<any> {
    // insert coin:
    this.opCode[0] = 2;
    this.gameLoop = setInterval(() => this.step(), 20);
  }

  private step(): void {
    const input = this.robotPlayer.getInput();

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
      this.virtualScreen.draw(x, y, sprite);
    }
  }
}
