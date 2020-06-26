class Employee {
    constructor(empName,empId,empEmail) {
        this.name = empName;
        this.id = empId;
        this.email = empEmail;
    }

    getName() {
        return this.name;
    }

    getId(){
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    getRole(){
        return "Employee";
    }
}

module.exports = Employee;