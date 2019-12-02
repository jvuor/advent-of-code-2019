import { test as opTest } from '../index';

describe('intcode operator unit tests', () => {
  test('check results', () => {
    const match = (testCode: string, expectedResult: string) => {
      const result = opTest(testCode);
      const formattedResult = result.join(',');
      expect(formattedResult).toMatch(expectedResult);
    };

    match('1,0,0,0,99', '2,0,0,0,99');
    match('2,3,0,3,99', '2,3,0,6,99');
    match('2,4,4,5,99,0', '2,4,4,5,99,9801');
    match('1,1,1,4,99,5,6,0,99', '30,1,1,4,2,5,6,0,99');
  });
});
