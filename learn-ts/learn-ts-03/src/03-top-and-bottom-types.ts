//* any -- when using ANY typechecking is disabled
// let flexible: any = 4;
// flexible = 'Download some more ram';
// flexible = window.document;
// flexible = setTimeout;

// flexible.it.is.possible.to.access.any.deep.property;

// console.log(window, Promise, setTimeout, 'foo');

//* unknown

// let flexible2: unknown = 4;
// flexible2 = 'Download some more ram';
// flexible2 = window.document;
// flexible2 = setTimeout;

let myUnknown: unknown = 14;
// myUnknown.it.is.possible.to.access.any.deep.property; //✔️ Fails as it should
// //! Cant use it until we make checks what type it is

// This code runs for myUnknown = { all possible values }
if (typeof myUnknown === 'string') {
  // This code runs for myUnknown = { all strings }
  myUnknown;
  //     ^?
} else if (typeof myUnknown === 'number') {
  // This code runs for myUnknown = { all numbers }
  myUnknown;
  //     ^?
} else {
  myUnknown;
  // ^?
  // this would run for "the leftovers"
  //       myUnknown = { anything except string or numbers }
}

//* Practical use of top types

function doSomethingRisky() {
  if (Math.random() > 0.5) return 'ok';
  else if (Math.random() > 0.5) throw new Error('Bad luck!');
  else throw 'Really bad luck';
}

try {
  doSomethingRisky();
} catch (e: unknown) {
  if (e instanceof Error) {
    e;
    //   ^?
  } else if (typeof e === 'string') {
    e;
    //   ^?
  } else {
    // Last resort
    console.error(e);
    //                 ^?
  }
}

//* Almost top type: object

let val: object = { status: 'ok' };

console.log(val); // Output: { status: 'ok' }

// val = 'foo'; //! string is not an object
// val = null; //! null is not an object

val = () => 'ok'; //✔️ functions are objects
console.log(val); // Output: [Function: val]

// The type of this value cannot be modeled by an interface
let response:
  | { success: string; data: unknown }
  | { error: string; code: number } = {
  success: 'ok',
  data: [],
};

val = response;

//* Almost top type: {}
// ! all posable values Except NULL and UNDEFINED

const stringOrNumber: string | number = 7;
let nullableString: string | null = null;
const myObj: {
  a?: number;
  b: string;
} = { b: 'foo' };
console.log(myObj); // Output: { b: 'foo' }

let val2: {} = 4;
console.log(val2); // Output: 4
val2 = 'abc';
console.log(val2); // Output: abc
val2 = new Date();
console.log(val2); // Output: 2023-12-18T09:49:34.275Z
val2 = stringOrNumber;
console.log(val2); // Output: 7

// val2 = nullableString
// val2 = myObj.a

// //? Adding in null and undefined, and we're back to a top type
let withoutUndefined: {} | null = 37;
console.log(withoutUndefined); // Output: 37

let withUndefined: {} | null | undefined = 38;
console.log(withUndefined); // Output: 38

let anUnknown: unknown = '42';
console.log(anUnknown); // Output: 42

// withoutUndefined = anUnknown //! unknown is not assignable to {}
withUndefined = anUnknown; //✔️ OK
console.log(withUndefined); // Output: 42

type NullableStringOrNumber = string | number | null | undefined;
type StringOrNumber = NullableStringOrNumber & {}; // ✔️ remove the null and undefined
//! type StringOrNumber = string | number

//* Bottom type: never

function obtainRandomVehicle(): any {
  return {} as any;
}

class Car {
  drive() {
    console.log('vroom');
  }
}
class Truck {
  tow() {
    console.log('dragging something');
  }
}
//? Add Boat
class Boat {
  isFloating() {
    return true;
  }
}
type Vehicle = Truck | Car | Boat;

//? Unreachable Error
class UnreachableError extends Error {
  constructor(_nvr: never, message: string) {
    super(message);
  }
}

let myVehicle: Vehicle = obtainRandomVehicle();

// The exhaustive conditional
if (myVehicle instanceof Truck) {
  myVehicle.tow(); // Truck
} else if (myVehicle instanceof Car) {
  myVehicle.drive(); // Car
} else if (myVehicle instanceof Boat) {
  console.log(myVehicle.isFloating);
} else {
  // NEITHER!
  const neverValue: never = myVehicle;
  //   throw new UnreachableError(
  //     myVehicle,
  //     `Unexpected vehicle type: ${myVehicle}`
  //   );
}

//* Unit Types

// //? null and undefined
let myNull: null = null;
let myUndefined: undefined = undefined;

// myNull = undefined;  //!~ Type 'undefined' is not assignable to type 'null'.
// myUndefined = null;  //!~ Type 'null' is not assignable to type 'undefined'.

// //? void
let myVoid: void = (function () {})(); // invoking a void-returning IIFE

myVoid = undefined;
// myVoid = null; //!~ Type 'null' is not assignable to type 'void'.

// myUndefined = myVoid; //!~ Type 'void' is not assignable to type 'undefined'.
// myNull = myVoid; //!~ Type 'void' is not assignable to type 'null'.

/**/

export default {};
