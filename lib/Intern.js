const Employee = require('./Employee.js');

class Intern extends Employee {
    constructor(empName,empId,empEmail,intSchool) {
        super(empName,empId,empEmail);
        this.school = intSchool;
    }

    getSchool(){
        return this.school;
    }

    getRole(){
        return "Intern";
    }
}

module.exports = Intern;