//* Nominal vs Structural

// class Car {
//   make: string;
//   model: string;
//   year: number;
//   isElectric: boolean;
// }

// class Truck {
//   make: string;
//   model: string;
//   year: number;
//   towingCapacity: number;
// }

const vehicle = {
  make: 'Honda',
  model: 'Accord',
  year: 2017,
};

function printCar(car: { make: string; model: string; year: number }) {
  console.log(`${car.make} ${car.model} (${car.year})`);
}

// printCar(new Car()); //✔️ Fine
// printCar(new Truck()); //✔️ Fine
printCar(vehicle); //✔️ Fine

vehicle.make = 'Toyota';
vehicle.model = 'Corolla';
vehicle.year = 2010;

printCar(vehicle); //✔️ Fine

let x: any = {};
if (x instanceof Date) {
  console.log("It's instance of Date");
} else {
  console.log("It's NOT a instance of Date");
}

export default {};
