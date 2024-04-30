const contactA1 = {
  name: 'Anna',
  email: 'anna1234@gmail.com',
};

type WhatIWant = 'name' | 'email';

// type Try1 = keyof contactA1;
//! contactA1 refers to a value, but is being used as a type here. Did you mean typeof contactA1

type Try2 = typeof contactA1;

// keyof  => Objects.keys() for types
// typeof => "get me the type of this value('s)"

//------------------------------------------------------------------
//* keyof
type DatePropertyNames = keyof Date;

type DateStringPropertyNames = DatePropertyNames & string;
type DateSymbolPropertyNames = DatePropertyNames & symbol;

//* typeof

async function main() {
  const apiResponse = await Promise.all([
    fetch('https://example.com'),
    Promise.resolve('Titanium White'),
  ]);
  type ApiResponseType = typeof apiResponse;
}

//?^ note: type alias within a function scope!
const MyAjaxConstructor = CSSRule;
CSSRule.STYLE_RULE;
const myAjax = new CSSRule();

type MyRuleType = typeof MyAjaxConstructor;

//* Indexed Access Types

interface Car {
  make: string;
  model: string;
  year: number;
  color: {
    red: string;
    green: string;
    blue: string;
  };
}

let carColor: Car['color']; //✔️ Reaching for something that exists
//! you are accessing within a type using an index (the index is the string we are using as key)

// let carSomething: Car["not-something-on-car"] //! Reaching for something invalid

let carColorRedComponent: Car['color']['red']; //✔️ Reaching for something nested

let carProperty: Car['color' | 'year']; // ✔️ Passing a union type through the index

//* Use case: the type registry pattern

// See:
import('./09-type-registry');

/**/
export default {};
