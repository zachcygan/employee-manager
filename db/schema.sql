drop database if exists employees_db;
create database employees_db;

use employees_db;

create table department (
    id int not null auto_increment primary key,
    name VARCHAR(30)
);

create table role (
    id int not null auto_increment primary key,
    title VARCHAR(30),
    salary decimal not null,
    department_id int,
    FOREIGN key (department_id)
    REFERENCES department(id)
    on delete set null
);

create table employee (
    id int not null auto_increment primary key,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id int,
    manager_id int,
    foreign key (role_id)
    references role(id)
    on delete cascade,
    foreign key (manager_id)
    references employee(id)
    on delete set null
);
