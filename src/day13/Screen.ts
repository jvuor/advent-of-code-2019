import { Sprite } from './interfaces';
import { spriteMap } from './utils';

export class Screen {
  private stream: NodeJS.WriteStream;
  private blockCount: number = 0;

  public constructor() {
    this.stream = process.stdout;
    this.init();
  }

  public init(): void {
    this.moveCursor(0, 0);
    this.stream.clearScreenDown();
  }

  public draw(x: number, y: number, sprite: Sprite) {
    if (sprite === Sprite.Block) {
      this.blockCount += 1;
    }
    this.moveCursor(x, y);
    const str = spriteMap.get(sprite);
    if (!str) {
      throw new Error(`Unknown sprite ${sprite}`);
    }
    this.stream.write(str);
  }

  public end(): void {
    // process.stdout cannot .end();
    this.stream.write('\n\n\n');
    this.stream.write(`${this.blockCount}\n\n`);
  }

  private moveCursor(x: number, y: number): void {
    this.stream.cursorTo(x, y);
  }
}
