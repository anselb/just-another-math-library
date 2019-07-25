import Currency from '../src/index';

jest.mock('../src/index');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Currency.mockClear();
});

it('expects 2 + 2 to equal 4', () => {
  expect(2 + 2).toBe(4);
});
