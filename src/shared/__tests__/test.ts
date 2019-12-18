import * as readlineSync from 'readline-sync';
import { getModes, test as opTest } from '../../shared/intcode-computer';

// mock input to always be 1
jest.mock('readline-sync', () => ({
  question: jest.fn(() => '1'),
}));

describe('intcode operator unit tests', () => {
  const match = (testCode: string, expectedResult: string) => {
    const result = opTest(testCode, { noOutputToConsole: true });
    const formattedResult = result.code.join(',');
    expect(result.complete).toBe(true);
    expect(formattedResult).toMatch(expectedResult);
  };
  const matchOutputs = (testCode: string, inputs: number[], expectedResult: string) => {
    const result = opTest(testCode, { inputs, noOutputToConsole: true });
    const formattedResult = result.output.join(',');
    expect(result.complete).toBe(true);
    expect(formattedResult).toMatch(expectedResult);
  };

  test('check results, day 3', () => {
    match('1,0,0,0,99', '2,0,0,0,99');
    match('2,3,0,3,99', '2,3,0,6,99');
    match('2,4,4,5,99,0', '2,4,4,5,99,9801');
    match('1,1,1,4,99,5,6,0,99', '30,1,1,4,2,5,6,0,99');
  });

  test('mode results, day 5', () => {
    match('1101,0,0,0,99', '0,0,0,0,99');
    match('1101,100,-1,4,0', '1101,100,-1,4,99');
    match('1102,-33,-3,4,0', '1102,-33,-3,4,99');
  });

  test('input test, day 5', () => {
    match('3,0,4,0,99', '1,0,4,0,99');
  });

  test('input tests, day 7', () => {
    matchOutputs('3,0,4,0,99', [1], '1');
  });

  test('check results, day 9', () => {
    match('9,2,1,0,0,0,99', '18,2,1,0,0,0,99');
    match('109,7,02201,0,0,5,99,5', '109,7,2201,0,0,10,99,5');

    const testCode = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99';
    matchOutputs(testCode, [], testCode);

    const output = opTest('1102,34915192,34915192,7,4,7,99,0', { noOutputToConsole: true });
    expect(String(output.output)).toHaveLength(16);

    matchOutputs('104,1125899906842624,99', [], '1125899906842624');
  });
});

describe('getModes unit test, day 5', () => {
  test('check results', () => {
    expect(getModes(1)).toEqual([1, 0, 0, 0]);
    expect(getModes(1002)).toEqual([2, 0, 1, 0]);
    expect(getModes(11199)).toEqual([99, 1, 1, 1]);
  });
});
