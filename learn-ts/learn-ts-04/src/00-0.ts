const anExampleVariable = "Hello World";
console.log(anExampleVariable);

function numberLength(value: number): number {
  let counter: number = 0;
  while (value !== 0) {
    counter++;
    value =  Math.floor(value / 10);
  }
  return counter;
}

console.log("Example:");
console.log(numberLength(10));
