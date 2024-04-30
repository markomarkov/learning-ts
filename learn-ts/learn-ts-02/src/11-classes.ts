//* Classes

//? Field types
class Car {
  // static #nextSerialNumber: number = 100;
  // static #generateSerialNumber() {
  //   return this.nextSerialNumber++; //! this represents the main static object
  // }
  private static nextSerialNumber: number = 100;
  private static generateSerialNumber(): number {
    return this.nextSerialNumber++; //! this represents the main static object
  }
  // static isReady: boolean;
  // static {
  //   // `this` is the static scope
  //   fetch('https://api.example.com/vin_number_data')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       this.nextSerialNumber = data.mostRecentInvoiceId + 1;
  //       this.isReady = true; // flag to check if initialization is ready
  //     });
  // } // static block -- in our case it makes an api call and gets the serial number from there when the firs object is created

  make: string;
  model: string;
  year: number;
  // serialNumber = Car.generateSerialNumber(); // generate the serial at creation of object -- but this way it is public
  private _serialNumber = Car.generateSerialNumber();
  protected get serialNumber(): number {
    // can be seen from sub classes too
    // the GET makes it read only property
    return this._serialNumber;
  }
  constructor(make: string, model: string, year: number) {
    //! constructor in TS
    this.make = make;
    this.model = model;
    //     ^?
    this.year = year;
  }
  honk(duration: number): string {
    return `h${'o'.repeat(duration)}nk`;
  }
  getLabel(): string {
    return `${this.make} ${this.model} ${this.year} - #${this.serialNumber}`;
  }
  //Example code
  #serialNumber = Car.generateSerialNumber(); //! this it trull private property
  equals(other: unknown): boolean {
    // can use "any" too in place of "unknown"
    if (other && typeof other === 'object' && #serialNumber in other) {
      //-1 check if its not null can be undefined
      //-2 check it is an object type
      //-3 check check if there is (property) Car.#serialNumber in the other object

      other; // other is recognized as Car object and can be used as such
      //       ^?
      return other.#serialNumber === this.#serialNumber;
      // check the serial numbers
    }
    return false;
  }
}

let sedan = new Car('Honda', 'Jaz', 2008);
console.log(sedan);
console.log(sedan.getLabel());
//! Wrong use:
// sedan.activateTurnSignal("left") //! not safe!
// new Car(2017, "Honda", "Accord") //! not safe!

//? method types
// honk(duration: number): string {
//     return `h${'o'.repeat(duration)}nk`;
//  }
const c = new Car('Honda', 'Accord', 2011);
console.log(c);
console.log(c.honk(5)); // "hooooonk"

//? static member fields
// static nextSerialNumber = 100
// static generateSerialNumber() { return this.nextSerialNumber++ }
// getLabel() {
// return `${this.make} ${this.model} ${this.year} - #${this.serialNumber}`
// }

console.log(new Car('Honda', 'Accord', 2017));
// > "Honda Accord 2017 - #100
console.log(new Car('Toyota', 'Camry', 2022));
// > "Toyota Camry 2022 - #101

//? static blocks
// static {
//     // `this` is the static scope
//     fetch("https://api.example.com/vin_number_data")
//         .then(response => response.json())
//         .then(data => {
//             this.nextSerialNumber = data.mostRecentInvoiceId + 1;
//         })
// }
// serialNumber = Car.generateSerialNumber()

//* Access modifier keywords

//? on member fields
// private _serialNumber = Car.generateSerialNumber()
// protected get serialNumber() {
//   return this._serialNumber
// }
// const s = new Sedan("Nissan", "Altima", 2020)
// s.serialNumber

//? on static fields
// private static nextSerialNumber: number
// private static generateSerialNumber() { return this.nextSerialNumber++ }
// Car.generateSerialNumber()

//* JS private #fields

//? member fields
// #serialNumber = Car.generateSerialNumber()
// c.#serialNumber

//? static fields
// static #nextSerialNumber: number
// static #generateSerialNumber() { return this.#nextSerialNumber++ }
// #serialNumber = Car.#generateSerialNumber()

//* Private field presence checks

// equals(other: unknown) {
//     if (other &&
//       typeof other === 'object' &&
//       #serialNumber in other) {
//         other
// //       ^?
//         return other.#serialNumber = this.#serialNumber
//       }
//       return false
//   }
// const c2 = c1
// c2.equals(c1)

//* readonly

// readonly #serialNumber = Car.#generateSerialNumber()
// changeSerialNumber(num: number) {
//     this.#serialNumber = num
// }

//* Parameter properties

// constructor(
//     public make: string,
//     public model: string,
//     public year: number
//   ) {}

class Base {}

class Car2 extends Base {
  foo = console.log('class field initializer');
  constructor(public make: string) {
    //! the "public" inside the constructor tels the class has that property, in that type, without us writing it down
    super();
    console.log('custom constructor stuff');
  }
}

//* Overrides

class Truck extends Car {
  override honk(duration: number): string {
    //!This member cannot have an override modifier because it is not declared in the base class Car . Did you mean honk -- if u mistake the name
    // OOPS! we misspelled the method
    return 'BEEP';
  }
}

const t = new Truck('Ford', 'F-150', 2020);
console.log(t.getLabel());
console.log(t.honk(1)); // "beep"

//? override keyword
// override hoonk() { // OOPS!

//? noImplicitOverride
// "noImplicitOverride": true
//! we add this in tsconfig.json and it compels us with error messages to add override before the methods name

/**/
export default {};
