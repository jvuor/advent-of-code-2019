import { Color, GridSquare, Step } from './interfaces';

export class Grid {
  private squares: GridSquare[];
  private currentX: number;
  private currentY: number;

  public constructor(initialColor: Color = Color.Black) {
    this.squares = [{ x: 0, y: 0, color: initialColor, painted: false }];
    this.currentX = 0;
    this.currentY = 0;
  }

  public moveToSquare(step: Step): void {
    const newX = this.currentX + step.x;
    const newY = this.currentY + step.y;
    const squareExists = this.squares.find(square => square.x === newX && square.y === newY);

    if (!squareExists) {
      this.squares.push({
        color: Color.Black,
        painted: false,
        x: newX,
        y: newY,
      });
    }

    this.currentX = newX;
    this.currentY = newY;
  }

  public paintSquare(color: Color): void {
    const currentSquare = this.currentSquare();
    currentSquare.color = color;
    currentSquare.painted = true;
  }

  public countPaintedSquares(): number {
    return this.squares.filter(square => square.painted).length;
  }

  public getCurrentColor(): Color {
    const color = this.currentSquare().color;
    if (color !== Color.Black && color !== Color.white) {
      throw new Error('color error');
    }
    return color;
  }

  public output(): void {
    const [ minX, maxX, minY, maxY ] = this.squares.reduce((prev: number[], cur) => [
      prev[0] < cur.x ? prev[0] : cur.x,
      prev[1] > cur.x ? prev[1] : cur.x,
      prev[2] < cur.y ? prev[2] : cur.y,
      prev[3] > cur.y ? prev[3] : cur.y,
    ], [ 0, 0, 0, 0 ]);

    let output = '';

    for (let y = minY; y <= maxY; ++y) {
      for (let x = minX; x <= maxX; ++x) {
        const square = this.squares.find(sq => sq.x === x && sq.y === y);
        const color = square ? square.color : Color.Black;
        output += color === Color.white ? '#' : '.';
      }
      output += '\n';
    }
    console.log(output);
  }

  private currentSquare(): GridSquare {
    const currentSquare = this.squares.find(square => square.x === this.currentX && square.y === this.currentY);
    if (!currentSquare) {
      throw new Error('Unable to find current square');
    }

    return currentSquare;
  }
}
