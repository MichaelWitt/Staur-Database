DROP DATABASE IF EXISTS staur_employee_db;
CREATE database staur_employee_db;

USE staur_employee_db;

CREATE TABLE staur_department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE staur_role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary INT NOT NULL,
  department_id INT NOT NULL,
  CONSTRAINT FK_Department FOREIGN KEY (department_id) REFERENCES staur_department(id)
);

CREATE TABLE staur_employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  staur_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  staur_leader_id INT,
  CONSTRAINT FK_Role FOREIGN KEY (role_id) REFERENCES staur_role(id),
  CONSTRAINT FK_Staur_Leader FOREIGN KEY (staur_leader_id) REFERENCES staur_employees(id)
);

INSERT INTO staur_department (department_name)
VALUES ("Galaxy Defenders");

INSERT INTO staur_role (title, salary, department_id)
VALUES ("Space Officer", 75000, 1);

INSERT INTO staur_employees (first_name, last_name, staur_name, role_id, staur_leader_id)
VALUES ("Destiny", "Swimins", "Xupernova", 1, 1);

SELECT * FROM staur_employees;