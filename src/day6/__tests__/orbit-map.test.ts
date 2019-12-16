import { parseMap } from '../orbit-map';

describe('orbit map unit tests', () => {
  test('expected output', () => {
    const testMap = `COM)B
      B)C
      C)D
      D)E
      E)F
      B)G
      G)H
      D)I
      E)J
      J)K
      K)L`;

    expect(parseMap(testMap)).toBe(42);

    const testmap2 = `B)G
      B)C
      C)D
      D)E
      E)F
      COM)B
      G)H
      D)I
      E)J
      J)K
      K)L`;

    expect(parseMap(testmap2)).toBe(42);

    const brokenMap = `B)G
      B)C
      C)D
      E)F
      COM)B
      G)H
      D)I
      E)J
      J)K
      K)L`;

    expect(() => parseMap(brokenMap)).toThrow();
  });
});
