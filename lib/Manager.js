const Employee = require('./Employee.js');

class Manager extends Employee {
    constructor(empName,empId,empEmail,empOffNo) {
        super(empName,empId,empEmail);
        this.officeNumber = empOffNo;
    }

    getOfficeNumber(){
        return this.officeNumber;
    }

    getRole(){
        return "Manager";
    }
}

module.exports = Manager;