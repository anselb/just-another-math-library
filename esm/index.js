var Currency = /** @class */ (function () {
    function Currency(value) {
        if (value === void 0) { value = 0; }
        this.checkInt(value);
        this.value = value;
    }
    // eslint-disable-next-line class-methods-use-this
    Currency.prototype.checkInt = function (n) {
        if (n % 1 !== 0) {
            throw TypeError("Expected integer representing pennies, received " + n);
        }
    };
    Currency.prototype.multiply = function (n) {
        this.checkInt(n);
        this.value *= n;
        return this;
    };
    Currency.prototype.add = function (n) {
        this.checkInt(n);
        this.value += n;
        return this;
    };
    Currency.prototype.divide = function (n) {
        this.checkInt(n);
        this.value /= n;
        // Round down when dividing, I will keep the extra
        this.value = Math.floor(this.value);
        return this;
    };
    Currency.prototype.subtract = function (n) {
        this.checkInt(n);
        this.value -= n;
        return this;
    };
    Currency.prototype.split = function (n) {
        this.checkInt(n);
        // Create split array
        var splitArr = [];
        // Get the leftover change that would result after an even split
        var leftoverChange = this.value % n;
        // Calculate an even split where everyone pays the same
        var split = (this.value - leftoverChange) / n;
        // For each person, assign them a split
        for (var i = 0; i < n; i += 1) {
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
    };
    return Currency;
}());
var GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
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
    var numberString = String(this);
    // Split number by its decimal, if it has one
    var numberSplit = numberString.split('.');
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
function degToRad(angle) {
    return angle * Math.PI / 180;
}
function radToDeg(angle) {
    return angle * 180 / Math.PI;
}
function toDollars(amount) {
    // Use Math.floor since .99 of a cent is technically not worth a cent
    if (amount > -1 && amount < 1) {
        var cents = void 0;
        if (amount < 0) {
            // If negative cents, round to the ceiling as it should always round down less than a cent
            cents = Math.ceil(amount * 100) / 100;
            // If negative cents, move the negative sign before the cent symbol
            cents *= -1;
            return "-\u00A2" + cents;
        }
        // Otherwise, return cents normally
        cents = Math.floor(amount * 100) / 100;
        return "\u00A2" + cents;
    }
    var dollars;
    if (amount < 0) {
        // If negative dollars, round to the ceiling as it should always round down less than a cent
        dollars = Math.ceil(amount * 100) / 100;
        // If negative dollars, move the negative sign before the dollar symbol
        dollars *= -1;
        return "-$" + dollars;
    }
    // Otherwise, return dollars normally
    dollars = Math.floor(amount * 100) / 100;
    return "$" + dollars;
}
function intlCurrencyFormat(amount, locales, currencyType) {
    return new Intl.NumberFormat(locales, { style: 'currency', currency: currencyType }).format(amount);
}
function tax(amount, rate) {
    // Sales tax rounds normally
    return Math.round(amount * rate * 100) / 100;
}
function withTax(amount, rate) {
    // Sales tax rounds normally
    return Math.round((amount + amount * rate) * 100) / 100;
}
// Should return the principal (amount borrowed) times the interest (interest rate)
// times the term (length of loan)
function interest(principal, interestRate, terms) {
    // I = Prt
    // interestRate is expected to be in decimal format
    return Math.round(principal * interestRate * terms * 100) / 100;
}
// Should return monthly mortgage payment
// Solution modified from https://stackoverflow.com/questions/17101442/how-to-calculate-mortgage-in-javascript
function monthlyMortgage(principal, interestRate, numberOfPayments) {
    // interestRate is expected to be in decimal format and per month
    var x = (Math.pow((1 + interestRate), numberOfPayments));
    var payments = principal * interestRate * x / (x - 1);
    payments = Math.round(payments * 100) / 100;
    return payments;
}
// Solution from https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hexadecimal-in-javascript
function intToHex(num) {
    var hexString = num;
    if (num < 0) {
        // If negative, do some weird math for hexadecimal signed 2's complement
        hexString = 0xFFFFFFFF + num + 1;
    }
    return hexString.toString(16).toUpperCase();
}
function randomRange(min, max) {
    var minCeil = Math.ceil(min);
    var maxFloor = Math.floor(max);
    // The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}
function random(num) {
    return randomRange(0, num - 1);
}
function randomColor() {
    var largestHexInDecimal = 16777215;
    var randomColorDeci = randomRange(0, largestHexInDecimal);
    var randomColorHex = intToHex(randomColorDeci);
    return "#" + randomColorHex.padEnd(6, '0');
}

export { Currency, GOLDEN_RATIO, degToRad, intToHex, interest, intlCurrencyFormat, monthlyMortgage, radToDeg, random, randomColor, randomRange, tax, toDollars, withTax };
