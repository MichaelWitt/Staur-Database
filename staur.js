const mysql = require('mysql');
const inquirer = require('inquirer');
var figlet = require('figlet');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'kellywittorp',
	database: 'staur_employee_db'
});
connection.connect((err) => {
	if (err) throw err;
	figlet('Staur Database', function (err, data) {
		if (err) {
			console.log('Something went wrong...');
			console.dir(err);
			return;
		}
		console.log(data);
		console.log('Welcome to the Staur Database!');
		staurDatabase();
	});
});

function staurDatabase() {
	inquirer
		.prompt({
			name: 'redirect',
			type: 'rawlist',
			message: 'Where would you like us to take you?',
			choices: [
				'View Departments',
				'View Roles',
				'View Employees',
				'Add Department',
				'Add Role',
				'Add Employee',
				'Exit'
			]
		})
		.then((answer) => {
			switch (answer.redirect) {
				case 'View Staur Team':
					viewStaurTeam();
					break;
				case 'View Departments':
					viewDatabase();
					break;
				case 'View Roles':
					viewRoles();
					break;
				case 'View Employees':
					viewEmployees();
					break;
				case 'Add Department':
					addDepartment();
					break;
				case 'Add Role':
					addRole();
					break;
				case 'Add Employee':
					addEmployee();
					break;
				case 'Exit':
					connection.end();
					break;
			}
		});
}

function viewDatabase() {
	connection.query('SELECT * FROM staur_department', function (err, res) {
		if (err) throw err;
		console.table(res);
		staurDatabase();
	});
}

function viewRoles() {
	connection.query('SELECT * FROM staur_role', function (err, res) {
		if (err) throw err;
		console.table(res);
		staurDatabase();
	});
}

function viewEmployees() {
	connection.query('SELECT * FROM staur_employees', function (err, res) {
		if (err) throw err;
		console.table(res);
		staurDatabase();
	});
}
