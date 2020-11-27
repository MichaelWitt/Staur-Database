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
  salary INT NOT NULL
);

CREATE TABLE staur_employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  staur_name VARCHAR(30) NOT NULL,
  staur_leader VARCHAR(30) NOT NULL
);