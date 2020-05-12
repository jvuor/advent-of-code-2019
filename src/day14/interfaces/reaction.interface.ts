import { Material } from './material.interface';

export interface Reactant {
  name: Material;
  amount: number;
}

export interface Reaction {
  requires: Reactant[];
  produces: Reactant;
}
