insert into department (name)
values ('Management')
       ('Engineering')
       ('Accounting')
       ('Warehouse')
       ('Sales')

insert into role (title, salary, department_id)
values ('CEO', '200000', select id from department where name = Management)


insert into employee (first_name, last_name, role_id, manager_id)
values ('Zachary', 'Cygan', select id from role, select id from employee)
       ('Steve', 'Jobs', select id from role, select id from emeployee)