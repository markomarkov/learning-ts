const tsButton = document.querySelector("button")!;
const tsInput1 = document.getElementById("num1")! as HTMLInputElement;
const tsInput2 = document.getElementById("num2")! as HTMLInputElement;

function add2(num1:number, num2:number):number {
    return num1 + num2;
}

tsButton.addEventListener("click", function() {
  console.log(add2(+tsInput1.value, +tsInput2.value));
});
