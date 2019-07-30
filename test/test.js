import Currency from '../src/index';

it('expects 2 + 2 to equal 4', () => {
  expect(2 + 2).toBe(4);
});

it('expects Currency to only allow integers', () => {
  const n = 15.30;

  expect(() => {
    const c = new Currency(n);
  }).toThrow(TypeError(`Expected integer representing pennies, received ${n}`));
});

it('expects Currency to add integers', () => {
  const n = 15;
  const c = new Currency(n);
  let toAdd = 3.56;

  expect(() => {
    c.add(toAdd);
  }).toThrow(TypeError(`Expected integer representing pennies, received ${toAdd}`));

  toAdd = 4

  expect(c.add(toAdd).value).toBe(19);
});
