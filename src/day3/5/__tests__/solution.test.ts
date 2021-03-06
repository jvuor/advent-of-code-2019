import { Direction } from '../interfaces/direction.enum';
import { parsePath, solve } from '../solution';

describe('parsePath unit tests', () => {
  test('expected return value', () => {
    const testInput = 'U7,R6,D4,L4';
    const expectedOutput = [
      { direction: Direction.Up, length: 7 },
      { direction: Direction.Right, length: 6 },
      { direction: Direction.Down, length: 4 },
      { direction: Direction.Left, length: 4 },
    ];

    expect(parsePath(testInput)).toEqual(expectedOutput);
  });
});

describe('solve unit tests', () => {
  test('expected results', () => {
    expect(solve('R8,U5,L5,D3', 'U7,R6,D4,L4')).toBe(6);
    expect(solve('R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83')).toBe(159);
    expect(solve('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7')).toBe(135);
  });
});
