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
			choices: ['View Staur Team', 'View Employees', 'View Roles', 'View Departments', 'Add Employee', 'Exit']
		})
		.then((answer) => {
			switch (answer.redirect) {
				case 'View Staur Team':
					viewStaurTeam();
					break;
				case 'View Employees':
					viewEmployees();
					break;
				case 'View Roles':
					viewRoles();
					break;
				case 'View Departments':
					viewDepartment();
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

function viewStaurTeam() {
	connection.query(
		'SELECT * FROM staur_employees INNER JOIN staur_role ON staur_employees.id = staur_role.id INNER JOIN staur_department ON staur_role.id = staur_department.id',
		function (err, res) {
			if (err) throw err;
			console.table(res);
			staurDatabase();
		}
	);
}

function viewDepartment() {
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

const addEmployee = () => {
	inquirer
		.prompt([
			{
				name: 'firstName',
				type: 'input',
				message: 'What is your employees first name?'
			},
			{
				name: 'lastName',
				type: 'input',
				message: 'What is your employees last name?'
			},
			{
				name: 'staurName',
				type: 'input',
				message: 'What is your employees staur name?'
			},
			{
				name: 'staurLeader',
				type: 'input',
				message: 'Who is your employees staur leader?'
			},
			{
				name: 'addedRole',
				type: 'input',
				message: 'What is your employees role?'
			},
			{
				name: 'roleSalary',
				type: 'input',
				message: 'What is the salary of this role?'
			},
			{
				name: 'departmentName',
				type: 'input',
				message: 'What is their department name?'
			}
		])
		.then((answer) => {
			connection.query(
				'INSERT INTO staur_employees SET ?',
				{
					first_name: answer.firstName,
					last_name: answer.lastName,
					staur_name: answer.staurName,
					staur_leader: answer.staurLeader
				},
				(err) => {
					if (err) throw err;
				}
			);
			connection.query(
				'INSERT INTO staur_role SET ?',
				{
					title: answer.addedRole,
					salary: answer.roleSalary
				},
				(err) => {
					if (err) throw err;
				}
			);
			connection.query(
				'INSERT INTO staur_department SET ?',
				{
					department_name: answer.departmentName
				},
				(err) => {
					if (err) throw err;
					console.log('Success!');
					viewStaurTeam();
					staurDatabase();
				}
			);
		});
};
