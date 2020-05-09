import { Direction, Step, Turn } from '../interfaces';

export function move(direction: Direction, turn: Turn): Step {
  const turnRight = [
    Direction.Up,
    Direction.Right,
    Direction.Down,
    Direction.Left,
  ];

  const calcWithOverflow = (current: number, operator: number): number => {
    let result = current + operator;
    if (result < 0) {
      result = turnRight.length - 1;
    } else if (result > turnRight.length - 1) {
      result = 0;
    }
    return result;
  };

  const currentDirection = turnRight.findIndex(dir => dir === direction);
  const newDirection = turnRight[calcWithOverflow(currentDirection, (turn === Turn.Right ? 1 : -1))];

  switch (newDirection) {
    case Direction.Up:
      return { direction: newDirection, x: 0, y: -1 };
    case Direction.Right:
      return { direction: newDirection, x: 1, y: 0 };
    case Direction.Down:
      return { direction: newDirection, x: 0, y: 1 };
    case Direction.Left:
      return { direction: newDirection, x: -1, y: 0 };
  }
}
