import { Direction } from './direction.enum';
import { Coordinate } from './coordinate.interface';

export const NeighboursMap: Record<Direction, Coordinate> = {
  [Direction.North]: { x: 0, y: -1 },
  [Direction.South]: { x: 0, y: 1 },
  [Direction.East]: { x: 1, y: 0 },
  [Direction.West]: { x: -1, y: 0 },
};
