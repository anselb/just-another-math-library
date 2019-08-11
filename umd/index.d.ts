declare global {
    interface Number {
        round(): number;
        floor(): number;
        ceil(): number;
        pad(left: number, right: number): string;
    }
}
export declare class Currency {
    value: number;
    constructor(value?: number);
    private checkInt;
    multiply(n: number): Currency;
    add(n: number): Currency;
    divide(n: number): Currency;
    subtract(n: number): Currency;
    split(n: number): number[];
}
export declare const GOLDEN_RATIO: number;
export declare function degToRad(angle: number): number;
export declare function radToDeg(angle: number): number;
export declare function toDollars(amount: number): string;
export declare function intlCurrencyFormat(amount: number, locales: string, currencyType: string): string;
export declare function tax(amount: number, rate: number): number;
export declare function withTax(amount: number, rate: number): number;
export declare function interest(principal: number, interestRate: number, terms: number): number;
export declare function monthlyMortgage(principal: number, interestRate: number, numberOfPayments: number): number;
export declare function intToHex(num: number): string;
export declare function randomRange(min: number, max: number): number;
export declare function random(num: number): number;
export declare function randomColor(): string;
