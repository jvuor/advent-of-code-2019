import { IntcodeState } from './intcode-state.interface';

export interface IntcodeConfig {
  inputs?: number[];
  noOutputToConsole?: boolean;
  interruptOnInput?: boolean;
  interruptOnOutput?: boolean;
  state?: IntcodeState;
}
