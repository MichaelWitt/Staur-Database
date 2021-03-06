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
				'View Staur Team',
				'View Employees',
				'View Roles',
				'View Departments',
				'Add Employee',
				'Update Role',
				'Remove Employee',
				'Exit'
			]
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
				case 'Update Role':
					updateRole();
					break;
				case 'Remove Employee':
					removeEmployee();
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
			},
			{
				name: 'staurLeader',
				type: 'input',
				message: 'Who is your employees staur leader?'
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
					staurDatabase();
				}
			);
		});
};

const updateRole = () => {
	inquirer
		.prompt([
			{
				name: 'employeeId',
				type: 'input',
				message: 'What employee id would you like to update?'
			},
			{
				name: 'newRole',
				type: 'input',
				message: 'What is their new role?'
			},
			{
				name: 'newSalary',
				type: 'input',
				message: 'What is their new salary?'
			}
		])
		.then((answer) => {
			connection.query(
				'UPDATE staur_role SET ? WHERE ?',
				[
					{
						title: answer.newRole
					},
					{
						id: answer.employeeId
					}
				],
				(err) => {
					if (err) throw err;
				}
			);
			connection.query(
				'UPDATE staur_role SET ? WHERE ?',
				[
					{
						salary: answer.newSalary
					},
					{
						id: answer.employeeId
					}
				],
				(err) => {
					if (err) throw err;
					console.log('Success!');
					staurDatabase();
				}
			);
		});
};

const removeEmployee = () => {
	inquirer
		.prompt([
			{
				name: 'employeeId',
				type: 'input',
				message: 'What employee id would you like to delete?'
			}
		])
		.then((answer) => {
			connection.query(
				'DELETE FROM staur_employees WHERE ?',
				{
					id: answer.employeeId
				},
				(err) => {
					if (err) throw err;
					console.log('Success!');
					staurDatabase();
				}
			);
		});
};
