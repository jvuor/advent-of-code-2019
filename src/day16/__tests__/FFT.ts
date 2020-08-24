import { FFT } from "../FFT";

describe('FFT unit tests', () => {
  test('1 phase tests', () => {
    const testInput = (input: string, output: string) => expect(FFT(input, 1)).toBe(output);

    testInput('12345678', '48226158');
    testInput('48226158', '34040438');
    testInput('34040438', '03415518');
    testInput('03415518', '01029498');
  });

  test('100 phase tests', () => {
    const testInput = (input: string, output: string) => expect(FFT(input, 100).substring(0, 8)).toBe(output);

    testInput('80871224585914546619083218645595', '24176176');
    testInput('19617804207202209144916044189917', '73745418');
    testInput('69317163492948606335995924319873', '52432133');
  });
});
