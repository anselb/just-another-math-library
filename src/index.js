export class Currency {
  constructor(value = 0) {
    this.checkInt(value);

    this.value = value;
  }

  // eslint-disable-next-line class-methods-use-this
  checkInt(n) {
    if (n % 1 !== 0) {
      throw TypeError(`Expected integer representing pennies, received ${n}`);
    }
  }

  multiply(n) {
    this.checkInt(n);

    this.value *= n;
    return this;
  }

  add(n) {
    this.checkInt(n);

    this.value += n;
    return this;
  }

  divide(n) {
    this.checkInt(n);

    this.value /= n;
    // Round down when dividing, I will keep the extra
    this.value = Math.floor(this.value);
    return this;
  }

  subtract(n) {
    this.checkInt(n);

    this.value -= n;
    return this;
  }

  split(n) {
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

      // Convert the pennies to dollars
      splitArr[i] /= 100;
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
