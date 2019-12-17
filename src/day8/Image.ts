import { Pixel } from './interfaces';

export class Image {
  public readonly pixels: Pixel[] = [];
  public readonly width: number;
  public readonly height: number;
  public layers: number = 0;

  private nextX = 0;
  private nextY = 0;
  private nextLayer = 0;

  public constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public add(value: number): void {
    const layer = this.nextLayer;
    const y = this.getY();
    const x = this.getX();

    this.pixels.push(
      { x, y, layer, value },
    );
  }

  public outputTest(): void {
    const rows: string[] = ['Image Output Test'];

    const maxLayer = this.pixels.reduce((acc, cur) => cur.layer > acc ? cur.layer : acc, 0);
    for (let layer = 0; layer <= maxLayer; layer++) {
      rows.push(`\nLayer ${layer}`);
      for (let y = 0; y < this.height; y++) {
        let row = '  ';
        for (let x = 0; x < this.width; x++) {
          row += `${this.pixels.find(p => p.x === x && p.y === y && p.layer === layer)?.value}`;
        }
        rows.push(row);
      }
    }
    console.log(rows.join('\n'));
  }

  public decodeImage(): string {
    const rows: string[] = [];

    for (let y = 0; y < this.height; y++) {
      let row = '';
      for (let x = 0; x < this.width; x++) {
        let layer = 0;
        let foundPixel = false;

        while (!foundPixel) {
          const pixel = this.pixels.find(p => p.layer === layer && p.x === x && p.y === y);
          if (pixel && pixel.value !== 2) {
            row += `${pixel.value}`;
            foundPixel = true;
          } else {
            layer++;
          }
        }
      }
      rows.push(row);
    }

    return rows
      .map(row => row.split('').map(char => char === '0' ? ' ' : '#').join(''))
      .join('\n');
  }

  private getX(): number {
    const returnValue = this.nextX;
    this.incrementX();
    return returnValue;
  }

  private getY(): number {
    const returnValue = this.nextY;
    return returnValue;
  }

  private incrementX(): void {
    this.nextX += 1;
    if (this.nextX === this.width) {
      this.nextX = 0;
      this.incrementY();
    }
  }

  private incrementY(): void {
    this.nextY += 1;
    if (this.nextY === this.height) {
      this.nextY = 0;
      this.incrementLayer();
    }
  }

  private incrementLayer(): void {
    this.nextLayer += 1;
    this.layers += 1;
  }
}
