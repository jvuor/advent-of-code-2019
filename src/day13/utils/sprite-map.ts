import { Sprite } from '../interfaces/sprite.enum';

export const spriteMap = new Map<Sprite, string>([
  [Sprite.Empty, ' '],
  [Sprite.Wall, '█'],
  [Sprite.Block, '#'],
  [Sprite.Paddle, '='],
  [Sprite.Ball, 'o'],
]);
