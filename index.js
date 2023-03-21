const startOptions = require('./src/startMessage');
const addDepartment = require('./src/addDepartment');
const addRole = require('./src/addRole');
const addEmployee = require('./src/addEmployee');
const cTable = require('console.table');

const getMysql = async () => {
    const mysql = require('mysql2/promise');

    const db = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'Rk49FmRk49Fm!',
            database: 'employees_db',
        },
        console.log('Connected to employees_db database')
    );

    

    let adding = true;
    while (adding) {
        let choice = await startOptions(startMessage);
        let [row, fields] = '';
        let table = '';
        console.log('\n')

        switch (choice.choice) {
            case 'view all departments':
                [row, fields] = await db.execute('SELECT * from department')
                table = cTable.getTable(row)
                console.log(table);   
                break;
            case 'view all roles':
                [row, fields] = await db.execute(`select role.id, role.title, department.name, role.salary 
                                                FROM role INNER JOIN department ON role.department_id = department.id`)
                table = cTable.getTable(row)
                console.log(table); 
                break;
            case 'view all employees':
                [row, fields] = await db.execute(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary 
                                                FROM employee 
                                                INNER JOIN role ON employee.role_id = role.id 
                                                INNER JOIN department ON role.department_id = department.id 
                                                INNER JOIN employee manager ON employee.manager_id = manager.id`)
                table = cTable.getTable(row)
                console.log(table);
                break;
            case 'add a department':
                let name = await addDepartment(departmentName);
                await db.execute(`INSERT INTO department (name) VALUES ('${name}')`)
                console.log(`Added ${name} to the database`);
                break;
            case 'add a role':
                let role = await addRole(roleInfo);
                await db.execute(`INSERT INTO ROLE (title, salary, department_id) VALUES ('${role.name}', ${role.salary}, ${role.department})`)
                console.log(`Added ${role.name} added to database`);
                break;
            case 'add an employee':
                let employee = await addEmployee(employeeInfo)
                await db.execute(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employee.firstName}', '${employee.lastName}', ${employee.role}, ${employee.manager})`);                console.log('add an employee');
                console.log(`Added employee to database`)
                break;
            case 'update an employee role':
                console.log('update an employee role');
                break;
            case 'quit':
                adding = false;
                choice.ui.close();
                break;
            default:
                adding = false;
                break;
        }
    }
}


const startMessage = [
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['view all departments',
                  'view all roles',
                  'view all employees',
                  'add a department',
                  'add a role',
                  'add an employee',
                  'update an employee role',
                  'quit']
    }
]

const departmentName = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the department you would like to add?'
    }
]

const roleInfo = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the role?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
    },
    {
        type: 'input',
        name: 'department',
        message: 'What is the department id of the role?'
    },
]

const employeeInfo = [
    {
        type: 'input',
        name: 'firstName',
        message: 'What is the first name of the employee?'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'What is the last name of the employee?'
    },
    {
        type: 'input',
        name: 'role',
        message: 'What is the role id of the employee?'
    },
    {
        type: 'input',
        name: 'manager',
        message: 'What is the manager id of the employee?'
    }
]

const init = async () => {
    const db = getMysql();
    let adding = true;

    console.clear();


    
    }


init();

