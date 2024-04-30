export class Person {
  #name = ''; //#.. is a JS private field, and it’s actually inaccessible outside of the class at runtime
  private age = 1; //PRIVATE .. is a TypeScript private field, and while type-checking helps ensure we do not access it improperly, at runtime it’s accessible outside the class
}

const a = 'Frontend Masters'; //immutable
let b = 'Frontend Masters'; //immutable

const c = { learnAt: 'Frontend Masters' }; //mutable
let d = { learnAt: 'Frontend Masters' }; //mutable

const e = Object.freeze({ learnAt: 'Frontend Masters' }); //immutable
// FREEZE locks an object so it cant be changed

const str = 'hello';
let val = str.split('');
console.log(val); //Output: ['h', 'e', 'l', 'l', 'o']

const str2 = 'hello';
let val2 = { ...str2.split('') }; // spread into object
console.log(val2);
/**
 * {
 *   '0': 'h',
 *   '1': 'e',
 *   '2': 'l',
 *   '3': 'l',
 *   '4': 'o'
 * }
 */
function keyStringWith(params: string) {
  let returnObject = '';
  for (let index = 0; index < params.length; index++) {
    if (returnObject !== '') {
      returnObject = returnObject + ', ||  ' + `"${index}": "${params[index]}"`;
    } else {
      returnObject = `"${index}": "${params[index]}"`;
    }
  }
  return returnObject;
}
function keyString(params: string) {
  let returnObject = '';
  for (let index = 0; index < params.length; index++) {
    if (returnObject !== '') {
      returnObject = returnObject + ', ||  ' + `${index}: ${params[index]}`;
    } else {
      returnObject = `${index}: ${params[index]}`;
    }
  }
  return returnObject;
}
let val3 = keyString(str);
console.log(val3); //Output: 0: h, ||  1: e, ||  2: l, ||  3: l, ||  4: o

// @errors: 2322 2320
let first1: string & number;
let second1: String & Number;

// first1 = 'abc'; //!^ Type 'string' is not assignable to type 'never'.
// second1 = 'abc';  //!^Type 'string' is not assignable to type 'String & Number'.  Type 'string' is not assignable to type 'Number'.
// second1 = new String('abc'); //!^Type 'string' is not assignable to type 'String & Number'.

let first: string & number;
let second: String & Number;

// interface Foo extends String, Number {}

interface Bar extends String, Number {
  valueOf(): never;
  toString(): string;
}

let bar: Bar = {
  ...new Number(4),
  ...new String('abc'),
  ...{
    valueOf() {
      return '' as never;
    },
  },
};

second = bar;
// first = bar; //!^ Type 'Bar' is not assignable to type 'never'.

function getData() {
  console.log('elephant');
  const p = new Promise((resolve) => {
    console.log('giraffe');
    resolve('lion');
    console.log('zebra');
  });
  console.log('koala');
  return p;
}
async function main() {
  console.log('cat');
  const result = await getData();
  console.log(result);
}
console.log('dog');
main().then(() => {
  console.log('moose');
});

//--------------------------------------------------------------------

type Color = [
  number, // red (0-255)
  number, // green (0-255)
  number // blue (0-255)
];

// Worked this way, even before TS 4.x
enum Sandwich {
  Hamburger,
  VeggieBurger,
  GrilledCheese,
  BLT,
}
type SandwichOrder = [
  number, // order total
  Sandwich, // sandwich
  ...string[] // toppings
];

const order1: SandwichOrder = [12.99, Sandwich.Hamburger, 'lettuce'];
const order2: SandwichOrder = [14.99, Sandwich.Hamburger, 'avocado', 'cheese'];

// const order_with_error: SandwichOrder = [10.99, 'lettuce'];
//! Type 'string' is not assignable to type 'Sandwich'. -- the 'Sandwich' field is skipped

console.log(order1);
console.log(order2);

// Worked this way, even before TS 4.x
type MyTuple<T> = [number, ...T[]];

const x1: MyTuple<string> = [4, 'hello', 'world', 'pasta'];
const x2: MyTuple<boolean> = [7, true, false, true, true];

console.log(x1);
console.log(x2);

const order12: SandwichOrder = [12.99, Sandwich.GrilledCheese, 'lettuce'];

/**
 * return an array containing everything except the first element
 */
