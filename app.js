const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function createTeam(members = []){
    inquirer.prompt([
        {
            type: 'list',
            name: 'Role',
            choices: ['Manager','Engineer','Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: 'Employee Name:'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Employee Id:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Employee Email Address:'
        },
        {
            type: 'input',
            name: 'officeNumber',
            message : 'Office Number:',
            when : function (answers) {
                return answers.Role === 'Manager';
            }
        },
        {
            type: 'input',
            name: 'github',
            message : 'GitHub:',
            when : function (answers) {
                return answers.Role === 'Engineer';
            }
        },
        {
            type: 'input',
            name: 'school',
            message : 'School:',
            when : function (answers) {
                return answers.Role === 'Intern';
            }
        },
        {
            type: 'confirm',
            name : 'continueCreating',
            message: 'Create another member?',
            default: false
        }
    ])
        .then(answers => {
            let newMember = null;
            let shouldContinue = answers.continueCreating;

            let selectedRole = answers.Role;

            delete answers.Role;
            delete answers.continueCreating;

            switch(selectedRole){
                case 'Manager':
                    newMember = Object.setPrototypeOf(answers,Manager.prototype);
                    break;
                case 'Engineer':
                    newMember = Object.setPrototypeOf(answers,Engineer.prototype);
                    break;
                case 'Intern':
                    newMember = Object.setPrototypeOf(answers,Intern.prototype);
                    break;
            }

            members.push(newMember);

            if(shouldContinue){
                createTeam(members);
            }else{
                generateHTML(members);
            }
        });
}

function generateHTML(members){
    let output = render(members);

    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFileSync(outputPath, output);
}

createTeam();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
