export class Currency {
  value: number;
  constructor(value = 0) {
    this.checkInt(value);

    this.value = value;
  }

  // eslint-disable-next-line class-methods-use-this
  checkInt(n: number): void {
    if (n % 1 !== 0) {
      throw TypeError(`Expected integer representing pennies, received ${n}`);
    }
  }

  multiply(n: number): Currency {
    this.checkInt(n);

    this.value *= n;
    return this;
  }

  add(n: number): Currency {
    this.checkInt(n);

    this.value += n;
    return this;
  }

  divide(n: number): Currency {
    this.checkInt(n);

    this.value /= n;
    // Round down when dividing, I will keep the extra
    this.value = Math.floor(this.value);
    return this;
  }

  subtract(n: number): Currency {
    this.checkInt(n);

    this.value -= n;
    return this;
  }

  split(n: number): number[] {
    this.checkInt(n);

    // Create split array
    const splitArr = [];
    // Get the leftover change that would result after an even split
    let leftoverChange = this.value % n;
    // Calculate an even split where everyone pays the same
    const split = (this.value - leftoverChange) / n;

    // For each person, assign them a split
    for (let i = 0; i < n; i += 1) {
      // Append a split for this person
      splitArr.push(split);

      // If there is leftover change, give a penny for each leftover penny
      if (leftoverChange > 0) {
        splitArr[i] += 1;
        leftoverChange -= 1;
      }
    }

    // Return splits of the original value
    return splitArr;
  }
}

export const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

// eslint-disable-next-line no-extend-native
Number.prototype.round = function round() {
  return Math.round(this);
};

// eslint-disable-next-line no-extend-native
Number.prototype.floor = function floor() {
  return Math.floor(this);
};

// eslint-disable-next-line no-extend-native
Number.prototype.ceil = function ceil() {
  return Math.ceil(this);
};

// eslint-disable-next-line no-extend-native
Number.prototype.pad = function pad(left, right) {
  if (left < 0 || right < 0) {
    throw RangeError('left and right parameters cannot be negative');
  }

  // Numbers can't be padded, so convert number to string
  const numberString = String(this);
  // Split number by its decimal, if it has one
  const numberSplit = numberString.split('.');

  // Pad the left side of the decimal with up to "left" number of zeros
  numberSplit[0] = numberSplit[0].padStart(left, '0');

  // If there is no deciaml, but there needs to be right padding, add string for after decimal
  if (right > 0 && numberSplit.length === 1) {
    numberSplit.push('');
  }
  // If there is a number after the decimal, pad it
  if (numberSplit.length === 2) {
    numberSplit[1] = numberSplit[1].padEnd(right, '0');
  }

  // Put the decimal back and return the number string
  return numberSplit.join('.');
};

export function degToRad(angle: number): number {
  return angle * Math.PI / 180;
}

export function radToDeg(angle: number): number {
  return angle * 180 / Math.PI;
}

export function toDollars(amount: number): string {
  // Use Math.floor since .99 of a cent is technically not worth a cent
  if (amount > -1 && amount < 1) {
    let cents: number;
    if (amount < 0) {
      // If negative cents, round to the ceiling as it should always round down less than a cent
      cents = Math.ceil(amount * 100) / 100;
      // If negative cents, move the negative sign before the cent symbol
      cents *= -1;
      return `-¢${cents}`;
    }
    // Otherwise, return cents normally
    cents = Math.floor(amount * 100) / 100;
    return `¢${cents}`;
  }

  let dollars: number;
  if (amount < 0) {
    // If negative dollars, round to the ceiling as it should always round down less than a cent
    dollars = Math.ceil(amount * 100) / 100;
    // If negative dollars, move the negative sign before the dollar symbol
    dollars *= -1;
    return `-$${dollars}`;
  }
  // Otherwise, return dollars normally
  dollars = Math.floor(amount * 100) / 100;
  return `$${dollars}`;
}

export function intlCurrencyFormat(amount: number, locales: string, currencyType: string): string {
  return new Intl.NumberFormat(locales, { style: 'currency', currency: currencyType }).format(amount);
}

export function tax(amount: number, rate: number): number {
  // Sales tax rounds normally
  return Math.round(amount * rate * 100) / 100;
}

export function withTax(amount: number, rate: number): number {
  // Sales tax rounds normally
  return Math.round((amount + amount * rate) * 100) / 100;
}

// Should return the principal (amount borrowed) times the interest (interest rate)
// times the term (length of loan)
export function interest(principal: number, interestRate: number, terms: number): number {
  // I = Prt
  // interestRate is expected to be in decimal format
  return Math.round(principal * interestRate * terms * 100) / 100;
}

// Should return monthly mortgage payment
// Solution modified from https://stackoverflow.com/questions/17101442/how-to-calculate-mortgage-in-javascript
export function monthlyMortgage(principal: number, interestRate: number, numberOfPayments: number): number {
  // interestRate is expected to be in decimal format and per month
  const x = ((1 + interestRate) ** numberOfPayments);
  let payments = principal * interestRate * x / (x - 1);
  payments = Math.round(payments * 100) / 100;
  return payments;
}

// Solution from https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hexadecimal-in-javascript
export function intToHex(num: number): string {
  let hexString: number = num;

  if (num < 0) {
    // If negative, do some weird math for hexadecimal signed 2's complement
    hexString = 0xFFFFFFFF + num + 1;
  }

  return hexString.toString(16).toUpperCase();
}

export function randomRange(min: number, max: number): number {
  const minCeil: number = Math.ceil(min);
  const maxFloor: number = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

export function random(num: number): number {
  return randomRange(0, num - 1);
}

export function randomColor(): string {
  const largestHexInDecimal: number = 16777215;
  const randomColorDeci: number = randomRange(0, largestHexInDecimal);
  const randomColorHex: string = intToHex(randomColorDeci);

  return `#${randomColorHex.padEnd(6, '0')}`;
}
