import * as readline from 'readline';
import { Controls, Key } from './interfaces';

export class Joystick {
  private lastKey: Controls | null = null;

  public constructor() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (_: string, key: Key) => {
      if (key.name === 'c' && key.ctrl) {
        process.exit();
      }

      // string enums are hard, wtf
      if (Object.values(Controls).includes(key.name as any)) {
        this.lastKey = key.name as Controls;
      }
    });
  }

  public end(): void {
    process.stdin.end();
  }

  public poll(): Controls | null {
    const lastKey = this.lastKey;
    this.lastKey = null;
    return lastKey;
  }
}

// {
//   sequence: '\u001b[D',
//   name: 'left',
//   ctrl: false,
//   meta: false,
//   shift: false,
//   code: '[D'
// }
// {
//   sequence: '\u001b[C',
//   name: 'right',
//   ctrl: false,
//   meta: false,
//   shift: false,
//   code: '[C'
// }
