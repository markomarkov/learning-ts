function isAcceptablePassword(password: string): boolean {
    return password.length > 6;
}

console.log(isAcceptablePassword("short")); // false
console.log(isAcceptablePassword("muchlonger")); // true
console.log(isAcceptablePassword("ashort")); // false