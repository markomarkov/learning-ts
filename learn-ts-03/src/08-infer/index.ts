//* A motivating use case
import { createOrder } from './fruit-market';
//        ^?

type GetFirstArg<T> = any;

const prefs: GetFirstArg<typeof createOrder> = {};

createOrder(prefs);

//* Example: extracting the type that a promise resolves to

const eventuallyNumber = Promise.resolve(123);
console.log(eventuallyNumber);

//
// If the type `P` passed in is some kind of `PromiseLike<T>`
// (where `T` is a new type param), extract `T` and return it.
// If `P` is not some subtype of `PromiseLike<any>`, pass the
// type `P` straight through and return it
//
type UnwrapPromise<P> = P extends PromiseLike<infer T> ? T : P;

type test1 = UnwrapPromise<Promise<string>>;
type test2 = UnwrapPromise<Promise<[string[], number[]]>>;
type test3 = UnwrapPromise<number>;

//* Back to our motivating use case - A need for the first arg of a function

type OneArgFn<A = any> = (firstArg: A, ..._args: any[]) => void; // getting the type of the first argument and skipping the other arguments

// type OneArgFn<A> = (firstArg: A, ..._args: any[]) => void; // wont work because if 'A' is not provided JS does not know wat type it is

// Test case 1
type GetFirstArg2<T extends OneArgFn> = T extends OneArgFn ? string[] : never;

function foo(x: string, y: number) {
  return null;
}
type t1 = GetFirstArg2<typeof foo>; //✔️

// Test case 2
type GetFirstArg3<T> = T extends OneArgFn<infer R> ? R : never;

type RangeMinMax = {
  min: number;
  max: number;
};
function foo2(x: RangeMinMax, y: number) {
  return null;
}
type t2 = GetFirstArg3<typeof foo2>; //✔️

// Test case 3
function barJ() {}
type t3 = GetFirstArg3<typeof barJ>;

//* Constraints to infer
// ..._: any  <-- is used as spread parameter  -- there can be as many as we want -- underscore is for things to ignore
// ..._restOfTheStuff: any  <-- similar to the one at top just named "_restOfTheStuff"
type GetFirstStringIshElement1<T> = T extends readonly [infer S, ..._: any[]]
  ? S
  : never;

type GetFirstStringIshElement2<T> = T extends readonly [
  infer S extends string,
  ..._: any[]
]
  ? S
  : never;

const t1 = ['success', 2, 1, 4] as const;
let firstT1: GetFirstStringIshElement1<typeof t1>;
let firstT12: GetFirstStringIshElement2<typeof t1>;

const t2 = [4, 54, 5] as const;
let firstT2: GetFirstStringIshElement1<typeof t2>;
let firstT22: GetFirstStringIshElement2<typeof t2>;

//? axd infer
// infer S extends string,

//? add type param constraint
// T extends string

//* Utility types that use `infer`
//------------------------------------------------------------------------------------

//* Parameters<T>
/**
 * Obtain the parameters of a function type in a tuple
 */
type _Parameters/**
 * The typeParam passed in, must be some subtype of a call signature,
 * which can take any number of arguments of any types, and can
 * have any return type
 */
<T extends (...args: any) => any> =
  /**
   * As long as `T` matches a call signature, capture all of the args
   * (as a ...rest) parameter in a new tuple typeParam `P`
   */
  T extends (...args: infer P) => any
    ? P // and then return the tuple
    : never; // or return never, if the condition is not matched
//------------------------------------------------------------------------------------

//* ConstructorParameters<T>
/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type _ConstructorParameters/**
 * The typeParam passed in, must be some subtype of a construct
 * signature.
 *
 * The `abstract` keyword lets this also work with abstract classes,
 * which can potentially have an `abstract` constructor
 */
<T extends abstract new (...args: any) => any> =
  /**
   * As long as `T` matches a construct signature, capture all of the
   * args (as a ...rest) parameter in a new tuple typeParam `P`
   */
  T extends abstract new (...args: infer P) => any
    ? P // and then return the tuple
    : never; // or return never, if the condition is not matched
//------------------------------------------------------------------------------------

//* ReturnType<T>
/**
 * Obtain the return type of a function type
 */
type _ReturnType/**
 * The typeParam passed in must be some subtype of a call signature
 */
<T extends (...args: any) => any> =
  /**
   * As long as `T` matches the call signature, capture the return type
   * in a new typeParam `R`
   */
  T extends (...args: any) => infer R // 'R' holds the return type
    ? R // and then return it
    : any; // otherwise return any
//------------------------------------------------------------------------------------

//* InstanceType<T>
/**
 * Obtain the return type of a constructor function type
 */
type _InstanceType/**
 * The typeParam passed in must be some subtype of a construct signature
 */
// ABSTRACT is half class, half interface  and peaces of the class can be not filled in
// abstract classes cannot be used directly only when inherited by other
<T extends abstract new (...args: any) => any> =
  /**
   * As long as `T` matches the construct signature, capture the return
   * type in a new typeParam `R`
   */
  T extends abstract new (...args: any) => infer R // 'R' is what the constructor returns (that instance type)
    ? R // and then return it
    : any; // otherwise return any
//------------------------------------------------------------------------------------

//* ThisParameterType<T> and OmitThisParameter<T>
/**
 * Extracts the type of the 'this' parameter of a function type, or 'unknown'
 * if the function type has no 'this' parameter.
 */
type _ThisParameterType<T> = T extends (this: infer U, ...args: never) => any
  ? U
  : unknown;

/**
 * Removes the 'this' parameter from a function type.
 */
type OmitThisParameter<T> =
  /**
   * If `ThisParameterType<T>` evaluates to `unknown`, it means one of two
   * things:
   * (1) `T` is not a call signature type
   * (2) `T` is a call signature type, with a `this` type of `undefined`
   *
   * In either of these cases, we effectively short circuit, and return
   * the `unknown`
   */
  unknown extends ThisParameterType<T>
    ? T
    : /**
     * In this branch, we know that `T` is a call signature, with a
     * non-undefined `this` type
     *
     * Here we are inferring _both_ the tuple type representing the
     * arguments, _and_ the return type into two new typeParams, `A` and
     * `R`, respectively
     */
    T extends (...args: infer A) => infer R
    ? /**
       * Here, we are effectively reconstructing the function
       * _without_
       * the `this` type, using both of our `infer`red typeParams, `A`
       * and `R`
       */
      (...args: A) => R
    : /**
       * essentially this is an unreachable branch. It doesn't really
       * matter what this type is
       */
      T;

export default {};
