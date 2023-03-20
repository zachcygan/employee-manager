insert into department (name)
values ('Management'),
       ('Engineering'),
       ('Accounting'),
       ('Warehouse'),
       ('Sales');

insert into role (title, salary, department_id)
values ('CEO', 200000.95, 1),
       ('Developer', 75000, 2),
       ('Janiter', 300000, 4),
       ('Auditor', 100000, 3),
       ('Front Desk', 65000, 5);


insert into employee (first_name, last_name, role_id, manager_id)
values ('Zachary', 'Cygan', 1, null),
       ('Steve', 'Jobs', 2, 1),
       ('Tom', 'Scoops', 3, 2),
       ('Jeffrey', 'Thomas', 4, 1),
       ('Bob', 'Gore', 5, 1);
