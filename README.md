# Employee-Manager

## Description

My motivation for making this project was to make a CLI that could manage an employee database. I have created a database that tracks employees, their roles, who their managers are, how much money they make, and even what department each role is in. All information is easily accessible through commands in the application and is easy to read.

## Installation

The webpage is available at https://github.com/zachcygan/employee-manager. Be sure to install any dependencies by typing in "npm i" in the console. This will install inquirer, console.table, and mysql2. 

## Dependencies Used
    - node
    - inquirer
    - console.table
    - mysql2

## Instructions

To use this application, you must have Node.js and MySQL installed on your computer. Navigate to the repository on your computer and type "npm i" to install the necessary dependencies. When you choose "View all departments", a formatted table will be displayed showing all department names and department IDs. When you choose "View all roles", a formatted table will be displayed showing all job titles, role IDs, the department that role belongs to, and the salary for that role. When you choose "View all employees", a formatted table will be displayed showing all employee data, including employee IDs, first names, last names, job titles, departments, salaries, and managers that the employees report to. When you choose "Add a department", you will be prompted to enter the name of the department. Once you enter the name, the new department will be added to the database. When you choose "Add a role", you will be prompted to enter the name, salary, and department for the new role. Once you enter this information, the new role will be added to the database. When you choose "Add an employee", you will be prompted to enter the employee's first name, last name, role, and manager. Once you enter this information, the new employee will be added to the database. When you choose "Update employee info", you will be prompted to select an employee to update and their new role. Once you enter this information, the employee's role will be updated in the database. Additionally, you may adjust the employees manager in this option as well. 

## Video Demonstration

Link to video demo: https://youtu.be/t9e-KyE6ox0

## Screenshots

![screenshot of the website](/assets/images/screenshot.png)
![screenshot of the website](/assets/images/screenshot2.png)
![screenshot of the website](/assets/images/screenshot3.png)
![screenshot of the website](/assets/images/screenshot4.png)


