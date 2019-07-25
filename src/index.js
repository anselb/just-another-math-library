export default class Currency {
  constructor(value = 0) {
    this.testInt(value);

    this.value = value;
  }

  testInt(n) {
    if (n % 1 !== 0) {
      throw TypeError(`Expected integer representing pennies, received ${n}`);
    }
  }

  multiply(n) {
    this.testInt(n);

    this.value *= n;
    return this;
  }

  add(n) {
    this.testInt(n);

    this.value += n;
    return this;
  }

  divide(n) {
    this.testInt(n);

    this.value /= n;
    // Round down when dividing, I will keep the extra
    Math.floor(this.value);
    return this;
  }

  subtract(n) {
    this.testInt(n);

    this.value -= n;
    return this;
  }

  split(n) {
    this.testInt(n);

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
