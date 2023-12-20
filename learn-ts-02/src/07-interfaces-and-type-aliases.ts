//* Type Aliases
// export a type -- Alias so it can be used in another file
export type Amount = {
  currency: string;
  value: number;
};

type MightBeNull = string | null;

function printAmount(amt: Amount) {
  console.log(amt);

  const { currency, value } = amt;
  console.log(`${currency} ${value}`);
}

const donation = {
  currency: 'USD',
  value: 30.0,
  description: 'Donation to food bank',
};

printAmount(donation); //✔️ Valid

//? Let's look at a familiar example from the last chapter

function flipCoin() {
  if (Math.random() > 0.5) return 'heads';
  return 'tails';
}
const success = [
  'success',
  { name: 'Mike North', email: 'mike@example.com' },
] as const;
const fail = ['error', new Error('Something went wrong!')] as const;

export function maybeGetUserInfo():
  | readonly ['error', Error]
  | readonly ['success', { name: string; email: string }] {
  // implementation is the same in both examples
  if (flipCoin() === 'heads') {
    return success;
  } else {
    return fail;
  }
}

//? Let's model the return type as an interface

type UserInfoOutcomeError = readonly ['error', Error];
type UserInfoOutcomeSuccess = readonly [
  'success',
  { readonly name: string; readonly email: string }
];
type UserInfoOutcome = UserInfoOutcomeError | UserInfoOutcomeSuccess;

export function typedMaybeGetUserInfo(): UserInfoOutcome {
  // Used the defined type
  // implementation is the same in both examples
  if (flipCoin() === 'heads') {
    return success;
  } else {
    return fail;
  }
}

//* Inheritance in type aliases

type SpecialDate = Date & { getDescription(): string };
// intersection type you get both the functions from Data and the function getDescription()

const newYearsEve: SpecialDate =
  //                    ^?
  Object.assign(new Date(), { getDescription: () => 'Last day of the year' });

newYearsEve.getDescription;
// //             ^?

//* Interfaces

interface Amount2 {
  currency: string;
  value: number;
}

function printAmount2(amt: Amount2) {
  amt;
}

//* Inheritance in interfaces

//? `extends` keyword // implements -- class can implement an interface

function consumeFood(arg: string) {
  console.log(`Eating: ${arg}`);
}

class AnimalThatEats {
  eat(food: string) {
    consumeFood(food);
  }
}
class Cat extends AnimalThatEats {
  meow() {
    return 'meow';
  }
}

const c = new Cat();
c.eat;
c.meow();

interface Animal {
  isAlive(): boolean;
}
interface Mammal extends Animal {
  getFurOrHairColor(): string;
}
interface Hamster extends Mammal {
  squeak(): string;
}
function careForHamster(h: Hamster) {
  h.getFurOrHairColor();
  h.squeak();
  //   ^|
}

//? `implements` keyword

interface AnimalLike {
  eat(food: string): void;
}

class Dog implements AnimalLike {
  eat(food: string): void {
    consumeFood(food);
  }
  isAlive() {
    // Added only when needed after AnimalLike interface is added on on row 198
    return true;
  }
  bark() {
    return 'woof';
  }
}

class LivingOrganism {
  //? A base class
  isAlive() {
    return true;
  }
}
interface CanBark {
  //? Another interface
  bark(): string;
}
class Dog2 extends LivingOrganism implements AnimalLike, CanBark, Animal {
  // Animal is not needed as similar thing is implemented in LivingOrganism
  bark() {
    return 'woof';
  }
  eat(food: string) {
    consumeFood(food);
  }
}

interface DogLike extends AnimalLike, CanBark, Animal {}

//? Implements sometimes works with type aliases

type CanJump = {
  jumpToHeight(): number | [number, number];
};

class Dog3 implements CanJump {
  jumpToHeight() {
    return 1.7;
  }
  eat(food: string) {
    consumeFood(food);
  }
}

type CanBark2 =
  | number
  | {
      bark(): string;
    };

//* Open interfaces

function feed(animal: AnimalLike) {
  animal.eat;
  animal.isAlive;
}

interface AnimalLike {
  //✔️ Additional declaration is OK
  isAlive(): boolean;
}

new Dog2().isAlive(); // ✔️ Valid
new Dog2().bark();
new Dog2().eat('meat');

//* Use case: augmenting existing types

// window.document; // an existing property
// //      ^? (property) document: Document
// window.exampleProperty = 42;
// //      ^? (property) exampleProperty: number

// // tells TS that `exampleProperty` exists
// declare global {
//   //! add interface to the global scope so it can be used in other files
//   interface Window {
//     exampleProperty: number;
//     //! we are using open interfaces to augment existing types
//   }
// }

//* Recursive types
type NestedNumbers = number | NestedNumbers[]; //! type nested numbers

const valNumbers: NestedNumbers = [3, 4, [5, 6, [7], 59], 221];

if (typeof valNumbers !== 'number') {
  valNumbers.push(41);
  valNumbers.push([11, 23]);
  valNumbers.push(77, 15);

  // valNumbers.push('this will not work'); //! No strings allowed
}

console.log(valNumbers);

/**/
export default {};
