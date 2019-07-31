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

  toAdd = 4;

  expect(c.add(toAdd).value).toBe(19);
});

it('expects Currency to subtract integers', () => {
  const n = 15;
  const c = new Currency(n);
  let toSubtract = 3.56;

  expect(() => {
    c.add(toSubtract);
  }).toThrow(TypeError(`Expected integer representing pennies, received ${toSubtract}`));

  toSubtract = 4;

  expect(c.subtract(toSubtract).value).toBe(11);
});

it('expects Currency to multiply integers', () => {
  const n = 15;
  const c = new Currency(n);
  let toMultiply = 3.56;

  expect(() => {
    c.add(toMultiply);
  }).toThrow(TypeError(`Expected integer representing pennies, received ${toMultiply}`));

  toMultiply = 4;

  expect(c.multiply(toMultiply).value).toBe(60);
});

it('expects Currency to divide integers', () => {
  const n = 15;
  const c = new Currency(n);
  let toDivide = 3.56;

  expect(() => {
    c.add(toDivide);
  }).toThrow(TypeError(`Expected integer representing pennies, received ${toDivide}`));

  toDivide = 4;

  expect(c.divide(toDivide).value).toBe(3);
});
