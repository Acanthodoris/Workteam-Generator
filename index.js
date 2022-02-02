const inquirer = require("inquirer");
const fs = require('fs');

const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const generateHtml = require("./util/generateHtml");
const { Console } = require("console");
const team = []

console.log('Lets start building your team!')
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is your managers name?',
        name: 'name',
      },
      {
        type: 'imput',
        message: 'What is your managers ID number?',
        name: 'id',
      },
      {
        type: 'input',
        message: 'What your managers email address?',
        name: 'email',
      },
      {
        type: 'input',
        message: 'What your managers office number?',
        name: 'officeNumber',
      }
  ])
  .then(answers => {
      let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
      team.push(manager);
      teamBuilding();
  });

function teamBuilding() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Would you like to add on to your team?',
        name: 'team',
        choices: ['Add a Engineer', 'Add a Intern', 'All done!'],
        loop: true
      },
    ])
  .then(answers => {
    switch (answers.team) {
      case 'Add a Engineer':
        engineerQuestions()
        break;
    
      case 'Add a Intern':
        internQuestions()
        break;

      case 'All done!':
        const controller = new AbortController()
        fs.writeFile("team.html",generateHtml(team), (err) => {
          controller.abort();
        })  
        break;

      default:
        break;
    }
})
};

function engineerQuestions() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is your engineers name?',
        name: 'name',
      },
      {
        type: 'imput',
        message: 'What is your engineers ID number?',
        name: 'id',
      },
      {
        type: 'input',
        message: 'What your engineers email address?',
        name: 'email',
      },
      {
        type: 'input',
        message: 'What your engineers GitHub username?',
        name: 'github',
      }
  ])
  .then(answers => {
      let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
      team.push(engineer);
      teamBuilding()
  });
};

function internQuestions() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is your interns name?',
      name: 'name',
    },
    {
      type: 'imput',
      message: 'What is your interns ID number?',
      name: 'id',
    },
    {
      type: 'input',
      message: 'What your interns email address?',
      name: 'email',
    },
    {
      type: 'input',
      message: 'What school did your intern attend?',
      name: 'school',
    }
  ])
  .then(answers => {
    let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    team.push(intern);
    teamBuilding()
  });
}

