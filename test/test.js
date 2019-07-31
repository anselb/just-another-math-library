import {
  Currency,
  GOLDEN_RATIO,
} from '../src/index';

it('expects 2 + 2 to equal 4', () => {
  expect(2 + 2).toBe(4);
});

it('expects Currency to only allow integers', () => {
  const n = 15.30;

  expect(() => {
    // eslint-disable-next-line no-unused-vars
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

it('expects Currency to split all pennies without leftover change', () => {
  const n = 15;
  const c = new Currency(n);
  let toSplit = 3.56;

  expect(() => {
    c.split(toSplit);
  }).toThrow(TypeError(`Expected integer representing pennies, received ${toSplit}`));

  toSplit = 4;

  expect(c.split(toSplit)).toEqual([0.04, 0.04, 0.04, 0.03]);

  c.add(402);

  expect(c.split(toSplit)).toEqual([1.05, 1.04, 1.04, 1.04]);
});

it('expects the GOLDEN_RATIO to equal 1.6180339887498948482', () => {
  expect(GOLDEN_RATIO).toBe(1.6180339887498948482);
});

it('expects .round() to work on Numbers', () => {
  expect(4.56.round()).toBe(5);
  expect(4.46.round()).toBe(4);

  const num1 = Number(194.78);
  expect(num1.round()).toBe(195);

  const num2 = Number(620.28);
  expect(num2.round()).toBe(620);
});

it('expects .floor() to work on Numbers', () => {
  expect(4.56.floor()).toBe(4);
  expect(4.46.floor()).toBe(4);

  const num1 = Number(194.78);
  expect(num1.floor()).toBe(194);

  const num2 = Number(620.28);
  expect(num2.floor()).toBe(620);
});

it('expects .ceil() to work on Numbers', () => {
  expect(4.56.ceil()).toBe(5);
  expect(4.46.ceil()).toBe(5);

  const num1 = Number(194.78);
  expect(num1.ceil()).toBe(195);

  const num2 = Number(620.28);
  expect(num2.ceil()).toBe(621);
});

it('expects .pad() to pad a number with zeros', () => {
  expect(() => {
    1.1.pad(-1, 3);
  }).toThrow(RangeError('left and right parameters cannot be negative'));

  expect(4.56.pad(2, 4)).toBe('04.5600');
  expect(4.46.pad(5, 6)).toBe('00004.460000');
  expect((4).pad(3, 2)).toBe('004.00');

  const num1 = Number(194.78);
  expect(num1.pad(0, 0)).toBe('194.78');

  const num2 = Number(0.28);
  expect(num2.pad(0, 10)).toBe('0.2800000000');
});
