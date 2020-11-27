INSERT INTO staur_department (department_name)
VALUES ("Galaxy Defenders"), ("Ocean Heroes"), ("Defense and Attorney"), ("Brigade"), ("Staur Observation"), ("Waterology"), ("Island Protection"), ("City Watch");

INSERT INTO staur_role (title, salary)
VALUES ("Space Officer", 75000), ("Treasure Finder", 64000), ("Shark Protector", 88000), ("Wall Defender", 77000), ("Galaxy Watcher", 100000), ("Water Embracer", 65000), ("Volcano Watcher", 89000), ("City Sleeper", 92000);

INSERT INTO staur_employees (first_name, last_name, staur_name, staur_leader)
VALUES ("Destiny", "Swimins", "Xupernova", "Maximus Jones"), ("Rolly", "Juppy", "Dive Master", "Cheff Cuppins"), ("Jocko", "Towns", "Super Jock", "Repsen"), ("Chip", "Shawawa", "Chocolate Ship", "Hero Size"), ("Alena", "Awesome", "Powerful Star", "Turtle Woah"), ("Jessica", "Waters", "Water Alactica", "Cosmos"), ("Seafo", "Winters", "Seafoam", "Hawai Mulai"), ("Mister", "Falixa", "Super Falix", "Mix It");

SELECT * FROM staur_employees 
INNER JOIN staur_role 
ON staur_employees.id = staur_role.id 
INNER JOIN staur_department 
ON staur_role.id = staur_department.id