function tail<T>(arg: readonly [number, ...T[]]) {
  const [_ignored, ...rest] = arg;
  return rest;
}
const orderWithoutTotal = tail(order12);
//    const orderWithoutTotal: (string | Sandwich)[]

//-------------------------------------------------------------------------------
function returnArray1<T>(arg: readonly T[]): readonly T[] {
  return arg;
}
const arr1 = [Sandwich.Hamburger, 'lettuce'] as const;
//     const arr1: readonly [Sandwich.Hamburger, "lettuce"]
const result1 = returnArray1(arr1);
//     const result1: readonly (Sandwich.Hamburger | "lettuce")[]
//-------------------------------------------------------------------------------
function returnArray2<T extends any[]>(arg: T): T {
  return arg;
}
const arr2: [Sandwich.Hamburger, 'lettuce'] = [Sandwich.Hamburger, 'lettuce'];
//     const arr2: [Sandwich.Hamburger, "lettuce"]
const result2 = returnArray2(arr2);
//     const result2: [Sandwich.Hamburger, "lettuce"]
//-------------------------------------------------------------------------------

/**
 * return an array containing everything except the first element
 */
function tail1<T extends any[]>(arg: readonly [number, ...T]) {
  const [_ignored, ...rest] = arg;
  return rest;
}
const order13: SandwichOrder = [12.99, Sandwich.Hamburger, 'lettuce'];

const result3 = tail1(order13);
//    const result: [Sandwich, ...string[]]

const res11 = tail(order12);
const res12 = tail(order2);

console.log(res11);
console.log(res12);

//-------------------------------------------------------------------------------

type MyTuple1 = [...[number, number], ...[string, string, string]];
const xA1: MyTuple1 = [1, 2, 'a', 'b', 'c'];
console.log(xA1);
type YEScompile1 = [...[number, number], ...string[]];
type YEScompile2 = [boolean, ...number[], string];
// type NOcompile1 = [...number[], ...string[]];  //! Not working

//-------------------------------------------------------------------------------

const test1 = Math.random() > 0.5 ? 'Pond' : 'Test';
console.log(test1);

//-------------------------------------------------------------------------------

class ColorA2 {
  red; // :number no longer needed!
  // (property) ColorA2.red: number
  green; // :number no longer needed!
  blue; // :number no longer needed!
  constructor(c: [number, number, number]) {
    this.red = c[0];
    this.green = c[1];
    this.blue = c[2];
  }
}

//-------------------------------------------------------------------------------
//? I advise always typing errors as unknown, and can’t think of any scenario where it would be worse than an any.

function somethingRisky() {}

try {
  somethingRisky();
} catch (err: unknown) {
  if (err instanceof Error) throw err;
  else throw new Error(`${err}`);
}

//-------------------------------------------------------------------------------

type Statistics = {
  [K in `${'median' | 'mean'}Value`]?: number; // mapped type -- list of keys and adding them value
};
const stats: Statistics = {};
stats.meanValue;
stats.medianValue;

let winFns: Extract<keyof Window, `set${any}`> = '' as any;
//   let winFns: "setInterval" | "setTimeout"

type T1 = `send${Capitalize<'mouse' | 'keyboard'>}Event`; // Capitalize
//   type T1 = "sendMouseEvent" | "sendKeyboardEvent"
type T2 = `send${Uppercase<'mouse' | 'keyboard'>}Event`; // Uppercase
//   type T2 = "sendMOUSEEvent" | "sendKEYBOARDEvent"
type T3 = `send${Lowercase<'Mouse' | 'keyBoard'>}Event`; // Lowercase
//   type T3 = "sendmouseEvent" | "sendkeyboardEvent"

//-------------------------------------------------------------------------------

type Colors = 'red' | 'green' | 'blue';
type ColorSelector = {
  [K in Colors as `select${Capitalize<K>}`]: () => void;
};
const cs: ColorSelector = {} as any;
cs.selectRed();
cs.selectBlue();
cs.selectGreen();

//-------------------------------------------------------------------------------

type Dict<T> = { [K: string]: T | undefined };
const d1: Dict<string[]> = {};

// d1.rhubarb.join(', '); //!^ 'd1.rhubarb' is possibly 'undefined'.

const { toilet } = d1;
if (toilet) {
  toilet.join(', ');
}

//-------------------------------------------------------------------------------

const myStrings: Array<string> = [];
let valStr = myStrings[4];
myStrings.map((valStr) => {});
