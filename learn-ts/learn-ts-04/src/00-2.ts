import assert from 'assert';

function maxOfThree(a: number, b: number, c: number): number {
    let largest = a;

    if (b > largest) {
        largest = b;
    }

    if (c > largest) {
        largest = c;
    }

    return largest;
}

const num1 = 10;
const num2 = 5;
const num3 = 8;

const largestNumber = maxOfThree(num1, num2, num3);
console.log(`The largest number is: ${largestNumber}`);

assert.strictEqual(maxOfThree(1, 2, 3), 3);
assert.strictEqual(maxOfThree(3, 2, 1), 3);
assert.strictEqual(maxOfThree(1, 3, 2), 3);
assert.strictEqual(maxOfThree(0, 0, 0), 0);
assert.strictEqual(maxOfThree(-1, -2, -3), -1);
assert.strictEqual(maxOfThree(5, 5, 4), 5);
assert.strictEqual(maxOfThree(-5, -5, -6), -5);
assert.strictEqual(maxOfThree(10, 9, 10), 10);
assert.strictEqual(maxOfThree(123, 456, 789), 789);
assert.strictEqual(maxOfThree(789, 123, 456), 789);