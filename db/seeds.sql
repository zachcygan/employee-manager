INSERT INTO department (name)
VALUES ('Management'),
       ('Engineering'),
       ('Accounting'),
       ('Warehouse'),
       ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 200000, 1),
       ('Developer', 75000, 2),
       ('Janiter', 300000, 4),
       ('Auditor', 100000, 3),
       ('Front Desk', 65000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Zachary', 'Cygan', 1, null),
       ('Steve', 'Jobs', 2, 1),
       ('Adam', 'Smith', 2, 1),
       ('Tom', 'Scoops', 3, 2),
       ('Jeffrey', 'Thomas', 4, 1),
       ('Bob', 'Gore', 5, 1);


