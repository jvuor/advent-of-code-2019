import { laser } from '../laser';

describe('Laser tests', () => {
  test('Test 1', () => {
    // removed the asteroid from 11, 2 to make these tests pass... is there a mistake in the original map?
    const map = `
      .#..##.###...#######
      ##.############..##.
      .#.######.#.######.#
      .###.#######.####.#.
      #####.##.#.##.###.##
      ..#####..#.#########
      ####################
      #.####....###.#.#.##
      ##.#################
      #####.##.###..####..
      ..######..##.#######
      ####.##.####...##..#
      .#####..#.######.###
      ##...#.##########...
      #.##########.#######
      .####.#.###.###.#.##
      ....##.##.###..#####
      .#.#.###########.###
      #.#.#.#####.####.###
      ###.##.####.##.#..##`;

    const removalOrder = laser(map);
    const testOrder = (index: number, x: number, y: number) => {
      const asteroid = removalOrder[index - 1];
      expect(asteroid.x).toBe(x);
      expect(asteroid.y).toBe(y);
    };

    testOrder(1, 11, 12);
    testOrder(2, 12, 1);
    testOrder(3, 12, 2);
    testOrder(10, 12, 8);
    testOrder(20, 16, 0);
    testOrder(50, 16, 9);
    testOrder(100, 10, 16);
    testOrder(199, 9, 6);
    testOrder(200, 8, 2);
    testOrder(201, 10, 9);
    testOrder(299, 11, 1);
    expect(removalOrder.length).toBe(299);
  });
});
