import { Sprite } from './interfaces';

interface Pixel {
  x: number;
  y: number;
  value: number | Sprite;
}

export class VirtualScreen {
  private pixels: Pixel[];

  public constructor() {
    this.pixels = [];
  }

  public draw(x: number, y: number, value: Sprite | number): void {
    const existingPixel = this.pixels.find(pixel => pixel.x === x && pixel.y === y);
    if (existingPixel) {
      existingPixel.value = value;
    } else {
      this.pixels.push({ x, y, value });
    }
  }

  public getBrickcount(): number {
    return this.pixels.filter(pixel => pixel.value === Sprite.Block).length;
  }

  public getScore(): number {
    const value = this.pixels.find(pixel => pixel.x === -1)?.value;
    return value ? value : 0;
  }

  public getBallX(): number | undefined {
    return this.pixels.find(pixel => pixel.value === Sprite.Ball)?.x;
  }

  public getPaddleX(): number | undefined {
    return this.pixels.find(pixel => pixel.value === Sprite.Paddle)?.x;
  }
}
