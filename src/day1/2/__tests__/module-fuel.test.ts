import { moduleFuel } from '../module-fuel';

describe('moduleFuel unit test', () => {
  test('returns expected value', () => {
    expect(moduleFuel(12)).toBe(2);
    expect(moduleFuel(14)).toBe(2);
    expect(moduleFuel(1969)).toBe(654);
    expect(moduleFuel(100756)).toBe(33583);
  });
});
