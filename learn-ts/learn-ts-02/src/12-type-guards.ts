//* Built-in type guards
let value:
  | Date
  | null
  | undefined
  | 'pineapple'
  | [number]
  | { dateRange: [Date, Date] };

// instanceof
if (value instanceof Date) {
  value;
  // value is of type Date
}
// typeof
else if (typeof value === 'string') {
  value;
  // value has to be "pineapple"
}
// Specific value check
else if (value === null) {
  value;
  // value is NULL
}
// Truthy/falsy check
else if (!value) {
  value;
  // value is UNDEFINED we know it is not NULL
}
// Some built-in functions
else if (Array.isArray(value)) {
  value;
  // array ot numbers
}
// Property presence check
else if ('dateRange' in value) {
  value;
  // if it is an Object | this is the only thing it could be
} else {
  value;
  // empty set || there in nothing else it could be
}

//* User-defined type guards

interface CarLike {
  make: string;
  model: string;
  year: number;
}

let maybeCar: any;

// the guard
if (
  maybeCar &&
  typeof maybeCar === 'object' &&
  'make' in maybeCar &&
  typeof maybeCar['make'] === 'string' &&
  'model' in maybeCar &&
  typeof maybeCar['model'] === 'string' &&
  'year' in maybeCar &&
  typeof maybeCar['year'] === 'number'
) {
  maybeCar;
  // the object is type ANY not CarLike
}

// the guard
function isCarLike(valueToTest: any): valueToTest is CarLike {
  //!the IS tels the compiler what the returning boolean means
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    'make' in valueToTest &&
    typeof valueToTest['make'] === 'string' &&
    'model' in valueToTest &&
    typeof valueToTest['model'] === 'string' &&
    'year' in valueToTest &&
    typeof valueToTest['year'] === 'number'
  );
  // the check must be well defined
}

// using the guard
if (isCarLike(maybeCar)) {
  maybeCar;
  // using User-defined type guard
}

//* value is foo

// function isBaseClass(valueToTest: any): valueToTest is BaseClass {
// // example

//* asserts value is foo

function assertsIsCarLike(valueToTest: any): asserts valueToTest is CarLike {
  if (
    // inverting the result
    !(
      valueToTest &&
      typeof valueToTest === 'object' &&
      'make' in valueToTest &&
      typeof valueToTest['make'] === 'string' &&
      'model' in valueToTest &&
      typeof valueToTest['model'] === 'string' &&
      'year' in valueToTest &&
      typeof valueToTest['year'] === 'number'
    )
  )
    throw new Error(`Value does not appear to be a CarLike${valueToTest}`);
}
// in this case using the ASSERTS word we trow an Error message if it's not the type we want
assertsIsCarLike(maybeCar);
{
  // we wont get to this if ti's not CarLike it will trow an ERROR
  maybeCar;
}

//* Use with private #field presence checks

class Car {
  static #nextSerialNumber: number = 100;
  static #generateSerialNumber() {
    return this.#nextSerialNumber++;
  }

  #serialNumber = Car.#generateSerialNumber();

  static isCar(other: any): other is Car {
    if (
      other && // is it truthy
      typeof other === 'object' && // and an object
      #serialNumber in other
    ) {
      // and we can find a private field that we can access from here
      // then it *must* be a car
      other;
      // ^?
      return true;
    }
    return false;
  }
}

let val: any;

if (Car.isCar(val)) {
  val;
  //val is of type Car
}

//* Narrowing with switch(true)

class Fish {
  swim(): void {}
}
class Bird {
  fly(): void {}
}
// switch on true so it checks the clouses
switch (true) {
  case val instanceof Bird:
    val.fly();
    break;
  case val instanceof Fish:
    val.swim();
    break;
}

//* Writing high-quality type guards

//! EXAMPLE OF A BAD TYPE GUARD
function isNull(val: any): val is null {
  return !val; //! Lies!
  // return val === null;
}

const empty = '';
const zero = 0;
if (isNull(zero)) {
  console.log(zero); //? is it really impossible to get here?
}
if (isNull(empty)) {
  console.log(empty); //? is it really impossible to get here?
}

/**/
export default {};
