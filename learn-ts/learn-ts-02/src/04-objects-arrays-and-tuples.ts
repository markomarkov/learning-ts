//* Objects

const myCar = {
  make: 'Toyota',
  model: 'Corolla',
  year: 2002,
};

let car: {
  make: string;
  model: string;
  year: number;
} = myCar;

// /*
//? A function that prints info about a car to stdout
function printCar(car?: {
  make: string;
  model: string;
  year: number;
  chargeVoltage?: number; //? Optional property
}) {
  if (!car) {
    console.log('There is no Car to print');
    return;
  }
  let str = `${car.make} ${car.model} (${car.year})`;
  // if (typeof car.chargeVoltage !== 'undefined')
  if (typeof car.chargeVoltage === 'number')
    //! Type guard
    str += ` // ${car.chargeVoltage}V`;
  // console.log(`${car.make} ${car.model} (${car.year})`)
  console.log(str);
}

printCar(myCar);
printCar();
printCar(car);

// /*
//* Optional properties
//? Insert into function printCar
// let str = `${car.make} ${car.model} (${car.year})`
// car.chargeVoltage
// if (typeof car.chargeVoltage !== "undefined")
//   str += `// ${car.chargeVoltage}v`

// /*
printCar({
  //? original fn works
  make: 'Honda',
  model: 'Accord',
  year: 2017,
});

printCar({
  //? optional property works too!
  make: 'Tesla',
  model: 'Model 3',
  year: 2020,
  chargeVoltage: 220,
});

// /*
//* Excess property checking

// printCar({
//   make: 'Tesla',
//   model: 'Model 3',
//   year: 2020,
//   color: 'RED', //? EXTRA PROPERTY
// })

// /*
//* Index signatures

//? Dictionary of phone #s
// const phones = {
//   home: { country: '+1', area: '211', number: '652-4515' },
//   work: { country: '+1', area: '670', number: '752-5856' },
//   fax: { country: '+1', area: '322', number: '525-4357' },
// }
// /*
//? Model as an index signature
const phones: {
  [k: string]: {
    country: string;
    area: string;
    number: string;
  };
  mobile: {
    country: string;
    area: string;
    number: string;
  };
} = {
  home: { country: '+1', area: '211', number: '652-4515' },
  work: { country: '+1', area: '670', number: '752-5856' },
  fax: { country: '+1', area: '322', number: '525-4357' },
  mobile: { country: '+77', area: '88', number: '424-3319' },
};

const x: { [k: string]: string } = {};
x.foo = '010101';

console.log(phones['home']);
console.log(phones.mobile);
// console.log(phones['aaaa']) //? undefined

//*  Array Types

// /*
const fileExtensions = ['js', 'ts']; // this is a string array
//  ^? string[]   Array<string>

const cars = [
  //? Let's look at an array of objects
  {
    make: 'Toyota',
    model: 'Corolla',
    year: 2002,
  },
];

//* Tuples
// /*
let myCar2 = [
  2002, // Year
  'Toyota', // Make
  'Corolla', // Model
];
const [year, make, model] = myCar2; //✔️ Destructuring

//? Inference doesn't work very well for tuples

myCar2 = ['Honda', 2017, 'Accord', 'Sedan']; //! Wrong convention

let myCar3: [number, string, string] = [2002, 'Toyota', 'Corolla'];

// myCar3 = ['Honda', 2017, 'Accord']; //! Wrong convention
// myCar3 = [2017, 'Honda', 'Accord', 'Sedan']; //! Too many elements

//*  `readonly` tuples

const numPair: [number, number] = [4, 5]; //✔️ Valid
// const numTriplet: [number, number, number] = [7]; //! Invalid

[101, 102, 103].length; //? number[].length
let sizeOfNumPair = numPair.length; //? [number, number] length
console.log(`Size of numPair: ${sizeOfNumPair} //in beginning`);

numPair.push(6); // [4, 5, 6]
numPair.pop(); // [4, 5]
numPair.pop(); // [4]
numPair.pop(); // []

let sizeNumPair = numPair.length; //! ❌ DANGER ❌
console.log(`Size of numPair: ${sizeNumPair} //after changes`);

const roNumPair: readonly [number, number] = [4, 5];
roNumPair.length;
// roNumPair.push(6); // [4, 5, 6] //! Not allowed
// roNumPair.pop(); // [4, 5] //! Not allowed

/**/

export default {};
