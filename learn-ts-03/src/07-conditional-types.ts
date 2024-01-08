//* Ternary operator with values
const x = 16;
const isXNegative = x >= 0 ? 'no' : 'yes';

console.log(`Is X Negative: ${isXNegative}`);

class Grill {
  startGas() {}
  stopGas() {}
}
class Oven {
  setTemperature(degrees: number) {}
}

type CookingDevice<T> = T extends 'grill' ? Grill : Oven;

let device1: CookingDevice<'grill'>;
//   let device1: Grill
let device2: CookingDevice<'oven'>;
//   let device2: Oven

//* Expressing Conditions

const one = 1;
const two = 2;
const ten = 10;

type IsLowNumber<T> = T extends 1 | 2 ? true : false;
type TestOne = IsLowNumber<1>;
type TestTwo = IsLowNumber<2>;
type TestTen = IsLowNumber<10>;
type TestTenWithTwo1 = IsLowNumber<10 | 2>;
type TestTenWithTwo2 = IsLowNumber<10> | IsLowNumber<2>;

//* Extract<T, U>

type FavoriteColors =
  | 'dark sienna'
  | 'van dyke brown'
  | 'yellow ochre'
  | 'sap green'
  | 'titanium white'
  | 'phthalo green'
  | 'prussian blue'
  | 'cadium yellow'
  | [number, number, number]
  | { red: number; green: number; blue: number };

type StringColors = Extract<FavoriteColors, string>;
//    "dark sienna" | "van dyke brown" | "yellow ochre" | "sap green" | "titanium white" | "phthalo green" | "prussian blue" | "cadium yellow"
type ObjectColors = Extract<FavoriteColors, { red: number }>;
//    { red: number; green: number; blue: number }
type TupleColors = Extract<FavoriteColors, [number, number, number]>;
//     [number, number, number]
type TupleColors2 = Extract<FavoriteColors, any[]>;
//     [number, number, number]

//* Exclude<T, U>

type NonStringColors = Exclude<FavoriteColors, string>;
//  [number, number, number] | { red: number; green: number; blue: number }
//  the opposite of Extract<>

//* How do these work? When to use NEVER

type _Exclude<T, U> = T extends U ? never : T;
type _Extract<T, U> = T extends U ? T : never;

type OneNever = 1 | never;
//  NEVER is used when we want something to disappear

type NewExtract<T, U> = T & U;
type exampleA1 = NewExtract<FavoriteColors, string>;
let ax: exampleA1 = 'cadium yellow';
// let bx: exampleA1 = 'yellow'; //! Type '"yellow"' is not assignable to type 'exampleA1'.0

export default {};
