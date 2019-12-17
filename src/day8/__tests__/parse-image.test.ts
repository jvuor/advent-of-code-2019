import { checkImageData, parseImage } from '../parse-image';

describe('parseImage unit tests', () => {
  test('expected results', () => {
    expect(checkImageData('123456789012', 3, 2)).toBe(1);
    expect(checkImageData('121256789012', 3, 2)).toBe(4);
    expect(checkImageData('121200789022', 3, 2)).toBe(0);
  });
});
