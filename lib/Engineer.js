const Employee = require('./Employee.js')

class Engineer extends Employee {
    constructor(empName,empId,empEmail,gitHubName) {
        super(empName,empId,empEmail);
        this.github = gitHubName;
    }

    getGithub(){
        return this.github;
    }

    getRole(){
        return "Engineer";
    }
}

module.exports = Engineer;