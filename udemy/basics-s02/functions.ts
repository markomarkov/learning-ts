function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log('Result: ' + num);
}

// void is a type that can be used for functions that don't return anything
// undefined is a type that can be used for variables that don't have a value yet
// undefined is a valid value in JavaScript
// void is a valid type in TypeScript
// void is not the same as undefined

// callback function
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

printResult(add(5, 12));

let someValue: Function;
someValue = add;
// someValue = printResult;
// someValue = 5;

let combineValues: (a: number, b: number) => number;

combineValues = add;
// combineValues = printResult;
// combineValues = 5;

console.log(combineValues(8, 8));

// let someValue: undefined;

addAndHandle(10, 20, (result) => {
  console.log(result);
});

