import { Coordinate } from './coordinate.interface';
import { SquareType } from './square-type.enum';

export interface Square {
  coordinate: Coordinate;
  type: SquareType;
}

export type Squares = Square[];
