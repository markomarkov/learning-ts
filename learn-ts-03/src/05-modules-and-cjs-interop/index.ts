//* ES module imports and exports

//? named imports
import { Blueberry as Blue, Raspberry } from './berries'; // Blue is the name I renamed Blueberry as in the scope of its use in the file
import Kiwi from './kiwi'; // default import

export function makeFruitSalad() {} // named export

export default class FruitBasket {} // default export

export { lemon, lime } from './citrus'; // re-export
export * as berries from './berries'; // re-export entire module as a single namespace

// //? namespace import
import * as allBerries from './berries'; // namespace import

allBerries.Strawberry; // using the namespace
allBerries.Blueberry;
allBerries.Raspberry;

export * from './berries'; // namespace re-export

//* Importing types

let x: Raspberry = { color: 'red' }; // use as Type
const y = new Raspberry('red'); // use as Value

//* Type-only imports

import type { Strawberry } from './berries/strawberry'; // we are importing as Type

let z: Strawberry = { color: 'red' };
// new Strawberry(); //!~ 'Strawberry' cannot be used as a value because it was imported using 'import type'.

//* CommonJS Interop

// //? "import as a namespace"
import * as bananaNamespace from './banana';

const banana = new bananaNamespace.Banana();

//? import as a single thing (rare)
// import * as melonNamespace from './melon'
//!~ This module can only be referenced with ECMAScript imports/exports by turning on the esModuleInterop flag and referencing its default export.

//? special ts import
import Melon = require('./melon'); // not ES import byt it's a workaround of the top one

const melon = new Melon();
melon.cutIntoSlices();

//* Native ES Module support

import * as bananaNamespace2 from './banana.cjs';
// package.json --> 'type: module', 'type: commonjs'
bananaNamespace2.Banana; // we can call the class Banana

//* Importing non-ts things

import img from "./ts-logo.png"
//? Add to global.d.ts
// declare module '*.png' {
//   const imgUrl: string
//   export default imgUrl
// }

/**/
// export default {}
