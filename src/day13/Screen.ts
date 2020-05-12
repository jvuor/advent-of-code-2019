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

  public draw(x: number, y: number, value: number | Sprite): void {
    if (x === -1) {
      this.drawScore(value as number);
    } else {
      this.drawSprite(x, y, value as Sprite);
    }
  }

  public end(showBlockcount: boolean = false): void {
    // process.stdout cannot .end();
    this.stream.write('\n\n\n');
    if (showBlockcount) {
      this.stream.write(`${this.blockCount}\n\n`);
    }
  }

  public debug(variableNum: number, value: any): void {
    this.moveCursor(50, 2 + variableNum);
    this.stream.clearLine(1);
    this.stream.write(String(value));
  }

  private drawScore(score: number) {
    this.moveCursor(0, 0);
    this.stream.clearLine(0);
    this.stream.write(`${score}`);
  }

  private drawSprite(x: number, y: number, sprite: Sprite): void {
    if (sprite === Sprite.Block) {
      this.blockCount += 1;
    }
    this.moveCursor(x, y + 2);  // shifting the screen two lines down to make room for the score display
    const str = spriteMap.get(sprite);
    if (!str) {
      throw new Error(`Unknown sprite ${sprite}`);
    }
    this.stream.write(str);
  }

  private moveCursor(x: number, y: number): void {
    this.stream.cursorTo(x, y);
  }
}
