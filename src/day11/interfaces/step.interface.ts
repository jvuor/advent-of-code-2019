import { Direction } from './direction.enum';

export interface Step {
  direction: Direction;
  x: number;
  y: number;
}
