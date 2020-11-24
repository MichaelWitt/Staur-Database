const mysql = require('mysql');
const inquirer = require('inquirer');
var figlet = require('figlet');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'kellywittorp',
    database: 'staur_employee_db',
});
connection.connect((err) => {
    if (err) throw err;   
    figlet('Staur Database', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
        console.log('Welcome to the Staur Database!')
        staurDatabase()
    });
});

function staurDatabase() {
  inquirer
    .prompt({
      name: "redirect",
      type: "rawlist",
      message: "Where would you like us to take you?",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees", 
        "Exit"
      ]
    }).then((answer) => {
            switch (answer.redirect) {
              case "View Departments":
                    departmentSearch();
                    break;
              case "View Roles":
                    roleSearch();
                    break;
                case "View Employees":
                    employeeSearch();
                    break;
                case "Exit":
                    connection.end();
                    break;
            };
          })
        };

    













