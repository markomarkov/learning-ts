class DepartmentA {
    name: string;
    private employees: string[] = [];

    constructor(n: string) {
        this.name = n;
    }

    describe(this: DepartmentA) {
        console.log("Department: " + this.name);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

const accountingA = new DepartmentA("Accounting");

console.log(accountingA);

accountingA.addEmployee("Max");
accountingA.addEmployee("Niki");

accountingA.describe();
accountingA.printEmployeeInformation();

