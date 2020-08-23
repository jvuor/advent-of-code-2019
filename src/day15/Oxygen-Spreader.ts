import { Squares, SquareType, Coordinate, Square } from "./interfaces";
import { getNeighbourCoordinates } from "./utils/neighbours";

export class OxygenSpreader {
  private squares: Squares;

  public constructor(squares: Squares) {
    this.squares = squares;
  }

  public initialize(): void {
    const system = this.squares.find(s => s.type === SquareType.System);
    if (!system) {
      throw new Error('Oxygen system not found on map');
    }

    system.type = SquareType.Oxygen;
  }

  public cycleToFull(): number {
    let cycles = 0;

    while(!this.fullOfOxygen()) {
      ++cycles;
      this.cycleOxygen();
    }

    return cycles;
  }

  private cycleOxygen(): void {
    this.squares
      .filter(s => s.type === SquareType.Oxygen)
      .forEach(square => {
        getNeighbourCoordinates(square.coordinate)
          .filter(n => this.checkSquare(n) === SquareType.Empty)
          .forEach(n => {
            const square = this.squares.find(s => s.coordinate.x === n.x && s.coordinate.y === n.y) as Square;
            square.type = SquareType.Oxygen;
          })
      });
  }

  private fullOfOxygen(): boolean {
    return !this.squares.some(s => s.type === SquareType.Empty);
  }

  private checkSquare(coordinate: Coordinate): SquareType | null {
    const squareExists = this.squares.find(square => square.coordinate.x == coordinate.x && square.coordinate.y == coordinate.y);
    return squareExists ? squareExists.type : null; 
  }
}
