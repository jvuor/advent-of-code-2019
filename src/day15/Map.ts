import { Squares, SquareType, Coordinate, Node, NodeSet, Direction } from './interfaces';
import { getNeighbourCoordinates, getNeighbourRoute } from './utils/neighbours';
import { MapOutput } from './Map-Output';
import { OxygenSpreader } from './Oxygen-Spreader';

export class Map {
  private squares: Squares;
  private output: MapOutput;

  public constructor() {
    this.output = new MapOutput;
    this.squares = [];

    this.addSquare({ x: 0, y: 0 }, SquareType.Empty);
  }

  public addSquare(coordinate: Coordinate, type: SquareType): void {
    const squareExists = this.checkSquare(coordinate);
    if (squareExists && squareExists !== SquareType.Unknown) {
      throw new Error('Square exists at coordinates already');
    } else {
      // remove unknown when another square is added to the location
      this.squares = this.squares.filter(square => (square.coordinate.x !== coordinate.x || square.coordinate.y !== coordinate.y));
    }

    this.saveSquare(coordinate, type);

    // if we hit a wall, do not add unknown squares around it
    if (type === SquareType.Wall) {
      return;
    }

    // get neighbours of the added square, add all that don't already exist as unknown
    const neighbours = getNeighbourCoordinates(coordinate);
    neighbours
      .filter(neighbour => this.checkSquare(neighbour) === null)
      .forEach(neighbour => this.saveSquare(neighbour, SquareType.Unknown))
  }

  // output the current map to console, optionally highlight a position
  public outputMap(coordinate?: Coordinate): void {
    coordinate 
      ? this.output.drawMap(this.squares, coordinate)
      : this.output.drawMap(this.squares);
  }

  public findNearestUnknown(startingPosition: Coordinate): Direction[] | null {
    // check that there are unknown squares
    const unknownsExist = this.squares.some(square => square.type === SquareType.Unknown);
    if (!unknownsExist) {
      return null;
    }

    return this.findNearest(startingPosition, SquareType.Unknown);
  }

  public findNearest(startingPosition: Coordinate, squareType: SquareType): Direction[] | null {
    // routefinding with djikstras algorithm until we find an square with the wanted type
    const initialSquare = this.squares.find(s => s.coordinate.x === startingPosition.x && s.coordinate.y === startingPosition.y);
    if (!initialSquare) {
      throw new Error('Starting position not found');
    }
  
    let currentNode: Node = {
      distance: 0,
      square: initialSquare,
      route: [],
    };

    const visitedNodes: NodeSet = [];
    let unvisitedNodes: NodeSet = this.squares
      .filter(square => square !== initialSquare)
      .filter(square => square.type !== SquareType.Wall)
      .map((square): Node => ({ distance: Infinity, square, route: [] }));

    unvisitedNodes.push(currentNode);

    while (true) {
      // find neighbours of currently considered node
      const neighbours = getNeighbourRoute(currentNode.square.coordinate, this.squares);

      // for each unvisited neighbour, set distance to distance to current node + 1 if shorter
      // than already stored distance. store route if so.
      Object.entries(neighbours)
        .filter(([direction, square]) => square !== undefined)
        .forEach(([direction, square]) => {
        const newDistance = currentNode.distance + 1;

        const neighbourNode = unvisitedNodes.find(n => n.square === square);
        if (neighbourNode) {
          const newRoute = [ ...currentNode.route, +direction as Direction ];
          if (newDistance < neighbourNode.distance) {
            neighbourNode.distance = newDistance;
            neighbourNode.route = newRoute;
          }
        }
      })

      // mark current node as visited
      unvisitedNodes = unvisitedNodes.filter(node => node !== currentNode);
      visitedNodes.push(currentNode);

      if (unvisitedNodes.length === 0) {
        throw new Error('Out of nodes');
      }

      // select unfinished node with shortest distance as the new current node
      currentNode = unvisitedNodes.sort((a, b) => a.distance - b.distance)[0];

      // if the new current node is of the type that we want, return the route to it
      if (currentNode.square.type === squareType) {
        return currentNode.route;
      }
    }
  }

  public getOxygenSpreader(): OxygenSpreader {
    return new OxygenSpreader(this.squares);
  }

  private checkSquare(coordinate: Coordinate): SquareType | null {
    const squareExists = this.squares.find(square => square.coordinate.x == coordinate.x && square.coordinate.y == coordinate.y);
    return squareExists ? squareExists.type : null; 
  }

  private saveSquare(coordinate: Coordinate, type: SquareType): void {
    this.squares.push({
      coordinate,
      type
    });
  }
}
