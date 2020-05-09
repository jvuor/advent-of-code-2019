import { Color } from './color.enum';

export interface GridSquare {
  x: number;
  y: number;
  color: Color;
  painted: boolean;
}
