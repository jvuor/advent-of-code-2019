import { Squares, Coordinate } from './interfaces';

export class MapOutput {
  private stream: NodeJS.WriteStream;
  private position: Coordinate | null = null;

  public constructor() {
    this.stream = process.stdout;
  }

  public drawMap(squares: Squares, position?: Coordinate): void {
    this.init();

    if (position) {
      this.position = position;
    } else {
      this.position = null;
    }

    const [ minX, maxX, minY, maxY ] = squares.reduce((prev, cur) => 
      [
        cur.coordinate.x < prev[0] ? cur.coordinate.x : prev[0],
        cur.coordinate.x > prev[1] ? cur.coordinate.x : prev[1],
        cur.coordinate.y < prev[2] ? cur.coordinate.y : prev[2],
        cur.coordinate.y > prev[3] ? cur.coordinate.y : prev[3]
      ], 
      [0, 0, 0 ,0]);

    const shiftX = -minX;
    const shiftY = -minY;
    
    for (let y = minY; y <= maxY; ++y) {
      for (let x = minX; x <= maxX; ++x) {
        const square = squares.find(s => s.coordinate.x === x && s.coordinate.y === y)

        if (square) {
          const highlight = square.coordinate.x === this.position?.x  && square.coordinate.y === this.position?.y;
          
          if (highlight) {
            this.startHighlight();
          }

          this.drawCharacter(x + shiftX, y + shiftY, square.type);

          if (highlight) {
            this.endHighlight();
          }
        }
      }
    }

    this.stream.write('\n\n\n');
  }

  private init(): void {
    this.moveCursor(0, 0);
    this.stream.clearScreenDown();
  }

  private drawCharacter(x: number, y: number, character: string): void {
    this.moveCursor(x, y);
    this.stream.write(character);
  }

  private moveCursor(x: number, y: number): void {
    this.stream.cursorTo(x, y);
  }

  private startHighlight(): void {
    this.stream.write('\x1b[47m\x1b[30m');
  }

  private endHighlight(): void {
    this.stream.write('\x1b[0m');
  }

}
