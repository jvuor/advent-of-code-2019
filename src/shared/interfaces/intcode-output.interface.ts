import { IntcodeState } from './intcode-state.interface';

export interface IntcodeOutput extends IntcodeState {
  code: number[];
  output: number[];
  complete?: boolean;
}
