import { Vector } from './vector.interface';

export interface Moon {
  position: Vector;
  velocity: Vector;
}

export type Moons = Moon[];
