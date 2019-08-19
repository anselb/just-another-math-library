# Just Another Math Library

![npm bundle size](https://img.shields.io/bundlephobia/min/just-another-math-library.svg)
![npm](https://img.shields.io/npm/v/just-another-math-library.svg)
[![Build Status](https://travis-ci.com/anselb/just-another-math-library.svg?branch=master)](https://travis-ci.com/anselb/just-another-math-library)
[![Coverage Status](https://coveralls.io/repos/github/anselb/just-another-math-library/badge.svg?branch=master)](https://coveralls.io/github/anselb/just-another-math-library?branch=master)

A library with some miscellaneous math things.

## Number Types
  - `Currency()` - A class that represents currency. Currency expects to be initialized with an integer representing the smallest dividable unit of currency. If nothing is passed in, the Currency class will initialize to 0.
  - `GOLDEN_RATIO` - A constant that represents the golden ratio.

## Currency Methods
  - `add(n)` - Add a Currency number and `n`.
  - `subtract(n)` - Subtract `n` from the Currency number.
  - `multiply(n)` - Multiply the Currency number by `n`.
  - `divide(n)` - Divide the Currency number by `n`.
  - `split(n)` - Split the Currency number into `n` ways. This does not modify the Currency number.

## Number Prototype Methods
  - `.round()` - Rounds a number normally, but callable on the number prototype.
  - `.floor()` - Floors a number normally, but callable on the number prototype.
  - `.ceil()` - Ceils a number normally, but callable on the number prototype.
  - `.pad(left, right)` - Pads a number with zeros, and turns it into a string. Will pad `left` number of zeros to the left of the decimal and `right` number of zeros to the right of the decimal.

## Functions
  - `degToRad(angle)` - Converts a given angle, measured in degrees, to radians.
  - `radToDeg(angle)` - Converts a given angle, measured in radians, to degrees.
  - `toDollars(amount)` - Converts a number to a string, and makes it readable as a USD amount. It will add a dollar sign for amounts greater than or equal to a dollar, and a cent sign for amounts less than a dollar.
  - `intlCurrencyFormat(amount, locales, currencyType)` - This is a wrapper around `Intl.NumberFormat()`. It will convert an amount to a currency type, readable in the specified locale.
  - `tax(amount, rate)` - Calculates the tax on a given amount, given the tax rate. The tax rate must be in decimal format.
  - `withTax(amount, rate)` - Calculates the tax on a given amount, given the tax rate, and adds it to the amount. The tax rate must be in decimal format.
  - `interest(principal, interestRate, terms)` - Calculates the interest using the standard I = PRT equation. The interest rate must be in decimal format. The interest rate and terms must have the same unit of time (months, years, etc.).
  - `monthlyMortgage(principal, interestRate, numberOfPayments)` - Calculates monthly mortgage payments using the standard formula. The interest rate and number of payments must be using months.
  - `intToHex(num)` - Converts an integer in decimal to a number in hexadecimal. The number is also converted to a string.
  - `randomRange(min, max)` - Returns a random integer between the min and max, inclusive.
  - `random(num)` - Returns a random integer between 0 and the num, inclusive.
  - `randomColor()` - Returns a random hexadecimal color, formatted with a "#" as well.
