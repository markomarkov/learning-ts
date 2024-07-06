function countDigits(num: number): number {
    if (num === 0) {
        return 1;
    }
    
    let count = 0;
    while (num !== 0) {
        num = Math.floor(num / 10);
        count++;
    }
    
    return count;
}

// Example usage
const num = 12345;
const digitCount = countDigits(num);
console.log(`The number of digits in ${num} is ${digitCount}`);