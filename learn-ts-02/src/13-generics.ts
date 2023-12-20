//* A motivating use case

const phoneList = [
  { customerId: '0001', areaCode: '321', num: '123-4566' },
  { customerId: '0002', areaCode: '174', num: '142-3626' },
  { customerId: '0003', areaCode: '192', num: '012-7190' },
  { customerId: '0005', areaCode: '402', num: '652-5782' },
  { customerId: '0004', areaCode: '301', num: '184-8501' },
];
const phoneDict = {
  '0001': {
    customerId: '0001',
    areaCode: '321',
    num: '123-4566',
  },
  '0002': {
    customerId: '0002',
    areaCode: '174',
    num: '142-3626',
  },
  /*... and so on */
};

interface PhoneInfo {
  customerId: string;
  areaCode: string;
  num: string;
}

function listToDict(
  list: PhoneInfo[], // take the list as an argument
  idGen: (arg: PhoneInfo) => string // a callback to get Ids
): { [k: string]: PhoneInfo } {
  const dict: { [k: string]: PhoneInfo } = {};
  // Loop through the array
  list.forEach((element) => {
    const dictKey = idGen(element);
    dict[dictKey] = element; // store element under key
  });
  return dict;
}

//? function body
// // create an empty dictionary
// const dict: { [k: string]: PhoneInfo } = {}

// // Loop through the array
// list.forEach((element) => {
//   const dictKey = idGen(element)
//   dict[dictKey] = element // store element under key
// })

// return the dictionary
const result = listToDict(phoneList, (item) => item.customerId);
console.log(result);

//testing an idea
const result2 = listToDict(phoneList, (item) => item.areaCode);
console.log(result2);

//!making the function to use ANY
function listToDictAny(
  list: any[], // take the list as an argument
  idGen: (arg: any) => string // a callback to get Ids
): { [k: string]: any } {
  const dict: { [k: string]: any } = {};
  // Loop through the array
  list.forEach((element) => {
    const dictKey = idGen(element);
    dict[dictKey] = element; // store element under key
  });
  return dict;
}

const result3 = listToDictAny(phoneList, (item) => item.customerId);
console.log(result3);

// using Generics
function listToDictT<T>(
  list: T[], // take the list as an argument
  idGen: (arg: T) => string // a callback to get Ids
): { [k: string]: T } {
  const dict: { [k: string]: T } = {};
  // Loop through the array
  list.forEach((element) => {
    const dictKey = idGen(element);
    dict[dictKey] = element; // store element under key
  });
  return dict;
}

const result4 = listToDictT(phoneList, (item) => item.customerId);
console.log(result4);

//? An attempt to generalize the above function to work with any type of list

// function listToDict(
//   list: PhoneInfo[], // take the list as an argument
//   idGen: (arg: PhoneInfo) => string, // a callback to get Ids
// ): { [k: string]: any }

//* Defining a type parameter

// function listToDict<T>(
//   list: T[],
//   idGen: (arg: T) => string,
// ): { [k: string]: T } {
//   const dict: { [k: string]: T } = {}
//   return dict
// }

function wrapInArray<T>(arg: T): [T] {
  return [arg];
}

const res1 = wrapInArray(3);
console.log(res1);
//   Outcome: [ 3 ]

const res2 = wrapInArray(new Date());
console.log(res2);
//   Outcome: [ 2023-12-13T08:27:12.916Z ]
const res3 = wrapInArray(new RegExp('/s/'));
console.log(res3);
//   Outcome: [ /\/s\// ]

//? Let's try it!
listToDictT(
  [
    new Date('10-01-2021'),
    new Date('03-14-2021'),
    new Date('06-03-2021'),
    new Date('09-30-2021'),
    new Date('02-17-2021'),
    new Date('05-21-2021'),
  ],
  (arg) => arg.toISOString()
);

//* Best practices

function returnAs<T>(arg: any): T {
  return arg; //! an `any` that will _seem_ like a `T`
} // may as well just cast

// Testing
const foo = returnAs(41);
console.log(foo);
const foo2 = returnAs<string>(41);
console.log(foo2);

/**/
export default {};
