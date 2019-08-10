# Just Another Math Library
A library with some miscellaneous math things. The first thing this library will handle is basic currency math (precise to two decimal points).

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
