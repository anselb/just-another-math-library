import {
  Currency,
  GOLDEN_RATIO,
  degToRad,
  radToDeg,
  toDollars,
  intlCurrencyFormat,
  tax,
  withTax,
  interest,
  monthlyMortgage,
  intToHex,
  randomRange,
  random,
  randomColor,
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
  const c = new Currency();
  let toAdd = 3.56;

  expect(() => {
    c.add(toAdd);
  }).toThrow(TypeError(`Expected integer representing pennies, received ${toAdd}`));

  toAdd = 4;

  expect(c.add(toAdd).value).toBe(4);
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

  expect(c.split(toSplit)).toEqual([4, 4, 4, 3]);

  c.add(402);

  expect(c.split(toSplit)).toEqual([105, 104, 104, 104]);
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
  expect((4).pad(3, 0)).toBe('004');

  const num1 = Number(194.78);
  expect(num1.pad(0, 0)).toBe('194.78');

  const num2 = Number(0.28);
  expect(num2.pad(0, 10)).toBe('0.2800000000');
});

it('expects degToRad() to convert degrees to radians', () => {
  expect(degToRad(1)).toBe(0.017453292519943295);
  expect(degToRad(180)).toBe(Math.PI);

  const num1 = Number(-63);
  expect(degToRad(num1)).toBe(-1.0995574287564276);

  const num2 = Number(-360);
  expect(degToRad(num2)).toBe(-2 * Math.PI);
});

it('expects radToDeg() to convert radians to degrees', () => {
  expect(radToDeg(0.017453292519943295)).toBe(1);
  expect(radToDeg(Math.PI)).toBe(180);

  const num1 = Number(-1.0995574287564276);
  expect(radToDeg(num1)).toBe(-63);

  const num2 = Number(-2 * Math.PI);
  expect(radToDeg(num2)).toBe(-360);
});

it('expects toDollars() to format any number to a dollar amount with correct symbols', () => {
  expect(toDollars(0.0174532)).toBe('¢0.01');
  expect(toDollars(108.2962)).toBe('$108.29');

  const num1 = Number(-0.99557);
  expect(toDollars(num1)).toBe('-¢0.99');

  const num2 = Number(-7.58);
  expect(toDollars(num2)).toBe('-$7.58');
});

it('expects intlCurrencyFormat() to correctly format a number to a monetary amount', () => {
  expect(intlCurrencyFormat(123456.789, 'de-DE', 'EUR')).toBe('123.456,79 €');
  expect(intlCurrencyFormat(123456.789, 'ja-JP', 'JPY')).toBe('￥123,457');

  const num1 = Number(123456.789);
  expect(intlCurrencyFormat(num1, 'en-US', 'USD')).toBe('$123,456.79');

  const num2 = Number(-23465.197);
  expect(intlCurrencyFormat(num2, 'fr-CA', 'CAD')).toBe('-23 465,20 $');
});

it('expects tax() to correctly calculate tax and return it', () => {
  expect(tax(100, 0.0725)).toBe(7.25);
  expect(tax(20.85, 0.085)).toBe(1.77);

  const num1 = Number(205.85);
  const tax1 = Number(0.0498);
  expect(tax(num1, tax1)).toBe(10.25);

  const num2 = Number(79.32);
  const tax2 = Number(0.12);
  expect(tax(num2, tax2)).toBe(9.52);
});

it('expects withTax() to correctly calculate tax, add it to the original amount, and return it', () => {
  expect(withTax(100, 0.0725)).toBe(107.25);
  expect(withTax(20.85, 0.085)).toBe(22.62);

  const num1 = Number(613.65);
  const tax1 = Number(0.094);
  expect(withTax(num1, tax1)).toBe(671.33);

  const num2 = Number(299.82);
  const tax2 = Number(0.0528);
  expect(withTax(num2, tax2)).toBe(315.65);
});

it('expects interest() to correctly calculate interest gained', () => {
  expect(interest(100, 0.019 / 12, 12)).toBe(1.90);
  expect(interest(20.85, 0.021 / 12, 24)).toBe(0.88);

  const num1 = Number(613.65);
  const interestRate = Number(0.094 / 12);
  expect(interest(num1, interestRate, 36)).toBe(173.05);

  const num2 = Number(299.82);
  const terms = Number(48);
  expect(interest(num2, 0.00277, terms)).toBe(39.86);
});

it('expects monthlyMortgage() to correctly calculate monthly mortgage payment', () => {
  expect(monthlyMortgage(1400000, 0.031 / 12, 20 * 12)).toBe(7834.64);
  expect(monthlyMortgage(2100000, 0.0287 / 12, 25 * 12)).toBe(9817.03);

  const num1 = Number(240000);
  const interestRate = Number(0.041 / 12);
  expect(monthlyMortgage(num1, interestRate, 360)).toBe(1159.68);

  const num2 = Number(100000);
  const terms = Number(180);
  expect(monthlyMortgage(num2, 0.005, terms)).toBe(843.86);
});

it('expects intToHex() to convert any base10 integer to a hexadecimal string', () => {
  expect(intToHex(15)).toBe('F');
  expect(intToHex(-3253)).toBe('FFFFF34B');

  const num1 = Number(-762);
  expect(intToHex(num1)).toBe('FFFFFD06');

  const num2 = Number(386);
  expect(intToHex(num2)).toBe('182');
});

// Set Math.random to always return 5
// Taken from https://stackoverflow.com/questions/41570273/how-to-test-a-function-that-output-is-random-using-jest
let global: any
const mockMath = Object.create(global.Math);
global.Math = mockMath;
mockMath.random = () => 0.5;
// Bounds of Math.random are:
// Lower: 0
// Upper: 0.9999999999999999

it('expects Math.random() to return 0.5', () => {
  mockMath.random = () => 0.1;
  expect(Math.random()).toBe(0.1);

  mockMath.random = () => 0.5;
  expect(Math.random()).toBe(0.5);
});

it('expects randomRange() to return a number between min and max, inclusive', () => {
  mockMath.random = () => 0;
  expect(randomRange(4, 10)).toBe(4);
  mockMath.random = () => 0.9999999999999999;
  expect(randomRange(4, 10)).toBe(10);

  const num1 = Number(42);
  const num2 = Number(847);

  mockMath.random = () => 0;
  expect(randomRange(num1, num2)).toBe(42);
  mockMath.random = () => 0.5;
  expect(randomRange(num1, num2)).toBe(445);
  mockMath.random = () => 0.9999999999999999;
  expect(randomRange(num1, num2)).toBe(847);
});

it('expects random() to return a number between 0 and num - 1, inclusive', () => {
  mockMath.random = () => 0;
  expect(random(10)).toBe(0);
  mockMath.random = () => 0.9999999999999999;
  expect(random(10)).toBe(9);

  const num1 = Number(942);

  mockMath.random = () => 0;
  expect(random(num1)).toBe(0);
  mockMath.random = () => 0.5;
  expect(random(num1)).toBe(471);
  mockMath.random = () => 0.9999999999999999;
  expect(random(num1)).toBe(941);
});

it('expects randomColor() to return a random hexadecimal color', () => {
  mockMath.random = () => 0;
  expect(randomColor()).toBe('#000000');
  mockMath.random = () => 0.5;
  expect(randomColor()).toBe('#800000');
  mockMath.random = () => 0.9999999999999999;
  expect(randomColor()).toBe('#FFFFFF');
});
