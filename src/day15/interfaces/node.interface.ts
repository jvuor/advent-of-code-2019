import { Square } from "./square.interface";
import { Direction } from "./direction.enum";

/**
 * Node is a wrapper for Square for Djikstra's algorithm purposes
 */
export interface Node {
  distance: number;
  square: Square;
  route: Direction[]
}

export type NodeSet = Node[];
