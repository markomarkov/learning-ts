function Logger2(constructor: Function) {
    console.log("Logging...");
    console.log(constructor);
}

function LoggerFac(logString: string) {
    console.log('LOGGER FACTORY');
    return function(constructor: Function) {
        console.log("Logging...");
        console.log(logString);
        console.log(constructor);
    }   
}

// @Logger2
@LoggerFac('LOGGING - PERSON')
class Person2 {
    name = "Max";

    constructor() {
    console.log("Creating person object...");
    }
}

const pers2: Person2 = new Person2();

console.log(pers2);
