import { IntcodeState } from './intcode-state.interface';

export interface IntcodeConfig {
  inputs?: number[];
  noOutputToConsole?: boolean;
  interruptOnOutput?: boolean;
  state?: IntcodeState;
}
