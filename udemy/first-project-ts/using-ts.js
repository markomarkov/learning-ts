var tsButton = document.querySelector("button");
var tsInput1 = document.getElementById("num1");
var tsInput2 = document.getElementById("num2");
function add2(num1, num2) {
    return num1 + num2;
}
tsButton.addEventListener("click", function () {
    console.log(add2(+tsInput1.value, +tsInput2.value));
});
