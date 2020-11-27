INSERT INTO staur_department (department_name)
VALUES ("Galaxy Defenders");
VALUES ("Ocean Heroes");
VALUES ("Defense and Attorney");
VALUES ("Brigade");
VALUES ("Staur Observation");
VALUES ("Waterology");
VALUES ("Island Protection");

INSERT INTO staur_role (title, salary)
VALUES ("Space Officer", 75000);
VALUES ("Treasure Finder", 64000);
VALUES ("Shark Protector", 88000);
VALUES ("Wall Defender", 77000);
VALUES ("Galaxy Watcher", 100000);
VALUES ("Water Embracer", 65000);
VALUES ("Volcano Watcher", 89000);

INSERT INTO staur_employees (first_name, last_name, staur_name, staur_leader)
VALUES ("Destiny", "Swimins", "Xupernova", "Maximus Jones");
VALUES ("Rolly", "Juppy", "Dive Master", "Cheff Cuppins");
VALUES ("Jocko", "Towns", "Super Jock", "Repsen");
VALUES ("Chip", "Shawawa", "Chocolate Ship", "Hero Size");
VALUES ("Alena", "Awesome", "Powerful Star", "Turtle Woah");
VALUES ("Jessica", "Waters", "Water Alactica", "Cosmos");
VALUES ("Seafo", "Winters", "Seafoam", "Hawai Mulai");

SELECT * FROM staur_employees 
INNER JOIN staur_role ON staur_employees.id = staur_role.id 
INNER JOIN staur_department ON staur_role.id = staur_department.id


