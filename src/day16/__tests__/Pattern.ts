import { Pattern } from '../Pattern';

describe('Pattern unit tests', () => {
  test('Pattern unit test', () => {
    const pattern = new Pattern(2);

    const testPattern = (element: number) => {
      const result = pattern.getNext();
      expect(result).toBe(element);
    }

    const testPatternArray = (elements: number[]) => {
      elements.forEach(element => testPattern(element));
    }

    testPatternArray([0, 1, 1, 0, 0, -1, -1, 0, 0, 1, 1, 0, 0, -1, -1, 0]);
  });
});
