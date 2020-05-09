import { Asteroid } from './asteroid.interface';

export interface Target extends Asteroid {
  angle: number;
  distance: number;
  removed: boolean;
}

export type Targets = Target[];
