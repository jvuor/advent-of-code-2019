import { operate, parseIntcode } from '../shared/intcode-computer';
import { IntcodeConfig, IntcodeState } from '../shared/interfaces';
import { Grid } from './Grid';
import { Color, Direction, Turn } from './interfaces';
import { move } from './utils';

export class Robot {
  private opCode: number[];
  private direction: Direction;
  private grid: Grid;
  private previousOpComputerState: null | IntcodeState;
  private complete: boolean;
  private part: number;

  constructor(code: string, part: number) {
    this.opCode = parseIntcode(code);
    this.direction = Direction.Up;
    this.grid = new Grid(part === 1 ? Color.Black : Color.white);
    this.previousOpComputerState = null;
    this.complete = false;
    this.part = part;
  }

  public run(): void {
    while (!this.complete) {
      const color: Color = this.step();
      if (!this.complete) {
        this.grid.paintSquare(color);
      }
      const turn: Turn = this.step();
      if (!this.complete) {
        const step = move(this.direction, turn);
        this.direction = step.direction;
        this.grid.moveToSquare(step);
      }
    }
    if (this.part === 1) {
      console.log(`Total painted squares: ${this.grid.countPaintedSquares()}`);
    } else if (this.part === 2) {
      this.grid.output();
    }
  }

  public step(): number {
    const config: IntcodeConfig = {
      inputs: this.getCurrentColor(),
      interruptOnOutput: true,
      noOutputToConsole: true,
    };

    if (this.previousOpComputerState) {
      config.state = this.previousOpComputerState;
    }

    const state = operate(this.opCode, config);

    this.opCode = state.code;
    this.previousOpComputerState = { pointer: state.pointer, relativeBase: state.relativeBase };
    this.complete = state.complete ? true : false;
    if (state.output.length !== 1 && !state.complete) {
      throw new Error('Unexpected output');
    }
    return state.complete ? 0 : state.output[0];
  }

  private getCurrentColor(): number[] {
    return [ this.grid.getCurrentColor() ];
  }
}
